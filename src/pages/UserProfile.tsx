
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserHeader from '@/components/UserHeader';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfileInfo from '@/components/profile/ProfileInfo';
import AccountSettings from '@/components/profile/AccountSettings';
import BadgesAndCertifications from '@/components/profile/BadgesAndCertifications';
import UserProgress from '@/components/profile/UserProgress';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam === 'settings' ? 'settings' : 'profile');
  
  // Update active tab when URL search params change
  useEffect(() => {
    setActiveTab(tabParam === 'settings' ? 'settings' : 'profile');
  }, [tabParam]);
  
  // For public profiles, we would fetch the user data from the API using the username parameter
  const isOwnProfile = !username;
  
  if (!user) return null;
  
  return (
    <>
      <Helmet>
        <title>{isOwnProfile ? 'Your Profile' : `${username}'s Profile`} | Cyber Nerds Academy</title>
      </Helmet>
      
      <Navbar />
      {isOwnProfile && <UserHeader />}
      
      <div className="bg-nerds-darkblue min-h-screen">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          {isOwnProfile ? (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="profile" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <ProfileInfo />
                    <BadgesAndCertifications />
                  </div>
                  <div className="space-y-6">
                    <UserProgress 
                      level={user.level}
                      experience={user.experience}
                      experienceToNextLevel={user.experienceToNextLevel}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="mt-0">
                <div className="max-w-2xl mx-auto">
                  <AccountSettings />
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            // Public profile view
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <ProfileInfo />
                <BadgesAndCertifications />
              </div>
              <div className="space-y-6">
                <UserProgress 
                  level={user.level}
                  experience={user.experience}
                  experienceToNextLevel={user.experienceToNextLevel}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default UserProfile;
