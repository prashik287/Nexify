import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function FreelancerSide() {
  const pid = localStorage.getItem('pid'); // Retrieve project ID from localStorage

  return (
    <div className="w-[20%] bg-blue-500 h-screen">
      <ul className="p-4 space-y-4 text-white text-2xl">
        <Link to={`/projects/dashboard/${pid}`}>
          <li className="p-4 w-full rounded text-white hover:bg-blue-800 active:bg-green-500">
            Dashboar
          </li>
        </Link>
        <Link to={`/projects/timeline${pid}`}>
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
        <Link to={`/projects/tasks/${pid}`}>
          <li className="p-4 w-full rounded text-white hover:bg-blue-800 active:bg-green-500">
            Tasks
          </li>
        </Link>
        <Link to={`/projects/submissions/${pid}`}>
          <li className="p-4 w-full rounded text-white hover:bg-blue-800 active:bg-green-500">
            Submissions
          </li>
        </Link>
        <Link to={`/projects/settings`}>
          <li className="p-4 w-full rounded text-white hover:bg-blue-800 active:bg-green-500">
            Settings
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default FreelancerSide;
