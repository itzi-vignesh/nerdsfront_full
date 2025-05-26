
import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const NavLink = ({ to, isActive, children, onMouseEnter, onMouseLeave }: NavLinkProps) => {
  return (
    <Link 
      to={to} 
      className={`text-gray-300 hover:text-nerds-green focus:text-nerds-green transition-colors flex items-center space-x-1 ${
        isActive ? 'text-nerds-green' : ''
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Link>
  );
};

export default NavLink;
