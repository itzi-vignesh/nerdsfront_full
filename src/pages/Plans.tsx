
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Check, Shield, Zap, Target, 
  FileText, Server, Users, Clock, 
  Lock, Award, HelpCircle
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Plans: React.FC = () => {
  const { user } = useAuth();
  
  // Pricing plans
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      description: 'Basic access to get you started',
      color: 'nerds-blue',
      features: [
        'Access to basic labs and challenges',
        '5 practice exercises per month',
        'Community forum access',
        'Basic skill tracking'
      ],
      limitations: [
        'Limited access to premium content',
        'No certificate options',
        'No priority support'
      ]
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 19.99,
      description: 'Everything you need to master cybersecurity',
      color: 'nerds-green',
      popular: true,
      features: [
        'All free features included',
        'Unlimited access to all labs and challenges',
        'Certification preparation materials',
        'Real-world hacking scenarios',
        'Detailed performance analytics',
        'Priority email support',
        'Downloadable resources',
        'Monthly Q&A webinars'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 49.99,
      description: 'Advanced training for teams and organizations',
      color: 'nerds-yellow',
      features: [
        'All Professional features included',
        'Team management dashboard',
        'Custom learning paths',
        'Private team challenges',
        'API access',
        'Dedicated account manager',
        'Custom branding options',
        'SOC simulation exercises',
        'On-demand expert sessions'
      ]
    }
  ];
  
  return (
    <>
      <Helmet>
        <title>Plans & Pricing | Cyber Nerds Academy</title>
      </Helmet>
      
      <Navbar />
      
      <div className="bg-nerds-darkblue min-h-screen py-16">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Upgrade Your Cyber Skills</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose the plan that's right for you and gain access to premium labs,
              certifications, and advanced training materials.
            </p>
          </div>
          
          {/* Billing Toggle */}
          <div className="flex justify-center mb-10">
            <Tabs defaultValue="monthly" className="w-full max-w-xs">
              <TabsList className="grid grid-cols-2 bg-nerds-gray/20">
                <TabsTrigger 
                  value="monthly" 
                  className="data-[state=active]:bg-nerds-green data-[state=active]:text-nerds-darkblue"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger 
                  value="annual" 
                  className="data-[state=active]:bg-nerds-green data-[state=active]:text-nerds-darkblue"
                >
                  Annual
                  <Badge className="ml-2 bg-nerds-green/20 text-nerds-green border border-nerds-green/20">
                    Save 20%
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map(plan => (
              <Card 
                key={plan.id} 
                className={`border-${plan.color}/30 bg-nerds-darkblue/20 backdrop-blur-sm relative overflow-hidden`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <Badge className="m-4 bg-nerds-green text-black font-bold">
                      MOST POPULAR
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className={`text-${plan.color} text-xl`}>{plan.name}</CardTitle>
                  <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-white text-3xl font-bold">${plan.price}</span>
                    <span className="text-gray-400 ml-1">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">What's included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className={`text-${plan.color} shrink-0 w-5 h-5 mr-2`} />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {plan.limitations && (
                    <div>
                      <h4 className="text-white font-medium mb-2">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 shrink-0 mr-2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            <span className="text-gray-400 text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${
                      plan.id === 'free' 
                        ? 'bg-nerds-gray/30 hover:bg-nerds-gray/40 text-white' 
                        : `bg-${plan.color} hover:bg-${plan.color}/90 text-nerds-darkblue`
                    }`}
                  >
                    {plan.id === 'free' ? 'Current Plan' : 'Upgrade Now'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* Features Comparison */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Features Comparison</h2>
            <div className="overflow-x-auto pb-4">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-nerds-gray/30">
                    <th className="text-left pb-4 text-gray-400">Features</th>
                    <th className="pb-4 text-nerds-blue">Free</th>
                    <th className="pb-4 text-nerds-green">Professional</th>
                    <th className="pb-4 text-nerds-yellow">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-nerds-gray/10">
                    <td className="py-4 text-white flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-gray-400" />
                      Basic Labs
                    </td>
                    <td className="py-4 text-center"><Check className="mx-auto text-nerds-blue w-5 h-5" /></td>
                    <td className="py-4 text-center"><Check className="mx-auto text-nerds-green w-5 h-5" /></td>
                    <td className="py-4 text-center"><Check className="mx-auto text-nerds-yellow w-5 h-5" /></td>
                  </tr>
                  <tr className="border-b border-nerds-gray/10">
                    <td className="py-4 text-white flex items-center">
                      <Target className="w-5 h-5 mr-2 text-gray-400" />
                      Advanced Labs
                    </td>
                    <td className="py-4 text-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-500"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></td>
                    <td className="py-4 text-center"><Check className="mx-auto text-nerds-green w-5 h-5" /></td>
                    <td className="py-4 text-center"><Check className="mx-auto text-nerds-yellow w-5 h-5" /></td>
                  </tr>
                  <tr className="border-b border-nerds-gray/10">
                    <td className="py-4 text-white flex items-center">
                      <Server className="w-5 h-5 mr-2 text-gray-400" />
                      Hands-on Challenges
                    </td>
                    <td className="py-4 text-center text-gray-400">5/month</td>
                    <td className="py-4 text-center text-gray-300">Unlimited</td>
                    <td className="py-4 text-center text-gray-300">Unlimited</td>
                  </tr>
                  <tr className="border-b border-nerds-gray/10">
                    <td className="py-4 text-white flex items-center">
                      <Award className="w-5 h-5 mr-2 text-gray-400" />
                      Certification Preparation
                    </td>
                    <td className="py-4 text-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-500"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></td>
                    <td className="py-4 text-center"><Check className="mx-auto text-nerds-green w-5 h-5" /></td>
                    <td className="py-4 text-center"><Check className="mx-auto text-nerds-yellow w-5 h-5" /></td>
                  </tr>
                  <tr className="border-b border-nerds-gray/10">
                    <td className="py-4 text-white flex items-center">
                      <Users className="w-5 h-5 mr-2 text-gray-400" />
                      Team Management
                    </td>
                    <td className="py-4 text-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-500"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></td>
                    <td className="py-4 text-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-500"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></td>
                    <td className="py-4 text-center"><Check className="mx-auto text-nerds-yellow w-5 h-5" /></td>
                  </tr>
                  <tr className="border-b border-nerds-gray/10">
                    <td className="py-4 text-white flex items-center">
                      <Lock className="w-5 h-5 mr-2 text-gray-400" />
                      Private Labs
                    </td>
                    <td className="py-4 text-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-500"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></td>
                    <td className="py-4 text-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-500"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></td>
                    <td className="py-4 text-center"><Check className="mx-auto text-nerds-yellow w-5 h-5" /></td>
                  </tr>
                  <tr className="border-b border-nerds-gray/10">
                    <td className="py-4 text-white flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-gray-400" />
                      Support Response Time
                    </td>
                    <td className="py-4 text-center text-gray-400">48 hours</td>
                    <td className="py-4 text-center text-gray-300">24 hours</td>
                    <td className="py-4 text-center text-gray-300">4 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* FAQs */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border border-nerds-gray/30 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-nerds-green shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-medium mb-2">Can I cancel my subscription at any time?</h3>
                    <p className="text-gray-400">
                      Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border border-nerds-gray/30 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-nerds-green shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-medium mb-2">Are the certifications industry-recognized?</h3>
                    <p className="text-gray-400">
                      Our certifications are designed to align with industry standards. While they demonstrate your skills and knowledge, they are Cyber Nerds Academy certifications and complement industry certifications.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border border-nerds-gray/30 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-nerds-green shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-medium mb-2">How often is new content added?</h3>
                    <p className="text-gray-400">
                      We add new labs, challenges, and learning materials every month to keep content fresh and up-to-date with the latest cybersecurity trends and techniques.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border border-nerds-gray/30 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-nerds-green shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-medium mb-2">Is there a money-back guarantee?</h3>
                    <p className="text-gray-400">
                      Yes, we offer a 14-day money-back guarantee for all new subscriptions. If you're not satisfied with our service, you can request a refund within 14 days of your initial purchase.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Plans;
