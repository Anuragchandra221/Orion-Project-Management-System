import React from 'react'
import './New.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function New(props) {
    let to=""

    if(props.name=="Coordinators"){
        to="/edit-coordinator/"
    }else{
        to="/edit-account/"
    }


  return (
    <div className='new d-flex justify-content-start aligin-items-center py-3 mx-1 mx-lg-4' style={{maxHeight: '300px', overflowY: 'scroll'}}>
        <div className='d-flex justify-content-between mx-3 mb-3'>
            <div><h3 className='newHeading'>Newly added {props.name}</h3></div>
            <div className='mr-2 mr-lg-0'>
                

                {props.name=="Students" && (props.account_type=="coordinator" || props.account_type=="admin" || props.account_type=="admin" )?<Link to={props.name==="Students"?"/view-student":""}><button className='tableButton mr-2 px-1 px-lg-3 ' style={{cursor: 'pointer'}} >View All</button></Link>:<></>}
                {props.name=="Guides" && (props.account_type=="coordinator" || props.account_type=="admin" )?<Link to={props.name==="Guides"?"/view-guide":""}><button className='tableButton mr-2 px-1 px-lg-3 ' style={{cursor: 'pointer'}} >View All</button></Link>:<></>}
                {props.name=="Coordinators" && props.account_type=="admin"?<Link to={props.name==="Coordinators"?"/view-coordinator":""}><button className='tableButton mr-2 px-1 px-lg-3 ' style={{cursor: 'pointer'}} >View All</button></Link>:<></>}


                {props.name=="Students" && props.account_type=="coordinator"?<Link to={props.name==="Students"?"/add-student":""}><button className='tableButton  px-1 px-lg-3 'style={{cursor: 'pointer'}} >Add New</button></Link>:<></>}
                {props.name=="Guides" && props.account_type=="coordinator"?<Link to={props.name==="Guides"?"/add-guide":""}><button className='tableButton  px-1 px-lg-3 'style={{cursor: 'pointer'}} >Add New</button></Link>:<></>}
                {props.name=="Coordinators" && props.account_type=="admin"?<Link to={props.name==="Coordinators"?"/add-coordinator":""}><button className='tableButton  px-1 px-lg-3 'style={{cursor: 'pointer'}} >Add New</button></Link>:<></>}
                
            </div>

        </div>
        <div>
            <div className='gridContainer mx-3'>
                <div className='item heading'>Name</div>
                <div className='item heading'>Register Number</div>
                <div className='item heading'>Email</div>
                <div className='item heading'>Phone</div>
                <div className='item heading'>Action</div>
                            {props.data?props.data.filter((obj, index) => index <= 4).map((obj, index) => (
                                <React.Fragment key={index}>
                                {Object.values(obj).map((value, index) => (
                                    <div key={index} className="item">{value}</div>
                                ))}
                                <div className='item text-center'>
                                    <Link to={`${to}${obj.email}`}><button disabled={(props.name=="Coordinators" && props.account_type=="admin")||(props.name=="Guides" && props.account_type=="coordinator")||(props.name=="Students" && props.account_type=="coordinator")?false:true} style={{border: 'none',backgroundColor: '#fff', cursor: 'pointer'}}><FontAwesomeIcon icon={faPen} /></button></Link>
                                </div>
                                </React.Fragment>
                            )):''}
            </div>
        </div>
    </div>
  )
}

export default New