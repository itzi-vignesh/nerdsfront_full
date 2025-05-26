
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <div className="bg-nerds-darkblue py-16 w-full">
      <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-nerds-gray to-nerds-darkgray rounded-2xl p-8 md:p-12 border border-nerds-gray/50 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/2 w-64 h-64 rounded-full bg-nerds-yellow/5 blur-3xl transform -translate-x-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-nerds-blue/5 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Cybersecurity Journey?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join thousands of students and professionals learning cybersecurity through hands-on practice. Enroll today and start building your skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-nerds-yellow text-nerds-darkblue hover:bg-nerds-yellow/90">
                <Link to="/register">
                  Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5">
                <Link to="/tracks">
                  Browse Learning Tracks
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;

