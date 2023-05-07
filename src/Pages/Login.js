import React, { useContext, useEffect, useState } from 'react'
import './CSS/Login.css'
import { get_token, login, set_user } from '../Utils/services'
import { useNavigate, Link } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { loginContext } from '../App'

function Login() {

    const [user, setUser] = useContext(loginContext)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [err, setErr] = useState()

    const navigate = useNavigate()

    useEffect(()=>{
        if(user){
            if((user=="admin" || user=="coordinator" )  ){
                navigate("/dashboard")
            }else if(user=="guide"){
                navigate("/dashboardg")
            }else{
                navigate("/dashboards")
            }
        }
        if(!get_token()){
          navigate('/login')
        }
      }, [user])

    const signin = ()=>{
        if(email && password){
            login(email, password).then((results)=>{
                set_user(results.data.access, results.data.refresh)
                setUser(jwt_decode(results.data.access).account_type)
                setErr()
                if(jwt_decode(results.data.access).account_type=="admin" || jwt_decode(results.data.access).account_type=="coordinator"){
                    navigate('/dashboard')
                }else if(jwt_decode(results.data.access).account_type=="guide"){
                    navigate('/dashboardg')
                }else if(jwt_decode(results.data.access).account_type=="student"){
                    navigate('/dashboards')
                }
            }).catch((err)=>{
                setErr("Invalid Username or Password")
            })
        }else{
            setErr("Fill in the details")
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
                <h4 className='loginHeading mb-3'>User Login</h4>
                <label>Enter Email</label>
                <div className='mb-3'>
                    <input type="text" placeholder='Enter Email' className='loginInput' onChange={(e)=>{
                        setEmail(e.target.value)
                    }} />
                </div>

                <label>Password</label>
                <div>
                    <input type="password" placeholder='Enter Password' className='loginInput' onChange={(e)=>{
                        setPassword(e.target.value)
                    }} />
                </div>
                {err?<p className='mt-3 ' style={{color: 'red'}}>{err}</p>:<></>}
                <p className='text-right mt-2' style={{cursor: 'pointer'}}><Link to="/forgot_password">Forgot Password?</Link></p>
                <button className='loginBtn' style={{cursor: 'pointer'}} onClick={signin}>Sign In</button>
            </div>
        </div>
    </div>
  )
}

export default Login