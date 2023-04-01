import React from 'react'
import './New.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function New(props) {

    const data = [
        {
            'name':'anurag',
            'reg':"vas30",
            'email':'pothaluranurag2002@gmail.com',
            'phone':'7012597830'
        },
        {
            'name':'anurag',
            'reg':"vas30",
            'email':'pothaluranurag2002@gmaidfsdfsdf fsfsdfsdfsl.com',
            'phone':'7012597830'
        },
        {
            'name':'anurag',
            'reg':"vas30",
            'email':'pothaluranurag2002@gmaidfsdfsdf fsfsdfsdfsl.com',
            'phone':'7012597830'
        },
        {
            'name':'anurag',
            'reg':"vas30",
            'email':'pothaluranurag2002@gmaidfsdfsdf fsfsdfsdfsl.com',
            'phone':'7012597830'
        },
        {
            'name':'anurag',
            'reg':"vas30",
            'email':'pothaluranurag2002@gmaidfsdfsdf fsfsdfsdfsl.com',
            'phone':'7012597830'
        }
    ]

  return (
    <div className='new d-flex justify-content-center aligin-items-center py-3 mx-1 mx-lg-4'>
        <div className='d-flex justify-content-between mx-3 mb-3'>
            <div><h3 className='newHeading'>Newly added {props.name}</h3></div>
            <div className='mr-2 mr-lg-0'>
                <button className='tableButton mr-2 px-1 px-lg-3 '>View All</button>
                <Link to={props.name==="Coordinators"?"/add-coordinator":""}><button className='tableButton mr-2 px-1 px-lg-3 '>Add New</button></Link>
            </div>

        </div>
        <div>
            <div className='gridContainer mx-3'>
                <div className='item heading'>Name</div>
                <div className='item heading'>Register Number</div>
                <div className='item heading'>Email</div>
                <div className='item heading'>Phone</div>
                <div className='item heading'>Action</div>
                            {data.map((obj, index) => (
                                <React.Fragment key={index}>
                                {Object.values(obj).map((value, index) => (
                                    <div key={index} className="item">{value}</div>
                                ))}
                                <div className='item'>
                                    <button style={{border: 'none',backgroundColor: '#fff'}}><FontAwesomeIcon icon={faPen} /></button>
                                </div>
                                </React.Fragment>
                            ))}
            </div>
        </div>
    </div>
  )
}

export default New