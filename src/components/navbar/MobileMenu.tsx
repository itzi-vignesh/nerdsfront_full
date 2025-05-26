
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, LayoutDashboard } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface NavItem {
  path: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navItems: NavItem[];
  isAuthenticated: boolean;
}

const MobileMenu = ({ isOpen, setIsOpen, navItems, isAuthenticated }: MobileMenuProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden bg-nerds-darkgray/95 backdrop-blur-sm animate-fade-in">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <div className="p-2">
          <Input 
            placeholder="Search courses..." 
            className="bg-nerds-gray/30 border-nerds-gray/50 text-white placeholder:text-gray-500 w-full"
          />
        </div>
        
        {/* Render dynamic nav items */}
        {navItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path} 
            className="text-white hover:text-nerds-yellow block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        
        <div className="flex space-x-4 px-3 py-2">
          {isAuthenticated && (
            <>
              <button className="relative text-white hover:text-nerds-yellow">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3 rounded-full bg-nerds-red"></span>
              </button>
              <button className="text-white hover:text-nerds-yellow">
                <User className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
        {!isAuthenticated ? (
          <div className="pt-4 border-t border-nerds-gray/30">
            <Link 
              to="/login" 
              className="flex items-center justify-center w-full bg-nerds-green text-nerds-darkblue px-4 py-2 rounded-md font-medium mb-2"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="flex items-center justify-center w-full border border-nerds-green/50 text-nerds-green px-4 py-2 rounded-md font-medium"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="pt-4 border-t border-nerds-gray/30">
            <Link 
              to="/dashboard" 
              className="flex items-center justify-center w-full bg-nerds-green text-nerds-darkblue px-4 py-2 rounded-md font-medium"
              onClick={() => setIsOpen(false)}
            >
              <LayoutDashboard className="mr-2 h-5 w-5" />
              Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
