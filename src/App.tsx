import React from 'react';
import { LayoutDashboard, Users, Receipt, Activity, Menu, X, FolderOpen } from 'lucide-react';
import ProjectList from './components/ProjectList';
import TeamMembers from './components/TeamMembers';
import BudgetOverview from './components/BudgetOverview';
import RecentActivity from './components/RecentActivity';
import ProjectDetails from './components/ProjectDetails';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [selectedView, setSelectedView] = React.useState('dashboard');

  const renderContent = () => {
    switch (selectedView) {
      case 'projects':
        return <ProjectDetails />;
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <BudgetOverview />
              <ProjectList onViewProject={() => setSelectedView('projects')} />
            </div>
            <div className="space-y-6">
              <TeamMembers />
              <RecentActivity />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-white shadow-lg transition-all duration-300 overflow-hidden`}>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <LayoutDashboard className="h-8 w-8 text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-800">BudgetPro</h1>
          </div>
          <nav className="space-y-2">
            {[
              { icon: LayoutDashboard, text: 'Dashboard', value: 'dashboard' },
              { icon: FolderOpen, text: 'Projects', value: 'projects' },
              { icon: Users, text: 'Team', value: 'team' },
              { icon: Receipt, text: 'Expenses', value: 'expenses' },
              { icon: Activity, text: 'Reports', value: 'reports' },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setSelectedView(item.value)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                  selectedView === item.value ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.text}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;