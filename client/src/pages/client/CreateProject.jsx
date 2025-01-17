import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const CreateProjectModal = ({ userid,isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    budgetMin: "",
    budgetMax: "",
    status: "open",
    deadline: "",
    createDashboard: "no",
    userid:userid
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // Check if the minimum budget is greater than or equal to maximum budget
  const isMinGreaterThanMax = parseFloat(formData.budgetMin) >= parseFloat(formData.budgetMax);

  // Check if the form is valid (e.g., budget is greater than 0)
  const isFormValid = formData.budgetMin >= 1 &&
                      formData.budgetMax <= 100 &&
                      formData.projectName &&
                      formData.description &&
                      !isMinGreaterThanMax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post("http://127.0.0.1:5000/project/create", formData);
      console.log("Response:", response.data);
      toast.success("Project Created Successfully", {
        position: "top-right",
        autoClose: 5000, // Auto close after 5 seconds
      });
      onClose(); // Close the modal after submitting
    } catch (error) {
      console.error("Error submitting project:", error);
      
      if (error.response && error.response.data && error.response.data.message) {
        // If error response from server contains a message
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        // Generic error if no message is provided
        toast.error("An error occurred. Please try again later.", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

  // Ensure today's date is set as min date for the deadline
  const minDateTime = new Date().toISOString().slice(0, 16);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-100 bg-opacity-50 z-10"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div
        className="w-full max-w-3xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg text-left z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => e.stopPropagation()} // Prevent clicking inside modal from closing it
      >
        <button
          className="absolute top-4 right-4 text-gray-6000 bg-white text-2xl"
          onClick={onClose}
        >
          &times; {/* Close icon */}
        </button>
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create a New Project
        </h2>
        
        {/* Scrollable Form Content */}
        <div className="max-h-96 overflow-y-auto">
          <form id="createProjectForm" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="projectName" className="block text-lg font-semibold text-gray-600 mb-2">
                Project Name:
              </label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none bg-gray-100"
                required
              />
            </div>
            <div>
              <label htmlFor="projectdesc" className="block text-lg font-semibold text-gray-600 mb-2">
                Project Description:
              </label>
              <textarea
                id="projectdesc"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none bg-gray-100"
                required
                rows="4"
              />
            </div>

            <div>
              <label 
                htmlFor="minbud" 
                className="block text-lg font-semibold text-gray-600 mb-2"
              >
                Minimum Budget:
              </label>
              <input
                type="number"
                id="minbud"
                name="budgetMin"
                value={formData.budgetMin}
                onChange={handleChange}
                min="1"
                placeholder="Enter minimum budget"
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none bg-gray-100"
                required
                step="0.01"
              />
              {formData.budgetMin && formData.budgetMin < 1 && (
                <p className="text-red-500 text-sm mt-1">Budget must be at least $1.</p>
              )}
            </div>

            <div>
              <label 
                htmlFor="maxbud" 
                className="block text-lg font-semibold text-gray-600 mb-2"
              >
                Maximum Budget:
              </label>
              <input
                type="number"
                id="maxbud"
                name="budgetMax"
                value={formData.budgetMax}
                onChange={handleChange}
                min="1"
                placeholder="Enter maximum budget"
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none bg-gray-100"
                required
                step="0.01"
              />
              {formData.budgetMax && formData.budgetMax > 100 && (
                <p className="text-red-500 text-sm mt-1">Budget must be at most $100.</p>
              )}
              {isMinGreaterThanMax && (
                <p className="text-red-500 text-sm mt-1">Minimum budget must be less than the maximum budget.</p>
              )}
            </div>

            {/* Select project status */}
            <div>
              <label 
                htmlFor="status" 
                className="block text-lg font-semibold text-gray-600 mb-2"
              >
                Project Status:
              </label>
              <select
                name="status"
                id="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none bg-gray-100"
              >
                <option value="open">Open</option>
                <option value="inprogress">In Progress</option>
              </select>
            </div>

            <div>
              <label htmlFor="deadline" className="block text-lg font-semibold text-gray-600 mb-2">
                Project Deadline:
              </label>
              <input
                type="datetime-local"
                name="deadline"
                id="deadline"
                value={formData.deadline}
                onChange={handleChange}
              
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none bg-gray-100"
                required
              />
            </div>

            <div>
              <label htmlFor="dash" className="block text-lg font-semibold text-gray-600 mb-2">
                Create Project Dashboard:
              </label>
              <div className="flex items-center space-x-4">
                <div>
                  <input
                    type="radio"
                    id="createDashboardYes"
                    name="createDashboard"
                    value="yes"
                    checked={formData.createDashboard === "yes"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="createDashboardYes" className="text-lg text-gray-600">Yes</label>
                </div>
                
                <div>
                  <input
                    type="radio"
                    id="createDashboardNo"
                    name="createDashboard"
                    value="no"
                    checked={formData.createDashboard === "no"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="createDashboardNo" className="text-lg text-gray-600">No</label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full p-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Create Project
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default CreateProjectModal;
