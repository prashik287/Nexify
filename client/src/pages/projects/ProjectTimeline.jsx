import React from 'react';

const ProjectTimeline = () => {
  // Sample data for project milestones
  const milestones = [
    { date: '2025-01-01', title: 'Project Kickoff', description: 'The project officially begins.' },
    { date: '2025-01-15', title: 'Design Phase', description: 'Initial designs and wireframes.' },
    { date: '2025-02-01', title: 'Development Begins', description: 'Development of core features starts.' },
    { date: '2025-03-01', title: 'Beta Testing', description: 'Testing phase begins with selected users.' },
    { date: '2025-04-01', title: 'Launch', description: 'The project is launched for public use.' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Project Timeline</h2>
      <div className="relative">
        <div className="border-l-4 border-gray-300 pl-6">
          {milestones.map((milestone, index) => (
            <div key={index} className="mb-8">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-500 rounded-full text-white flex justify-center items-center">
                  <span>{index + 1}</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                  <p className="text-sm text-gray-500">{new Date(milestone.date).toLocaleDateString()}</p>
                </div>
              </div>
              {index < milestones.length - 1 && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-8 w-8 bg-white border-2 border-blue-500 rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;
