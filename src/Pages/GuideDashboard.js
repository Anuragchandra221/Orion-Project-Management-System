import React, { useState, useEffect } from 'react'
import './CSS/AddCoordinator.css'
import './CSS/Dashboard.css'
import { get_guide, get_project, get_task, get_token, update_token } from '../Utils/services'
import { useNavigate, Link } from 'react-router-dom'
import { set_user } from '../Utils/services'
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import DashSideBar from '../Components/DashSideBar'
import './CSS/GuideDashboard.css'

function GuideDashboard() {
  const time = 9*60*1000

    const [loading, setLoading] = useState(true)
    const [account_type, setAccountType] = useState('')
    const [project, setProject] = useState()
    const [tasks, setTasks] = useState()
    const [gData, setGData] = useState()
    let datetime;

    const navigate = useNavigate()

    useEffect(()=>{
        if((account_type!=='' && account_type!=="guide" )  ){
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
          get_project().then((results)=>{
            setProject(results.data)
            get_task(results.data.title).then((results)=>{
              // results.data.due_date = results.data.due_date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });  
              setTasks(results.data)
            })
          })
          get_guide().then((results)=>{
              setGData(results.data)
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
                <div className='dashmain mt-5'>
                <div className='view d-flex justify-content-start aligin-items-center py-3 mx-1 mx-lg-4'>
                    <div className='d-flex justify-content-between mx-3 mb-3'>
                      <div>
                        <div><h3 className='projectHeading'>Project - {project?project.title:''}</h3></div>
                        <div><h4 className='newHeading'> {project?project.description:''}</h4></div>
                      </div>
                        <div className='mr-2 mr-lg-0'>
                            <Link to="/assign-task"><button className='tableButton  px-1 py-0 py-lg-1 px-lg-3 'style={{cursor: 'pointer'}} >Assign New Task</button></Link>
                            
                        </div>
            
                    </div>
                    <div>
                        <div className='mx-3'>
                          {tasks?tasks.map((value, index)=>{
                            datetime = new Date(value.due_date) 
                            let formattedDatetime = datetime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });  // format the datetime object
                            return (
                              <div className='mt-4' key={index}>
                                <div className='d-flex justify-content-between'>
                                  <p className='task_title'>{value.title}</p>
                                  <button className='taskDue'>Due {
                                    formattedDatetime
                                   
                                  }</button>
                                </div>
                                <div>
                                  <p className='task_description'>{value.description}</p>
                                </div>
                              </div>
                            )
                          }):''}
                        </div>
                    </div>
                </div>
                </div>
                
            </div>
          )
      }
}

export default GuideDashboard