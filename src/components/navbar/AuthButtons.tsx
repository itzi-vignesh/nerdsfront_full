
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard } from 'lucide-react';

const AuthButtons = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="hidden md:flex items-center space-x-4">
        <Link to="/dashboard">
          <Button 
            className="bg-nerds-green text-nerds-darkblue hover:bg-nerds-green/90 shadow-[0_0_10px_rgba(0,255,0,0.3)] hover:shadow-[0_0_15px_rgba(0,255,0,0.5)] transition-all duration-300"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link to="/login">
        <Button 
          variant="outline" 
          className="border-nerds-green/50 text-nerds-green hover:bg-nerds-green/10 transition-all duration-300 hover:border-nerds-green/80"
        >
          Sign In
        </Button>
      </Link>
      <Link to="/signup">
        <Button 
          className="bg-nerds-green text-nerds-darkblue hover:bg-nerds-green/90 shadow-[0_0_10px_rgba(0,255,0,0.3)] hover:shadow-[0_0_15px_rgba(0,255,0,0.5)] transition-all duration-300"
        >
          Sign Up
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
