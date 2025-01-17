import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

const Freelance = () => {
  // Step 1: Define state to store the projects
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Step 2: Fetch projects when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:3000/project/all'); // Replace with your API URL
        setProjects(response.data.result); // Assuming response.data contains the array of projects
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex min-h-screen ml-[-25%] mt-[10%]">
      {/* <!-- Sidebar --> */}
      <aside className="w-1/5 bg-gray-500 p-5 flex flex-col border border-gray-300 rounded-lg">
        <ul className="list-none p-0 space-y-4">
          <li className="p-3 bg-gray-200 text-center rounded-lg cursor-pointer">
            <Link to="/" className="flex items-center justify-center space-x-2">
              <span className="text-lg">🏠</span>
              <span>Home</span>
            </Link>
          </li>
          <li className="p-3 bg-gray-200 text-center rounded-lg cursor-pointer">
            <Link to="/mypro" className="flex items-center justify-center space-x-2">
              <span className="text-lg">📋</span>
              <span>My Projects</span>
            </Link>
          </li>
          <li className="p-3 bg-gray-200 text-center rounded-lg cursor-pointer">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-lg">🏆</span>
              <span className="text-blue-500">Gamified Rank</span>
            </div>
          </li>
        </ul>
      </aside>

      {/* <!-- Main Content --> */}
      <main className="w-4/5 p-5 flex">
        <div className="flex w-full">
          {/* <!-- Filter Section --> */}
          <section className="w-1/4 bg-gray-500 p-5 border border-gray-300 rounded-lg">
            <h2 className=" text-black text-xl font-bold mb-4">Filters</h2>
            <h3 className="text-lg font-semibold mb-2">Budget</h3>
            <div className="space-y-2">
              <div>
                <input type="checkbox" id="fixed-price" className="mr-2" />
                <label htmlFor="fixed-price">Fixed Price Projects</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="number" id="fixed-price-min" placeholder="Min" className="w-full p-2 border border-gray-300 rounded" />
                <span>to</span>
                <input type="number" id="fixed-price-max" placeholder="Max" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Apply Filter
              </button>
            </div>
          </section>

          {/* <!-- Projects Section --> */}
          <section className="w-3/4 px-5">
            <h2 className="text-xl font-bold mb-4">Freelancer's Profile</h2>
            {loading ? (
              <div className="text-center">Loading projects...</div> // Loading state
            ) : (
              <div className="grid grid-cols-2 gap-5">
                {/* Step 3: Map through the projects array to display them */}
                {projects.map((project) => (
                  <div key={project.id} className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold text-lg">{project.projectName}</h3>
                    <p className="text-gray-600">{project.description}</p>
                    <p className="text-sm text-gray-500">Budget: {project.budgetMin} - {project.budgetMax}</p>
                    <p className="text-sm text-gray-500">Deadline: {project.deadline}</p>
                    <p className="text-sm text-gray-500">Status: {project.status}</p><br />
                    <button className="text-sm text-white bg-blue-500">Bid</button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Freelance;
