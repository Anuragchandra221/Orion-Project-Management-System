import React, { useState, useEffect, useContext } from 'react'
import './CSS/AddCoordinator.css'
import {  edit_guide } from '../Utils/services'
import './CSS/Dashboard.css'
import { get_token, get_user } from '../Utils/services'
import { useNavigate, useParams } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { loginContext } from '../App'

function EditGuide() {
    const params = useParams()
    const [name, setName] = useState()
    const [load, setLoad] = useState(false)
    const [loading, setLoading] = useState(true)
    const [account_type, setAccountType] = useState('')
    const [user, setUser] = useState()

    const navigate = useNavigate()

    const [userr] = useContext(loginContext)

    useEffect(()=>{
        const paramEmail = params.str
        if(userr && userr!=="coordinator"){
            navigate("/dashboard")
        }
        if(!get_token()){
          navigate('/login')
        }else{
          setAccountType(jwt_decode(get_token()).account_type)
          get_user(paramEmail).then((results)=>{
              setUser(results.data[0])
              setLoading(false)
          }).catch((err)=>{
            console.log(err)
          })
        }
      }, [userr])

    const editCoordinator = ()=>{
        setLoad(true)
        edit_guide(user.name, user.email, user.dob, user.gender, user.number, user.register).then((results)=>{
                navigate("/dashboard")
            }).catch((err)=>{
                setLoad(false)
            })
    }
    
    if(!loading && user ){
        return (
            <div className='addcoordinator d-flex'>
                <div className='dashmain'>
                    <div className='addcoo mt-5 mx-1 mx-lg-0 ml-lg-3 mb-4'>
                        <div className='d-flex justify-content-between px-3'>
                                <h3>Edit Coordinator</h3>
                                <button className='theButton' style={{width:'9em'}}>Coordinator list</button>
                            
                        </div>
                        <div className='w-100 addcoodiv px-3 py-3 mt-3 mx-auto'>
                            <div className='d-flex flex-wrap w-100 justify-content-start  mt-4 mx-auto '>
                                <div className='mt-4 addcooitem'>
                                    <p className='mb-1'>Full Name</p>
                                    <input type="text" value={user.name} placeholder='Enter your name....' onChange={(e)=>{
                                        user.name=e.target.value
                                        setName(e.target.value)
                                    }} />
                                </div>
                                <div className='mt-4 addcooitem'>
                                    <p className='mb-1'>Gender</p>
                                    <select style={{width: '98%', backgroundColor: '#fff', height: '2em'}} value={user.gender} onChange={(e)=>{
                                        user.gender=e.target.value
                                        setName(e.target.value)
                                    }} >
                                    <option value="Male">Male</option> 
                                    <option value="Female">Female</option> 
                                    </select>                        
                                </div>
                                <div className='mt-4 addcooitem'>
                                    <p className='mb-1'>Enter DOB</p>
                                    <input type="date" value={user.dob} placeholder='DOB' onChange={(e)=>{
                                        user.dob=e.target.value
                                        setName(e.target.value)
                                    }} />
                                </div>
                                <div className='mt-4 addcooitem'>
                                    <p className='mb-1'>Email Address</p>
                                    <input type="email" value={user.email} placeholder='Enter your email...' onChange={(e)=>{
                                        user.email=e.target.value
                                        setName(e.target.value)
                                    }} />
                                </div>
                                <div className='mt-4 addcooitem'>
                                    <p className='mb-1'>Register Number</p>
                                    <input type="text" value={user.register}  placeholder='Enter your register number...' onChange={(e)=>{
                                        user.register=e.target.value
                                        setName(e.target.value)
                                    }} />
                                </div>
                                <div className='mt-4 addcooitem'>
                                    <p className='mb-1'>Phone number</p>
                                    <input type="number" value={user.number} placeholder='Enter your number' onChange={(e)=>{
                                        user.number=e.target.value
                                        setName(e.target.value)
                                    }} />
                                </div>
                            </div>
                            <div className='w-100 d-flex justify-content-end mt-3'>
                                <button className='mr-2 theButton py-1' style={load?{width:'14em', cursor:'not-allowed', backgroundColor: '#c0c0c0', border: 'none'}:{width:'14em', cursor:'pointer'}}  onClick={editCoordinator} >Edit</button>
                                <button className='py-1 mr-0 mr-lg-3' style={{width:'10em', backgroundColor: '#c0c0c0', border: '2px solid #c0c0c0', borderRadius: '10px'}} onClick={()=>console.log(load)} >Cancel</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
          )
    }

}

export default EditGuide