import React from 'react'
import DashSideBar from '../Components/DashSideBar'
import './CSS/AddCoordinator.css'

function AddCoordinator() {
  return (
    <div className='addcoordinator d-flex'>
        <div>
            <DashSideBar/>
        </div>
        <div className='dashmain'>
            <div className='addcoo mt-5 ml-3'>
                <div className='w-100 d-flex justify-content-between'>
                        <h3>Add Coordinator</h3>
                        <button className='theButton' style={{width:'9em'}}>Coordinator list</button>
                    
                </div>
                <div className='w-100 addcoodiv px-3 py-3 mt-3'>
                    <div className='d-flex flex-wrap w-100 justify-content-between  mt-4 '>
                        <div className='mt-4 addcooitem'>
                            <p className='mb-1'>Full Name</p>
                            <input type="text" />
                        </div>
                        <div className='mt-4 addcooitem'>
                            <p className='mb-1'>Gender</p>
                            <input type="text" />
                        </div>
                        <div className='mt-4 addcooitem'>
                            <p className='mb-1'>Enter DOB</p>
                            <input type="date" />
                        </div>
                        <div className='mt-4 addcooitem'>
                            <p className='mb-1'>Email Address</p>
                            <input type="email" />
                        </div>
                        <div className='mt-4 addcooitem'>
                            <p className='mb-1'>Phone number</p>
                            <input type="number" />
                        </div>
                        <div className='mt-4 addcooitem'>
                            <p className='mb-1'>Password</p>
                            <input type="password" />
                        </div>
                        <div className='mt-4 addcooitem'>
                            <p className='mb-1'>Confirm Password</p>
                            <input type="password" />
                        </div>
                    </div>
                    <div className='w-100 d-flex justify-content-end mt-3'>
                        <button className='mr-2 theButton py-1' style={{width:'14em'}}>Create Account</button>
                        <button className='py-1' style={{width:'10em'}}>Cancel</button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default AddCoordinator