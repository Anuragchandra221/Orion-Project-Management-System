import React, { useState, useEffect, useContext } from 'react'
import './CSS/AddCoordinator.css'
import './CSS/Dashboard.css'
import {  file, get_project, get_task, get_token } from '../Utils/services'
import { useNavigate, Link } from 'react-router-dom'
import './CSS/GuideDashboard.css'
import { loginContext } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faHourglassEnd } from '@fortawesome/free-solid-svg-icons'

function GuideDashboard() {

    const [loading, setLoading] = useState(true)
    const [project, setProject] = useState()
    const [tasks, setTasks] = useState()
    let datetime;

    const [user] = useContext(loginContext)

    const navigate = useNavigate()

    useEffect(()=>{
        if((user && user!=="guide" )  ){
            navigate("/login")
        }
        if(!get_token()){
          navigate('/login')
        }else{
          get_project().then((results)=>{
            setProject(results.data)
            get_task(results.data.title).then((results)=>{
              // results.data.due_date = results.data.due_date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });  
              setTasks(results.data)
              // console.log(results.data)
              setLoading(false)
            })
          })
        }
      }, [])

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
                                  <p className='task_title'>{value.completed?<span className='mr-2' style={{color: 'green'}} ><FontAwesomeIcon icon={faCircleCheck} /></span>:<span className='mr-2' style={{color: 'orange'}}><FontAwesomeIcon icon={faHourglassEnd} /></span>}{value.title}</p>
                                </div>
                                  <p className=''>Due {
                                    formattedDatetime
                                   
                                  }</p>
                                  <div className='mb-3'>
                                    {(value.works.length>0)?value.works.map((val, index)=>{
                                        return (
                                            <a href={file(val.slice(6,))} target='_blank' className='file mb-2' key={index}>
                                                {val.slice(6,)}
                                            </a>
                                        )
                                    }):<></>}

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