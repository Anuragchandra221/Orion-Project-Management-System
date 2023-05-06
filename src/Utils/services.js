
import { BASE_URL, CREATE_COORDINATOR, CREATE_GUIDE, CREATE_STUDENT, CREATE_TASK, EDIT, EDIT_GUIDE, GET_COORDINATOR, GET_COUNT, GET_GUIDE, GET_PROJECT, GET_STUDENT, GET_TASK, GET_USER, GET_WORK, LOGIN_URL, PROJECT_BASE_URL, REFRESH_TOKEN, RESET_PASSWORD, RESET_PASSWORD_CONFIRM, START_PROJECT, UPLOAD_WORK } from "./constants";
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

const start_project = (title, description, guide, student1, student2, student3, student4)=>{
    return axios.post(`${PROJECT_BASE_URL}${START_PROJECT}`,{
        'title':title,
        'description':description,
        'guide':guide,
        'student1':student1,
        'student2':student2,
        'student3':student3,
        'student4':student4
    },
    {
        headers:{
            'Authorization': `Bearer ${get_token()}`
        }
    }
    )
}

const create_task = (project_title, task_title, description, due_date)=>{
    return axios.post(`${PROJECT_BASE_URL}${CREATE_TASK}`,{
        "project_title": project_title,
        'task_title': task_title,
        'description': description,
        'due_date': due_date
    },{
        headers:{
            'Authorization': `Bearer ${get_token()}`
        }
    })
}

const get_project = ()=>{
    return axios.get(`${PROJECT_BASE_URL}${GET_PROJECT}`,{
        headers:{
            'Authorization': `Bearer ${get_token()}`
        }
    })
}

const get_task = (project_title)=>{
    return axios.post(`${PROJECT_BASE_URL}${GET_TASK}`,{
        'project_title': project_title
    },{
        headers:{
            'Authorization': `Bearer ${get_token()}`
        }
    })
}

const get_work = (project, task )=>{
    return axios.post(`${PROJECT_BASE_URL}${GET_WORK}`,{
        'project': project,
        'task': task
    },{
        headers: {
            'Authorization': `Bearer ${get_token()}`
        }
    })
}

const upload_work = (file)=>{
    return axios.post(`${PROJECT_BASE_URL}${UPLOAD_WORK}`,file,{ 
        
        headers: {
            'Authorization': `Bearer ${get_token()}`
        }
    })
}

const file = (file)=>{
    return `http://127.0.0.1:8000/media/${file}`
}

export {login, set_user, get_token, update_token, create_coordinator, get_count, get_coordinator, password_reset_confirm, password_reset, create_guide, get_guide, get_student, create_student, edit, get_user, edit_guide, start_project,
        get_project, create_task, get_task, get_work, upload_work, file
        }