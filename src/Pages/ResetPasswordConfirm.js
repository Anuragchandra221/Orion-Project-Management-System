import React, { useEffect, useState } from 'react'
import { get_token, password_reset_confirm } from '../Utils/services'
import { useNavigate } from 'react-router-dom'

function ResetPasswordConfirm() {

    const [mail, setMail] = useState()
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState()
    const [err, setErr] = useState()

    const navigate = useNavigate()

    useEffect(()=>{
        if(get_token()){
          navigate('/login')
        }
      }, [loading])
    const change_password = ()=>{
        setLoading(true)
        password_reset_confirm(mail).then((result)=>{
            if(result.data.msg){
                setMsg("Check your inbox")
            }else{
                setErr("Email doesnt exist")
            }
        })
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
                {msg?<div>
                        <p>{msg}</p>
                    </div>:
                    <div>
                        <label>Enter registered email</label>
                        <div className='mb-3'>
                            <input type="text" placeholder='Enter email' className='loginInput' onChange={(e)=>{
                                setMail(e.target.value)
                            }} />
                        </div>
                    </div>
                    }
                
                {err?<p className='mt-3 ' style={{color: 'red'}}>{err}</p>:<></>}
                <button className='loginBtn mt-2' style={loading?{cursor: 'not-allowed', backgroundColor: '#c0c0c0', border: 'none'}:{cursor:'pointer'}} onClick={change_password}>Send Mail</button>
            </div>
        </div>
    </div>
  )
}

export default ResetPasswordConfirm