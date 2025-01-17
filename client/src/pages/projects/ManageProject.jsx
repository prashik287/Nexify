import React, { useState } from 'react';

function ManageProject() {
  const [status, setStatus] = useState('Open'); // Default status set to 'Open'

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Update Project Status</h2>
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl text-gray-700">Current Status:</span>
        <span className={`font-semibold text-lg ${status === 'Completed' ? 'text-green-500' : status === 'Stopped' ? 'text-yellow-500' : status === 'Terminated' ? 'text-red-500' : 'text-blue-500'}`}>
          {status}
        </span>
      </div>
      
      <div className="mb-4">
        <label htmlFor="status" className="block text-lg text-gray-700 mb-2">Select Status</label>
        <select
          id="status"
          value={status}
          onChange={handleStatusChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none bg-white focus:border-blue-500"
        >
          <option value="Open">Open</option>
          <option value="Completed">Completed</option>
          <option value="Stopped">Stopped</option>
          <option value="Terminated">Terminated</option>
        </select>
      </div>

      <button
        onClick={() => alert(`Project status updated to ${status}`)} // Placeholder for actual update logic
        className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Update Status
      </button>
    </div>
  );
}

export default ManageProject;
