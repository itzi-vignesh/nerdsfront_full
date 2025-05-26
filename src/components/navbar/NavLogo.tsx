
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 group">
      <div className="relative w-8 h-8 bg-nerds-green/20 rounded-md flex items-center justify-center border border-nerds-green/30 transition-all duration-300 group-hover:bg-nerds-green/30 group-hover:scale-110">
        <Shield
          className="w-5 h-5 text-nerds-green transition-all duration-300 group-hover:text-nerds-green/90"
          strokeWidth={2}
        />
        <div className="absolute -inset-1 bg-nerds-green/10 rounded-lg blur-sm opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
      </div>
      <span className="text-white font-bold text-xl tracking-tight">
        <span className="text-nerds-green transition-colors duration-300 group-hover:text-glow">NerdsLab</span>
      </span>
    </Link>
  );
};

export default NavLogo;
