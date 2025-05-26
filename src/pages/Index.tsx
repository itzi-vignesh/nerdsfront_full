
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import StatisticsSection from '@/components/StatisticsSection';
import CTASection from '@/components/CTASection';
import TrackCard from '@/components/TrackCard';
import LeaderboardCard from '@/components/LeaderboardCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  // Sample data for display
  const featuredTracks = [
    {
      id: 'ethical-hacking',
      title: 'Ethical Hacking',
      description: 'Learn the fundamentals of cybersecurity, types of cyber threats, and basics of ethical hacking. Perfect for beginners.',
      level: 'beginner',
      moduleCount: 6,
      labCount: 24,
      estimatedHours: 30,
      icon: 'ethical'
    },
    {
      id: 'penetration-testing',
      title: 'Penetration Testing',
      description: 'Master web, mobile, and network penetration testing techniques with job-oriented training modules.',
      level: 'intermediate',
      moduleCount: 8,
      labCount: 40,
      estimatedHours: 60,
      icon: 'pentesting'
    },
    {
      id: 'advanced-pentesting',
      title: 'Advanced Pentesting',
      description: 'Enhance your skills with advanced topics like red teaming, exploit development, and OSINT techniques.',
      level: 'advanced',
      moduleCount: 7,
      labCount: 35,
      estimatedHours: 70,
      icon: 'advanced'
    }
  ];

  const topLeaders = [
    {
      rank: 1,
      username: "CyberNinja",
      points: 9580,
      labsCompleted: 87,
      achievements: 24
    },
    {
      rank: 2,
      username: "HackMaster",
      points: 8750,
      labsCompleted: 79,
      achievements: 22
    },
    {
      rank: 3,
      username: "SecureShield",
      points: 8120,
      labsCompleted: 74,
      achievements: 20
    }
  ];

  return (
    <>
      <Helmet>
        <title>NerdsLab Cyber Academy - Master Cybersecurity with Hands-on Labs</title>
        <meta name="description" content="Learn cybersecurity through interactive labs and real-world challenges. Tracks for beginners, job-seekers and professionals." />
      </Helmet>
      
      <Navbar />
      
      <main>
        <HeroSection />
        
        <FeaturesSection />
        
        {/* Featured Tracks Section */}
        <section className="bg-nerds-darkblue py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Featured Learning Tracks</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Choose the right track based on your experience level and career goals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTracks.map((track) => (
                <TrackCard
                  key={track.id}
                  id={track.id}
                  title={track.title}
                  description={track.description}
                  level={track.level as 'beginner' | 'intermediate' | 'advanced'}
                  moduleCount={track.moduleCount}
                  labCount={track.labCount}
                  estimatedHours={track.estimatedHours}
                  icon={track.icon as 'ethical' | 'pentesting' | 'advanced'}
                />
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link to="/tracks" className="text-nerds-yellow hover:text-nerds-yellow/80 font-medium flex items-center gap-1 justify-center">
                View All Learning Tracks <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
        
        <StatisticsSection />
        
        {/* Leaderboard Preview */}
        <section className="bg-nerds-darkblue py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Leaderboard</h2>
              <Link to="/leaderboard" className="text-nerds-yellow hover:text-nerds-yellow/80 font-medium flex items-center gap-1">
                View Full Leaderboard <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="bg-nerds-gray/50 rounded-xl p-6 border border-nerds-gray/30">
              <div className="space-y-4">
                {topLeaders.map((leader) => (
                  <LeaderboardCard 
                    key={leader.rank}
                    rank={leader.rank}
                    username={leader.username}
                    points={leader.points}
                    labsCompleted={leader.labsCompleted}
                    achievements={leader.achievements}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <CTASection />
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
