
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Trophy, Filter, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeaderboardCard from '@/components/LeaderboardCard';

const Leaderboard = () => {
  // Sample leaderboard data
  const weeklyLeaders = [
    { rank: 1, username: 'hackmaster', points: 1250, avatarUrl: '/placeholder.svg', labsCompleted: 8, achievements: 3 },
    { rank: 2, username: 'cyberwarrior', points: 1120, avatarUrl: '/placeholder.svg', labsCompleted: 7, achievements: 2 },
    { rank: 3, username: 'secureninja', points: 980, avatarUrl: '/placeholder.svg', labsCompleted: 6, achievements: 4 },
    { rank: 4, username: 'debugking', points: 870, avatarUrl: '/placeholder.svg', labsCompleted: 5, achievements: 1 },
    { rank: 5, username: 'codehunter', points: 760, avatarUrl: '/placeholder.svg', labsCompleted: 4, achievements: 2 },
    { rank: 6, username: 'pentest_pro', points: 720, avatarUrl: '/placeholder.svg', labsCompleted: 4, achievements: 3 },
    { rank: 7, username: 'vulnerabilityscanner', points: 690, avatarUrl: '/placeholder.svg', labsCompleted: 3, achievements: 1 },
    { rank: 8, username: 'securityguru', points: 650, avatarUrl: '/placeholder.svg', labsCompleted: 3, achievements: 2 },
  ];

  const monthlyLeaders = [
    { rank: 1, username: 'securityguru', points: 5280, avatarUrl: '/placeholder.svg', labsCompleted: 28, achievements: 8 },
    { rank: 2, username: 'hackmaster', points: 4950, avatarUrl: '/placeholder.svg', labsCompleted: 25, achievements: 6 },
    { rank: 3, username: 'debugking', points: 4320, avatarUrl: '/placeholder.svg', labsCompleted: 22, achievements: 7 },
    { rank: 4, username: 'cyberwarrior', points: 3980, avatarUrl: '/placeholder.svg', labsCompleted: 20, achievements: 5 },
    { rank: 5, username: 'codehunter', points: 3760, avatarUrl: '/placeholder.svg', labsCompleted: 19, achievements: 4 },
    { rank: 6, username: 'secureninja', points: 3540, avatarUrl: '/placeholder.svg', labsCompleted: 18, achievements: 6 },
    { rank: 7, username: 'vulnerabilityscanner', points: 2980, avatarUrl: '/placeholder.svg', labsCompleted: 15, achievements: 3 },
    { rank: 8, username: 'pentest_pro', points: 2650, avatarUrl: '/placeholder.svg', labsCompleted: 14, achievements: 4 },
  ];

  const allTimeLeaders = [
    { rank: 1, username: 'securityguru', points: 28450, avatarUrl: '/placeholder.svg', labsCompleted: 145, achievements: 24 },
    { rank: 2, username: 'debugking', points: 26120, avatarUrl: '/placeholder.svg', labsCompleted: 132, achievements: 22 },
    { rank: 3, username: 'hackmaster', points: 24980, avatarUrl: '/placeholder.svg', labsCompleted: 125, achievements: 21 },
    { rank: 4, username: 'cyberwarrior', points: 22340, avatarUrl: '/placeholder.svg', labsCompleted: 118, achievements: 19 },
    { rank: 5, username: 'secureninja', points: 19860, avatarUrl: '/placeholder.svg', labsCompleted: 105, achievements: 17 },
    { rank: 6, username: 'codehunter', points: 18450, avatarUrl: '/placeholder.svg', labsCompleted: 95, achievements: 15 },
    { rank: 7, username: 'pentest_pro', points: 16780, avatarUrl: '/placeholder.svg', labsCompleted: 88, achievements: 14 },
    { rank: 8, username: 'vulnerabilityscanner', points: 15650, avatarUrl: '/placeholder.svg', labsCompleted: 82, achievements: 12 },
  ];

  return (
    <>
      <Helmet>
        <title>Leaderboard - NerdsLab Cyber Academy</title>
        <meta name="description" content="Track your progress and compete with other cybersecurity enthusiasts" />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-nerds-darkblue py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center">
                <Trophy className="h-8 w-8 text-nerds-yellow mr-2" />
                Leaderboard
              </h1>
              <p className="text-gray-400 mt-1">
                Compete with other cybersecurity enthusiasts and climb the ranks
              </p>
            </div>
            
            <Button variant="outline" className="border-nerds-gray/50 text-white hover:bg-nerds-gray/30">
              <Filter className="h-4 w-4 mr-2" /> Filter Rankings
            </Button>
          </div>
          
          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 bg-nerds-gray/20">
              <TabsTrigger value="weekly" className="data-[state=active]:bg-nerds-yellow/20 data-[state=active]:text-nerds-yellow">Weekly</TabsTrigger>
              <TabsTrigger value="monthly" className="data-[state=active]:bg-nerds-yellow/20 data-[state=active]:text-nerds-yellow">Monthly</TabsTrigger>
              <TabsTrigger value="all-time" className="data-[state=active]:bg-nerds-yellow/20 data-[state=active]:text-nerds-yellow">All Time</TabsTrigger>
            </TabsList>
            
            <TabsContent value="weekly" className="mt-0">
              <div className="grid grid-cols-1 gap-4">
                {weeklyLeaders.map((leader) => (
                  <LeaderboardCard
                    key={leader.username}
                    rank={leader.rank}
                    username={leader.username}
                    points={leader.points}
                    avatarUrl={leader.avatarUrl}
                    labsCompleted={leader.labsCompleted}
                    achievements={leader.achievements}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="monthly" className="mt-0">
              <div className="grid grid-cols-1 gap-4">
                {monthlyLeaders.map((leader) => (
                  <LeaderboardCard
                    key={leader.username}
                    rank={leader.rank}
                    username={leader.username}
                    points={leader.points}
                    avatarUrl={leader.avatarUrl}
                    labsCompleted={leader.labsCompleted}
                    achievements={leader.achievements}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="all-time" className="mt-0">
              <div className="grid grid-cols-1 gap-4">
                {allTimeLeaders.map((leader) => (
                  <LeaderboardCard
                    key={leader.username}
                    rank={leader.rank}
                    username={leader.username}
                    points={leader.points}
                    avatarUrl={leader.avatarUrl}
                    labsCompleted={leader.labsCompleted}
                    achievements={leader.achievements}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 bg-nerds-gray/20 border border-nerds-gray/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white flex items-center mb-4">
              <Users className="h-5 w-5 text-nerds-green mr-2" />
              Your Position
            </h2>
            
            <LeaderboardCard
              rank={42}
              username="you"
              points={340}
              avatarUrl="/placeholder.svg"
              labsCompleted={2}
              achievements={1}
              isCurrentUser={true}
            />
            
            <p className="text-gray-400 mt-4 text-sm">
              Complete more labs and challenges to climb the leaderboard!
            </p>
            
            <div className="mt-4">
              <Button className="bg-nerds-green text-nerds-darkblue hover:bg-nerds-green/90">
                View Available Challenges
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Leaderboard;
