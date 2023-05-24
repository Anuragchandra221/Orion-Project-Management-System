import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { get_old_pdf, get_old_project, get_token } from '../Utils/services'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faMultiply } from '@fortawesome/free-solid-svg-icons'

function GetProject() {
    const params = useParams()
    const [values, setValues] = useState()
    const [file, setFile] = useState()

    const navigate = useNavigate()
    useEffect(()=>{
      if(!get_token()){
        navigate('/login')
      }else{
          // navigate("")
      }
        const string = params.str
        get_old_project(string).then((results)=>{
            setValues(results.data)
        })
    },[])
if(values){
    return (
        <div className='dashboard d-flex' >
        <div className='dashmain mt-5'>
        <div className='view d-flex justify-content-start aligin-items-center py-3 mx-1 mx-lg-4'>
            <div className='d-flex justify-content-between mx-3 mb-3'>
              <div>
                <div><h3 className='projectHeading'>Project - {values.title}</h3></div>
                <div><h4 className='newHeading'> {values.description}</h4></div>
              </div>
            </div>
            <div>
                <div className='mx-3'>
                <button className='file mb-2 mr-2' onClick={()=>{
                                     get_old_pdf(values.title).then((results)=>{
                                      window.scrollTo(0,0)
                                      setFile(results.data.file) 
                                      document.body.style.overflow = "hidden"
                                    })
                                    }}>
                                        <FontAwesomeIcon icon={faFile} /> {values.files.slice(6,)}
                                    </button>
                                    <div><p className='newHeading ml-4 item mb-2'>People</p></div>
                                  <ol>
                                    <li className=' mx-1 mx-lg-4 mx-3 '>{values.guide} - guide</li>
                                    <li className=' mx-1 mx-lg-4 mx-3 '>{values.std1}</li>
                                    <li className=' mx-1 mx-lg-4 mx-3 '>{values.std2}</li>
                                    <li className=' mx-1 mx-lg-4 mx-3 '>{values.std3}</li>
                                    <li className=' mx-1 mx-lg-4 mx-3 '>{values.std4}</li>
                                  </ol>
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

export default GetProject