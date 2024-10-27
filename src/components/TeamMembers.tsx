import React from 'react';
import { Plus, ArrowRight } from 'lucide-react';

export default function TeamMembers() {
  const team = [
    {
      name: 'Sarah Wilson',
      role: 'Project Manager',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80',
      online: true,
    },
    {
      name: 'Michael Chen',
      role: 'Developer',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80',
      online: true,
    },
    {
      name: 'Emma Thompson',
      role: 'Designer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80',
      online: false,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Team Members</h2>
        <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
          <Plus className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-4">
        {team.map((member, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img src={member.avatar} alt="" className="h-10 w-10 rounded-full" />
                {member.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></span>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">{member.name}</h3>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            </div>
            <button className="text-sm text-gray-400 hover:text-gray-600">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}