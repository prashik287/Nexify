import React, { useState } from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';  // Import the Toastify CSS
import { ToastContainer, toast } from "react-toastify";  // Import ToastContainer and toast

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    password: "",
    birth_date: "",
    mobile_phone: "",
    join_as: "client",
    company_name: "",
    freelancer_skills: "", // Initial skills as a string
    portfolio_url: "",
  });

  const handleSkillsChange = (e) => {
    // Convert comma-separated string into an array
    const skillsArray = e.target.value.split(",").map((skill) => skill.trim()).filter(Boolean);
    setFormData({ ...formData, freelancer_skills: skillsArray });
  };

  const getFormData = async () => {
    console.log(formData);

    try {
      // Sending POST request to backend
      const response = await axios.post("http://127.0.0.1:5000/auth/register", formData);
      console.log("Response:", response);

      // On successful registration, show success toast
      toast.success("Registration Successful", {
        position: "top-right",
        autoClose: 5000, // Auto close after 5 seconds
      });
      
      // Handle response, redirect user, or any other logic after registration

    } catch (error) {
      // Log error for debugging purposes
      console.error("Error submitting form:", error);

      // Handle error response
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

  return (
    <div className="flex w-screen ml-[0%] pt-[10%] pb-[10%] mb-0 justify-center items-center min-h-screen bg-gray-700">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-yellow-400 mb-6">Register</h1>
        <form>
          {/* Basic Form Fields */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full p-3 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full p-3 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="first-name" className="block text-sm font-medium text-white">Name</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              required
              className="w-full p-3 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="birth-date" className="block text-sm font-medium text-white">Birth Date</label>
            <input
              type="date"
              id="birth-date"
              name="birth-date"
              onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
              required
              className="w-full p-3 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="mobile-phone" className="block text-sm font-medium text-white">Mobile Phone</label>
            <input
              type="tel"
              id="mobile-phone"
              name="mobile-phone"
              onChange={(e) => setFormData({ ...formData, mobile_phone: e.target.value })}
              required
              className="w-full p-3 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="join-as" className="block text-sm font-medium text-white">Join as</label>
            <select
              name="join-as"
              id="join-as"
              required
              onChange={(e) => setFormData({ ...formData, join_as: e.target.value })}
              className="w-full p-3 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="client">Client</option>
              <option value="freelancer">Freelancer</option>
            </select>
          </div>

          {/* Conditional Fields Based on User Type */}
          {formData.join_as === "client" && (
            <div className="mb-4">
              <label htmlFor="company-name" className="block text-sm font-medium text-white">Company Name</label>
              <input
                type="text"
                id="company-name"
                name="company-name"
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                required
                className="w-full p-3 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {formData.join_as === "freelancer" && (
            <>
              <div className="mb-4">
                <label htmlFor="freelancer-skills" className="block text-sm font-medium text-white">Skills (Comma separated)</label>
                <input
                  type="text"
                  id="freelancer-skills"
                  name="freelancer-skills"
                  onChange={handleSkillsChange} // Use the handler for skills
                  required
                  className="w-full p-3 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="portfolio-url" className="block text-sm font-medium text-white">Portfolio URL</label>
                <input
                  type="url"
                  id="portfolio-url"
                  name="portfolio-url"
                  onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                  required
                  className="w-full p-3 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="button"
            id="register-button"
            onClick={getFormData}
            className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 transform transition duration-300 ease-in-out hover:scale-105 active:scale-95 active:translate-y-1"
          >
            Register
          </button>
        </form>
      </div>

      {/* ToastContainer to render toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default Register;
