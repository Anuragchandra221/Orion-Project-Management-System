import React, { useState, useEffect, useContext } from 'react'
import './CSS/AddCoordinator.css'
import './CSS/Dashboard.css'
import { edit_tasks, get_token, retrieve_tasks } from '../Utils/services'
import { useNavigate, useParams } from 'react-router-dom'
import { create_task } from '../Utils/services'
import { get_project } from '../Utils/services'
import { loginContext } from '../App'

function EditTask() {
    const [err, setErr] = useState()
    const [load, setLoad] = useState(false)
    const [loading, setLoading] = useState(true)
    const [account_type, setAccountType] = useState('')
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [date, setDate] = useState()
    const [due_time, setDueTime] = useState()
    const [values, setValues] = useState()
    const [due, setDue] = useState()

    const navigate = useNavigate()
    const [user] = useContext(loginContext)
    const {project ,task} = useParams()
    console.log(project, task)
    
    useEffect(()=>{
        if(user && user!=="guide"){
            navigate("/dashboard")
        }
        if(!get_token()){
          navigate('/login')
        }else{
            retrieve_tasks(project, task).then((results)=>{

                console.log(results.data)
                setTitle(results.data.title)
                setDescription(results.data.description)

                const dateTime = new Date(results.data.due_date);
                const year = dateTime.getFullYear();
                const month = dateTime.getMonth() + 1; // Adding 1 to adjust for zero-based month
                const day = dateTime.getDate();
                const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
                setDate(formattedDate)
                const hours = dateTime.getHours();
                const minutes = dateTime.getMinutes();
                const seconds = dateTime.getSeconds();

                const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
                setDue({"date":formattedDate,"time":formattedTime})
                setDueTime(formattedTime)
                setValues(results.data)
                setLoading(false)
            })
        }
      }, [user])

    const create = ()=>{
        setLoad(true)
        // 2020-08-04T00:00:00Z
        const new_due = date+'T'+due_time+"Z"
        console.log(title, description, new_due)
        edit_tasks(project, task, title, description, new_due).then((results)=>{
            if(results.data.msg){
                navigate('/dashboardg')
            }else{
                setLoad(false)
                setErr(results.data.err)
            }
        }).catch((err)=>{
            setLoad(false)
        })
    }
if(!loading){

    return (
      <div className='addcoordinator d-flex'>
          <div className='dashmain'>
              <div className='addcoo mt-5 mx-1 mx-lg-0 ml-lg-3 mb-4'>
                  <div className='d-flex justify-content-between px-3'>
                          <h3>Update Task</h3>
                      
                  </div>
                  <div className='w-100 addcoodiv px-3 py-3 mt-3 mx-auto'>
                      <div className='d-flex flex-wrap w-100 justify-content-start  mt-4 mx-auto '>
                          <div className='mt-4 addcooitem'>
                              <p className='mb-1'>Task Title</p>
                              <input type="text" placeholder='Eg. Assignment 1' defaultValue={values.title} onChange={(e)=>{
                                  setTitle(e.target.value)
                              }} />
                          </div>
                          <div className='mt-4 addcooitem'>
                              <p className='mb-1'>Task Description</p>
                              <input type="text" placeholder='Description' defaultValue={values.description} onChange={(e)=>{
                                  setDescription(e.target.value)
                              }} />
                          </div>
                          <div className='mt-4 addcooitem'>
                              <p className='mb-1'>Due Date</p>
                              <input type="date" placeholder='Due date ' defaultValue={due.date} onChange={(e)=>{
                                  setDate(e.target.value)
                              }} />
                          </div>
                          <div className='mt-4 addcooitem'>
                              <p className='mb-1'>Time</p>
                              <input type="time" placeholder='Due date' defaultValue={due.time} onChange={(e)=>{
                                  setDueTime(e.target.value)
                              }} />
                          </div>
                      </div>
                      <div className='w-100 d-flex justify-content-end mt-3'>
                          {err?<p className='mr-3 text-danger mb-0 mt-1'>{err}</p>:<></>}
                          <button className='mr-2 theButton py-1' style={load?{width:'14em', cursor:'not-allowed', backgroundColor: '#c0c0c0', border: 'none'}:{width:'14em', cursor:'pointer'}}  onClick={create} >Update Task</button>
                          <button className='py-1 mr-0 mr-lg-3' style={{width:'10em', backgroundColor: '#c0c0c0', border: '2px solid #c0c0c0', borderRadius: '10px', cursor: 'pointer'}} onClick={()=> navigate(-1)} >Cancel</button>
                      </div>
                  </div>
              </div>
              
          </div>
      </div>
    )
}
}

export default EditTask