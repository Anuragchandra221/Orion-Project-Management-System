import React, { useEffect, useState } from 'react'
import { get_token, password_reset } from '../Utils/services'
import { Link, useNavigate, useParams } from 'react-router-dom'
import jwt_decode from "jwt-decode";

function ResetPassword() {

    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [err, setErr] = useState()
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState()
    const params = useParams()
    const email = jwt_decode(params.str).email
    const navigate = useNavigate()

    useEffect(()=>{
        if(!get_token()){
          navigate('/login')
        }
      }, [loading])

    const change_password = ()=>{
        setLoading(true)
        if(password==confirmPassword){
            password_reset(email,password).then((results)=>{
                setMsg("Password Changed Successfully...")
            })
        }else{
            setErr("Passwords do not match")
            setLoading(false)
        }
    }
  return (
    <div className='mx-auto d-flex justify-content-center align-items-center login '>
        <div className='text-center loginImg' >
            <div className='filler' >dfs</div>
            <img  src={require('.././assets/images/students.png')} className='login-img ' />
            <div className='filler'>dfs</div>
        </div>
        <div className='w-100 pt-3 mt-lg-0 py-4 loginwhite'>
            <div className=' d-flex justify-content-center align-items-center login2nd'>
                <h2 className='orion '>Orion</h2>
                <p>Project Management System</p>
            </div>
            <div className=' mx-sm-3 mx-md-3  loginDiv mx-auto'>
                <h4 className='loginHeading mb-3'>Reset Password</h4>
                {msg?
                    <>
                        <p>{msg}</p>
                        <Link to="/login" ><button className='loginBtn mt-3' style={{cursor:'pointer'}}>Login</button></Link>
                    </>
                :
                <>
                    <label>New Password</label>
                <div className='mb-3'>
                    <input type="password" placeholder='New Password' className='loginInput' onChange={(e)=>{
                        setPassword(e.target.value)
                    }} />
                </div>

                <label>Confirm Password</label>
                <div>
                    <input type="password" placeholder='Confirm Password' className='loginInput' onChange={(e)=>{
                        setConfirmPassword(e.target.value)
                    }} />
                </div>
                {err?<p className='mt-3 ' style={{color: 'red'}}>{err}</p>:<></>}
                <button className='loginBtn mt-3' style={loading?{cursor: 'not-allowed', backgroundColor: '#c0c0c0', border: 'none'}:{cursor:'pointer'}} onClick={change_password}>Change Password</button>
                </>
                }
                
            </div>
        </div>
    </div>
  )
}

export default ResetPassword