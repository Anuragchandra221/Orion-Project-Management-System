import { BASE_URL, CREATE_COORDINATOR, CREATE_GUIDE, GET_COORDINATOR, GET_COUNT, GET_GUIDE, LOGIN_URL, REFRESH_TOKEN, RESET_PASSWORD, RESET_PASSWORD_CONFIRM } from "./constants";
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

const create_coordinator = (name, email, dob, gender, number, register, password)=>{
    return axios.post(`${BASE_URL}${CREATE_COORDINATOR}`,{
        'email':email,
        'name':name,
        'password':password,
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

const create_guide = (name, email, dob, gender, number, register, password)=>{
    return axios.post(`${BASE_URL}${CREATE_GUIDE}`,{
        'email':email,
        'name':name,
        'password':password,
        "account_type":"guide",
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

const get_guide = ()=>{
    return axios.get(`${BASE_URL}${GET_GUIDE}`,{
        headers: {
            'Authorization': `Bearer ${get_token()}`
        }
    })
}

const password_reset_confirm = (email)=>{
    return axios.post(`${BASE_URL}${RESET_PASSWORD_CONFIRM}`,{
        "email": email
    })
}

const password_reset = (email, password)=>{
    return axios.post(`${BASE_URL}${RESET_PASSWORD}`,{
        "email": email,
        "password": password
    })
}



export {login, set_user, get_token, update_token, create_coordinator, get_count, get_coordinator, password_reset_confirm, password_reset, create_guide, get_guide}