import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, BookOpen, Clock, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import TableOfContents, { ContentSection as TOCSection } from '@/components/module/TableOfContents';
import ContentSection from '@/components/module/ContentSection';
import QuizSection, { QuizQuestion } from '@/components/module/QuizSection';
import { useProgress } from '@/contexts/ProgressContext';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const modulesData = {
  'eh-intro': {
    title: 'Introduction to Cybersecurity',
    description: 'Understand the core concepts of cybersecurity and why it matters in today\'s digital world.',
    estimatedTime: '4 hours',
    sections: [
      {
        id: 'what-is-cybersecurity',
        title: 'What is Cybersecurity?',
        content: (
          <>
            <p>Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These attacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes.</p>
            
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">Key Cybersecurity Concepts</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Information Security: Protection of information from unauthorized access</li>
              <li>Network Security: Protection of computer networks from intruders</li>
              <li>Application Security: Protection of applications from threats</li>
              <li>Operational Security: Processes and decisions for handling and protecting data assets</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">Why Cybersecurity Matters</h3>
            <p>In today's connected world, everyone benefits from advanced cyber defense programs. At an individual level, a cybersecurity attack can result in everything from identity theft, to extortion attempts, to the loss of important data like family photos. Everyone relies on critical infrastructure like power plants, hospitals, and financial service companies. Securing these and other organizations is essential to keeping our society functioning.</p>
          </>
        )
      },
      {
        id: 'cybersecurity-quiz-1',
        title: 'Cybersecurity Basics Quiz',
        isQuiz: true,
        questions: [
          {
            id: 'q1',
            question: 'What is the primary goal of cybersecurity?',
            options: [
              'To make computers faster',
              'To protect systems, networks, and programs from digital attacks',
              'To develop new software applications',
              'To analyze user data for marketing purposes'
            ],
            correctAnswer: 1,
            explanation: 'Cybersecurity focuses on protecting digital assets from unauthorized access, data breaches, and other types of attacks.'
          },
          {
            id: 'q2',
            question: 'Which of the following is NOT a common type of cybersecurity?',
            options: [
              'Network Security',
              'Application Security',
              'Entertainment Security',
              'Information Security'
            ],
            correctAnswer: 2,
            explanation: 'Entertainment Security is not a common cybersecurity domain. The main domains include Network Security, Application Security, Information Security, Operational Security, and others.'
          },
          {
            id: 'q3',
            question: 'Why is cybersecurity important for individuals?',
            options: [
              'It makes computers run faster',
              'It improves internet connection speed',
              'It protects personal data from theft and misuse',
              'It increases battery life of devices'
            ],
            correctAnswer: 2,
            explanation: 'For individuals, cybersecurity helps protect personal information, prevent identity theft, and secure financial data from cyber criminals.'
          }
        ]
      },
      {
        id: 'common-threats',
        title: 'Common Cyber Threats',
        content: (
          <>
            <p>Cybersecurity threats come in many forms. Some of the most common threats include:</p>
            
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">Malware</h3>
            <p>Malware is malicious software designed to cause damage to a computer, server, client, or computer network. Common types include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Viruses:</strong> Self-replicating programs that attach to clean files and spread throughout a computer system</li>
              <li><strong>Trojans:</strong> Malicious programs disguised as legitimate software</li>
              <li><strong>Spyware:</strong> Software that secretly records what a user does on their computer</li>
              <li><strong>Ransomware:</strong> Malware that locks your files and demands payment to unlock them</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">Phishing</h3>
            <p>Phishing attacks use fake emails, websites, or text messages designed to steal your personal information. They often appear to come from legitimate organizations and may ask you to update your password or verify your account details.</p>
            
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">Social Engineering</h3>
            <p>Social engineering involves manipulating people into breaking normal security procedures and giving up sensitive information. These attacks rely on human interaction and often trick people into breaking security protocols.</p>
          </>
        )
      },
      {
        id: 'threats-quiz',
        title: 'Cyber Threats Quiz',
        isQuiz: true,
        questions: [
          {
            id: 'q1',
            question: 'Which of the following is a type of malware?',
            options: [
              'Firewall',
              'Ransomware',
              'VPN',
              'Two-factor authentication'
            ],
            correctAnswer: 1,
            explanation: 'Ransomware is a type of malware that encrypts files and demands payment to decrypt them. Firewalls, VPNs, and 2FA are security measures, not malware.'
          },
          {
            id: 'q2',
            question: 'What is phishing?',
            options: [
              'A technique to speed up network connections',
              'A way to backup data securely',
              'An attack using fake emails or websites to steal information',
              'A method for encrypting sensitive data'
            ],
            correctAnswer: 2,
            explanation: 'Phishing is a social engineering attack where criminals use fake emails, messages, or websites that appear legitimate to trick people into revealing sensitive information.'
          }
        ]
      },
      {
        id: 'basic-protection',
        title: 'Basic Protection Measures',
        content: (
          <>
            <p>Implementing basic cybersecurity practices can significantly reduce your risk of becoming a victim. Here are some fundamental protection measures:</p>
            
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">Use Strong Passwords</h3>
            <p>Create unique, complex passwords for all your accounts. Consider using a password manager to help generate and store secure passwords.</p>
            
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">Keep Software Updated</h3>
            <p>Always install updates for your operating system, browsers, and applications. These updates often contain security patches for newly discovered vulnerabilities.</p>
            
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">Use Multi-Factor Authentication</h3>
            <p>Enable multi-factor authentication (MFA) wherever possible. This adds an extra layer of security by requiring something you know (password) and something you have (like a code sent to your phone).</p>
            
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">Be Cautious Online</h3>
            <p>Think before you click on links or download attachments, especially from unknown sources. Be skeptical of emails asking for personal information, even if they appear to be from trusted organizations.</p>
            
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">Use Security Software</h3>
            <p>Install reputable antivirus and anti-malware software on your devices. Keep these tools updated and run regular scans to detect and remove threats.</p>
          </>
        )
      },
      {
        id: 'protection-quiz',
        title: 'Protection Measures Quiz',
        isQuiz: true,
        questions: [
          {
            id: 'q1',
            question: 'Which of the following is a good password practice?',
            options: [
              'Using the same password for all accounts',
              'Writing passwords on sticky notes attached to your monitor',
              'Using simple passwords that are easy to remember',
              'Using unique, complex passwords and a password manager'
            ],
            correctAnswer: 3,
            explanation: 'Using unique, complex passwords for different accounts and managing them with a password manager is considered best practice for password security.'
          },
          {
            id: 'q2',
            question: 'Why is it important to keep software updated?',
            options: [
              'Updates often add new features',
              'Updates fix security vulnerabilities',
              'Updates improve system performance',
              'All of the above'
            ],
            correctAnswer: 3,
            explanation: 'Software updates serve multiple purposes including fixing security vulnerabilities, adding new features, and improving performance.'
          }
        ]
      },
      {
        id: 'industry-sectors',
        title: 'Cybersecurity in Different Industries',
        content: (
          <>
            <p>Cybersecurity is crucial across all industries, but the specific concerns and regulations vary by sector:</p>
            
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">Healthcare</h3>
            <p>Healthcare organizations handle sensitive patient data protected by regulations like HIPAA. They must safeguard electronic health records while ensuring availability for patient care.</p>
            
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">Financial Services</h3>
            <p>Banks and financial institutions are prime targets for cyberattacks due to the potential for financial gain. They must comply with regulations like PCI DSS to protect customer financial data.</p>
            
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">Government</h3>
            <p>Government agencies handle classified information and critical infrastructure. They face threats from nation-state actors and must maintain public trust while protecting sensitive data.</p>
            
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">Education</h3>
            <p>Educational institutions store personal information about students and faculty while maintaining open networks for research and learning. They must balance accessibility with security.</p>
            
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">Retail</h3>
            <p>Retailers process payment information and consumer data. E-commerce platforms are particularly vulnerable to attacks targeting customer payment details.</p>
          </>
        )
      },
      {
        id: 'final-quiz',
        title: 'Final Assessment',
        isQuiz: true,
        questions: [
          {
            id: 'q1',
            question: 'Which industry is often subject to regulations like HIPAA for data protection?',
            options: [
              'Retail',
              'Entertainment',
              'Healthcare',
              'Transportation'
            ],
            correctAnswer: 2,
            explanation: 'The healthcare industry must comply with HIPAA (Health Insurance Portability and Accountability Act) regulations to protect patient data.'
          },
          {
            id: 'q2',
            question: 'What is a primary cybersecurity concern for financial institutions?',
            options: [
              'Website design',
              'Customer service hours',
              'Protection of customer financial data',
              'Branch locations'
            ],
            correctAnswer: 2,
            explanation: 'Financial institutions primarily focus on protecting customer financial data from theft and fraud while complying with regulations like PCI DSS.'
          },
          {
            id: 'q3',
            question: 'Which of the following is a unique cybersecurity challenge for educational institutions?',
            options: [
              'Balancing open networks for learning with security needs',
              'Having too few users',
              'Lack of digital data',
              'Excessive budget for security'
            ],
            correctAnswer: 0,
            explanation: 'Educational institutions face the challenge of maintaining open networks for research and learning while still protecting sensitive data and systems.'
          }
        ]
      }
    ]
  },
  'eh-threats': {
    title: 'Types of Cyber Threats',
    description: 'Learn about the different types of cyber threats, how they work, and their potential impact.',
    estimatedTime: '5 hours',
    sections: [
      {
        id: 'malware-types',
        title: 'Types of Malware',
        content: (
          <>
            <p>This section covers different types of malware in detail.</p>
          </>
        )
      },
      {
        id: 'phishing-attacks',
        title: 'Phishing and Social Engineering',
        content: (
          <>
            <p>This section covers phishing attacks and social engineering tactics.</p>
          </>
        )
      }
    ]
  }
};

