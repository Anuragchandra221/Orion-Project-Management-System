import React from 'react'
import DashSideBar from '../Components/DashSideBar'
import './CSS/Dashboard.css'
import DashboardCard from '../Components/DashboardCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faPersonChalkboard, faUser } from '@fortawesome/free-solid-svg-icons'
import New from '../Components/New'

function Dashboard() {
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