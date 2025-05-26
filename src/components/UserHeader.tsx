
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LayoutDashboard, Wrench, Settings, LogOut } from 'lucide-react';

const UserHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  
  if (!user) return null;
  
  const getInitials = () => {
    return user.fullName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="bg-nerds-darkblue border-b border-nerds-gray/30 pb-4">
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-nerds-green">
              <AvatarImage src={user.avatarUrl} alt={user.username} />
              <AvatarFallback className="bg-nerds-gray text-white">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold text-white">{user.fullName}</h1>
              <p className="text-gray-400 text-sm">@{user.username}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
            {/* Navigation Links */}
            <div className="flex items-center gap-1 sm:gap-3">
              <Link
                to="/dashboard"
                className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${
                  currentPath === '/dashboard' 
                    ? 'text-nerds-green bg-nerds-gray/20' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              
              <Link
                to="/labs"
                className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${
                  currentPath === '/labs' 
                    ? 'text-nerds-green bg-nerds-gray/20' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Wrench className="w-4 h-4" />
                <span className="hidden sm:inline">Labs</span>
              </Link>
              
              <Link
                to="/profile?tab=settings"
                className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${
                  currentPath === '/profile' && location.search.includes('tab=settings')
                    ? 'text-nerds-green bg-nerds-gray/20' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
              
              <div className="ml-3 border-l border-nerds-gray/30 pl-3">
                <button 
                  onClick={logout}
                  className="text-gray-400 hover:text-white flex items-center gap-1 text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
