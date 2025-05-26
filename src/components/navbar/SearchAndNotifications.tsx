
import React from 'react';
import { Search, Bell } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface SearchAndNotificationsProps {
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
  isAuthenticated: boolean;
}

const SearchAndNotifications = ({ showSearch, setShowSearch, isAuthenticated }: SearchAndNotificationsProps) => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      {showSearch ? (
        <div className="relative w-64 transition-all duration-300">
          <Input 
            placeholder="Search courses..." 
            className="bg-nerds-gray/30 border-nerds-gray/50 text-white placeholder:text-gray-500 focus:border-nerds-green pr-8"
            autoFocus
            onBlur={() => setShowSearch(false)}
          />
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-nerds-green"
            onClick={() => setShowSearch(false)}
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button 
          className="text-gray-300 hover:text-nerds-green transition-colors duration-300 focus:outline-none"
          onClick={() => setShowSearch(true)}
          aria-label="Search"
        >
          <Search className="h-5 w-5 nav-icon" />
        </button>
      )}
      
      {isAuthenticated && (
        <button className="relative text-gray-300 hover:text-nerds-green transition-colors duration-300 focus:outline-none" aria-label="Notifications">
          <Bell className="h-5 w-5 nav-icon" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3 rounded-full bg-nerds-red">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nerds-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-nerds-red"></span>
          </span>
        </button>
      )}
    </div>
  );
};

export default SearchAndNotifications;
