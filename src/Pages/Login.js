import React from 'react'
import './CSS/Login.css'

function Login() {
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
                    <input type="text" placeholder='Enter Email' className='loginInput' />
                </div>

                <label>Password</label>
                <div>
                    <input type="password" placeholder='Enter Password' className='loginInput' />
                </div>
                <p className='text-right mt-2'>Forgot Password?</p>
                <button className='loginBtn'>Sign In</button>
            </div>
        </div>
    </div>
  )
}

export default Login