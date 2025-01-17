import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProjectDash = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const { projectId } = useParams(); // Correct destructuring for projectId

  useEffect(() => {
    const fetchProjectData = async () => {
      setLoading(true);
      try {
        // API call to fetch project data
        const response = await axios.post("http://127.0.0.1:5000/project/getwid", {
          projectid: projectId,
        });

        if (response.data && response.data.project) {
          const transformedProject = transformProjectData(response.data.project);
          setProject(transformedProject);
        } else {
          console.warn("No project data returned:", response.data);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProjectData();
    }
  }, [projectId]);

  const transformProjectData = (data) => {
    // Convert Decimal128 values to strings or numbers
    return {
      ...data,
      Min_budget: data.Min_budget?.$numberDecimal || data.Min_budget,
      Max_budget: data.Max_budget?.$numberDecimal || data.Max_budget,
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Project Dashboard</h2>

      {loading ? (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 mb-4"></div>
            <div className="h-8 bg-gray-300 mb-4"></div>
            <div className="h-4 bg-gray-300 mb-4"></div>
          </div>
        </div>
      ) : project ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            <div className="text-lg font-semibold text-gray-700">Project ID: {project.id}</div>
            <div className="text-xl font-bold text-gray-800">{project.Project_name}</div>
            <p className="text-sm text-gray-600">{project.description}</p>

            <div className="mt-4">
              <div className="text-sm text-gray-500">Budget:</div>
              <div className="text-lg font-semibold text-gray-800">
                ${project.Min_budget} - ${project.Max_budget}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm text-gray-500">Status:</div>
              <div
                className={`text-lg font-semibold ${
                  project.status === "open" ? "text-green-500" : "text-red-500"
                }`}
              >
                {project.status}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm text-gray-500">Deadline:</div>
              <div className="text-lg font-semibold text-gray-800">
                {new Date(project.deadline).toLocaleDateString()}{" "}
                {new Date(project.deadline).toLocaleTimeString()}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm text-gray-500">Assigned Freelancers:</div>
              <div className="text-lg font-semibold text-gray-800">
                {project.freelancers && project.freelancers.length > 0
                  ? project.freelancers.join(", ")
                  : "No freelancers assigned"}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-red-500">No project data found.</p>
      )}
    </div>
  );
};

export default ProjectDash;
      