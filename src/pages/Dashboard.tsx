
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserHeader from '@/components/UserHeader';
import { useAuth } from '@/contexts/AuthContext';
import ProfileCompletion from '@/components/dashboard/ProfileCompletion';
import NewLabs from '@/components/dashboard/NewLabs';
import FreeLabOfMonth from '@/components/dashboard/FreeLabOfMonth';
import UserStats from '@/components/dashboard/UserStats';
import SkillMatrix from '@/components/dashboard/SkillMatrix';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data for stats
  const statsData = {
    labsCompleted: user?.labsCompleted || 0,
    achievementsEarned: user?.achievements || 0,
    currentStreak: 5, // Mock data
    totalPoints: 2750, // Mock data
    weeklyActivity: [
      { day: 'Mon', points: 150 },
      { day: 'Tue', points: 320 },
      { day: 'Wed', points: 80 },
      { day: 'Thu', points: 230 },
      { day: 'Fri', points: 150 },
      { day: 'Sat', points: 50 },
      { day: 'Sun', points: 120 }
    ]
  };
  
  return (
    <>
      <Helmet>
        <title>Dashboard | Cyber Nerds Academy</title>
      </Helmet>
      
      <Navbar />
      <UserHeader />
      
      <div className="bg-nerds-darkblue min-h-screen">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <ProfileCompletion completion={user?.profileCompleted || 0} />
              <NewLabs />
            </div>
            
            {/* Middle Column */}
            <div className="space-y-6">
              <FreeLabOfMonth />
              <UserStats stats={statsData} />
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <SkillMatrix skills={user?.skills || {}} />
              
              {/* Certification Eligibility Card */}
              <div className="border border-nerds-gray/30 bg-nerds-darkblue/20 backdrop-blur-sm rounded-xl p-5">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-md bg-nerds-yellow/20 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-nerds-yellow"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path><path d="m9 12 2 2 4-4"></path></svg>
                  </div>
                  <h3 className="text-lg font-bold text-white">Certification Ready</h3>
                </div>
                <p className="text-gray-300 mb-4">You're now eligible to take the "Ethical Hacking Professional" certification exam!</p>
                <button className="w-full bg-nerds-yellow/20 hover:bg-nerds-yellow/30 text-nerds-yellow font-medium py-2 rounded-md transition-colors">
                  View Certification
                </button>
              </div>
              
              {/* Upcoming Events Card */}
              <div className="border border-nerds-gray/30 bg-nerds-darkblue/20 backdrop-blur-sm rounded-xl p-5">
                <h3 className="text-lg font-bold text-white mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                  <div className="border border-nerds-gray/20 rounded-md p-3">
                    <div className="text-nerds-green text-sm font-medium mb-1">APR 20, 2025</div>
                    <h4 className="text-white font-medium mb-1">Advanced Threat Hunting Webinar</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-xs">2:00 PM EST</span>
                      <button className="text-nerds-green text-xs">Add to Calendar</button>
                    </div>
                  </div>
                  <div className="border border-nerds-gray/20 rounded-md p-3">
                    <div className="text-nerds-green text-sm font-medium mb-1">APR 25, 2025</div>
                    <h4 className="text-white font-medium mb-1">CTF Challenge: Network Breach</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-xs">All Day</span>
                      <button className="text-nerds-green text-xs">Register</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Dashboard;
