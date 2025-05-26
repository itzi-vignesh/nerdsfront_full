
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface TrackCardProps {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  progress?: number;
  moduleCount: number;
  labCount: number;
  estimatedHours: number;
  icon: 'ethical' | 'pentesting' | 'advanced';
}

const TrackCard: React.FC<TrackCardProps> = ({
  id,
  title,
  description,
  level,
  progress = 0,
  moduleCount,
  labCount,
  estimatedHours,
  icon
}) => {
  const levelBadge = {
    beginner: { text: 'Beginner', class: 'bg-nerds-blue/20 text-nerds-blue' },
    intermediate: { text: 'Intermediate', class: 'bg-nerds-yellow/20 text-nerds-yellow' },
    advanced: { text: 'Advanced', class: 'bg-nerds-red/20 text-nerds-red' }
  };

  const trackIcons = {
    ethical: <Shield className="w-10 h-10 text-nerds-blue" />,
    pentesting: <Zap className="w-10 h-10 text-nerds-yellow" />,
    advanced: <Target className="w-10 h-10 text-nerds-red" />
  };
  
  return (
    <div className="bg-nerds-gray rounded-xl overflow-hidden border border-nerds-gray/50 hover:border-nerds-yellow/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.15)]">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-lg bg-nerds-darkblue border border-nerds-gray/50">
            {trackIcons[icon]}
          </div>
          <Badge className={levelBadge[level].class}>
            {levelBadge[level].text}
          </Badge>
        </div>
        
        <h3 className="text-xl font-bold text-white mt-4">{title}</h3>
        <p className="mt-2 text-gray-400 text-sm line-clamp-3">{description}</p>
        
        {progress > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Progress</span>
              <span className="text-nerds-yellow">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1 bg-nerds-darkblue/50" />
          </div>
        )}
        
        <div className="mt-6 grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-nerds-yellow font-bold text-lg">{moduleCount}</p>
            <p className="text-gray-400 text-xs">Modules</p>
          </div>
          <div>
            <p className="text-nerds-yellow font-bold text-lg">{labCount}</p>
            <p className="text-gray-400 text-xs">Labs</p>
          </div>
          <div>
            <p className="text-nerds-yellow font-bold text-lg">{estimatedHours}</p>
            <p className="text-gray-400 text-xs">Hours</p>
          </div>
        </div>
        
        <Link 
          to={`/tracks/${id}`}
          className="mt-6 flex items-center justify-center gap-2 py-2.5 w-full rounded-md bg-nerds-darkblue hover:bg-nerds-darkblue/80 text-white font-medium transition-colors duration-200"
        >
          View Track <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default TrackCard;
