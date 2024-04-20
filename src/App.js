import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Home from './Home';
import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail';
import JobsList from './JobsList';
import LoginForm from './LoginForm';
import Signup from './Signup';
import Profile from './Profile';
import NavBar from './NavBar';
import { useAuth } from './hooks/useAuth';

function App() {
  const { authData } = useAuth();

  return (
    <div className="App">
      {authData.username !== null ? <NavBar /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/companies" 
          element={authData.token ? <CompanyList /> :
          <Navigate to='/login' />} />
        <Route 
          path="/companies/:handle" 
          element={authData.token ? <CompanyDetail /> :
          <Navigate to='/login' />} />
        <Route 
          path="/jobs" 
          element={authData.token ? <JobsList /> :
          <Navigate to='/login' />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/profile" 
          element={authData.token ? <Profile /> :
          <Navigate to='/login' />}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
