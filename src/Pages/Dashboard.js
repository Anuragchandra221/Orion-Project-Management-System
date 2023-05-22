import React, { useContext, useEffect, useState } from 'react'
import './CSS/Dashboard.css'
import DashboardCard from '../Components/DashboardCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faPersonChalkboard, faProjectDiagram, faUser } from '@fortawesome/free-solid-svg-icons'
import New from '../Components/New'
import { get_coordinator, get_count, get_guide, get_project, get_student, get_task, get_token, update_token, view_project_names, view_projects } from '../Utils/services'
import { Link, useNavigate } from 'react-router-dom'
import { CirclesWithBar } from 'react-loader-spinner'
import { loginContext } from '../App'

function Dashboard() {
  const navigate = useNavigate()
  const [no, setNo] = useState([])
  const [cData, setCData] = useState()
  const [gData, setGData] = useState()
  const [sData, setSData] = useState()
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState()

  const [user] = useContext(loginContext)
  

  useEffect(()=>{
    if (loading){
      if(user && user=="guide"){
        navigate('/dashboardg')
      }else if(user){
        get_count().then((results)=>{
          setNo(results.data.admin)
          setLoading(false)
        }).catch((err)=>{
          if(err.request.status == 401){
            localStorage.removeItem("token")
            localStorage.removeItem("refresh")
          }
        })
  
        get_coordinator().then((results)=>{
          setCData(results.data)
        })
  
        get_guide().then((results)=>{
          setGData(results.data)
        })

        view_project_names().then((results)=>{
          setProjects(results.data)
        })
        
        get_student().then((results)=>{
          setSData(results.data)
          setLoading(false)
        })
      }else if(!get_token()){
        navigate('/login')
      }
    }
    
  }, [user])

  if(user!='' && (user!="guide" && user!="student")){
    return (
      <div className='dashboard d-flex' >
        <div className='dashmain '>
        {user=="admin"?
          <div className='text-righleftt p-2 m-2 mb-0 pb-0 ml-3' style={{fontSize: 'larger', fontWeight: 'bold'}}>
          <p>Admin Dashboard</p>
        </div>
          :
          
          <div className='text-left p-2 m-2 mb-0 pb-0 ml-3' style={{fontSize: 'larger', fontWeight: 'bold'}}> 
            <p>Coordinator Dashboard</p>
          </div>}
          <div style={{position: 'relative'}}>
  
            {!loading?
            <div className='d-flex align-items-start mt-1 dashboardCard'>
            <DashboardCard name="Students" count={no[3]?no[3].count: 0} icon={<FontAwesomeIcon icon={faUser}/> } />
            <DashboardCard name="Coordinators" count={no[1]?no[1].count: 0} icon={<FontAwesomeIcon icon={faGauge}/> } />
            <DashboardCard name="Guides" count={no[2]?no[2].count: 0} icon={<FontAwesomeIcon icon={faPersonChalkboard}/> } />
          </div>
            :<div style={{ position: "absolute", top: "130%", left: "50%", transform: "" }}>
                <CirclesWithBar
                  height="80"
                  width="80"
                  radius="9"
                  color="#405189"
                  ariaLabel="loading"
                  wrapperStyle
                  wrapperClass
                />
            </div>}
          </div>
          
          {user=="coordinator"?
          <Link to="/startProject">
          <div className='text-right p-2 m-2'>
            <button className='theButton' style={{width:'9em', cursor: 'pointer'}}>Start Project</button>
          </div>
        </Link>
          :<></>}

          {
            user=="admin"?
            <Link to="/upload-old">
              <div className='text-right p-2 m-2'>
                <button className='theButton p-2' style={{ cursor: 'pointer'}}>Upload Old Projects</button>
              </div>
            </Link>
            :<></>
          }

          
          
          
          
          <div className='d-flex mt-3 newContainer'>
            <New name="Students" data={sData?sData:[]} account_type={user?user:''} />
            <New name="Guides" data={gData?gData:[]} account_type={user?user:''} />
            {user=="admin"?<New name="Coordinators" account_type={user} data={cData?cData:[]} />:<></>}
          </div>
            
            <div className='view py-3 mx-1 mx-lg-4 mx-3 mb-3'>
              <h5 className='mx-1 mx-lg-4 mx-3 mb-3 heading '>Projects</h5>

              <div className='mx-1 mx-lg-4 mx-3'>
                {projects?projects.map((project, index)=>{
                  return (
                    <div key={index} className=' mx-1 mx-lg-4 mx-3 '>
                        <Link to={`/project/${project.title}`}>
                          <div className='d-flex align-items-center items   ' style={{color: '#000'}} ><FontAwesomeIcon icon={faProjectDiagram} /><p className=' ml-2 mb-0'>{project?project.title:''}</p></div>
                        </Link>
                        <div><p className='newHeading ml-4 item mb-2'> {project?project.description:''}</p></div>
                      </div>
                  )
                }):<></>}
              </div>
            </div>

        </div>

      </div>
    )
  }else if(user==''){
    navigate("/login")
  }else{
    navigate("/dashboardg")
  }
}

export default Dashboard