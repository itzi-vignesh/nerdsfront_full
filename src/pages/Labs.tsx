import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserHeader from '@/components/UserHeader';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Search, Filter, CheckCircle, Lock,
  Zap, Shield, Target, Server, Code, Wifi, 
  Users, Database, Globe, Terminal 
} from "lucide-react";
import { useLabs } from '@/data/labsData';
import { LabCard } from '../components/labs/LabCard';

// Lab categories
const categories = [
  { id: 'web', name: 'Web Security', icon: Globe },
  { id: 'network', name: 'Network Security', icon: Wifi },
  { id: 'crypto', name: 'Cryptography', icon: Lock },
  { id: 'system', name: 'System Hacking', icon: Terminal },
  { id: 'social', name: 'Social Engineering', icon: Users },
  { id: 'database', name: 'Database Security', icon: Database },
];

const Labs: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { labs, loading, error } = useLabs();
  
  if (loading) return <div className="min-h-screen bg-nerds-darkblue flex items-center justify-center">Loading labs...</div>;
  if (error) return <div className="min-h-screen bg-nerds-darkblue flex items-center justify-center text-white">
    <div className="p-4 max-w-md text-center">
      <p className="text-lg mb-4">Error loading labs: {error}</p>
      {error.includes('demo lab data') && (
        <p className="text-sm text-gray-400">Using sample labs for demonstration purposes while the lab service is unavailable.</p>
      )}
    </div>
  </div>;
  
  // Separate free and premium labs
  const freeLabs = labs.filter(lab => !lab.isLocked);
  const premiumLabs = labs.filter(lab => lab.isLocked);
  
  // Filter labs based on search term and category
  const filterLabs = (labsToFilter: typeof labs) => {
    return labsToFilter.filter(lab => {
      const matchesSearch = lab.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           lab.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || lab.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };
  
  const filteredFreeLabs = filterLabs(freeLabs);
  const filteredPremiumLabs = filterLabs(premiumLabs);
  
  return (
    <>
      <Helmet>
        <title>Cyber Labs | Cyber Nerds Academy</title>
      </Helmet>
      
      <Navbar />
      <UserHeader />
      
      <div className="bg-nerds-darkblue min-h-screen">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Search labs by name or description..." 
                  className="pl-10 bg-nerds-gray/20 border-nerds-gray/30 text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 text-gray-400">
                <Filter size={18} />
                <span>Filter:</span>
                <select 
                  className="bg-nerds-gray/20 border-nerds-gray/30 text-white rounded-md p-2"
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  value={selectedCategory || ''}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => {
                const CategoryIcon = category.icon;
                return (
                  <button
                    key={category.id}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm ${
                      selectedCategory === category.name
                        ? 'bg-nerds-green text-nerds-darkblue'
                        : 'bg-nerds-gray/20 text-gray-300 hover:bg-nerds-gray/30'
                    }`}
                    onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                  >
                    <CategoryIcon size={14} />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Labs Content */}
          <Tabs defaultValue="free" className="w-full">
            <TabsList className="w-full max-w-md mx-auto mb-6 bg-nerds-gray/20">
              <TabsTrigger 
                value="free" 
                className="flex-1 data-[state=active]:bg-nerds-green data-[state=active]:text-nerds-darkblue"
              >
                <Zap className="w-4 h-4 mr-2" /> Free Labs
              </TabsTrigger>
              <TabsTrigger 
                value="premium" 
                className="flex-1 data-[state=active]:bg-nerds-yellow data-[state=active]:text-nerds-darkblue"
              >
                <Shield className="w-4 h-4 mr-2" /> Premium Labs
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="free" className="mt-0">
              {filteredFreeLabs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFreeLabs.map(lab => (
                    <LabCard
                      key={lab.id}
                      id={lab.id}
                      trackId={lab.trackId}
                      moduleId={lab.moduleId}
                      title={lab.title}
                      description={lab.description}
                      difficulty={lab.difficulty}
                      category={lab.category}
                      estimatedMinutes={lab.estimatedMinutes}
                      pointsAwarded={lab.pointsAwarded}
                      isCompleted={lab.isCompleted}
                      isLocked={lab.isLocked}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-nerds-gray/20 mb-4">
                    <Search className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-white text-lg font-medium mb-2">No labs found</h3>
                  <p className="text-gray-400">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="premium" className="mt-0">
              <div className="mb-6">
                <div className="bg-nerds-yellow/10 border border-nerds-yellow/20 rounded-lg p-4 flex items-start gap-4">
                  <div className="p-2 rounded-full bg-nerds-yellow/20 text-nerds-yellow">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Upgrade to Access Premium Labs</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Get access to our advanced labs with in-depth scenarios and real-world challenges.
                    </p>
                    <a 
                      href="/plans" 
                      className="inline-block bg-nerds-yellow text-nerds-darkblue px-4 py-2 rounded-md font-medium text-sm"
                    >
                      View Plans
                    </a>
                  </div>
                </div>
              </div>
              
              {filteredPremiumLabs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPremiumLabs.map(lab => (
                    <LabCard
                      key={lab.id}
                      id={lab.id}
                      trackId={lab.trackId}
                      moduleId={lab.moduleId}
                      title={lab.title}
                      description={lab.description}
                      difficulty={lab.difficulty}
                      category={lab.category}
                      estimatedMinutes={lab.estimatedMinutes}
                      pointsAwarded={lab.pointsAwarded}
                      isCompleted={lab.isCompleted}
                      isLocked={lab.isLocked}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-nerds-gray/20 mb-4">
                    <Search className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-white text-lg font-medium mb-2">No labs found</h3>
                  <p className="text-gray-400">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Labs;
