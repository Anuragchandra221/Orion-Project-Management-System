import { BASE_URL, CREATE_COORDINATOR, GET_COORDINATOR, GET_COUNT, LOGIN_URL, REFRESH_TOKEN } from "./constants";
import axios from 'axios'

const login = (email, password)=>{
    return axios.post(`${BASE_URL}${LOGIN_URL}`, {"email":email,"password":password})
}

const set_user = (access, refresh)=>{
    localStorage.setItem("token",access)
    localStorage.setItem("refresh", refresh)
}

const get_token = ()=>{
    return localStorage.getItem("token")||null
}

const update_token = ()=>{
    return axios.post(`${BASE_URL}${REFRESH_TOKEN}`, {"refresh":localStorage.getItem("refresh")})
}

const create_coordinator = (name, email, dob, gender, number, register)=>{
    return axios.post(`${BASE_URL}${CREATE_COORDINATOR}`,{
        'email':email,
        'name':name,
        'password':'password',
        "account_type":"coordinator",
        'dob':dob,
        "gender":gender,
        "number":number,
        "register":register,
    },
    {
        headers:{
            'Authorization': `Bearer ${get_token()}`
        }
    })
}

const get_count = ()=>{
    return axios.get(`${BASE_URL}${GET_COUNT}`,{
        headers: {
            'Authorization': `Bearer ${get_token()}`
        }
    })
}

const get_coordinator = ()=>{
    return axios.get(`${BASE_URL}${GET_COORDINATOR}`,{
        headers: {
            'Authorization': `Bearer ${get_token()}`
        }
    })
}

export {login, set_user, get_token, update_token, create_coordinator, get_count, get_coordinator}