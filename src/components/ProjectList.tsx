import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';

export default function ProjectList({ onViewProject }) {
  const projects = [
    {
      name: 'Website Redesign',
      budget: 45000,
      spent: 32000,
      dueDate: '2024-04-15',
      status: 'In Progress',
      team: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80',
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80',
      ],
    },
    {
      name: 'Mobile App Development',
      budget: 80000,
      spent: 13200,
      dueDate: '2024-05-30',
      status: 'On Track',
      team: [
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80',
      ],
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Active Projects</h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View All</button>
      </div>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">{project.name}</h3>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}>
                {project.status}
              </span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex -space-x-2">
                {project.team.map((avatar, i) => (
                  <img key={i} src={avatar} alt="" className="h-8 w-8 rounded-full border-2 border-white" />
                ))}
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Budget spent</span>
                <span className="font-medium text-gray-900">${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className="h-2 bg-indigo-500 rounded-full"
                  style={{ width: `${(project.spent / project.budget) * 100}%` }}
                ></div>
              </div>
            </div>
            <button
              onClick={onViewProject}
              className="w-full mt-4 flex items-center justify-center space-x-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              <span>View Details</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}