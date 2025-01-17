import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  // Import the Toastify CSS

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    join_as: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state
  const navigate = useNavigate(); // Hook for navigation

  // Handle form submission
  const login = async (e) => {
    e.preventDefault(); // Prevent page reload
    console.log(formData); // Print form data

    // Validation for empty fields
    if (formData.email === "" || formData.password === "" || formData.join_as === "") {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/auth/login", formData);
      console.log("Response:", response.data);
      console.log("Response token:", response.data.token);

      // If login is successful, show success toast
      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 5000, // Auto close after 5 seconds
      });

      // Store token in localStorage
      localStorage.setItem("hire2hire", response.data.token);
      // Set authentication state to true
      setIsAuthenticated(true);

      // Delay navigation slightly to allow toast to show
      setTimeout(() => {
        navigate("/");
      }, 1500); // Redirect after 1.5 seconds (to give toast time to display)
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Login Failed. Please check your credentials.");
    }
  };

  return (
    <>
      <div className="flex w-screen justify-center items-center min-h-screen bg-gray-900 ml-[0%]">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-yellow-400">Please Login</h1>
          </div>
          <form id="loginForm" onSubmit={login}>
            <div className="mb-6 relative">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full p-3 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <i className="fa-solid fa-envelope fa-2xl text-green-500 absolute top-1/2 right-3 transform -translate-y-1/2"></i>
            </div>

            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full p-3 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <i className="fa-solid fa-lock fa-2xl text-red-500 absolute top-1/2 right-3 transform -translate-y-1/2"></i>
            </div>

            <div className="mb-6 relative">
              <label htmlFor="join_as" className="block text-sm font-medium text-white">
                User Type:
              </label>
              <select
                id="join_as"
                name="join_as"
                required
                className="w-full p-3 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                onChange={(e) => setFormData({ ...formData, join_as: e.target.value })}
              >
                <option value="client">Client</option>
                <option value="freelancer">Freelancer</option>
              </select>
              <i className="fa-solid fa-lock fa-2xl text-red-500 absolute top-1/2 right-3 transform -translate-y-1/2"></i>
            </div>

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                className="text-green-500 focus:ring-2 focus:ring-green-500"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-white">
                Remember me
              </label>
            </div>

            <div>
              <button
                type="submit"
                id="signin"
                className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ToastContainer should be rendered here */}
      <ToastContainer />
    </>
  );
};

export default Login;
