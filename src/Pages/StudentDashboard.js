import React, { useState, useEffect, useContext } from 'react'
import './CSS/AddCoordinator.css'
import './CSS/Dashboard.css'
import {  get_project, get_task, get_token, upload_work } from '../Utils/services'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faHourglassEnd, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import './CSS/GuideDashboard.css'
import { loginContext } from '../App'
function StudentDashboard() { 
    const [loading, setLoading] = useState(true)
    const [project, setProject] = useState()
    const [tasks, setTasks] = useState()
    const [file, setFile] = useState()
    const [task, setTask] = useState()
    const [d, setD] = useState()
    const [err, setErr] = useState()
    let datetime;

    const [user] = useContext(loginContext)


    const navigate = useNavigate()

    useEffect(()=>{
        if((user && user!=="student" )  ){
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
            //   console.log(results.data)
              setLoading(false)
            })
          })
        }
      }, [d])

      const submitWork = (title) =>{
        // console.log(file, task, project.title)
        if(file){
            const formData = new FormData()
            formData.append('file', file)
            formData.append('project',project.title)
            formData.append('task',task)
            upload_work(formData).then((results)=>{
                setD('')
            }).catch((err)=>{
                console.log(err)
            })
        }else{
            setErr("No file choosen")
            setTask(title)
        }
      }

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
                            
                        </div>
            
                    </div>
                    <div>
                        <div className='mx-3'>
                          {tasks?tasks.map((value, index)=>{
                            datetime = new Date(value.due_date) 
                            let formattedDatetime = datetime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });  // format the datetime object
                            datetime = new Date(value.posted)
                            let formattedDatetime2 = datetime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                            return (
                              <div className='mt-4' key={index}>
                                
                                <div className='d-flex justify-content-between'>
                                  <p className='task_title'>{value.completed?<span className='mr-2' style={{color: 'green'}} ><FontAwesomeIcon icon={faCircleCheck} /></span>:<span className='mr-2' style={{color: 'orange'}}><FontAwesomeIcon icon={faHourglassEnd} /></span>}{value.title}</p>
                                  <p className=''>Due {
                                    formattedDatetime
                                   
                                  }</p>
                                  
                                </div>
                                  <div className='mb-3'>
                                    {(value.works.length>0)?value.works.map((val, index)=>{
                                        return (
                                            <div className='file mb-2' key={index}>
                                                {val.slice(6,)}
                                            </div>
                                        )
                                    }):<></>}

                                  </div>
                                <div>
                                  <p className='task_description'>{value.description}</p>
                                    <div className='mb-3'>
                                        <div>
                                            <label className='mr-3'>Add Work</label>
                                            <input type='file' onChange={(e)=>{
                                                setFile(e.target.files[0])
                                                setTask(value.title)
                                            }}  />
                                        </div>
                                        {(err && task==value.title)?<p style={{color: 'red'}}>{err}</p>:<></>}
                                        {/* <button onClick={}>Upload</button> */}
                                    </div>
                                  <div className='d-flex justify-content-between'>
                                  <p className=''>Posted {
                                    formattedDatetime2
                                   
                                  }</p>
                                  </div>
                                  <button className='taskDues' onClick={submitWork.bind(null, value.title)} >Submit</button>
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

export default StudentDashboard