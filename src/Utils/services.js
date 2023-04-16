
import { BASE_URL, CREATE_COORDINATOR, CREATE_GUIDE, CREATE_STUDENT, EDIT, EDIT_GUIDE, GET_COORDINATOR, GET_COUNT, GET_GUIDE, GET_STUDENT, GET_USER, LOGIN_URL, REFRESH_TOKEN, RESET_PASSWORD, RESET_PASSWORD_CONFIRM } from "./constants";
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

const create_student = (name, email, dob, gender, number, register, password)=>{
    return axios.post(`${BASE_URL}${CREATE_STUDENT}`,{
        'email':email,
        'name':name,
        'password':password,
        "account_type":"student",
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

const get_student = ()=>{
    return axios.get(`${BASE_URL}${GET_STUDENT}`,{
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

const get_user = (email)=>{
    return axios.post(`${BASE_URL}${GET_USER}`,{
        'email': email,
    },{
        headers: {
            'Authorization': `Bearer ${get_token()}`
        }
    })
}

const edit = (name, email, dob, gender, number, register)=>{
    return axios.post(`${BASE_URL}${EDIT}`,{
        'email':email,
        'name':name,
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

const edit_guide = (name, email, dob, gender, number, register)=>{
    return axios.post(`${BASE_URL}${EDIT_GUIDE}`,{
        'email':email,
        'name':name,
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



export {login, set_user, get_token, update_token, create_coordinator, get_count, get_coordinator, password_reset_confirm, password_reset, create_guide, get_guide, get_student, create_student, edit, get_user, edit_guide}