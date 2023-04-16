import React, { useState, useEffect } from 'react'
import './CSS/AddCoordinator.css'
import './CSS/Dashboard.css'
import { get_coordinator, get_student, get_token, update_token } from '../Utils/services'
import { useNavigate, Link } from 'react-router-dom'
import { set_user } from '../Utils/services'
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import DashSideBar from '../Components/DashSideBar'

function ViewStudent() {
    const time = 9*60*1000

    const [load, setLoad] = useState(false)
    const [loading, setLoading] = useState(true)
    const [account_type, setAccountType] = useState('')
    const [sData, setSData] = useState()

    const navigate = useNavigate()

    useEffect(()=>{
        if((account_type!=='' && account_type!=="admin" && account_type !== "coordinator" && account_type !== "guide" )  ){
            navigate("/login")
        }
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
          get_student().then((results)=>{
              setSData(results.data)
              setLoading(false)
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

      if(loading){

      }else{
        return (
            <div className='dashboard d-flex' >
                <div>
                    <DashSideBar />
                </div>
                <div className='dashmain mt-5'>
                <div className='view d-flex justify-content-start aligin-items-center py-3 mx-1 mx-lg-4'>
                    <div className='d-flex justify-content-between mx-3 mb-3'>
                        <div><h3 className='newHeading'>Newly added Students</h3></div>
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
                                        {sData?sData.map((obj, index) => (
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
      }
}

export default ViewStudent