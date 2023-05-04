import React, { useState, useEffect, useContext } from 'react'
import './CSS/AddCoordinator.css'
import './CSS/Dashboard.css'
import { get_coordinator, get_token, update_token } from '../Utils/services'
import { useNavigate, Link } from 'react-router-dom'
import { set_user } from '../Utils/services'
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import DashSideBar from '../Components/DashSideBar'
import { loginContext } from '../App'

function ViewCoordinator() {
    const [loading, setLoading] = useState(true)
    const [account_type, setAccountType] = useState('')
    const [cData, setCData] = useState()

    const navigate = useNavigate()
    const [user] = useContext(loginContext)

    useEffect(()=>{
      
        if(!get_token()){
          navigate('/login')
        }else{
          get_coordinator().then((results)=>{
              setCData(results.data)
              setLoading(false)
          })
        }
      }, [loading])

      if(loading){

      }else{
        if(user && (user=="admin" || user=="coordinator")){
          return (
              <div className='dashboard d-flex' >
                  <div className='dashmain mt-5'>
                  <div className='view d-flex justify-content-start aligin-items-center py-3 mx-1 mx-lg-4'>
                      <div className='d-flex justify-content-between mx-3 mb-3'>
                          <div><h3 className='newHeading'>Newly added Coordinators</h3></div>
                          <div className='mr-2 mr-lg-0'>
                              <Link to="/add-coordinator"><button className='tableButton  px-1 px-lg-3 'style={{cursor: 'pointer'}} >Add New</button></Link>
                              
                          </div>
              
                      </div>
                      <div>
                          <div className='gridContainer mx-3'>
                              <div className='item heading'>Name</div>
                              <div className='item heading'>Register Number</div>
                              <div className='item heading'>Email</div>
                              <div className='item heading'>Phone</div>
                              <div className='item heading'>Action</div>
                                          {cData?cData.map((obj, index) => (
                                              <React.Fragment key={index}>
                                              {Object.values(obj).map((value, index) => (
                                                  <div key={index} className="item">{value}</div>
                                              ))}
                                              <div className='item'>
                                                  <button style={{border: 'none',backgroundColor: '#fff'}}><FontAwesomeIcon icon={faPen} /></button>
                                              </div>
                                              </React.Fragment>
                                          )):''}
                          </div>
                      </div>
                  </div>
                  </div>
                  
              </div>
            )
        }else if(account_type=="guide"){
          navigate('/dashboardg')
        }else{
          navigate('/login')
        }
      }

    
 
}

export default ViewCoordinator