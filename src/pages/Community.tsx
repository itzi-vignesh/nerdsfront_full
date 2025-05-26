
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, MessageSquare, Search, Filter, Award, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Community = () => {
  // Sample discussions data
  const discussions = [
    {
      id: 1,
      title: "How to bypass WAF protection?",
      author: "hackmaster",
      replies: 24,
      views: 356,
      category: "Web Security",
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      title: "Best tools for network scanning in 2025?",
      author: "netscan_pro",
      replies: 18,
      views: 289,
      category: "Network Security",
      lastActive: "5 hours ago"
    },
    {
      id: 3,
      title: "Struggling with Buffer Overflow lab",
      author: "newbie_hacker",
      replies: 32,
      views: 412,
      category: "Binary Exploitation",
      lastActive: "1 day ago"
    },
    {
      id: 4,
      title: "Career path: Red Team vs Blue Team",
      author: "career_seeker",
      replies: 47,
      views: 623,
      category: "Career",
      lastActive: "2 days ago"
    },
    {
      id: 5,
      title: "Share your CTF writeups here!",
      author: "ctf_master",
      replies: 56,
      views: 890,
      category: "CTF",
      lastActive: "3 days ago"
    }
  ];

  // Sample members data
  const activeMembers = [
    {
      username: "hackmaster",
      avatar: "/placeholder.svg",
      role: "Mentor",
      points: 12450
    },
    {
      username: "secureninja",
      avatar: "/placeholder.svg",
      role: "Moderator",
      points: 9870
    },
    {
      username: "codehunter",
      avatar: "/placeholder.svg",
      role: "Member",
      points: 7650
    },
    {
      username: "pentest_pro",
      avatar: "/placeholder.svg",
      role: "Mentor",
      points: 11230
    }
  ];

  return (
    <>
      <Helmet>
        <title>Community - NerdsLab Cyber Academy</title>
        <meta name="description" content="Join our cybersecurity community to discuss, learn and grow together" />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-nerds-darkblue py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center">
                <Users className="h-8 w-8 text-nerds-green mr-2" />
                Community
              </h1>
              <p className="text-gray-400 mt-1">
                Connect, learn, and grow with fellow cybersecurity enthusiasts
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-nerds-green text-nerds-darkblue hover:bg-nerds-green/90">
                <MessageSquare className="h-4 w-4 mr-2" /> New Discussion
              </Button>
              <Button variant="outline" className="border-nerds-gray/50 text-white hover:bg-nerds-gray/30">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search discussions..." 
                    className="pl-10 bg-nerds-gray/30 border-nerds-gray/50 text-white placeholder:text-gray-500 w-full"
                  />
                </div>
              </div>
              
              <Tabs defaultValue="latest" className="w-full">
                <TabsList className="grid grid-cols-4 mb-6 bg-nerds-gray/20">
                  <TabsTrigger value="latest" className="data-[state=active]:bg-nerds-green/20 data-[state=active]:text-nerds-green">Latest</TabsTrigger>
                  <TabsTrigger value="popular" className="data-[state=active]:bg-nerds-green/20 data-[state=active]:text-nerds-green">Popular</TabsTrigger>
                  <TabsTrigger value="unanswered" className="data-[state=active]:bg-nerds-green/20 data-[state=active]:text-nerds-green">Unanswered</TabsTrigger>
                  <TabsTrigger value="my-posts" className="data-[state=active]:bg-nerds-green/20 data-[state=active]:text-nerds-green">My Posts</TabsTrigger>
                </TabsList>
                
                <TabsContent value="latest" className="mt-0 space-y-4">
                  {discussions.map((discussion) => (
                    <Card key={discussion.id} className="bg-nerds-gray/20 border-nerds-gray/30 hover:border-nerds-green/50 transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-white text-lg hover:text-nerds-green cursor-pointer transition-colors">
                            {discussion.title}
                          </CardTitle>
                          <Badge className="bg-nerds-blue/20 text-nerds-blue hover:bg-nerds-blue/30">
                            {discussion.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center text-sm text-gray-400">
                          <span>Started by <span className="text-nerds-green">{discussion.author}</span></span>
                          <span className="mx-2">•</span>
                          <span>Last active {discussion.lastActive}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>{discussion.replies} replies</span>
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" />
                            <span>{discussion.views} views</span>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="popular" className="mt-0">
                  <Card className="bg-nerds-gray/20 border-nerds-gray/30">
                    <CardContent className="pt-6">
                      <p className="text-center text-gray-400">Popular discussions shown here</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="unanswered" className="mt-0">
                  <Card className="bg-nerds-gray/20 border-nerds-gray/30">
                    <CardContent className="pt-6">
                      <p className="text-center text-gray-400">Unanswered discussions shown here</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="my-posts" className="mt-0">
                  <Card className="bg-nerds-gray/20 border-nerds-gray/30">
                    <CardContent className="pt-6">
                      <p className="text-center text-gray-400">Sign in to view your posts</p>
                      <div className="mt-4 flex justify-center">
                        <Button asChild className="bg-nerds-green text-nerds-darkblue hover:bg-nerds-green/90 mr-2">
                          <a href="/login">Sign In</a>
                        </Button>
                        <Button asChild variant="outline" className="border-nerds-green/50 text-nerds-green hover:bg-nerds-green/10">
                          <a href="/signup">Sign Up</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-nerds-gray/20 border-nerds-gray/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Award className="h-5 w-5 text-nerds-yellow mr-2" />
                    Active Members
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeMembers.map((member) => (
                    <div key={member.username} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.username} />
                          <AvatarFallback className="bg-nerds-blue/20 text-nerds-blue">
                            {member.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm text-white">{member.username}</p>
                          <p className="text-xs text-gray-400">{member.role}</p>
                        </div>
                      </div>
                      <Badge className="bg-nerds-yellow/20 text-nerds-yellow">
                        {member.points.toLocaleString()}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card className="bg-nerds-gray/20 border-nerds-gray/30">
                <CardHeader>
                  <CardTitle className="text-white">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start hover:bg-nerds-gray/30 text-white">
                    Web Security
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-nerds-gray/30 text-white">
                    Network Security
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-nerds-gray/30 text-white">
                    Binary Exploitation
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-nerds-gray/30 text-white">
                    CTF
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-nerds-gray/30 text-white">
                    Career
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-nerds-green/10 border-nerds-green/30">
                <CardContent className="pt-6">
                  <h3 className="text-nerds-green font-medium mb-2">Join Our Discord</h3>
                  <p className="text-sm text-gray-300 mb-4">Connect with our community in real-time discussions</p>
                  <Button className="w-full bg-nerds-green text-nerds-darkblue hover:bg-nerds-green/90">
                    Join Discord
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Community;
