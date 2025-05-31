import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, Settings } from 'lucide-react';

const AgentSidebar: React.FC = () => {
  const location = useLocation();
  const [comingSoon, setComingSoon] = useState<string | null>(null);

  const handleComingSoon = (label: string) => {
    setComingSoon(label);
    setTimeout(() => setComingSoon(null), 2000);
  };

  return (
    <div className="w-64 h-full bg-white border-r flex flex-col py-8 px-4 shadow-md">
      <div className="mb-8 text-2xl font-bold text-nz-blue">Agent Portal</div>
      <nav className="flex flex-col gap-4">
        <Link
          to="/agent/dashboard"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${location.pathname === '/agent/dashboard' ? 'bg-nz-blue text-white' : 'text-gray-700 hover:bg-nz-blue/10'}`}
        >
          <Home size={20} /> Home
        </Link>
        <button
          className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-nz-blue/10 transition-colors"
          onClick={() => handleComingSoon('Dashboard')}
        >
          <LayoutDashboard size={20} /> Dashboard
        </button>
        <button
          className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-nz-blue/10 transition-colors"
          onClick={() => handleComingSoon('Settings')}
        >
          <Settings size={20} /> Settings
        </button>
      </nav>
      {comingSoon && (
        <div className="mt-8 p-3 bg-yellow-100 text-yellow-800 rounded text-center animate-fadeIn">
          {comingSoon} - Coming soon
        </div>
      )}
    </div>
  );
};

export default AgentSidebar; 