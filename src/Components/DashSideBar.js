import React from 'react'
import './DashSideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faPersonChalkboard, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'

function DashSideBar() {

    const navigate = useNavigate()

  return (
    <div className='sidebar pl-3 pt-4 px-3 pb-3 pb-lg-0 '>
        <div className='d-flex headingDiv'><h2 className='sidebarHeading mr-2'>Orion</h2>
        <button className='logoutBtn ' style={{cursor: 'pointer'}} onClick={()=>{
            localStorage.removeItem("token")
            localStorage.removeItem("refresh")
            navigate("/login")
        }} ><FontAwesomeIcon icon={faRightFromBracket}/> </button>
        </div>
        <div className='menus'>
            <div className='sidebarItem mt-3 mt-lg-5'>
                <FontAwesomeIcon icon={faGauge}/> 
                <Link to="/dashboard"><p className='sidebarText ml-2 mb-0' style={{cursor: 'pointer', color: '#fff'}}>Dashboard</p></Link>
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