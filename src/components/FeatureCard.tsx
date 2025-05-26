
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon, className = '' }) => {
  return (
    <div className={`p-6 bg-nerds-gray/50 rounded-xl border border-nerds-gray/30 hover:border-nerds-yellow/50 transition-all group ${className}`}>
      <div className="p-3 bg-nerds-yellow/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4 text-nerds-yellow group-hover:bg-nerds-yellow/20 transition-all">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;

