import React, { useState } from 'react';
import { Plus, Clock, DollarSign, Users, FileText, Edit2, Save, X } from 'lucide-react';
import ExpenseForm from './ExpenseForm';

export default function ProjectDetails() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [editedBudget, setEditedBudget] = useState('');
  const [project, setProject] = useState({
    id: 1,
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design and improved functionality',
    budget: 45000,
    spent: 32000,
    dueDate: '2024-04-15',
    status: 'In Progress',
    team: [
      {
        name: 'Sarah Wilson',
        role: 'Project Manager',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80',
      },
      {
        name: 'Michael Chen',
        role: 'Developer',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80',
      },
    ],
    expenses: [
      {
        id: 1,
        description: 'Design Software Licenses',
        amount: 2500,
        date: '2024-02-15',
        submittedBy: 'Sarah Wilson',
        attachment: null,
      },
      {
        id: 2,
        description: 'Cloud Infrastructure',
        amount: 1800,
        date: '2024-02-20',
        submittedBy: 'Michael Chen',
        attachment: null,
      },
    ],
  });

  const handleBudgetEdit = () => {
    const newBudget = parseFloat(editedBudget);
    if (!isNaN(newBudget) && newBudget > 0) {
      setProject(prev => ({
        ...prev,
        budget: newBudget
      }));
      setIsEditingBudget(false);
    }
  };

  const handleAddExpense = (newExpense) => {
    setProject(prev => ({
      ...prev,
      expenses: [...prev.expenses, {
        id: prev.expenses.length + 1,
        ...newExpense
      }],
      spent: prev.spent + newExpense.amount
    }));
  };

  const handleDeleteExpense = (expenseId) => {
    setProject(prev => {
      const expense = prev.expenses.find(e => e.id === expenseId);
      return {
        ...prev,
        expenses: prev.expenses.filter(e => e.id !== expenseId),
        spent: prev.spent - (expense?.amount || 0)
      };
    });
  };

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
            <p className="text-gray-500 mt-1">{project.description}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
          }`}>
            {project.status}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Due Date</p>
              <p className="font-medium">{new Date(project.dueDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <DollarSign className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Budget</p>
              {isEditingBudget ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={editedBudget}
                    onChange={(e) => setEditedBudget(e.target.value)}
                    className="w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <button onClick={handleBudgetEdit} className="text-green-600 hover:text-green-700">
                    <Save className="h-4 w-4" />
                  </button>
                  <button onClick={() => setIsEditingBudget(false)} className="text-red-600 hover:text-red-700">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <p className="font-medium">${project.budget.toLocaleString()}</p>
                  <button onClick={() => {
                    setEditedBudget(project.budget.toString());
                    setIsEditingBudget(true);
                  }} className="text-gray-400 hover:text-gray-600">
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Team Members</p>
              <p className="font-medium">{project.team.length} members</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {['overview', 'expenses', 'team', 'documents'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Overview</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Total Spent</span>
                    <span className="font-medium">${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-indigo-500 rounded-full"
                      style={{ width: `${(project.spent / project.budget) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'expenses' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Recent Expenses</h3>
                <button
                  onClick={() => setShowExpenseForm(true)}
                  className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Expense</span>
                </button>
              </div>
              <div className="space-y-4">
                {project.expenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">{expense.description}</p>
                        <button
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">Submitted by {expense.submittedBy}</p>
                      {expense.attachment && (
                        <img src={expense.attachment} alt="Receipt" className="mt-2 h-20 w-auto rounded" />
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-medium text-gray-900">${expense.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
                <button className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-700">
                  <Plus className="h-4 w-4" />
                  <span>Add Member</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.team.map((member, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img src={member.avatar} alt="" className="h-10 w-10 rounded-full" />
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Project Documents</h3>
                <button className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-700">
                  <Plus className="h-4 w-4" />
                  <span>Upload Document</span>
                </button>
              </div>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No documents uploaded yet</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showExpenseForm && (
        <ExpenseForm
          onSubmit={handleAddExpense}
          onClose={() => setShowExpenseForm(false)}
        />
      )}
    </div>
  );
}