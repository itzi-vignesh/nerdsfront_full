
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import NavLogo from './navbar/NavLogo';
import DesktopNav from './navbar/DesktopNav';
import SearchAndNotifications from './navbar/SearchAndNotifications';
import AuthButtons from './navbar/AuthButtons';
import MobileMenu from './navbar/MobileMenu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const { isAuthenticated } = useAuth();
  
  // Interactive hover effects for icons
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Add plans to the navigation data that's passed to DesktopNav
  const navItems = [
    { path: '/tracks', label: 'Learning Tracks' },
    { path: '/tools', label: 'Tools' },
    { path: '/blog', label: 'Blog & Articles' },
    { path: '/events', label: 'Webinars & Events' },
    { path: '/plans', label: 'Plans' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/community', label: 'Community' },
  ];

  return (
    <nav className="relative bg-nerds-gray/20 backdrop-blur-lg border-b border-nerds-gray/30 py-4 sticky top-0 z-50 w-full">
      <div className="relative z-10 w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLogo />

          {/* Desktop Navigation */}
          {!isMobile && (
            <DesktopNav 
              isActive={isActive}
              hoveredIcon={hoveredIcon}
              setHoveredIcon={setHoveredIcon}
              navItems={navItems}
            />
          )}

          <SearchAndNotifications 
            showSearch={showSearch}
            setShowSearch={setShowSearch}
            isAuthenticated={isAuthenticated}
          />

          {!isAuthenticated && <AuthButtons />}

          {isMobile && (
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden rounded-md p-2 text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          )}
        </div>

        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} navItems={navItems} isAuthenticated={isAuthenticated} />
      </div>
    </nav>
  );
};

export default Navbar;
