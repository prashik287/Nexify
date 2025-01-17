import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProjectSide from './pages/projects/ProjectSide';
import { jwtDecode } from 'jwt-decode'; // Use default import for jwtDecode
import { Register, Login, Home } from './pages/pages';
import { Client_Assign, Clientpage } from './pages/clients';
import Freelance from './pages/freelancer/Freelance';
import Freelance_projects from './pages/freelancer/Freelance_project';
import ProjectBase from './pages/projects/ProjectBase';
import ProjectDash from './pages/projects/ProjectDash';

export const App = () => {
  const [user, setUser] = useState(null);
  const [user_id, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('hire2hire');
    console.log(token )

    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        console.log('Decoded User:', decodedUser.user._id);

        setUser(decodedUser);
        setUserId(decodedUser.user._id);
      } catch (error) {
        console.error('Error decoding token:', error);
        setUser(null);
      }
    }
  }, []);

  return (
    <Router>
      <AppContent user={user} user_id={user_id} />
    </Router>
  );
};

const AppContent = ({ user, user_id }) => {
  const location = useLocation();
  const isProjectsPath = location.pathname.startsWith('/projects');

  return (
    <div className="min-w-screen flex">   
      <Navbar />
      {isProjectsPath}
      <div className={`flex-1 ${isProjectsPath ? 'ml-64' : ''}`}> {/* Adjust spacing when sidebar is present */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {user?.type === 'client' ? (
            <Fragment>
              <Route path="/" element={<Clientpage userid={user_id} />} />
              <Route path="/assign" element={<Client_Assign userid={user_id} />} />
              <Route path="/projects/*" element={<ProjectBase />} />

            </Fragment>
          ) : user?.type === 'freelancer' ? (
            <Fragment>
              <Route path="/" element={<Freelance />} />
              <Route path="/assignments" element={<Freelance_projects />} />
              <Route path="/projects/*" element={<ProjectBase />} />

            </Fragment>
          ) : (
            <Route path="/" element={<Home />} />
          )}



          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
