
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, Clock, Target, Award, User, FileText, Beaker, BookOpen, ShieldCheck, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ModuleCard from '@/components/ModuleCard';

const TrackDetail = () => {
  const { trackId } = useParams<{ trackId: string }>();
  
  // Mock data - would come from API in real app
  const tracks = {
    'ethical-hacking': {
      title: 'Ethical Hacking',
      subtitle: 'For School & College Students (Beginners)',
      description: 'This track is designed for absolute beginners to learn the fundamentals of cybersecurity and ethical hacking. You\'ll explore the basics of computer security, understand common cyber threats, and learn the ethical aspects of hacking.',
      level: 'beginner',
      icon: 'shield',
      progress: 0,
      moduleCount: 6,
      labCount: 24,
      estimatedHours: 30,
      students: 4250,
      certificate: true,
      modules: [
        {
          id: 'eh-intro',
          title: 'Introduction to Cybersecurity',
          description: 'Understand the core concepts of cybersecurity and why it matters in today\'s digital world.',
          labCount: 3,
          contentCount: 5,
          estimatedHours: 4,
          isLocked: false
        },
        {
          id: 'eh-threats',
          title: 'Types of Cyber Threats',
          description: 'Learn about the different types of cyber threats, how they work, and their potential impact.',
          labCount: 4,
          contentCount: 6,
          estimatedHours: 5,
          isLocked: false
        },
        {
          id: 'eh-fundamentals',
          title: 'Fundamentals of Ethical Hacking',
          description: 'Understand the principles and ethics behind hacking, and the difference between ethical and malicious hacking.',
          labCount: 5,
          contentCount: 7,
          estimatedHours: 6,
          isLocked: true
        },
        {
          id: 'eh-crypto',
          title: 'Cryptography Basics',
          description: 'Learn the fundamentals of encryption, hashing, and how cryptography protects digital systems.',
          labCount: 4,
          contentCount: 5,
          estimatedHours: 5,
          isLocked: true
        },
        {
          id: 'eh-social',
          title: 'Internet Safety & Social Engineering',
          description: 'Understand how social engineering attacks work and learn to protect yourself online.',
          labCount: 3,
          contentCount: 4,
          estimatedHours: 4,
          isLocked: true
        },
        {
          id: 'eh-scenarios',
          title: 'Real-world Scenarios',
          description: 'Apply your knowledge to simulated real-world scenarios to practice safe computing.',
          labCount: 5,
          contentCount: 3,
          estimatedHours: 6,
          isLocked: true
        }
      ]
    },
    'penetration-testing': {
      title: 'Penetration Testing',
      subtitle: 'For Job-Seekers (Intermediate)',
      description: 'This job-oriented track is designed for students looking to start a career in cybersecurity. Master web application, mobile app, and network penetration testing techniques with hands-on practice.',
      level: 'intermediate',
      icon: 'zap',
      progress: 0,
      moduleCount: 8,
      labCount: 40,
      estimatedHours: 60,
      students: 3680,
      certificate: true,
      modules: [
        {
          id: 'pt-intro',
          title: 'Introduction to Penetration Testing',
          description: 'Learn what penetration testing is, its legal aspects, and how it fits into the security lifecycle.',
          labCount: 3,
          contentCount: 4,
          estimatedHours: 5,
          isLocked: false
        },
        {
          id: 'pt-web-basics',
          title: 'Web Application Security Basics',
          description: 'Understand how web applications work and the common security vulnerabilities they face.',
          labCount: 5,
          contentCount: 6,
          estimatedHours: 8,
          isLocked: false
        },
        {
          id: 'pt-web-advanced',
          title: 'Advanced Web Vulnerabilities',
          description: 'Deep dive into complex web vulnerabilities like SSRF, XXE, and more with practical examples.',
          labCount: 6,
          contentCount: 5,
          estimatedHours: 10,
          isLocked: true
        },
        {
          id: 'pt-mobile',
          title: 'Mobile Application Pentesting',
          description: 'Learn techniques for analyzing and testing the security of Android and iOS applications.',
          labCount: 4,
          contentCount: 5,
          estimatedHours: 7,
          isLocked: true
        },
        {
          id: 'pt-network',
          title: 'Network Penetration Testing',
          description: 'Master techniques for identifying and exploiting vulnerabilities in networks and network services.',
          labCount: 6,
          contentCount: 7,
          estimatedHours: 9,
          isLocked: true
        }
      ]
    },
    'advanced-pentesting': {
      title: 'Advanced Pentesting',
      subtitle: 'For Working Professionals (Advanced)',
      description: 'This advanced track is designed for professionals with some experience in cybersecurity. Master advanced techniques like red teaming, exploit development, and post-exploitation.',
      level: 'advanced',
      icon: 'target',
      progress: 0,
      moduleCount: 7,
      labCount: 35,
      estimatedHours: 70,
      students: 1920,
      certificate: true,
      modules: [
        {
          id: 'ad-redteam',
          title: 'Red Team Fundamentals',
          description: 'Learn the mindset and techniques used by red team professionals to simulate real attacks.',
          labCount: 4,
          contentCount: 5,
          estimatedHours: 8,
          isLocked: false
        },
        {
          id: 'ad-bypass',
          title: 'Bypassing Firewalls and EDRs',
          description: 'Master advanced techniques to bypass security controls and evade detection.',
          labCount: 5,
          contentCount: 4,
          estimatedHours: 10,
          isLocked: false
        },
        {
          id: 'ad-recon',
          title: 'Advanced Reconnaissance & OSINT',
          description: 'Learn sophisticated techniques for gathering intelligence on targets without direct interaction.',
          labCount: 4,
          contentCount: 6,
          estimatedHours: 9,
          isLocked: true
        },
        {
          id: 'ad-privesc',
          title: 'Post-exploitation & Privilege Escalation',
          description: 'Master techniques for maintaining access and escalating privileges on compromised systems.',
          labCount: 6,
          contentCount: 5,
          estimatedHours: 12,
          isLocked: true
        },
        {
          id: 'ad-exploit',
          title: 'Custom Exploit Development',
          description: 'Learn to develop your own exploits for newly discovered vulnerabilities.',
          labCount: 5,
          contentCount: 4,
          estimatedHours: 14,
          isLocked: true
        }
      ]
    }
  };
  
  const track = trackId ? tracks[trackId as keyof typeof tracks] : null;
  
  if (!track) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-nerds-darkblue flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Track Not Found</h1>
            <p className="text-gray-400 mb-6">The learning track you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/tracks">Browse All Tracks</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  const levelBadge = {
    beginner: { text: 'Beginner', class: 'bg-nerds-blue/20 text-nerds-blue' },
    intermediate: { text: 'Intermediate', class: 'bg-nerds-yellow/20 text-nerds-yellow' },
    advanced: { text: 'Advanced', class: 'bg-nerds-red/20 text-nerds-red' }
  };
  
  const trackIcon = {
    shield: <ShieldCheck className="h-6 w-6 text-nerds-blue" />,
    zap: <Beaker className="h-6 w-6 text-nerds-yellow" />,
    target: <Target className="h-6 w-6 text-nerds-red" />
  };

  return (
    <>
      <Helmet>
        <title>{track.title} - NerdsLab Cyber Academy</title>
        <meta name="description" content={track.description} />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-nerds-darkblue py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link 
            to="/tracks"
            className="inline-flex items-center text-gray-400 hover:text-white mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Tracks
          </Link>
          
          {/* Track header */}
          <div className="bg-nerds-gray rounded-xl p-6 mb-8 border border-nerds-gray/50">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={levelBadge[track.level as keyof typeof levelBadge].class}>
                    {levelBadge[track.level as keyof typeof levelBadge].text}
                  </Badge>
                  <Badge variant="outline" className="border-nerds-gray text-gray-400">
                    {trackIcon[track.icon as keyof typeof trackIcon]} {track.title}
                  </Badge>
                </div>
                
                <h1 className="text-3xl font-bold text-white mb-1">{track.title}</h1>
                <p className="text-nerds-yellow font-medium mb-4">{track.subtitle}</p>
                
                <p className="text-gray-400 mb-6">{track.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-nerds-darkblue/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                      <BookOpen className="h-4 w-4" /> Modules
                    </div>
                    <p className="text-xl font-bold text-white">{track.moduleCount}</p>
                  </div>
                  
                  <div className="bg-nerds-darkblue/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                      <Beaker className="h-4 w-4" /> Labs
                    </div>
                    <p className="text-xl font-bold text-white">{track.labCount}</p>
                  </div>
                  
                  <div className="bg-nerds-darkblue/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                      <Clock className="h-4 w-4" /> Duration
                    </div>
                    <p className="text-xl font-bold text-white">{track.estimatedHours} hours</p>
                  </div>
                  
                  <div className="bg-nerds-darkblue/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                      <User className="h-4 w-4" /> Students
                    </div>
                    <p className="text-xl font-bold text-white">{track.students.toLocaleString()}</p>
                  </div>
                </div>
                
                {track.progress > 0 && (
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Your Progress</span>
                      <span className="text-nerds-yellow">{track.progress}% Complete</span>
                    </div>
                    <Progress value={track.progress} className="h-2" />
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4">
                  {track.progress > 0 ? (
                    <Button className="bg-nerds-yellow text-nerds-darkblue hover:bg-nerds-yellow/90">
                      Continue Learning
                    </Button>
                  ) : (
                    <Button className="bg-nerds-yellow text-nerds-darkblue hover:bg-nerds-yellow/90">
                      Start Learning
                    </Button>
                  )}
                  
                  {track.certificate && (
                    <Button variant="outline" className="border-nerds-gray/50 hover:bg-nerds-gray/30">
                      <Award className="h-4 w-4 mr-2" /> View Certification
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="md:w-1/3 lg:w-1/4 flex flex-col">
                <div className="bg-nerds-darkblue p-4 rounded-lg border border-nerds-gray/30 mb-4">
                  <h3 className="font-medium text-white mb-3">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {track.modules.slice(0, 4).map((module, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircleIcon className="h-4 w-4 text-nerds-yellow mt-0.5" />
                        <span className="text-gray-300">{module.title}</span>
                      </li>
                    ))}
                    {track.modules.length > 4 && (
                      <li className="text-sm text-nerds-yellow mt-1">+ {track.modules.length - 4} more modules</li>
                    )}
                  </ul>
                </div>
                
                <div className="bg-nerds-darkblue p-4 rounded-lg border border-nerds-gray/30">
                  <h3 className="font-medium text-white mb-3">Includes</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-300">
                      <FileText className="h-4 w-4 text-gray-400" /> 
                      In-depth learning materials
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-300">
                      <Beaker className="h-4 w-4 text-gray-400" /> 
                      Hands-on lab exercises
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-300">
                      <Award className="h-4 w-4 text-gray-400" /> 
                      NerdsLab certificate
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-300">
                      <Clock className="h-4 w-4 text-gray-400" /> 
                      Lifetime access
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Track content tabs */}
          <Tabs defaultValue="modules" className="w-full">
            <TabsList className="w-full justify-start bg-nerds-gray border-b border-nerds-gray/50 rounded-t-lg rounded-b-none p-0">
              <TabsTrigger value="modules" className="rounded-none rounded-tl-lg data-[state=active]:bg-nerds-darkblue/20">
                Modules
              </TabsTrigger>
              <TabsTrigger value="labs" className="rounded-none data-[state=active]:bg-nerds-darkblue/20">
                Labs
              </TabsTrigger>
              <TabsTrigger value="resources" className="rounded-none data-[state=active]:bg-nerds-darkblue/20">
                Resources
              </TabsTrigger>
              <TabsTrigger value="certificate" className="rounded-none rounded-tr-lg data-[state=active]:bg-nerds-darkblue/20">
                Certification
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="modules" className="bg-nerds-gray p-6 rounded-b-lg border-x border-b border-nerds-gray/50">
              <h2 className="text-xl font-bold text-white mb-4">Modules</h2>
              <p className="text-gray-400 mb-6">
                Complete the modules in sequence to master {track.title}. Each module contains lessons, videos, and hands-on labs.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {track.modules.map((module, index) => (
                  <ModuleCard
                    key={module.id}
                    id={module.id}
                    trackId={trackId || ''}
                    title={module.title}
                    description={module.description}
                    labCount={module.labCount}
                    contentCount={module.contentCount}
                    estimatedHours={module.estimatedHours}
                    isLocked={module.isLocked}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="labs" className="bg-nerds-gray p-6 rounded-b-lg border-x border-b border-nerds-gray/50">
              <h2 className="text-xl font-bold text-white mb-4">Labs</h2>
              <p className="text-gray-400 mb-6">
                Hands-on labs where you can practice your skills in realistic environments.
              </p>
              
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <h3 className="text-lg font-medium text-white mb-2">Select a Module to View Labs</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  Labs are organized by module. Please select a module from the Modules tab to view its labs.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="bg-nerds-gray p-6 rounded-b-lg border-x border-b border-nerds-gray/50">
              <h2 className="text-xl font-bold text-white mb-4">Learning Resources</h2>
              <p className="text-gray-400 mb-6">
                Additional resources to support your learning journey in {track.title}.
              </p>
              
              <div className="space-y-4">
                <div className="bg-nerds-darkblue/50 p-4 rounded-lg border border-nerds-gray/30">
                  <h3 className="font-medium text-white mb-2">Cheatsheets</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-nerds-yellow" />
                      <a href="#" className="text-gray-300 hover:text-nerds-yellow">
                        {track.title} Quick Reference Guide
                      </a>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-nerds-yellow" />
                      <a href="#" className="text-gray-300 hover:text-nerds-yellow">
                        Command Line Cheatsheet
                      </a>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-nerds-yellow" />
                      <a href="#" className="text-gray-300 hover:text-nerds-yellow">
                        Common Tools Reference
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-nerds-darkblue/50 p-4 rounded-lg border border-nerds-gray/30">
                  <h3 className="font-medium text-white mb-2">External Resources</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <LinkIcon className="h-4 w-4 text-nerds-yellow" />
                      <a href="https://owasp.org/www-project-top-ten/" className="text-gray-300 hover:text-nerds-yellow">
                        OWASP Top 10 Project
                      </a>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <LinkIcon className="h-4 w-4 text-nerds-yellow" />
                      <a href="https://www.kali.org/docs/" className="text-gray-300 hover:text-nerds-yellow">
                        Kali Linux Documentation
                      </a>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <LinkIcon className="h-4 w-4 text-nerds-yellow" />
                      <a href="http://www.pentest-standard.org/" className="text-gray-300 hover:text-nerds-yellow">
                        Penetration Testing Execution Standard
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-nerds-darkblue/50 p-4 rounded-lg border border-nerds-gray/30">
                  <h3 className="font-medium text-white mb-2">Recommended Books</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <BookOpen className="h-4 w-4 text-nerds-yellow" />
                      <span className="text-gray-300">The Web Application Hacker's Handbook</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <BookOpen className="h-4 w-4 text-nerds-yellow" />
                      <span className="text-gray-300">Penetration Testing: A Hands-On Introduction</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <BookOpen className="h-4 w-4 text-nerds-yellow" />
                      <span className="text-gray-300">Black Hat Python</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="certificate" className="bg-nerds-gray p-6 rounded-b-lg border-x border-b border-nerds-gray/50">
              <h2 className="text-xl font-bold text-white mb-4">NerdsLab Certification</h2>
              <p className="text-gray-400 mb-6">
                Complete this track to earn the NerdsLab {track.title} Certificate.
              </p>
              
              <div className="bg-nerds-darkblue/50 p-6 rounded-lg border border-nerds-gray/30 text-center">
                <Award className="h-12 w-12 text-nerds-yellow mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">NerdsLab {track.title} Certificate</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  This certification demonstrates your proficiency in {track.title.toLowerCase()} skills and techniques. It can be added to your LinkedIn profile and resume.
                </p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-white mb-2">Requirements:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>Complete all modules in the track</li>
                    <li>Pass all lab challenges with a minimum score of 70%</li>
                    <li>Pass the final certification exam with a minimum score of 75%</li>
                  </ul>
                </div>
                
                <Button className="bg-nerds-yellow/20 text-nerds-yellow hover:bg-nerds-yellow/30">
                  <Award className="h-4 w-4 mr-2" /> View Certificate Details
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

// Helper component for checkmarks in the "What You'll Learn" section
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
    <path d="m9 12 2 2 4-4"></path>
  </svg>
);

export default TrackDetail;
