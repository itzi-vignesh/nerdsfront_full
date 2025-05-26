
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, MapPin, Clock, Users, Filter, Search, ExternalLink, Globe, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Events = () => {
  // Sample upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      title: "Advanced Web Application Hacking Workshop",
      description: "Learn cutting-edge techniques for finding and exploiting web application vulnerabilities from industry experts.",
      date: "Apr 25, 2025",
      time: "10:00 AM - 2:00 PM EDT",
      location: "Online",
      type: "Workshop",
      speakers: ["Jane Smith", "Michael Chen"],
      attendees: 145,
      registrationLink: "#",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Cloud Security in Practice: Real-world Case Studies",
      description: "An in-depth look at cloud security breaches, the techniques used, and best practices for prevention.",
      date: "Apr 30, 2025",
      time: "1:00 PM - 3:00 PM EDT",
      location: "Online",
      type: "Webinar",
      speakers: ["David Johnson"],
      attendees: 210,
      registrationLink: "#",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Career Pathways in Cybersecurity for 2025 and Beyond",
      description: "Discover emerging roles in cybersecurity, required skills, and how to position yourself for future opportunities.",
      date: "May 5, 2025",
      time: "11:00 AM - 12:30 PM EDT",
      location: "Online",
      type: "Panel Discussion",
      speakers: ["Sarah Williams", "Robert Chen", "Maria Rodriguez"],
      attendees: 178,
      registrationLink: "#",
      image: "/placeholder.svg"
    }
  ];

  // Sample past events data
  const pastEvents = [
    {
      id: 4,
      title: "Introduction to OSINT for Penetration Testers",
      description: "How to effectively gather open-source intelligence as part of a penetration testing methodology.",
      date: "Apr 10, 2025",
      time: "1:00 PM - 3:00 PM EDT",
      location: "Online",
      type: "Workshop",
      speakers: ["Thomas Smith"],
      attendees: 192,
      recordingLink: "#",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "Malware Analysis Fundamentals",
      description: "An introductory session on static and dynamic analysis techniques for malware samples.",
      date: "Apr 5, 2025",
      time: "11:00 AM - 1:00 PM EDT",
      location: "Online",
      type: "Webinar",
      speakers: ["Jessica Wang"],
      attendees: 167,
      recordingLink: "#",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "Ethical Hacking 101: Getting Started",
      description: "Learn the basics of ethical hacking methodology and essential tools for beginners.",
      date: "Mar 28, 2025",
      time: "10:00 AM - 12:00 PM EDT",
      location: "Online",
      type: "Training",
      speakers: ["Alex Roberts"],
      attendees: 225,
      recordingLink: "#",
      image: "/placeholder.svg"
    }
  ];

  const eventTypes = ["Webinar", "Workshop", "Panel Discussion", "Conference", "Training", "CTF"];

  return (
    <>
      <Helmet>
        <title>Webinars & Events - NerdsLab Cyber Academy</title>
        <meta name="description" content="Join our live webinars, workshops and cybersecurity events" />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-nerds-darkblue py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center">
                <Calendar className="h-8 w-8 text-nerds-red mr-2" />
                Webinars & Events
              </h1>
              <p className="text-gray-400 mt-1">
                Join our live sessions or watch recordings of past events
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search events..." 
                  className="pl-10 bg-nerds-gray/30 border-nerds-gray/50 text-white placeholder:text-gray-500 w-full"
                />
              </div>
              <Button variant="outline" className="border-nerds-gray/50 text-white hover:bg-nerds-gray/30">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
            </div>
          </div>
          
          {/* Current Live Event Banner (if any) */}
          <Card className="bg-gradient-to-r from-nerds-red/30 to-nerds-red/10 border-nerds-red/30 mb-10">
            <CardContent className="py-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                  <Badge className="bg-nerds-red text-white py-1 px-2">LIVE NOW</Badge>
                  <h3 className="text-xl font-bold text-white">Exploiting Zero-Day Vulnerabilities: Ethical Considerations</h3>
                </div>
                <Button asChild className="bg-nerds-red text-white hover:bg-nerds-red/90">
                  <a href="#">Join Now</a>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Event Tabs */}
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="bg-nerds-gray/20 mb-6">
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-nerds-red/20 data-[state=active]:text-nerds-red">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past" className="data-[state=active]:bg-nerds-red/20 data-[state=active]:text-nerds-red">Past Events</TabsTrigger>
              <TabsTrigger value="myevents" className="data-[state=active]:bg-nerds-red/20 data-[state=active]:text-nerds-red">My Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="bg-nerds-gray/20 border-nerds-gray/30 hover:border-nerds-red/50 transition-colors">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-nerds-red/20 text-nerds-red hover:bg-nerds-red/30">
                          {event.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-white hover:text-nerds-red cursor-pointer transition-colors">
                        {event.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 mt-2 line-clamp-2">
                        {event.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2 space-y-2">
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{event.attendees} registered</span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button asChild className="w-full bg-nerds-red text-white hover:bg-nerds-red/90">
                        <a href={event.registrationLink}>Register Now</a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
                <Button variant="outline" className="border-nerds-gray/50 text-white hover:bg-nerds-gray/30">
                  View All Events
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="past" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="bg-nerds-gray/20 border-nerds-gray/30 hover:border-nerds-red/50 transition-colors">
                    <div className="h-40 overflow-hidden relative">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button size="sm" variant="secondary" className="bg-black/50 hover:bg-black/70">
                          <Globe className="h-4 w-4 mr-2" /> Watch Recording
                        </Button>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-nerds-gray/40 text-gray-300">
                          {event.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-white hover:text-nerds-red cursor-pointer transition-colors">
                        {event.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 mt-2 line-clamp-2">
                        {event.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2 space-y-2">
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{event.attendees} attended</span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button asChild variant="outline" className="w-full border-nerds-gray/50 text-white hover:bg-nerds-gray/30">
                        <a href={event.recordingLink}>
                          View Recording <ChevronRight className="h-4 w-4 ml-1" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="myevents" className="mt-0">
              <Card className="bg-nerds-gray/20 border-nerds-gray/30">
                <CardContent className="pt-10 pb-10 flex flex-col items-center justify-center">
                  <h3 className="text-xl font-medium text-white mb-2">Sign in to view your registered events</h3>
                  <p className="text-gray-400 mb-6 text-center max-w-md">
                    Track your upcoming and past events, access recordings, and get reminders
                  </p>
                  <div className="flex gap-4">
                    <Button asChild className="bg-nerds-green text-nerds-darkblue hover:bg-nerds-green/90">
                      <a href="/login">Sign In</a>
                    </Button>
                    <Button asChild variant="outline" className="border-nerds-green/50 text-nerds-green hover:bg-nerds-green/10">
                      <a href="/signup">Create Account</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Event Types */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-white mb-4">Event Types</h2>
            <div className="flex flex-wrap gap-3">
              {eventTypes.map((type) => (
                <Button 
                  key={type}
                  variant="outline" 
                  className="border-nerds-red/30 text-white hover:bg-nerds-red/10 hover:border-nerds-red/50 hover:text-nerds-red"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Host Your Own Event */}
          <div className="mt-12 bg-gradient-to-r from-nerds-gray/30 to-nerds-gray/10 border border-nerds-gray/30 rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-bold text-white mb-2">Want to host your own cybersecurity event?</h2>
                <p className="text-gray-400">Share your knowledge with our community of security enthusiasts</p>
              </div>
              <Button asChild className="bg-nerds-green text-nerds-darkblue hover:bg-nerds-green/90">
                <a href="#">Become a Speaker</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Events;
