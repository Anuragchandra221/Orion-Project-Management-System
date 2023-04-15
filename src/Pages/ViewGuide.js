import React, { useState, useEffect } from 'react'
import './CSS/AddCoordinator.css'
import './CSS/Dashboard.css'
import { get_coordinator, get_student, get_token, update_token } from '../Utils/services'
import { useNavigate, Link } from 'react-router-dom'
import { set_user } from '../Utils/services'
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import DashSideBar from '../Components/DashSideBar'

function ViewGuide() {
  return (
    <div>ViewGuide</div>
  )
}

export default ViewGuide