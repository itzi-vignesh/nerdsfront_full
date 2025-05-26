import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CTASection from '@/components/CTASection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedHeroBackground from '@/components/AnimatedHeroBackground';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Home | Learn Cybersecurity</title>
        <meta name="description" content="Learn cybersecurity through hands-on labs and practical courses at NerdsLab Cyber Academy" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <section className="relative overflow-hidden">
            <AnimatedHeroBackground />
            <HeroSection />
          </section>
          
          <FeaturesSection />
          <CTASection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Home; 