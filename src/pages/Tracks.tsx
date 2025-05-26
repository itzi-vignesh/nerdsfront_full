
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrackCard from '@/components/TrackCard';

const Tracks = () => {
  // Sample track data
  const tracks = [
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
    },
    {
      id: 'web-app-security',
      title: 'Web Application Security',
      description: 'Focus on security vulnerabilities specific to web applications, from basic XSS to advanced client-side attacks.',
      level: 'intermediate',
      moduleCount: 5,
      labCount: 28,
      estimatedHours: 45,
      icon: 'pentesting'
    },
    {
      id: 'mobile-security',
      title: 'Mobile Application Security',
      description: 'Learn to identify and exploit vulnerabilities in Android and iOS applications with hands-on labs.',
      level: 'intermediate',
      moduleCount: 4,
      labCount: 22,
      estimatedHours: 40,
      icon: 'pentesting'
    },
    {
      id: 'network-security',
      title: 'Network Security',
      description: 'Master the techniques for securing networks, identifying vulnerabilities, and preventing unauthorized access.',
      level: 'intermediate',
      moduleCount: 6,
      labCount: 30,
      estimatedHours: 50,
      icon: 'pentesting'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Learning Tracks - NerdsLab Cyber Academy</title>
        <meta name="description" content="Explore our cybersecurity learning tracks for beginners, job-seekers, and professionals." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-nerds-darkblue py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Learning Tracks</h1>
              <p className="text-gray-400 mt-1">
                Choose a learning path that matches your skill level and career goals
              </p>
            </div>
            
            <Button variant="outline" className="border-nerds-gray/50 text-white hover:bg-nerds-gray/30">
              <Filter className="h-4 w-4 mr-2" /> Filter Tracks
            </Button>
          </div>
          
          <Separator className="mb-8 bg-nerds-gray/30" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tracks.map((track) => (
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
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Tracks;
