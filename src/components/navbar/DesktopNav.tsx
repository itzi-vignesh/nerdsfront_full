
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Globe, Trophy, Users, Shield, Zap, Target, ChevronDown, CalendarDays, Flag } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  path: string;
  label: string;
}

interface DesktopNavProps {
  isActive: (path: string) => boolean;
  hoveredIcon: string | null;
  setHoveredIcon: (icon: string | null) => void;
  navItems: NavItem[];
}

const DesktopNav = ({ isActive, hoveredIcon, setHoveredIcon, navItems }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center space-x-6">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger 
              className={`text-gray-300 hover:text-white focus:text-white 
                ${isActive('/tracks') ? 'text-white font-medium bg-nerds-gray/40' : ''}
                px-3 py-2 rounded-md transition-all duration-300`}
              onMouseEnter={() => setHoveredIcon('tracks')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <div className="flex items-center space-x-2">
                <BookOpen 
                  className={`h-4 w-4 transition-all duration-300 ${
                    hoveredIcon === 'tracks' ? 'text-nerds-blue' : ''
                  }`} 
                />
                <span>Learning Tracks</span>
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-nerds-gray border border-nerds-gray/50 p-4 rounded-md shadow-lg min-w-[500px] max-w-[600px]">
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  to="/tracks/ethical-hacking" 
                  className="flex flex-col space-y-1 p-3 rounded-md transition-colors hover:bg-nerds-blue/10 group"
                >
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-nerds-blue group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium text-white">Ethical Hacking</span>
                  </div>
                  <p className="text-sm text-gray-400">Fundamentals of cybersecurity for beginners</p>
                </Link>
                <Link 
                  to="/tracks/penetration-testing" 
                  className="flex flex-col space-y-1 p-3 rounded-md transition-colors hover:bg-nerds-green/10 group"
                >
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-nerds-green group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium text-white">Penetration Testing</span>
                  </div>
                  <p className="text-sm text-gray-400">Advanced security testing techniques</p>
                </Link>
                <Link 
                  to="/tracks/advanced-pentesting" 
                  className="flex flex-col space-y-1 p-3 rounded-md transition-colors hover:bg-nerds-red/10 group"
                >
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-nerds-red group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium text-white">Advanced Pentesting</span>
                  </div>
                  <p className="text-sm text-gray-400">Professional red team techniques</p>
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger 
              className={`text-gray-300 hover:text-white focus:text-white
                ${isActive('/resources') || isActive('/blog') || isActive('/tools') || isActive('/events') ? 'text-white font-medium bg-nerds-gray/40' : ''}
                px-3 py-2 rounded-md transition-all duration-300`}
              onMouseEnter={() => setHoveredIcon('resources')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <div className="flex items-center space-x-2">
                <Globe 
                  className={`h-4 w-4 transition-all duration-300 ${
                    hoveredIcon === 'resources' ? 'text-nerds-blue' : ''
                  }`} 
                />
                <span>Resources</span>
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-nerds-gray border border-nerds-gray/50 p-4 rounded-md shadow-lg min-w-[300px] max-w-[400px]">
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/blog" 
                  className="flex items-center space-x-2 p-2 rounded-md transition-colors hover:bg-nerds-blue/10 group"
                >
                  <BookOpen className="h-5 w-5 text-nerds-blue group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-white">Blog & Articles</span>
                </Link>
                <Link 
                  to="/tools" 
                  className="flex items-center space-x-2 p-2 rounded-md transition-colors hover:bg-nerds-green/10 group"
                >
                  <Zap className="h-5 w-5 text-nerds-green group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-white">Security Tools</span>
                </Link>
                <Link 
                  to="/events" 
                  className="flex items-center space-x-2 p-2 rounded-md transition-colors hover:bg-nerds-red/10 group"
                >
                  <CalendarDays className="h-5 w-5 text-nerds-red group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-white">Webinars & Events</span>
                  <Badge className="ml-2 bg-nerds-red text-white text-xs">Live</Badge>
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Render dynamic nav items */}
      {navItems.map((item) => (
        item.path === '/leaderboard' ? (
          <Link 
            key={item.path}
            to={item.path} 
            className={`text-gray-300 hover:text-white focus:text-white transition-all duration-300 
              flex items-center space-x-2 px-3 py-2 rounded-md
              ${isActive(item.path) ? 'text-white font-medium bg-nerds-gray/40' : ''}`}
            onMouseEnter={() => setHoveredIcon('leaderboard')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <Trophy 
              className={`h-4 w-4 transition-all duration-300 ${
                hoveredIcon === 'leaderboard' ? 'text-nerds-blue' : ''
              }`} 
            />
            <span>{item.label}</span>
          </Link>
        ) : item.path === '/community' ? (
          <Link 
            key={item.path}
            to={item.path}
            className={`text-gray-300 hover:text-white focus:text-white transition-all duration-300 
              flex items-center space-x-2 px-3 py-2 rounded-md
              ${isActive(item.path) ? 'text-white font-medium bg-nerds-gray/40' : ''}`}
            onMouseEnter={() => setHoveredIcon('community')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <Users 
              className={`h-4 w-4 transition-all duration-300 ${
                hoveredIcon === 'community' ? 'text-nerds-blue' : ''
              }`} 
            />
            <span>{item.label}</span>
          </Link>
        ) : item.path === '/plans' ? (
          <Link 
            key={item.path}
            to={item.path}
            className={`text-gray-300 hover:text-white focus:text-white transition-all duration-300 
              flex items-center space-x-2 px-3 py-2 rounded-md
              ${isActive(item.path) ? 'text-white font-medium bg-nerds-gray/40' : ''}`}
            onMouseEnter={() => setHoveredIcon('plans')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <Flag 
              className={`h-4 w-4 transition-all duration-300 ${
                hoveredIcon === 'plans' ? 'text-nerds-blue' : ''
              }`} 
            />
            <span>{item.label}</span>
          </Link>
        ) : item.path !== '/tracks' && item.path !== '/blog' && item.path !== '/tools' && item.path !== '/events' ? (
          <Link 
            key={item.path}
            to={item.path}
            className={`text-gray-300 hover:text-white focus:text-white transition-all duration-300 
              flex items-center space-x-2 px-3 py-2 rounded-md
              ${isActive(item.path) ? 'text-white font-medium bg-nerds-gray/40' : ''}`}
          >
            <span>{item.label}</span>
          </Link>
        ) : null
      ))}
    </div>
  );
};

export default DesktopNav;
