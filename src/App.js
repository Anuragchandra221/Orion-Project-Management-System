import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import AddCoordinator from './Pages/AddCoordinator';
import ResetPassword from './Pages/ResetPassword';
import ResetPasswordConfirm from './Pages/ResetPasswordConfirm';
import AddGuide from './Pages/AddGuide';
import AddStudent from './Pages/AddStudent';
import ViewCoordinator from './Pages/ViewCoordinator';
import ViewStudent from './Pages/ViewStudent';
import ViewGuide from './Pages/ViewGuide';
import EditAccount from './Pages/EditAccount';
import EditGuide from './Pages/EditGuide';
import StartProject from './Pages/StartProject';
import GuideDashboard from './Pages/GuideDashboard';
import AssignTask from './Pages/AssignTask';
import DashSideBar from './Components/DashSideBar';
import { createContext, useEffect, useState } from 'react';
import { get_token, set_user, update_token } from './Utils/services';
import jwt_decode from "jwt-decode";
import StudentDashboard from './Pages/StudentDashboard';

export const loginContext = createContext()

function App() {

  const [userAccount, setUserAccount] = useState()
  const [loading, setLoading] = useState(true)
  const time = 3*60*1000

  useEffect(()=>{
    
    if (loading){
      if(get_token()){
        update_token().then((results)=>{
          set_user(results.data.access, results.data.refresh)
          setUserAccount(jwt_decode(get_token()).account_type)
          setLoading(false)
          
        }).catch((err)=>{
          localStorage.removeItem('token')
          localStorage.removeItem('refresh')
        })
      }else{
      }
    }
    let interval = setInterval(()=>{
          update_token().then((results)=>{
            set_user(results.data.access, results.data.refresh)
            setUserAccount(jwt_decode(get_token()).account_type)
            
          }).catch((err)=>{
            // localStorage.removeItem('token')
            // localStorage.removeItem('refresh')
          })
      },time)
      return ()=>clearInterval(interval)
    }, [loading])

  return (
    <loginContext.Provider value={[userAccount, setUserAccount]}>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/forgot_password" element={<ResetPasswordConfirm/>} />
          <Route path="/forgot_password/:str" element={<ResetPassword/>} />
      </Routes>
      <div>
            <DashSideBar />
        </div>
        <Routes>

          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/dashboardg" element={<GuideDashboard/>} />
          <Route path="/dashboards" element={<StudentDashboard/>} />
          <Route path="/add-coordinator" element={<AddCoordinator/>} />
          <Route path="/view-coordinator" element={<ViewCoordinator/>} />
          <Route path="/add-student" element={<AddStudent/>} />
          <Route path="/assign-task" element={<AssignTask/>} />
          <Route path="/view-student" element={<ViewStudent/>} />
          <Route path="/add-guide" element={<AddGuide/>} />
          <Route path="/view-guide" element={<ViewGuide/>} />
          <Route path="/edit-coordinator/:str" element={<EditAccount/>} />
          <Route path="/edit-account/:str" element={<EditGuide/>} />
          
          <Route path="/startProject" element={<StartProject/>} />
        </Routes>
      </BrowserRouter>
    </loginContext.Provider>
  );
}

export default App;
