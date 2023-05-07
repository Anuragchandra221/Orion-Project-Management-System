import React, { useState, useEffect, useContext } from 'react'
import './CSS/AddCoordinator.css'
import './CSS/Dashboard.css'
import { get_guide, get_token } from '../Utils/services'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { loginContext } from '../App'

function ViewGuide() {

    const [loading, setLoading] = useState(true)
    const [account_type, setAccountType] = useState('')
    const [gData, setGData] = useState()

    const navigate = useNavigate()
    const [user] = useContext(loginContext)

    useEffect(()=>{
        if((user && user!=="admin" && user !== "coordinator" && account_type !== "guide" )  ){
            navigate("/login")
        }
        if(!get_token()){
          navigate('/login')
        }else{
          get_guide().then((results)=>{
              setGData(results.data)
              setLoading(false)
          })
        }
      }, [user])

      if(loading){

      }else{
        return (
            <div className='dashboard d-flex' >
                <div className='dashmain mt-5'>
                <div className='view d-flex justify-content-start aligin-items-center py-3 mx-1 mx-lg-4'>
                    <div className='d-flex justify-content-between mx-3 mb-3'>
                        <div><h3 className='newHeading'>Newly added Guides</h3></div>
                        <div className='mr-2 mr-lg-0'>
                            <Link to="/add-coordinator"><button className='tableButton  px-1 px-lg-3 'style={{cursor: 'pointer'}} >Add New</button></Link>
                            
                        </div>
            
                    </div>
                    <div>
                        <div className='gridContainer mx-3'>
                            <div className='item heading'>Name</div>
                            <div className='item heading'>Register Number</div>
                            <div className='item heading'>Email</div>
                            <div className='item heading'>Phone</div>
                            <div className='item heading'>Action</div>
                                        {gData?gData.map((obj, index) => (
                                            <React.Fragment key={index}>
                                            {Object.values(obj).map((value, index) => (
                                                <div key={index} className="item">{value}</div>
                                            ))}
                                            <div className='item'>
                                                <button style={{border: 'none',backgroundColor: '#fff'}}><FontAwesomeIcon icon={faPen} /></button>
                                            </div>
                                            </React.Fragment>
                                        )):''}
                        </div>
                    </div>
                </div>
                </div>
                
            </div>
          )
      }
}

export default ViewGuide