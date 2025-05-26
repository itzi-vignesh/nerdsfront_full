
import React from 'react';
import { Users, BookOpen, Target, Award } from 'lucide-react';

const StatisticsSection = () => {
  const stats = [
    {
      value: '10,000+',
      label: 'Active Students',
      icon: Users
    },
    {
      value: '300+',
      label: 'Labs & Challenges',
      icon: Target
    },
    {
      value: '50+',
      label: 'Learning Modules',
      icon: BookOpen
    },
    {
      value: '2000+',
      label: 'Certifications Awarded',
      icon: Award
    }
  ];

  return (
    <div className="bg-gradient-to-r from-nerds-darkblue to-nerds-darkgray py-16 w-full">
      <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-nerds-yellow/10 rounded-full mb-4">
                <stat.icon className="h-6 w-6 text-nerds-yellow" />
              </div>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;
