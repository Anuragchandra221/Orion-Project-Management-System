import { BASE_URL, LOGIN_URL, REFRESH_TOKEN } from "./constants";
import axios from 'axios'

const login = (email, password)=>{
    return axios.post(`${BASE_URL}${LOGIN_URL}`, {"email":email,"password":password})
}

const set_user = (access, refresh)=>{
    localStorage.setItem("token",access)
    localStorage.setItem("refresh", refresh)
}

const get_token = ()=>{
    return localStorage.getItem("token")
}

const update_token = ()=>{
    return axios.post(`${BASE_URL}${REFRESH_TOKEN}`, {"refresh":localStorage.getItem("refresh")})
}

export {login, set_user, get_token, update_token}