const ModuleContent: React.FC = () => {
  const { trackId, moduleId } = useParams<{ trackId: string, moduleId: string }>();
  const navigate = useNavigate();
  const { markSectionComplete, isSectionCompleted } = useProgress();
  
  const [activeSection, setActiveSection] = useState<string>('');
  const [tocSections, setTocSections] = useState<TOCSection[]>([]);
  
  const moduleData = moduleId ? modulesData[moduleId as keyof typeof modulesData] : null;
  
  if (!moduleData || !trackId || !moduleId) {
    useEffect(() => {
      navigate('/tracks');
    }, [navigate]);
    
    return null;
  }
  
  useEffect(() => {
    if (moduleData.sections.length > 0 && !activeSection) {
      setActiveSection(moduleData.sections[0].id);
    }
  }, [moduleData, activeSection]);
  
  useEffect(() => {
    if (moduleData) {
      const sections = moduleData.sections.map(section => ({
        id: section.id,
        title: section.title,
        isCompleted: isSectionCompleted(trackId, moduleId, section.id)
      }));
      
      setTocSections(sections);
    }
  }, [moduleData, trackId, moduleId, isSectionCompleted]);
  
  const completedSections = tocSections.filter(section => section.isCompleted).length;
  const progressPercentage = tocSections.length > 0 
    ? Math.round((completedSections / tocSections.length) * 100) 
    : 0;
  
  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const sectionIndex = moduleData.sections.findIndex(s => s.id === sectionId);
    if (sectionIndex !== -1 && carouselApi) {
      carouselApi.scrollTo(sectionIndex);
    }
  };
  
  const handleMarkComplete = (sectionId: string) => {
    markSectionComplete(trackId, moduleId, sectionId);
  };
  
  const handleNextSection = (currentSectionId: string) => {
    const currentIndex = moduleData.sections.findIndex(s => s.id === currentSectionId);
    if (currentIndex < moduleData.sections.length - 1) {
      const nextSectionId = moduleData.sections[currentIndex + 1].id;
      setActiveSection(nextSectionId);
      if (carouselApi) {
        carouselApi.scrollTo(currentIndex + 1);
      }
    }
  };
  
  const [carouselApi, setCarouselApi] = useState<any>(null);

  useEffect(() => {
    if (carouselApi) {
      carouselApi.on('select', () => {
        const selectedIndex = carouselApi.selectedScrollSnap();
        if (moduleData.sections[selectedIndex]) {
          setActiveSection(moduleData.sections[selectedIndex].id);
        }
      });
    }
  }, [carouselApi, moduleData]);
  
  return (
    <>
      <Helmet>
        <title>{moduleData.title} - NerdsLab Cyber Academy</title>
        <meta name="description" content={moduleData.description} />
      </Helmet>
      
      <Navbar />
      
      <main className="h-screen bg-nerds-darkblue flex flex-col">
        <div className="bg-nerds-gray border-b border-nerds-gray/50 px-6 py-3 fixed top-[64px] left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto">
            <Link 
              to={`/tracks/${trackId}`}
              className="inline-flex items-center text-gray-400 hover:text-white mb-1"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Track
            </Link>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div>
                <h1 className="text-2xl font-bold text-white">{moduleData.title}</h1>
                <p className="text-gray-400 text-sm">{moduleData.description}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{moduleData.estimatedTime}</span>
                </div>
                
                <div className="flex items-center text-gray-400 text-sm">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{moduleData.sections.length} Sections</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row pt-[136px] h-full pb-16">
          <TableOfContents
            sections={tocSections}
            activeSection={activeSection}
            onSectionClick={handleSectionClick}
            progressPercentage={progressPercentage}
          />
          
          <div className="md:ml-[25%] flex-1 bg-nerds-gray/50 h-full overflow-hidden">
            <Carousel
              setApi={setCarouselApi}
              className="w-full h-full"
              opts={{
                align: 'start',
                containScroll: 'trimSnaps',
                loop: false,
                dragFree: false,
              }}
            >
              <CarouselContent className="h-full">
                {moduleData.sections.map((section, index) => (
                  <CarouselItem key={section.id} className="h-full overflow-y-auto p-6 md:p-8">
                    {section.isQuiz ? (
                      <QuizSection
                        id={section.id}
                        title={section.title}
                        questions={section.questions as QuizQuestion[]}
                        onQuizComplete={() => handleMarkComplete(section.id)}
                      />
                    ) : (
                      <ContentSection
                        id={section.id}
                        title={section.title}
                        content={section.content}
                        isCompleted={isSectionCompleted(trackId, moduleId, section.id)}
                        onMarkComplete={() => handleMarkComplete(section.id)}
                        onNextSection={() => handleNextSection(section.id)}
                        isLastSection={index === moduleData.sections.length - 1}
                      />
                    )}
                    
                    {progressPercentage === 100 && index === moduleData.sections.length - 1 && (
                      <div className="mt-12 bg-nerds-gray p-6 rounded-lg border border-green-500/30 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                          <CheckCircle className="h-8 w-8 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Module Completed!</h2>
                        <p className="text-gray-400 mb-6">Congratulations! You've completed this module. Ready to continue your learning journey?</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Button asChild className="bg-nerds-yellow text-nerds-darkblue hover:bg-nerds-yellow/90">
                            <Link to={`/tracks/${trackId}`}>
                              Return to Track
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="border-nerds-gray/50 hover:bg-nerds-gray/30">
                            <Link to="/labs">
                              Practice in Labs
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-nerds-darkblue/70 border-nerds-gray/30 hover:bg-nerds-darkblue"
                  onClick={() => {
                    if (carouselApi) {
                      carouselApi.scrollPrev();
                    }
                  }}
                  disabled={activeSection === moduleData.sections[0]?.id}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-nerds-yellow text-nerds-darkblue hover:bg-nerds-yellow/90"
                  onClick={() => {
                    if (carouselApi) {
                      carouselApi.scrollNext();
                    }
                  }}
                  disabled={activeSection === moduleData.sections[moduleData.sections.length - 1]?.id}
                >
                  Next <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </Carousel>
          </div>
        </div>
      </main>
    </>
  );
};

export default ModuleContent;
