import React, { useState, useEffect, useContext } from 'react'
import './CSS/AddCoordinator.css'
import { get_guide, get_student, start_project } from '../Utils/services'
import './CSS/Dashboard.css'
import './CSS/StartProject.css'
import { get_token } from '../Utils/services'
import { useNavigate } from 'react-router-dom'
import { loginContext } from '../App'

function StartProject() {

    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [std1, setStd1] = useState()
    const [std2, setStd2] = useState()
    const [std3, setStd3] = useState()
    const [std4, setStd4] = useState()
    const [guide, setGuide] = useState()
    const [err, setErr] = useState()
    const [data, setData] = useState('')
    const [student, setStudent] = useState('')
    const [load, setLoad] = useState(false)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    const [user] = useContext(loginContext)

    useEffect(()=>{
        if(user&& user!=="coordinator"){
            navigate("/dashboard")
        }
        if(!get_token()){
          navigate('/login')
        }else{
          get_guide().then((results)=>{
            setData(results.data)
            // console.log(results.data)
          })
          get_student().then((results)=>{
            setStudent(results.data)
            setLoading(false)
          })
        }
      }, [user])

    const create = ()=>{
        setLoad(true)
        if(name&&description&&guide&&  std1&& std2&& std3&& std4){
            start_project(name, description, guide, std1, std2, std3, std4).then((results)=>{
                console.log(results.data)
                if(results.data.err){
                    setErr(results.data.err)
                    setLoad(false)
                }else{
                    navigate("/dashboard")
                }
            }).catch((err)=>{
                setLoad(false)
            })
        }else{
            setErr("Fill all the fields")
            setLoad(false)
        }
        
    }

  return (
    <div className='addcoordinator d-flex'>
        <div className='dashmain'>
            <div className='addcoo mt-5 mx-1 mx-lg-0 ml-lg-3 mb-4'>
                <div className='d-flex justify-content-between px-3'>
                        <h3>Start Project</h3>
                    
                </div>
                <div className='w-100 addcoodiv px-3 py-3 mt-3 mx-auto'>
                    <div className='d-flex flex-wrap project w-100 justify-content-start  mt-4 mx-auto '>
                        <div className='mt-4 projectitem'>
                            <p className='mb-1'>Title</p>
                            <input type="text" placeholder='Title of the Project....' onChange={(e)=>{
                                setName(e.target.value)
                            }} />
                        </div>
                        <div className='mt-4 projectitem'>
                            <p className='mb-1'>Description</p>
                            <textarea rows={10} placeholder='Description on the project...' cols={5} onChange={(e)=>{
                                setDescription(e.target.value)
                            }}/>
                        </div>
                    </div>
                    
                    <div className='d-flex flex-wrap  w-100 justify-content-start  mt-4 mx-auto '>
                            <div className='mt-4 addcooitem'>
                                <p className='mb-1'>Guide</p>
                                <select style={{width: '98%', backgroundColor: '#fff', height: '2em'}}   onClick={(e)=>{
                                    setGuide(e.target.value)
                                }} >
                                    <option selected>Select</option>
                                    {data?data.map((value, index)=>{
                                        return (
                                        <option key={index} value={value.email}>{value.name}</option>
                                        )
                                    }):''}
                                 
                                </select>                        
                            </div>

                            <div className='mt-4 addcooitem'>
                                <p className='mb-1'>Student 1</p>
                                <select style={{width: '98%', backgroundColor: '#fff', height: '2em'}}  onClick={(e)=>{
                                    console.log('hih')
                                    setStd1(e.target.value)
                                }} >
                                    <option selected>Select</option>
                                {student?student.map((value, index)=>{
                                        return (
                                        <option key={index} value={value.email}>{value.name}</option>
                                        )
                                    }):''}
                                </select>                        
                            </div>

                            <div className='mt-4 addcooitem'>
                                <p className='mb-1'>Student 2</p>
                                <select style={{width: '98%', backgroundColor: '#fff', height: '2em'}}  onClick={(e)=>{
                                    setStd2(e.target.value)
                                }} >
                                    <option selected>Select</option>
                                {student?student.map((value, index)=>{
                                        return (
                                        <option key={index} value={value.email}>{value.name}</option>
                                        )
                                    }):''}
                                </select>                        
                            </div>

                            <div className='mt-4 addcooitem'>
                                <p className='mb-1'>Student 3</p>
                                <select style={{width: '98%', backgroundColor: '#fff', height: '2em'}}   onClick={(e)=>{
                                    setStd3(e.target.value)
                                }} >
                                    <option selected>Select</option>
                                {student?student.map((value, index)=>{
                                        return (
                                        <option key={index} value={value.email}>{value.name}</option>
                                        )
                                    }):''}
                                </select>                        
                            </div>

                            <div className='mt-4 addcooitem'>
                                <p className='mb-1'>Student 4</p>
                                <select style={{width: '98%', backgroundColor: '#fff', height: '2em'}}   onClick={(e)=>{
                                    setStd4(e.target.value)
                                }} >
                                    <option selected>Select</option>
                                {student?student.map((value, index)=>{
                                        return (
                                        <option key={index} value={value.email}>{value.name}</option>
                                        )
                                    }):''}
                                </select>                        
                            </div>

                            <div className='w-100 d-flex justify-content-end mt-3 pb-3'>
                                {err?<p className='mr-3 text-danger mb-0 mt-1'>{err}</p>:<></>}
                                <button className='mr-2 theButton py-1' style={load?{width:'14em', cursor:'not-allowed', backgroundColor: '#c0c0c0', border: 'none'}:{width:'14em', cursor:'pointer'}}  onClick={create} >Create Project</button>
                                <button className='py-1 mr-0 mr-lg-3' style={{width:'10em', backgroundColor: '#c0c0c0', border: '2px solid #c0c0c0', borderRadius: '10px', cursor: 'pointer'}} onClick={()=> navigate(-1)} >Cancel</button>
                            </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default StartProject