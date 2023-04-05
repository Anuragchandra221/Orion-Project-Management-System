import React, { useState } from 'react'
import DashSideBar from '../Components/DashSideBar'
import './CSS/AddCoordinator.css'
import { create_coordinator } from '../Utils/services'
import { useNavigate } from 'react-router-dom'

function AddCoordinator() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [number, setNumber] = useState()
    const [dob, setDob] = useState()
    const [gender, setGender] = useState("Male")
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    const navigate = useNavigate()

    const create = ()=>{
        console.log("hih")
        if(name && email && dob && password && confirmPassword && gender && number){
            create_coordinator(name, email, dob, gender, number).then((results)=>{
                navigate("/dashboard")
            }).catch((err)=>{
            })
        }
    }

  return (
    <div className='addcoordinator d-flex'>
        <div>
            <DashSideBar/>
        </div>
        <div className='dashmain'>
            <div className='addcoo mt-5 ml-3 mb-4'>
                <div className='w-100 d-flex justify-content-between'>
                        <h3>Add Coordinator</h3>
                        <button className='theButton' style={{width:'9em'}}>Coordinator list</button>
                    
                </div>
                <div className='w-100 addcoodiv px-3 py-3 mt-3'>
                    <div className='d-flex flex-wrap w-100 justify-content-between  mt-4 '>
                        <div className='mt-4 addcooitem'>
                            <p className='mb-1'>Full Name</p>
                            <input type="text" placeholder='Enter your name....' onChange={(e)=>{
                                setName(e.target.value)
                            }} />
                        </div>
                        <div className='mt-4 addcooitem'>
                            <p className='mb-1'>Gender</p>
                            <select style={{width: '98%', backgroundColor: '#fff', height: '2em'}} value={gender} onChange={(e)=>{
                                setGender(e.target.value)
                            }} >
                            <option value="Male">Male</option> 
                            <option value="Female">Female</option> 
                            </select>                        
                        </div>
                        <div className='mt-4 addcooitem'>
                            <p className='mb-1'>Enter DOB</p>
                            <input type="date" placeholder='DOB' onChange={(e)=>{
                                setDob(e.target.value)
                            }} />
                        </div>
                        <div className='mt-4 addcooitem'>
                            <p className='mb-1'>Email Address</p>
                            <input type="email" placeholder='Enter your email...' onChange={(e)=>{
                                setEmail(e.target.value)
                            }} />
                        </div>
                        <div className='mt-4 addcooitem'>
                            <p className='mb-1'>Phone number</p>
                            <input type="number" placeholder='Enter your number' onChange={(e)=>{
                                setNumber(e.target.value)
                            }} />
                        </div>
                        <div className='mt-4 addcooitem'>
                            <p className='mb-1'>Password</p>
                            <input type="password" placeholder='Enter your password' onChange={(e)=>{
                                setPassword(e.target.value)
                            }} />
                        </div>
                        <div className='mt-4 addcooitem'>
                            <p className='mb-1'  >Confirm Password</p>
                            <input type="password" placeholder='Confirm password' onChange={(e)=>{
                                setConfirmPassword(e.target.value)
                            }} />
                        </div>
                    </div>
                    <div className='w-100 d-flex justify-content-end mt-3'>
                        <button className='mr-2 theButton py-1' style={{width:'14em', cursor:'pointer'}} onClick={create} >Create Account</button>
                        <button className='py-1' style={{width:'10em'}}>Cancel</button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default AddCoordinator