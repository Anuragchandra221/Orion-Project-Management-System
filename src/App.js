import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/add-coordinator" element={<AddCoordinator/>} />
        <Route path="/view-coordinator" element={<ViewCoordinator/>} />
        <Route path="/add-student" element={<AddStudent/>} />
        <Route path="/view-student" element={<ViewStudent/>} />
        <Route path="/add-guide" element={<AddGuide/>} />
        <Route path="/view-guide" element={<ViewGuide/>} />
        <Route path="/edit-coordinator/:str" element={<EditAccount/>} />
        <Route path="/edit-account/:str" element={<EditGuide/>} />
        <Route path="/forgot_password" element={<ResetPasswordConfirm/>} />
        <Route path="/forgot_password/:str" element={<ResetPassword/>} />
        <Route path="/startProject" element={<StartProject/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
