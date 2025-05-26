import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Download, ExternalLink, Search, Tag, Info, Star, ArrowDownToLine, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Tools = () => {
  // Sample tools data
  const popularTools = [
    {
      id: 1,
      name: "Nmap",
      description: "A powerful network scanner for security auditing and network discovery",
      category: "Network",
      platform: ["Windows", "Linux", "macOS"],
      rating: 4.9,
      downloadCount: 8540000,
      downloadLink: "#",
      website: "https://nmap.org",
      logo: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Wireshark",
      description: "The world's foremost and widely-used network protocol analyzer",
      category: "Network",
      platform: ["Windows", "Linux", "macOS"],
      rating: 4.8,
      downloadCount: 7650000,
      downloadLink: "#",
      website: "https://www.wireshark.org",
      logo: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Burp Suite",
      description: "An integrated platform for performing security testing of web applications",
      category: "Web",
      platform: ["Windows", "Linux", "macOS"],
      rating: 4.9,
      downloadCount: 6320000,
      downloadLink: "#",
      website: "https://portswigger.net/burp",
      logo: "/placeholder.svg"
    }
  ];

  const allTools = [
    {
      id: 4,
      name: "Metasploit",
      description: "The world's most used penetration testing framework",
      category: "Exploitation",
      platform: ["Windows", "Linux", "macOS"],
      rating: 4.8,
      downloadCount: 5980000,
      downloadLink: "#",
      website: "https://www.metasploit.com",
      logo: "/placeholder.svg"
    },
    {
      id: 5,
      name: "OWASP ZAP",
      description: "An open-source web application security scanner",
      category: "Web",
      platform: ["Windows", "Linux", "macOS"],
      rating: 4.6,
      downloadCount: 4250000,
      downloadLink: "#",
      website: "https://www.zaproxy.org",
      logo: "/placeholder.svg"
    },
    {
      id: 6,
      name: "John the Ripper",
      description: "A free password cracking tool for Unix, Windows, and other platforms",
      category: "Password",
      platform: ["Windows", "Linux", "macOS"],
      rating: 4.7,
      downloadCount: 3890000,
      downloadLink: "#",
      website: "https://www.openwall.com/john",
      logo: "/placeholder.svg"
    },
    {
      id: 7,
      name: "Aircrack-ng",
      description: "Complete suite of tools to assess WiFi network security",
      category: "Wireless",
      platform: ["Windows", "Linux"],
      rating: 4.5,
      downloadCount: 3650000,
      downloadLink: "#",
      website: "https://www.aircrack-ng.org",
      logo: "/placeholder.svg"
    },
    {
      id: 8,
      name: "Hashcat",
      description: "World's fastest and most advanced password recovery utility",
      category: "Password",
      platform: ["Windows", "Linux", "macOS"],
      rating: 4.8,
      downloadCount: 3420000,
      downloadLink: "#",
      website: "https://hashcat.net",
      logo: "/placeholder.svg"
    },
    {
      id: 9,
      name: "Ghidra",
      description: "A software reverse engineering (SRE) suite of tools developed by NSA",
      category: "Reverse Engineering",
      platform: ["Windows", "Linux", "macOS"],
      rating: 4.7,
      downloadCount: 2980000,
      downloadLink: "#",
      website: "https://ghidra-sre.org",
      logo: "/placeholder.svg"
    }
  ];

  const categories = [
    "Network", "Web", "Password", "Exploitation", "Wireless", "Reverse Engineering", 
    "Forensics", "Mobile", "Social Engineering", "Vulnerability Scanner"
  ];

  return (
    <>
      <Helmet>
        <title>Security Tools - NerdsLab Cyber Academy</title>
        <meta name="description" content="Discover and download essential cybersecurity tools for your penetration testing toolkit" />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-nerds-darkblue py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center">
                <Shield className="h-8 w-8 text-nerds-red mr-2" />
                Security Tools
              </h1>
              <p className="text-gray-400 mt-1">
                Essential utilities for cybersecurity professionals and enthusiasts
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search tools..." 
                  className="pl-10 bg-nerds-gray/30 border-nerds-gray/50 text-white placeholder:text-gray-500 w-full"
                />
              </div>
              <Button variant="outline" className="border-nerds-gray/50 text-white hover:bg-nerds-gray/30">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
            </div>
          </div>
          
          {/* Featured Tools */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-6">Most Popular Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {popularTools.map((tool) => (
                <Card key={tool.id} className="bg-nerds-gray/20 border-nerds-gray/30 hover:border-nerds-red/50 transition-colors overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-nerds-gray/40 rounded-md flex items-center justify-center">
                          <img 
                            src={tool.logo} 
                            alt={tool.name} 
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-white hover:text-nerds-red cursor-pointer transition-colors">
                            {tool.name}
                          </CardTitle>
                          <div className="flex items-center space-x-1 text-xs">
                            <Badge className="bg-nerds-red/20 text-nerds-red hover:bg-nerds-red/30">
                              {tool.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-nerds-yellow fill-nerds-yellow" />
                        <span className="text-white">{tool.rating}</span>
                      </div>
                    </div>
                    <CardDescription className="text-gray-400 mt-3">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-1">
                      {tool.platform.map((os) => (
                        <Badge key={os} variant="outline" className="text-gray-400 border-gray-500">
                          {os}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-400">
                      <ArrowDownToLine className="h-3 w-3 mr-1" />
                      <span>{(tool.downloadCount / 1000000).toFixed(1)}M+ downloads</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        asChild
                        size="sm" 
                        variant="outline"
                        className="border-nerds-gray/50 text-white hover:bg-nerds-gray/30"
                      >
                        <a href={tool.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" /> Website
                        </a>
                      </Button>
                      <Button 
                        asChild
                        size="sm" 
                        className="bg-nerds-red text-white hover:bg-nerds-red/90"
                      >
                        <a href={tool.downloadLink}>
                          <Download className="h-4 w-4 mr-1" /> Download
                        </a>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          {/* All Tools */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-6">All Tools</h2>
            
            <Tabs defaultValue="all" className="w-full mb-6">
              <TabsList className="bg-nerds-gray/20 mb-6">
                <TabsTrigger value="all" className="data-[state=active]:bg-nerds-red/20 data-[state=active]:text-nerds-red">All</TabsTrigger>
                <TabsTrigger value="network" className="data-[state=active]:bg-nerds-red/20 data-[state=active]:text-nerds-red">Network</TabsTrigger>
                <TabsTrigger value="web" className="data-[state=active]:bg-nerds-red/20 data-[state=active]:text-nerds-red">Web</TabsTrigger>
                <TabsTrigger value="password" className="data-[state=active]:bg-nerds-red/20 data-[state=active]:text-nerds-red">Password</TabsTrigger>
                <TabsTrigger value="more" className="data-[state=active]:bg-nerds-red/20 data-[state=active]:text-nerds-red">More</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allTools.map((tool) => (
                    <Card key={tool.id} className="bg-nerds-gray/20 border-nerds-gray/30 hover:border-nerds-red/50 transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-nerds-gray/40 rounded-md flex items-center justify-center">
                              <img 
                                src={tool.logo} 
                                alt={tool.name} 
                                className="w-8 h-8 object-contain"
                              />
                            </div>
                            <div>
                              <CardTitle className="text-white hover:text-nerds-red cursor-pointer transition-colors">
                                {tool.name}
                              </CardTitle>
                              <div className="flex items-center space-x-1 text-xs">
                                <Badge className="bg-nerds-red/20 text-nerds-red hover:bg-nerds-red/30">
                                  {tool.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-nerds-yellow fill-nerds-yellow" />
                            <span className="text-white">{tool.rating}</span>
                          </div>
                        </div>
                        <CardDescription className="text-gray-400 mt-3">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-2 flex justify-between items-center">
                        <Button 
                          asChild
                          size="sm" 
                          variant="outline"
                          className="border-nerds-gray/50 text-white hover:bg-nerds-gray/30"
                        >
                          <a href={tool.website} target="_blank" rel="noopener noreferrer">
                            <Info className="h-4 w-4 mr-1" /> Details
                          </a>
                        </Button>
                        <Button 
                          asChild
                          size="sm" 
                          className="bg-nerds-red text-white hover:bg-nerds-red/90"
                        >
                          <a href={tool.downloadLink}>
                            <Download className="h-4 w-4 mr-1" /> Download
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              {/* Other tab contents would be similar but filtered by category */}
              {["network", "web", "password", "more"].map((tab) => (
                <TabsContent key={tab} value={tab} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allTools
                      .filter((tool) => 
                        tab === "more" 
                          ? !["Network", "Web", "Password"].includes(tool.category)
                          : tool.category.toLowerCase() === tab
                      )
                      .map((tool) => (
                        <Card key={tool.id} className="bg-nerds-gray/20 border-nerds-gray/30 hover:border-nerds-red/50 transition-colors">
                          {/* Tool card content similar to above */}
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-nerds-gray/40 rounded-md flex items-center justify-center">
                                  <img 
                                    src={tool.logo} 
                                    alt={tool.name} 
                                    className="w-8 h-8 object-contain"
                                  />
                                </div>
                                <div>
                                  <CardTitle className="text-white hover:text-nerds-red cursor-pointer transition-colors">
                                    {tool.name}
                                  </CardTitle>
                                  <div className="flex items-center space-x-1 text-xs">
                                    <Badge className="bg-nerds-red/20 text-nerds-red hover:bg-nerds-red/30">
                                      {tool.category}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-nerds-yellow fill-nerds-yellow" />
                                <span className="text-white">{tool.rating}</span>
                              </div>
                            </div>
                            <CardDescription className="text-gray-400 mt-3">
                              {tool.description}
                            </CardDescription>
                          </CardHeader>
                          <CardFooter className="pt-2 flex justify-between items-center">
                            <Button 
                              asChild
                              size="sm" 
                              variant="outline"
                              className="border-nerds-gray/50 text-white hover:bg-nerds-gray/30"
                            >
                              <a href={tool.website} target="_blank" rel="noopener noreferrer">
                                <Info className="h-4 w-4 mr-1" /> Details
                              </a>
                            </Button>
                            <Button 
                              asChild
                              size="sm" 
                              className="bg-nerds-red text-white hover:bg-nerds-red/90"
                            >
                              <a href={tool.downloadLink}>
                                <Download className="h-4 w-4 mr-1" /> Download
                              </a>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="border-nerds-gray/50 text-white hover:bg-nerds-gray/30">
                Load More Tools
              </Button>
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Browse by Category</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge 
                  key={category}
                  className="bg-nerds-red/10 hover:bg-nerds-red/20 text-nerds-red border border-nerds-red/30 cursor-pointer py-2"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {category}
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

export default Tools;
