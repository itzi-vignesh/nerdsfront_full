
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedHeroBackground from './AnimatedHeroBackground';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-nerds-darkblue pt-20 pb-24">
      <AnimatedHeroBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-12 mb-6 tracking-tight">
            <span className="text-nerds-yellow drop-shadow-[0_0_15px_rgba(251,25,50,0.3)]">NerdsLab</span> 
            <span className="relative">
              Cyber Academy
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-nerds-yellow/70 to-transparent"></span>
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Master cybersecurity through hands-on labs and real-world challenges
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-nerds-yellow text-nerds-darkblue hover:bg-nerds-yellow/90 shadow-[0_0_15px_rgba(251,25,50,0.3)] hover:shadow-[0_0_20px_rgba(251,25,50,0.5)] transition-all">
              <Link to="/tracks">
                Explore Learning Tracks <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-nerds-yellow/50 text-nerds-yellow hover:bg-nerds-yellow/10 transition-all">
              <Link to="/login">
                Sign In to Begin
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

