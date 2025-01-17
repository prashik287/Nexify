import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
function ProjectAssign() {
  const [FormData, setFormData] = useState({
    userid: "",
    frelancer_email: "",
    projectid: ""
  });
  

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAssignFreelancer = async () => {
    const token = localStorage.getItem('hire2hire');
    const user = jwtDecode(token)
    console.log(user.user._id)

    const pid = localStorage.getItem('pid');

    // Create a new object with updated values
    const updatedFormData = {
      ...FormData,
      userid: user.user._id,
      projectid: pid
    };

    // Validation
    if (!updatedFormData.frelancer_email) {
      setMessage('Please enter an email.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(updatedFormData.frelancer_email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      console.log(updatedFormData)
      const response = await axios.post('http://127.0.0.1:5000/project/assign', updatedFormData);
      console.log(response);

      if (response.data.success) {
        setMessage(`Freelancer with email ${updatedFormData.frelancer_email} assigned successfully.`);
      } else {
        setMessage(`Error: ${response.data.message || 'Failed to assign freelancer.'}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Assign Freelancer to Project</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Freelancer's Email:
        </label>
        <input
          type="email"
          id="email"
          value={FormData.frelancer_email}
          onChange={(e) => setFormData({ ...FormData, frelancer_email: e.target.value })}
          className={`w-full p-2 border ${FormData.frelancer_email && !/\S+@\S+\.\S+/.test(FormData.frelancer_email) ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md mb-4`}
          placeholder="Enter freelancer's email"
          required
        />

        <button
          onClick={handleAssignFreelancer}
          disabled={loading}
          className={`w-full py-2 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Assigning...' : 'Assign Freelancer'}
        </button>

        {message && (
          <div
            className={`mt-4 text-sm ${message.includes('Error') || message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectAssign;
