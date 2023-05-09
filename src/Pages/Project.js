import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { loginContext } from '../App'
import { get_pdf, get_token, view_projects } from '../Utils/services'
import { faCircleCheck, faFile, faHourglassEnd, faMultiply } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Project() {
    const params = useParams()
    console.log(params.str)
    const title = params.str
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [user] = useContext(loginContext)
    const [file, setFile] = useState()
    const [project, setProject] = useState()
    let datetime;

    useEffect(()=>{
        if (loading){
          if(user && user=="guide"){
            navigate('/dashboardg')
          }else if(user){
            view_projects(title).then((results)=>{
                console.log(results.data)
                setProject(results.data)
                setLoading(false)
            })
            
          }else if(!get_token()){
            navigate('/login')
          }
        }
        
      }, [user])

      if(project){

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
                                  {project.tasks.length>0?project.tasks.map((value, index)=>{
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
                                          <p>{value.score_obtained}/{value.max_score}</p>
                                          <div className='mb-3'>
                                            {(value.works.length>0)?value.works.map((val, index)=>{
                                                return (
                                                  <button className='file mb-2 mr-2' key={index} onClick={()=>{
                                                    get_pdf(project.title, value.title, val).then((results)=>{
                                                      const fileData = new Blob([results.data]);
                                                      window.scrollTo(0,0)
                                                      setFile(fileData) 
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
                                          <div className='d-flex justify-content-between'>
                                          <p className=''>Posted {
                                            formattedDatetime2
                                           
                                          }</p>
                                          </div>
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
        
                                          <iframe src={URL.createObjectURL(file)} width="100%" height="100%" />
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

export default Project