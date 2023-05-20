import React, { useState } from 'react'
import './CSS/Landing.css'
import { Link } from 'react-router-dom'
import { search_old_project } from '../Utils/services'

function Landing() {
  const [data, setData] = useState()
  const [values, setValues] = useState([])
  const search = ()=>{
    console.log(data)
    search_old_project(data).then((results)=>{
      setValues(results.data)
    })
  }
  console.log(values)
  return (
    <div className='landing'>
      <div className='landingInput'>
        <input type='text '  placeholder='Search Projects...' onChange={(e)=>{
          setData(e.target.value)
          search()
        }} />
        <div className='mt-1' style={{maxHeight: '10em', backgroundColor:'white'}}>
          {values.map((val, index)=>{
            return (
              <Link to={`get-project/${val.title}`}>
              <div className='suggestion p-2' key={index}> 
                {val.title}
              </div>
              </Link>
              
            )
            
          })}
        </div>
        
      </div>
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