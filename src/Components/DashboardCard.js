import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './DashboardCard.css'

function DashboardCard(props) {
  return (
    <div className='dashCard p-2 m-2 m-lg-4'>
        <p className='dashText'>Total {props.name}</p>
        <div>
        <p className='dashCount'>{props.count}</p>
        <div className='text-right'>
            {props.icon}
        </div>
        </div>
    </div>
  )
}

export default DashboardCard