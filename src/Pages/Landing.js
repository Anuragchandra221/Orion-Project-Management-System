import React from 'react'
import './CSS/Landing.css'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className='landing'>
        <div className='landing-background'>
            <h2 className='landing-heading mb-2'>
                Welcome to <span className='orion'>Orion</span>
            </h2>
            <p className='landing-text'>Project Management System</p>
        </div>
        <div className='toLogin mx-auto pt-2'>
            <img src={require('.././assets/images/students.png')} />
            <h2 className='mx-auto'>User Login</h2>
            <Link to="/login" >Click Here To Login</Link>
        </div>
    </div>
  )
}

export default Landing