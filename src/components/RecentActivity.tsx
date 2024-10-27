import React from 'react';
import { DollarSign, FileText, Users } from 'lucide-react';

export default function RecentActivity() {
  const activities = [
    {
      type: 'expense',
      title: 'New expense added',
      description: 'Software licenses purchased',
      amount: '$2,500',
      time: '2h ago',
      icon: DollarSign,
      color: 'text-green-500 bg-green-100',
    },
    {
      type: 'document',
      title: 'Budget report updated',
      description: 'Q1 2024 report generated',
      time: '5h ago',
      icon: FileText,
      color: 'text-blue-500 bg-blue-100',
    },
    {
      type: 'team',
      title: 'New team member',
      description: 'David Kim joined the project',
      time: '1d ago',
      icon: Users,
      color: 'text-purple-500 bg-purple-100',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${activity.color}`}>
              <activity.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.description}</p>
              {activity.amount && (
                <p className="text-sm font-medium text-green-600 mt-0.5">{activity.amount}</p>
              )}
            </div>
            <span className="text-xs text-gray-400">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}