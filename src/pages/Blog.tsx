
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Search, Clock, Calendar, User, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Blog = () => {
  // Sample blog posts data
  const featuredPosts = [
    {
      id: 1,
      title: "Top 10 OWASP Vulnerabilities Explained",
      excerpt: "A comprehensive guide to understanding the most critical web application security risks...",
      author: "Sarah Johnson",
      date: "Apr 10, 2025",
      readTime: "12 min read",
      category: "Web Security",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Building Your Career in Cybersecurity - 2025 Guide",
      excerpt: "Learn about the most in-demand cybersecurity roles and what skills you need to develop...",
      author: "Michael Chen",
      date: "Apr 7, 2025",
      readTime: "15 min read",
      category: "Career",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Advanced Techniques in Penetration Testing",
      excerpt: "Explore cutting-edge methodologies used by professional penetration testers...",
      author: "David Rodriguez",
      date: "Apr 2, 2025",
      readTime: "18 min read",
      category: "Penetration Testing",
      image: "/placeholder.svg"
    }
  ];

  const recentPosts = [
    {
      id: 4,
      title: "Introduction to Reverse Engineering",
      excerpt: "Getting started with software reverse engineering techniques for security professionals...",
      author: "Alex Morgan",
      date: "Mar 28, 2025",
      readTime: "10 min read",
      category: "Reverse Engineering",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "Mastering Burp Suite for Web Application Testing",
      excerpt: "Learn how to effectively use Burp Suite for comprehensive web application testing...",
      author: "Jessica Wong",
      date: "Mar 25, 2025",
      readTime: "14 min read",
      category: "Web Security",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "Open Source Intelligence Gathering Techniques",
      excerpt: "Discover how to leverage OSINT tools and methodology to gather actionable intelligence...",
      author: "Robert Smith",
      date: "Mar 22, 2025",
      readTime: "11 min read",
      category: "OSINT",
      image: "/placeholder.svg"
    },
    {
      id: 7,
      title: "Understanding Buffer Overflow Exploits",
      excerpt: "A deep dive into how buffer overflow exploits work and how to prevent them...",
      author: "Thomas Lee",
      date: "Mar 18, 2025",
      readTime: "16 min read",
      category: "Binary Exploitation",
      image: "/placeholder.svg"
    },
    {
      id: 8,
      title: "Cloud Security Best Practices",
      excerpt: "Essential security measures to implement when working with cloud infrastructure...",
      author: "Emily Clark",
      date: "Mar 15, 2025",
      readTime: "13 min read",
      category: "Cloud Security",
      image: "/placeholder.svg"
    }
  ];

  const popularTags = [
    "Web Security", "Network Security", "Penetration Testing", "OSINT", 
    "Binary Exploitation", "Cloud Security", "Career", "CTF", "Tools"
  ];

  return (
    <>
      <Helmet>
        <title>Blog & Articles - NerdsLab Cyber Academy</title>
        <meta name="description" content="Read the latest cybersecurity articles, guides, and tutorials" />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-nerds-darkblue py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center">
                <BookOpen className="h-8 w-8 text-nerds-blue mr-2" />
                Blog & Articles
              </h1>
              <p className="text-gray-400 mt-1">
                Latest insights, tutorials, and news from the cybersecurity world
              </p>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10 bg-nerds-gray/30 border-nerds-gray/50 text-white placeholder:text-gray-500 w-full"
              />
            </div>
          </div>
          
          {/* Featured Articles */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="bg-nerds-gray/20 border-nerds-gray/30 hover:border-nerds-blue/50 transition-colors overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-nerds-blue/20 text-nerds-blue hover:bg-nerds-blue/30">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <CardTitle className="text-white hover:text-nerds-blue cursor-pointer transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2 flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-400">
                      <User className="h-3 w-3 mr-1" />
                      <span>{post.author}</span>
                      <span className="mx-2">•</span>
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-nerds-blue hover:text-nerds-blue/80 hover:bg-nerds-blue/10 p-0">
                      Read more <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Recent Articles */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Articles</h2>
              <Tabs defaultValue="all" className="w-auto">
                <TabsList className="bg-nerds-gray/20">
                  <TabsTrigger value="all" className="data-[state=active]:bg-nerds-blue/20 data-[state=active]:text-nerds-blue">All</TabsTrigger>
                  <TabsTrigger value="tutorials" className="data-[state=active]:bg-nerds-blue/20 data-[state=active]:text-nerds-blue">Tutorials</TabsTrigger>
                  <TabsTrigger value="news" className="data-[state=active]:bg-nerds-blue/20 data-[state=active]:text-nerds-blue">News</TabsTrigger>
                  <TabsTrigger value="research" className="data-[state=active]:bg-nerds-blue/20 data-[state=active]:text-nerds-blue">Research</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Card key={post.id} className="bg-nerds-gray/20 border-nerds-gray/30 hover:border-nerds-blue/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-nerds-blue/20 text-nerds-blue hover:bg-nerds-blue/30">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <CardTitle className="text-white hover:text-nerds-blue cursor-pointer transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2 flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-400">
                      <User className="h-3 w-3 mr-1" />
                      <span>{post.author}</span>
                      <span className="mx-2">•</span>
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-nerds-blue hover:text-nerds-blue/80 hover:bg-nerds-blue/10 p-0">
                      Read more <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="border-nerds-gray/50 text-white hover:bg-nerds-gray/30">
                Load More Articles
              </Button>
            </div>
          </div>
          
          {/* Popular Tags */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Browse by Topics</h2>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Badge 
                  key={tag}
                  className="bg-nerds-blue/10 hover:bg-nerds-blue/20 text-nerds-blue border border-nerds-blue/30 cursor-pointer py-2"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Blog;
