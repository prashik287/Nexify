import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProjectSide from './ProjectSide';
import ProjectDash from './ProjectDash'; // Dashboard component
import ProjectChat from './ProjectChat';
import { Suspense } from 'react';
import ProjectTimeline from './ProjectTimeline';
import Loading from './Loading';
import ProjectMeet from './ProjectMeet';
import ProjectAssign from './ProjectAssign';
import ManageFreelancers from './ManageFreelancers';
import ManageProject from './ManageProject';
import FreelancerSide from './FreelancerSide';
function ProjectBase() {
  return (
    <div className="flex flex-wrap fixed top-[9%] left-0 w-screen">
      {/* Sidebar */}
      <FreelancerSide className="w-[20%]" />
      
      {/* Main Content */}
      <div className="p-2 border border-2 border-white w-[80%] bg-blue-400 h-screen">
        <Suspense fallback={Loading}>
          <div className="bg-green-50 m-2 h-[80%] rounded-lg border border-grey-50 text-black p-4">
            <Routes>
              <Route path="/dashboard/:projectId" element={<ProjectDash />} />
              <Route path="/chat/:projectId" element={<ProjectChat />} />
              <Route path="/timeline/:projectId" element={<ProjectTimeline />} />
              <Route path='/meet/:projectId' element={<ProjectMeet/>}/>
              <Route path='/assign/:projectId' element={<ProjectAssign/>}/>
              <Route path='/managefree/:projectId' element={<ManageFreelancers/>}/>
              <Route path='/managepro/:projectId' element={<ManageProject/>}/>
              <Route path="*" element={<div>Select a section from the sidebar</div>} />
            </Routes>
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default ProjectBase;
