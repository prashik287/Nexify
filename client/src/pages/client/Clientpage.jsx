import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateProject from "./CreateProject";
const Clientpage = ( {userid} ) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="flex flex-wrap min-h-screen min-w-screen ml-[10%] mt-[20%]">
      {/* Sidebar */}
      <aside className="w-[35%] bg-gray-600 p-8 flex">
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="flex items-center justify-center bg-gray-300 py-2 px-2 rounded hover:bg-gray-400 transition"
            >
              <span className="mr-2">🏠</span>Home
            </Link>
          </li>
          <li>
            <Link
              to="/assign" // Corrected path
              className="flex items-center justify-center bg-gray-300 py-2 px-2 rounded hover:bg-gray-400 transition"
            >
              <span className="mr-2">📋</span>Assigned Project
            </Link>
          </li>
          <li>
            <Link
               // Corrected path
               onClick={openModal}
              className="flex items-center justify-center bg-gray-300 py-2 px-2 rounded hover:bg-gray-400 transition"
            >
              <span className="mr-2">📋</span>Create Project
            </Link>
          </li>
        </ul>
      </aside>
      <div  className="bg-transparent border-0 text-black float-right">
        <CreateProject isOpen={isModalOpen} onClose={closeModal} userid={userid}/>
      </div>


      {/* Main Content */}
      <main className="w-[65%] p-5 flex flex-col">
        {/* Filter Section */}
        <section className="w-full bg-gray-600 p-5 border border-gray-300 rounded mb-6">
          <h2 className="text-black text-lg font-bold mb-4">Filters</h2>
          <h3 className="text-md font-semibold">Type</h3>
          <div className="space-y-2 mb-4">
            <label className="block">
              <input type="checkbox" id="local-jobs" className="mr-2" />
              Local Jobs
            </label>
            <label className="block">
              <input type="checkbox" id="featured-jobs" className="mr-2" />
              Featured Jobs
            </label>
            <label className="block">
              <input type="checkbox" id="recruiter-jobs" className="mr-2" />
              Recruiter Jobs
            </label>
            <label className="block">
              <input type="checkbox" id="fulltime-jobs" className="mr-2" />
              Full Time Jobs
            </label>
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            Apply Filter
          </button>
        </section>

        

        {/* Projects Section */}
        <section className="w-full">
          <h2 className="text-lg font-bold mb-4">Freelancer's Profile</h2>
          <div className="grid grid-cols-2 gap-5">
            {/* Example of a project card */}
            <div className="bg-gray-200 border border-gray-300 rounded p-5">
              <h3 className="text-black text-md font-semibold">Project Title</h3>
              <button className="mt-2 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition">
                View Details
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Clientpage;
