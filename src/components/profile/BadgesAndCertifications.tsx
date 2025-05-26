
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Award, Scroll, Shield, Zap, Code, Server, Lock, Wifi } from "lucide-react";

const BadgesAndCertifications: React.FC = () => {
  const badges = [
    { id: 1, name: "First Blood", icon: Shield, color: "text-nerds-red", bg: "bg-nerds-red/10", description: "Completed your first lab" },
    { id: 2, name: "Code Breaker", icon: Code, color: "text-nerds-blue", bg: "bg-nerds-blue/10", description: "Solved 5 cryptography challenges" },
    { id: 3, name: "Network Ninja", icon: Wifi, color: "text-nerds-green", bg: "bg-nerds-green/10", description: "Completed all network security labs" },
    { id: 4, name: "Hack Master", icon: Zap, color: "text-nerds-yellow", bg: "bg-nerds-yellow/10", description: "Reached level 5 in hacking skills" },
    { id: 5, name: "Server Sage", icon: Server, color: "text-purple-400", bg: "bg-purple-400/10", description: "Mastered server security challenges" },
    { id: 6, name: "Encryption Expert", icon: Lock, color: "text-pink-400", bg: "bg-pink-400/10", description: "Excelled in encryption challenges" },
    { id: 7, name: "Not Earned Yet", icon: Shield, color: "text-gray-400", bg: "bg-gray-400/10", description: "Complete 10 labs in a week", locked: true },
  ];
  
  const certifications = [
    { 
      id: 1, 
      name: "Ethical Hacking Basics", 
      date: "Jan 15, 2025", 
      credentialId: "CNA-EHB-12345", 
      skills: ["Network Scanning", "Vulnerability Assessment", "Basic Exploitation"]
    },
    { 
      id: 2, 
      name: "Network Security", 
      date: "Mar 22, 2025", 
      credentialId: "CNA-NS-67890", 
      skills: ["Firewall Configuration", "Intrusion Detection", "Network Monitoring"]
    },
    { 
      id: 3, 
      name: "Advanced Penetration Testing", 
      status: "In Progress", 
      progress: 65,
      requirements: [
        { name: "Complete Advanced Web Hacking", completed: true },
        { name: "Pass Network Exploitation Exam", completed: true },
        { name: "Submit Final Assessment", completed: false }
      ]
    }
  ];
  
  return (
    <Card className="border-nerds-gray/30 bg-nerds-darkblue/20 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="badges">
          <TabsList className="grid grid-cols-2 bg-nerds-gray/20 mb-4">
            <TabsTrigger value="badges" className="data-[state=active]:bg-nerds-green data-[state=active]:text-nerds-darkblue">
              <Award className="w-4 h-4 mr-2" /> Badges
            </TabsTrigger>
            <TabsTrigger value="certifications" className="data-[state=active]:bg-nerds-green data-[state=active]:text-nerds-darkblue">
              <Scroll className="w-4 h-4 mr-2" /> Certifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="badges" className="mt-0">
            <div className="grid grid-cols-2 gap-3">
              {badges.map(badge => (
                <div 
                  key={badge.id} 
                  className={`p-3 rounded-md border ${badge.locked ? 'border-gray-500/20 opacity-50' : 'border-nerds-gray/20'}`}
                >
                  <div className={`${badge.bg} p-2 rounded-md w-fit mb-2`}>
                    <badge.icon className={`w-5 h-5 ${badge.color}`} />
                  </div>
                  <h4 className="text-white font-medium mb-1">{badge.name}</h4>
                  <p className="text-gray-400 text-xs">{badge.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="certifications" className="mt-0">
            <div className="space-y-4">
              {certifications.map(cert => (
                <div key={cert.id} className="border border-nerds-gray/20 rounded-md p-4">
                  {'status' in cert ? (
                    // In-progress certification
                    <>
                      <h3 className="text-white font-medium flex items-center gap-2">
                        {cert.name}
                        <span className="text-xs bg-nerds-yellow/20 text-nerds-yellow px-2 py-0.5 rounded">
                          {cert.status}
                        </span>
                      </h3>
                      <div className="mt-2 mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-nerds-yellow">{cert.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-nerds-gray/30 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-nerds-yellow" 
                            style={{ width: `${cert.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-white text-sm">Requirements:</p>
                        {cert.requirements?.map((req, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            {req.completed ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-nerds-yellow"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                            )}
                            <span className={req.completed ? 'text-gray-400' : 'text-white'}>
                              {req.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    // Completed certification
                    <>
                      <h3 className="text-white font-medium">{cert.name}</h3>
                      <p className="text-gray-400 text-sm mb-2">Issued: {cert.date}</p>
                      <p className="text-gray-400 text-xs mb-3">Credential ID: {cert.credentialId}</p>
                      <div>
                        <p className="text-white text-xs mb-1">Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {cert.skills?.map((skill, idx) => (
                            <span key={idx} className="text-xs bg-nerds-green/10 text-nerds-green px-2 py-0.5 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BadgesAndCertifications;
