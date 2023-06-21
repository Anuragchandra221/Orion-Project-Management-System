
import { BASE_URL, CREATE_COORDINATOR, CREATE_GUIDE, CREATE_STUDENT, CREATE_TASK, EDIT, EDIT_GUIDE, EDIT_TASKS, GET_COORDINATOR, GET_COUNT, GET_GUIDE, GET_OLD_PDF, GET_OLD_PROJECT, GET_OLD_PROJECT_BY_YEAR, GET_PDF, GET_PROJECT, GET_STUDENT, GET_TASK, GET_TASKS, GET_USER, GET_WORK, GIVE_MARKS, LOGIN_URL, PROJECT_BASE_URL, REFRESH_TOKEN, RESET_PASSWORD, RESET_PASSWORD_CONFIRM, SEARCH_OLD_PROJECT, START_PROJECT, UPLOAD_OLD_PROJECT, UPLOAD_WORK, VIEW_PROJECT, VIEW_PROJECTS } from "./constants";
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

const create_coordinator = (name, email, gender, number, register, password)=>{
    return axios.post(`${BASE_URL}${CREATE_COORDINATOR}`,{
        'email':email,
        'name':name,
        'password':password,
        "account_type":"coordinator",
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

const create_guide = (name, email, gender, number, register, password)=>{
    return axios.post(`${BASE_URL}${CREATE_GUIDE}`,{
        'email':email,
        'name':name,
        'password':password,
        "account_type":"guide",
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

const create_student = (name, email, gender, number, register, password)=>{
    return axios.post(`${BASE_URL}${CREATE_STUDENT}`,{
        'email':email,
        'name':name,
        'password':password,
        "account_type":"student",
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

const edit = (name, email, gender, number, register)=>{
    console.log(name, email, gender, number, register)
    return axios.post(`${BASE_URL}${EDIT}`,{
        'email':email,
        'name':name,
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

const edit_guide = (name, email, gender, number, register)=>{
    return axios.post(`${BASE_URL}${EDIT_GUIDE}`,{
        'email':email,
        'name':name,
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

const create_task = (project_title, task_title, description, due_date, max_score)=>{
    return axios.post(`${PROJECT_BASE_URL}${CREATE_TASK}`,{
        "project_title": project_title,
        'task_title': task_title,
        'description': description,
        'due_date': due_date,
        'max_score': max_score
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

const get_pdf = (project, task, file)=>{
    return axios.post(`${PROJECT_BASE_URL}${GET_PDF}`,{
        "project":project,
        "task":task,
        "file":file
    },{
        headers:{
            'Authorization': `Bearer ${get_token()}`
        }
    })
}

const give_marks = (marks, task, project, user)=>{
    return axios.post(`${PROJECT_BASE_URL}${GIVE_MARKS}`,{
        "project": project,
        "task": task,
        "score": marks,
        "user": user
    },{
        headers:{
            'Authorization': `Bearer ${get_token()}`
        }
    })
}

const view_projects = (title)=>{
    return axios.post(`${PROJECT_BASE_URL}${VIEW_PROJECTS}`,{
        'title': title
    },{
        headers:{
            'Authorization': `Bearer ${get_token()}`
        }
    })
}

const view_project_names = ()=>{
    return axios.get(`${PROJECT_BASE_URL}${VIEW_PROJECT}`,{
        headers:{
            'Authorization': `Bearer ${get_token()}`
        }
    })
}

const get_image = (img)=>{
    return `http://res.cloudinary.com/ddhojwrtd/image/upload/v1/${img}.png`
}

const upload_old_project = (file)=>{
    return axios.post(`${PROJECT_BASE_URL}${UPLOAD_OLD_PROJECT}`,file,{
        headers:{
            'Authorization': `Bearer ${get_token()}`
        }
    })
}

const search_old_project = (q)=>{
    return axios.get(`${PROJECT_BASE_URL}${SEARCH_OLD_PROJECT}`,{
        params: {
          "q": q,
        },
        headers:{
            'Authorization': `Bearer ${get_token()}`
        }
      })
}
const get_old_project = (q)=>{
    return axios.get(`${PROJECT_BASE_URL}${GET_OLD_PROJECT}`,{
        params: {
          "q": q,
        }
      })
}
const get_old_pdf = (q)=>{
    return axios.post(`${PROJECT_BASE_URL}${GET_OLD_PDF}`,{
        "q": q,
      })
}

const get_old_project_by_year = (year)=>{
    return axios.get(`${PROJECT_BASE_URL}${GET_OLD_PROJECT_BY_YEAR}`,{
        params: {
          "year": year,
        },
        headers: {
            "Authorization": `Bearer ${get_token()}`
        }
      })
}

const retrieve_tasks = (project, task)=>{
    console.log(project, task)
    return axios.post(`${PROJECT_BASE_URL}${GET_TASKS}`,{
        "project": project,
        "task": task,
    },{
        headers:{
            'Authorization': `Bearer ${get_token()}`
        }
    })
}

const edit_tasks = (project_title, task, task_title, description, due_date)=>{
    return axios.post(`${PROJECT_BASE_URL}${EDIT_TASKS}`,{
        "project_title": project_title,
        "task": task,
        'task_title': task_title,
        'description': description,
        'due_date': due_date
    },{
        headers:{
            'Authorization': `Bearer ${get_token()}`
        }
    })
}

export {login, set_user, get_token, update_token, create_coordinator, get_count, get_coordinator, password_reset_confirm, password_reset, create_guide, get_guide, get_student, create_student, edit, get_user, edit_guide, start_project,
        get_project, create_task, get_task, get_work, upload_work, get_pdf,give_marks, view_projects, view_project_names, get_image, upload_old_project, search_old_project, get_old_project,get_old_pdf, get_old_project_by_year, retrieve_tasks, edit_tasks
        }