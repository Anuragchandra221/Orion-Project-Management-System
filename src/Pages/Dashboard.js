import React, { useEffect, useState } from 'react'
import DashSideBar from '../Components/DashSideBar'
import './CSS/Dashboard.css'
import DashboardCard from '../Components/DashboardCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faPersonChalkboard, faUser } from '@fortawesome/free-solid-svg-icons'
import New from '../Components/New'
import { get_coordinator, get_count, get_guide, get_student, get_token, update_token } from '../Utils/services'
import { useNavigate } from 'react-router-dom'
import { set_user } from '../Utils/services'
import { CirclesWithBar } from 'react-loader-spinner'
import jwt_decode from "jwt-decode";

function Dashboard() {
  const navigate = useNavigate()
  const time = 9*60*1000
  const [no, setNo] = useState([])
  const [cData, setCData] = useState()
  const [gData, setGData] = useState()
  const [sData, setSData] = useState()
  const [loading, setLoading] = useState(true)
  const [account_type, setAccountType] = useState('')

  useEffect(()=>{
    if (loading){
      if(get_token()){
        update_token().then((results)=>{
          set_user(results.data.access, results.data.refresh)
          setLoading(false)
          setAccountType(jwt_decode(get_token()).account_type)
          
        }).catch((err)=>{
          // console.log(err)
        })
      }else{
        navigate('/login')
      }
    }
    if(!get_token()){
      navigate('/login')
    }else{
      setAccountType(jwt_decode(get_token()).account_type)
      get_count().then((results)=>{
        setNo(results.data.admin)
        setLoading(false)
      }).catch((err)=>{
        if(err.request.status == 401){
          localStorage.removeItem("token")
          localStorage.removeItem("refresh")
        }
      })

      get_coordinator().then((results)=>{
        setCData(results.data)
      })

      get_guide().then((results)=>{
        setGData(results.data)
      })
      
      get_student().then((results)=>{
        setSData(results.data)
      })

      let interval = setInterval(()=>{
          update_token().then((results)=>{
            set_user(results.data.access, results.data.refresh)
            
          }).catch((err)=>{
            // console.log(err)
          })
      },time)
      return ()=>clearInterval(interval)
    }
  }, [loading])

  
  return (
    <div className='dashboard d-flex' >
      <div>
        <DashSideBar />
      </div>
      <div className='dashmain '>
        <div style={{position: 'relative'}}>

          {!loading?
          <div className='d-flex align-items-start mt-3 dashboardCard'>
          <DashboardCard name="Students" count={no[3]?no[3].count: 0} icon={<FontAwesomeIcon icon={faUser}/> } />
          <DashboardCard name="Coordinators" count={no[1]?no[1].count: 0} icon={<FontAwesomeIcon icon={faGauge}/> } />
          <DashboardCard name="Guides" count={no[2]?no[2].count: 0} icon={<FontAwesomeIcon icon={faPersonChalkboard}/> } />
        </div>
          :<div style={{ position: "absolute", top: "130%", left: "50%", transform: "" }}>
              <CirclesWithBar
                height="80"
                width="80"
                radius="9"
                color="#405189"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
          </div>}
        </div>
        
        <div className='d-flex mt-3 newContainer'>
          <New name="Students" data={sData?sData:[]} account_type={account_type} />
          <New name="Guides" data={gData?gData:[]} account_type={account_type} />
          {account_type=="admin"?<New name="Coordinators" account_type={account_type} data={cData?cData:[]} />:<></>}
        </div>
      </div>
    </div>
  )
}

export default Dashboard