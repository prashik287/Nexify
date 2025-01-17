import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ProjectSide() {
  const pid = localStorage.getItem('pid'); // Retrieve project ID from localStorage
  const [Fstate, setFstate] = useState(false); // State to toggle freelancer submenu

  const toggleFreelancerMenu = () => {
    setFstate(!Fstate);
  };

  return (
    <div className="w-[20%] bg-blue-500 h-screen">
      <ul className="p-4 space-y-4 text-white text-2xl">
        <Link to={`/projects/dashboard/${pid}`}>
          <li className="p-4 w-full rounded text-white hover:bg-blue-800 active:bg-green-500">
            Dashboard
          </li>
        </Link>
        <Link to={`/projects/timeline/${pid}`}>
          <li className="p-4 w-full rounded text-white hover:bg-blue-800 active:bg-green-500">
            Timeline
          </li>
        </Link>
        <Link to={`/projects/chat/${pid}`}>
          <li className="p-4 w-full rounded text-white hover:bg-blue-800 active:bg-green-500">
            Chat
          </li>
        </Link>
        <Link to={`/projects/meet/${pid}`}>
          <li className="p-4 w-full rounded text-white hover:bg-blue-800 active:bg-green-500">
            Meet
          </li>
        </Link>

        {/* Freelancer Menu */}
        <li
          className="p-4 w-full rounded text-white hover:bg-blue-800 active:bg-green-500 cursor-pointer"
          onClick={toggleFreelancerMenu}
        >
          Freelancer
          {/* Submenu for Assign Freelancer */}
          {Fstate && (
            <div className="ml-8 mt-2">
              <Link to={`/projects/assign/${pid}`}>
                <li className="p-4 w-full rounded text-white hover:bg-blue-700 active:bg-green-400">
                  Assign
                </li>
              </Link>
              <Link to={`/projects/managefree/${pid}`}>
                <li className="p-4 w-full rounded text-white hover:bg-blue-700 active:bg-green-400">
                  Manage Freelancer
                </li>
              </Link>
            </div>
            
          )}
        </li>
        <Link to={`/projects/managepro/${pid}`}>
                <li className="p-4 w-full rounded text-white hover:bg-blue-700 active:bg-green-400">
                  Manage Project
                </li>
              </Link>
      </ul>
    </div>
  );
}

export default ProjectSide;
