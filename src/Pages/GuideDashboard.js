import React, { useState, useEffect, useContext } from 'react'
import './CSS/AddCoordinator.css'
import './CSS/Dashboard.css'
import {  file, get_pdf, get_project, get_task, get_token, give_marks } from '../Utils/services'
import { useNavigate, Link } from 'react-router-dom'
import './CSS/GuideDashboard.css'
import { loginContext } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCross, faFile, faHourglassEnd, faMultiply } from '@fortawesome/free-solid-svg-icons'

function GuideDashboard() {

    const [loading, setLoading] = useState(true)
    const [project, setProject] = useState()
    const [tasks, setTasks] = useState()
    let datetime;
    const [file, setFile] = useState()
    const [marks, setMarks] = useState()
    const [title, setTitle] = useState()
    const [load, setLoad] = useState(false)

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
      }, [user])

      const mark = (task)=>{
        setLoad(true)

        if(title && task){
          if(title==task){
            if(marks && marks<=100){
              give_marks(marks, task, project.title).then((results)=>{
                setLoad(false)
              })
            }
          }
        }
      }

      if(loading){

      }else{
        return (
            <div className='dashboard d-flex' >
                <div className='dashmain mt-5'>
                <div className='text-righleftt p-2 m-2 mb-0 pb-0 ml-3' style={{fontSize: 'larger', fontWeight: 'bold'}}>
                  <p>Guide Dashboard</p>
                </div>
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
                                  <div>
                                    <span className='mr-2'><input type="number" defaultValue={value.score_obtained} onChange={(e)=>{
                                      setMarks(e.target.value)
                                      setTitle(value.title)
                                    }} className='scoreInput mr-1' />/{value.max_score}</span>
                                    <span><button className='markButton' style={load?{cursor:'not-allowed', backgroundColor: '#c0c0c0', border: 'none'}:{ cursor:'pointer'}} onClick={(e)=>{
                                      mark(value.title)
                                    }} >Mark</button></span>
                                  </div>
                                </div>
                                  <p className=''>Due {
                                    formattedDatetime
                                   
                                  }</p>
                                  <div className='mb-3'>

                                    {(value.works.length>0)?value.works.map((val, index)=>{
                                      // console.log(val)
                                        return (
                                            <button className='file mb-2 mr-2' key={index} onClick={()=>{
                                              get_pdf(project.title, value.title, val).then((results)=>{
                                                window.scrollTo(0,0)
                                                setFile(results.data.file) 
                                                document.body.style.overflow = "hidden"
                                              })
                                            }}>
                                                <FontAwesomeIcon icon={faFile} /> {val.slice(6,)}
                                            </button>
                                        )
                                    }):<></>}

                                  </div>
                                <div>
                                  <p className='task_description'>{value.description}</p>
                                </div>
                              </div>
                            )
                          }):''}
                          {file?<div  className='files'>
                            <div className='text-right'>
                            <button onClick={()=>{
                              setFile()
                              document.body.style.overflow = "visible"
                            }} className='closeButton' ><FontAwesomeIcon icon={faMultiply} /></button>
                            </div>
                            
                            <div>

                                  <iframe src={file} width="100%" height="100%" />
                                </div>
                          </div>:<></>}
                        </div>
                    </div>
                </div>
                </div>
                
            </div>
          )
      }
}

export default GuideDashboard