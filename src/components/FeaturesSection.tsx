
import React from 'react';
import { BookOpen, Beaker, Trophy, Award, CheckSquare, Clock } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Structured Learning Paths',
      description: 'Follow clear, progressive learning tracks tailored to your skill level and goals.',
      icon: BookOpen
    },
    {
      title: 'Hands-on Labs',
      description: 'Practice in realistic environments with interactive challenges and scenarios.',
      icon: Beaker
    },
    {
      title: 'Gamified Experience',
      description: 'Earn points, badges, and climb the leaderboard as you master new skills.',
      icon: Trophy
    },
    {
      title: 'NerdsLab Certification',
      description: 'Earn industry-recognized certificates to validate your cybersecurity skills.',
      icon: Award
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your progress with detailed analytics and completion status.',
      icon: CheckSquare
    },
    {
      title: 'Learn at Your Pace',
      description: 'Access content 24/7 and learn according to your own schedule and availability.',
      icon: Clock
    }
  ];

  return (
    <div className="bg-nerds-darkblue py-16 w-full">
      <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose NerdsLab Cyber Academy?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our platform combines theoretical knowledge with practical experience to prepare you for real-world cybersecurity challenges.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;

