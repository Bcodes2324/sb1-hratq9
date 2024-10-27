import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Plus, Minus } from 'lucide-react';

export default function BudgetOverview() {
  const [isEditing, setIsEditing] = useState(false);
  const [totalBudget, setTotalBudget] = useState(125000);
  const [adjustmentAmount, setAdjustmentAmount] = useState('');
  const spent = 45200;

  const handleBudgetAdjustment = (type: 'add' | 'subtract') => {
    const amount = parseFloat(adjustmentAmount);
    if (!isNaN(amount)) {
      setTotalBudget(prev => type === 'add' ? prev + amount : prev - amount);
      setAdjustmentAmount('');
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Budget Overview</h2>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          {isEditing ? 'Cancel' : 'Adjust Budget'}
        </button>
      </div>

      {isEditing && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <input
              type="number"
              value={adjustmentAmount}
              onChange={(e) => setAdjustmentAmount(e.target.value)}
              placeholder="Enter amount"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <button
              onClick={() => handleBudgetAdjustment('add')}
              className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
            >
              <Plus className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleBudgetAdjustment('subtract')}
              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
            >
              <Minus className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Total Budget</p>
              <p className="text-2xl font-bold text-green-700">${totalBudget.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Spent</p>
              <p className="text-2xl font-bold text-blue-700">${spent.toLocaleString()}</p>
            </div>
            <TrendingDown className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Remaining</p>
              <p className="text-2xl font-bold text-purple-700">${(totalBudget - spent).toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="h-2 bg-gray-100 rounded-full">
          <div 
            className="h-2 bg-green-500 rounded-full" 
            style={{ width: `${(spent / totalBudget) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>{Math.round((spent / totalBudget) * 100)}% spent</span>
          <span>{Math.round(((totalBudget - spent) / totalBudget) * 100)}% remaining</span>
        </div>
      </div>
    </div>
  );
}