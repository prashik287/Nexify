import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // For delete icon
import Loading from './Loading';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ManageFreelancers() {
  const [freelancers, setFreelancers] = useState([]);
  const [FormData, setFormData] = useState({
    email: '',
    projectId: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { projectId } = useParams();
  const [Project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      setLoading(true);
      try {
        const response = await axios.post("http://127.0.0.1:5000/project/rtun", {
          projectid: projectId,
        });
        console.log(response.data);

        if (response.data && response.data.freelancer) {
          const transformedProject = transformProjectData(response.data);
          setProject(transformedProject);

          const transformedFreelancers = response.data.freelancer.map((freelancer, index) => ({
            id: freelancer.id || freelancer._id || `index-${index}`,
            ...freelancer,
          }));
          setFreelancers(transformedFreelancers);
        } else {
          console.warn("No project data returned.");
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

  const handleDelete = async (freelancerId, freelancerEmail, projectId) => {
    if (window.confirm('Are you sure you want to remove this freelancer from the project?')) {
      setLoading(true);
      try {
        const updatedFormData = {
          email: freelancerEmail,
          projectId: projectId,
        };
        setFormData(updatedFormData);
        console.log("Form Data:", updatedFormData);

        const response = await axios.post("http://127.0.0.1:5000/project/rmf", updatedFormData);
        console.log(response.data.message);

        setFreelancers(freelancers.filter((freelancer) => freelancer.id !== freelancerId));
        setMessage('Freelancer removed successfully.');
      } catch (error) {
        console.error("Error deleting freelancer:", error);
        setMessage('Failed to remove freelancer.');
      } finally {
        setLoading(false);
      }
    }
  };

  const transformProjectData = (data) => {
    return {
      ...data,
      Min_budget: data.Min_budget?.$numberDecimal || data.Min_budget,
      Max_budget: data.Max_budget?.$numberDecimal || data.Max_budget,
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Freelancers</h2>

      {loading && (
        <ul>
          <li>
            <div className="animate-pulse flex flex-col items-center gap-4 w-80">
              <div>
                <div className="w-48 h-6 bg-slate-400 rounded-md"></div>
                <div className="w-28 h-4 bg-slate-400 mx-auto mt-3 rounded-md"></div>
              </div>
              <div className="h-7 bg-slate-400 w-full rounded-md"></div>
              <div className="h-7 bg-slate-400 w-full rounded-md"></div>
              <div className="h-7 bg-slate-400 w-full rounded-md"></div>
              <div className="h-7 bg-slate-400 w-1/2 rounded-md"></div>
            </div>
          </li>
        </ul>
      )}

      {message && <p className="text-sm text-green-600">{message}</p>}

      <ul className="space-y-4">
        {freelancers.length > 0 ? (
          freelancers.map((freelancer) => (
            <li key={freelancer.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
              <span className="text-lg text-gray-700">
                {freelancer.name} ({freelancer.Email})
              </span>
              <button
                onClick={() => {
                  console.log("Deleting freelancer with Email:", freelancer.Email);
                  handleDelete(freelancer.id, freelancer.Email, projectId);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt size={20} />
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No freelancers assigned to this project.</li>
        )}
      </ul>
    </div>
  );
}

export default ManageFreelancers;
