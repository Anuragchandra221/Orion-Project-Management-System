import React, { useEffect, useState } from 'react'
import DashSideBar from '../Components/DashSideBar'
import './CSS/Dashboard.css'
import DashboardCard from '../Components/DashboardCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faPersonChalkboard, faUser } from '@fortawesome/free-solid-svg-icons'
import New from '../Components/New'
import { get_token, update_token } from '../Utils/services'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { set_user } from '../Utils/services'

function Dashboard() {
  const navigate = useNavigate()
  const time = 1*60*1000

  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if(!get_token()){
      navigate('/login')
    }else{
      let interval = setInterval(()=>{
          update_token().then((results)=>{
            set_user(results.data.access, results.data.refresh)
            
          }).catch((err)=>{
            console.log(err)
          })
      },time)
      console.log('updated')
      return ()=>clearInterval(interval)
    }
  }, [loading])

  
  return (
    <div className='dashboard d-flex'>
      <div>
        <DashSideBar />
      </div>
      <div className='dashmain '>
        <div className='d-flex align-items-start mt-3 dashboardCard'>
          <DashboardCard name="Students" count="8854985" icon={<FontAwesomeIcon icon={faUser}/> } />
          <DashboardCard name="Coordinators" count="8854985" icon={<FontAwesomeIcon icon={faGauge}/> } />
          <DashboardCard name="Guides" count="8854985" icon={<FontAwesomeIcon icon={faPersonChalkboard}/> } />
        </div>
        <div className='d-flex mt-3 newContainer'>
          <New name="Students" />
          <New name="Coordinators" />
          <New name="Guides" />
        </div>
      </div>
    </div>
  )
}

export default Dashboard