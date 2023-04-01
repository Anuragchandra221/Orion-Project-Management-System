import React from 'react'
import './DashSideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faPersonChalkboard, faUser } from '@fortawesome/free-solid-svg-icons'

function DashSideBar() {
  return (
    <div className='sidebar pl-3 pt-3 px-3 pb-3 pb-lg-0 '>
        <div><h2 className='sidebarHeading'>Orion</h2></div>
        <div className='menus'>
            <div className='sidebarItem mt-3 mt-lg-5'>
                <FontAwesomeIcon icon={faGauge}/> 
                <p className='sidebarText ml-2'>Dashboard</p>
            </div>
            <div className='sidebarItem mt-3 mt-lg-5'>
                <FontAwesomeIcon icon={faUser}/> 
                <p className='sidebarText ml-2'>Students</p>
            </div>
            <div className='sidebarItem mt-3 mt-lg-5'>
                <FontAwesomeIcon icon={faUser}/> 
                <p className='sidebarText ml-2'>Coordinator</p>
            </div>
            <div className='sidebarItem mt-3 mt-lg-5'>
                <FontAwesomeIcon icon={faPersonChalkboard}/> 
                <p className='sidebarText ml-2'>Guide</p>
            </div>
        </div>
    </div>
  )
}

export default DashSideBar