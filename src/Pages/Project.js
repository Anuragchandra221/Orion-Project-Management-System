import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { loginContext } from '../App'
import { get_old_project_by_year, get_pdf, get_token, view_project_names, view_projects } from '../Utils/services'
import { faCircleCheck, faDiagramProject, faFile, faHourglassEnd, faMultiply, faProjectDiagram, faToolbox } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Project() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [file, setFile] = useState()
    const [user] = useContext(loginContext)
    const [projects, setProjects] = useState()
    const [projects2, setProjects2] = useState()
    let datetime = new Date()
    const year = (datetime.getFullYear()-(datetime.getFullYear()%4))
    const [selectedYear, setSelectedYear] = useState(year)


    useEffect(()=>{
        if (loading){
          if(user && (user=="guide" || user=="student")){
            navigate('/dashboardg')
          }else if(user){
            view_project_names().then((results)=>{
              console.log(results.data)
              setProjects(results.data)
            })
            
          }else if(!get_token()){
            navigate('/login')
          }
        }
        if(selectedYear!==year){
          get_old_project_by_year(selectedYear).then((results)=>{
            console.log(results.data)
            setProjects2(results.data)
          })
        }

        
      }, [user, selectedYear])

      if(projects){

          return (
            <div className='dashboard d-flex' >
                        <div className='dashmain mt-5'>
                        <div className='view py-3 mx-1 mx-lg-4 mx-3 mb-3'>
                        <h5 className='mx-1 mx-lg-4 mx-3 mb-3 heading '>Projects</h5>
                        <div className='mx-1 mx-lg-4 mx-3 d-flex'>
                          <button onClick={()=>{
                            setSelectedYear(year)
                          }} style={{cursor: 'pointer'}} className={selectedYear==year?'yearBtn mx-2 active':'yearBtn mx-2'}>{year}</button>
                          <button onClick={()=>{
                            setSelectedYear(year-1)
                          }} style={{cursor: 'pointer'}} className={selectedYear==year-1?'yearBtn mx-2 active':'yearBtn mx-2'}>{year-1}</button>
                          <button onClick={()=>{
                            setSelectedYear(year-2)
                          }} style={{cursor: 'pointer'}} className={selectedYear==year-2?'yearBtn mx-2 active':'yearBtn mx-2'}>{year-2}</button>
                          <button onClick={()=>{
                            setSelectedYear(year-3)
                          }} style={{cursor: 'pointer'}} className={selectedYear==year-3?'yearBtn mx-2 active':'yearBtn mx-2'}>{year-3}</button>
                        </div>
                        {selectedYear==year?
                        
                        <div className='mx-1 mx-lg-4 mx-3 mt-3'>
                          {projects?projects.map((project, index)=>{
                            return (
                              <div key={index} className=' mx-1 mx-lg-4 mx-3 '>
                                    <div className='d-flex align-items-center items   ' style={{color: '#000'}} ><FontAwesomeIcon icon={faToolbox} /><p className=' ml-2 mb-0'>{project?project.title:''}</p></div>
                                  
                                  <div><p className='newHeading ml-4 item mb-2'> {project?project.description:''}</p></div>
                                  <div><p className='newHeading ml-4 item mb-2'>People</p></div>
                                  <ol>
                                    {project.users?project.users.map((user, index)=>{
                                      return (
                                          <li key={index} className=' mx-1 mx-lg-4 mx-3 '>{user.name} {user.account_type=="guide"?`- ${user.account_type}`:''}</li>
                                      )
                                    }):<></>}
                                  </ol>
                                </div>
                            )
                          }):<></>}
                        </div>:
                        <div className='mx-1 mx-lg-4 mx-3 mt-3'>
                        {projects2?projects2.map((project, index)=>{
                          return (
                            <div key={index} className=' mx-1 mx-lg-4 mx-3 '>
                                  <div className='d-flex align-items-center items   ' style={{color: '#000'}} ><FontAwesomeIcon icon={faToolbox} /><p className=' ml-2 mb-0'>{project?project.title:''}</p></div>
                                
                                <div><p className='newHeading ml-4 item mb-2'> {project?project.description:''}</p></div>
                                <div><p className='newHeading ml-4 item mb-2'>People</p></div>
                                <ol>
                                <li className=' mx-1 mx-lg-4 mx-3 '>{project.guide} - guide</li>
                                <li className=' mx-1 mx-lg-4 mx-3 '>{project.std1}</li>
                                <li className=' mx-1 mx-lg-4 mx-3 '>{project.std2}</li>
                                <li className=' mx-1 mx-lg-4 mx-3 '>{project.std3}</li>
                                <li className=' mx-1 mx-lg-4 mx-3 '>{project.std4}</li>
                                </ol>
                                <button className='file mb-2 mr-2' key={index} onClick={()=>{
                                  setFile(project.files) 
                                  window.scrollTo(0,0)
                                  document.body.style.overflow = "hidden"
                                    }}>{project.files.slice(12,)}</button>
                              </div>
                          )
                        }):<></>}
                      </div>
                      }
                      {file?<div  className='files'>
                        <div className='text-right'>
                        <button onClick={()=>{
                          setFile()
                          document.body.style.overflow = "visible"
                        }} className='closeButton' ><FontAwesomeIcon icon={faMultiply} /></button>
                        </div>
                        
                        <div>

                              <iframe src={file} type="application/pdf" width="100%" height="100%" />
                            </div>
                      </div>:<></>}
                      </div>
                        </div>
                        
                    </div>
          )
      }
}

export default Project