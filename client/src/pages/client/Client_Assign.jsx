import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

function Client_Assign({ userid }) {
    const [project_stat, setProjectStat] = useState('all');
    const [projects, setProjects] = useState([]); // Initialize as an array to store multiple projects
    const [formData, setFormData] = useState({
       
        client_id: userid, // Initialize with the passed `userid`
    });
    
    const [error, setError] = useState(null); // For handling errors
    const navigate = useNavigate(); // Initialize the useNavigate hook

    // Effect to call get_data whenever formData.client_id or project_stat changes
    useEffect(() => {
        if (formData.client_id) {
            get_data();
        }
    }, [formData.client_id, project_stat]); // Triggers when `formData.client_id` or `project_stat` changes

    const get_data = async () => {
        try {
            let apiUrl;
            // Choose API URL based on selected project status
            if (project_stat === "all") {
                apiUrl = "http://127.0.0.1:5000/project/getall";
            } else if (project_stat === "assigned") {
                apiUrl = "http://127.0.0.1:5000/project/assigned";
            } else if (project_stat === "unassigned") {
                apiUrl = "http://127.0.0.1:5000/project/unassigned";
            }

            // Send the POST request to fetch data
            const response = await axios.post(apiUrl, formData);

            // Ensure the response has `projects` before updating the state
            if (response.data && response.data.projects) {
                setProjects(response.data.projects);
               
                setError(null); // Reset any previous error if data is fetched successfully
            } else {
                setProjects([]); // Clear the projects if no data is returned
                setError("No projects found."); // Set error message if no projects are returned
            }
        } catch (error) {
            console.log("Error fetching data:", error);
            setProjects([]); // Clear previous projects on error
            setError(error.response?.data?.message || "An error occurred while fetching data."); // Set error message
        }
    };

    const handleProjectChange = (e) => {
        const selectedProject = e.target.value;
        setProjectStat(selectedProject);


        setFormData((prevFormData) => ({
            ...prevFormData,
            client_id: userid, // Keep client_id intact while updating the project
        }));
    };

    // Handle "View Dashboard" button click
    const handleViewDashboard = (projectId) => {
        // Navigate to the project dashboard route with the project's ID
        localStorage.setItem('pid',projectId)
        navigate(`/projects/dashboard/${projectId}`);
    };

    return (
        <div className="flex flex-col p-5 bg-gray-100 min-h-screen w-screen ml-[0%] mt-[4%]">
            <main className="flex flex-col p-5">
                <h2 className="text-2xl font-semibold mb-5 space-y-5">Assigned Projects</h2>

                <div className="p-3 space-y-5">
                    <select
                        className="rounded rounded-xl p-2 bg-gray-400 w-[25%]"
                        value={project_stat}
                        onChange={handleProjectChange}
                    >
                        <option value="all">ALL</option>
                        <option value="assigned">Assigned</option>
                        <option value="unassigned">Unassigned</option>
                    </select>
                </div>

                {/* Projects list rendering */}
                <ul className="space-y-5">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <li key={project._id}> {/* Use project._id to ensure uniqueness */}
                                <div className="flex justify-between items-center p-5 bg-gray-200 border border-gray-300 rounded-md">
                                    <div>
                                        <h3 className="text-lg font-semibold text-black">{project.Project_name}</h3>
                                        <p className="text-gray-600">{project.description || 'No description available'}</p> {/* Replace with project description */}
                                    </div>
                                    <button
                                        onClick={() => handleViewDashboard(project.id)} // Call handleViewDashboard with project ID
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300 transform hover:bg-indigo-700 hover:scale-105"
                                    >
                                        View Dashboard
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        error && <div className="text-center text-gray-500">No projects found</div> // Display centered message if no projects are found and no error
                    )}
                </ul>
            </main>
        </div>
    );
}

export default Client_Assign;
