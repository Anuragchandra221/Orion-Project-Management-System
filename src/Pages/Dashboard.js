import React, { useEffect, useState } from 'react'
import DashSideBar from '../Components/DashSideBar'
import './CSS/Dashboard.css'
import DashboardCard from '../Components/DashboardCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faPersonChalkboard, faUser } from '@fortawesome/free-solid-svg-icons'
import New from '../Components/New'
import { get_coordinator, get_count, get_token, update_token } from '../Utils/services'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { set_user } from '../Utils/services'
import { CirclesWithBar } from 'react-loader-spinner'

function Dashboard() {
  const navigate = useNavigate()
  const time = 1*60*1000
  const [no, setNo] = useState()
  const [cData, setCData] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if (loading){
      if(get_token()){
        update_token().then((results)=>{
          set_user(results.data.access, results.data.refresh)
          
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
        // console.log(results.data)
        setCData(results.data)
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
          <New name="Students" />
          <New name="Coordinators" data={cData?cData:[]} />
          <New name="Guides" />
        </div>
      </div>
    </div>
  )
}

export default Dashboard