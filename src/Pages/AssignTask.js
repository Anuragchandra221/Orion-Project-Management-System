import React, { useState, useEffect } from 'react'
import DashSideBar from '../Components/DashSideBar'
import './CSS/AddCoordinator.css'
import { create_guide } from '../Utils/services'
import './CSS/Dashboard.css'
import { get_token, update_token } from '../Utils/services'
import { useNavigate } from 'react-router-dom'
import { set_user } from '../Utils/services'
import jwt_decode from "jwt-decode";
import { create_task } from '../Utils/services'
import { get_project } from '../Utils/services'

function AssignTask() {
    const time = 9*60*1000

    const [err, setErr] = useState()
    const [load, setLoad] = useState(false)
    const [loading, setLoading] = useState(true)
    const [account_type, setAccountType] = useState('')
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [date, setDate] = useState()
    const [due_time, setDueTime] = useState()
    const [project, setProject] = useState()

    const navigate = useNavigate()

    useEffect(()=>{
        if(account_type!=='' && account_type!=="guide"){
            navigate("/dashboard")
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
          setLoading(false)
          get_project().then((results)=>{
            setProject(results.data)
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

    const create = ()=>{
        setLoad(true)
        // 2020-08-04T00:00:00Z
        const new_due = date+'T'+due_time+"Z"
        console.log(title, description, new_due)
        create_task(project.title, title, description, new_due).then((results)=>{
            if(results.data.msg){
                navigate('/dashboardg')
            }else{
                setLoad(false)
                setErr(results.data.err)
            }
        })
    }

  return (
    <div className='addcoordinator d-flex'>
        <div className='dashmain'>
            <div className='addcoo mt-5 mx-1 mx-lg-0 ml-lg-3 mb-4'>
                <div className='d-flex justify-content-between px-3'>
                        <h3>Add New Task</h3>
                    
                </div>
                <div className='w-100 addcoodiv px-3 py-3 mt-3 mx-auto'>
                    <div className='d-flex flex-wrap w-100 justify-content-start  mt-4 mx-auto '>
                        <div className='mt-4 addcooitem'>
                            <p className='mb-1'>Task Title</p>
                            <input type="text" placeholder='Eg. Assignment 1' onChange={(e)=>{
                                setTitle(e.target.value)
                            }} />
                        </div>
                        <div className='mt-4 addcooitem'>
                            <p className='mb-1'>Task Description</p>
                            <input type="text" placeholder='Description' onChange={(e)=>{
                                setDescription(e.target.value)
                            }} />
                        </div>
                        <div className='mt-4 addcooitem'>
                            <p className='mb-1'>Due Date</p>
                            <input type="date" placeholder='Due date' onChange={(e)=>{
                                setDate(e.target.value)
                            }} />
                        </div>
                        <div className='mt-4 addcooitem'>
                            <p className='mb-1'>Time</p>
                            <input type="time" placeholder='Due date' onChange={(e)=>{
                                setDueTime(e.target.value)
                            }} />
                        </div>
                    </div>
                    <div className='w-100 d-flex justify-content-end mt-3'>
                        {err?<p className='mr-3 text-danger mb-0 mt-1'>{err}</p>:<></>}
                        <button className='mr-2 theButton py-1' style={load?{width:'14em', cursor:'not-allowed', backgroundColor: '#c0c0c0', border: 'none'}:{width:'14em', cursor:'pointer'}}  onClick={create} >Create New Task</button>
                        <button className='py-1 mr-0 mr-lg-3' style={{width:'10em', backgroundColor: '#c0c0c0', border: '2px solid #c0c0c0', borderRadius: '10px'}} onClick={()=>console.log(load)} >Cancel</button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default AssignTask