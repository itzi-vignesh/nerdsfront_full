
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Award, Lock, CheckCircle } from "lucide-react";
import { DifficultyLevel } from '@/types/lab';
import { Link } from 'react-router-dom';

interface LabCardProps {
  id: string;
  trackId: string;
  moduleId: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  category: string;
  estimatedMinutes: number;
  pointsAwarded: number;
  isCompleted: boolean;
  isLocked: boolean;
}

const LabCard: React.FC<LabCardProps> = ({
  id,
  title,
  description,
  difficulty,
  category,
  estimatedMinutes,
  pointsAwarded,
  isCompleted,
  isLocked
}) => {
  // Get difficulty color
  const getDifficultyColor = () => {
    switch(difficulty) {
      case 'easy':
        return 'bg-green-500/10 text-green-500';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'hard':
        return 'bg-orange-500/10 text-orange-500';
      case 'extreme':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };
  
  return (
    <Card className={`border-nerds-gray/30 bg-nerds-darkblue/20 backdrop-blur-sm hover:border-nerds-gray/50 transition-all ${isLocked ? 'opacity-80' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-white font-medium">{title}</h3>
            <p className="text-gray-400 text-sm mt-1">{description}</p>
          </div>
          
          {isCompleted && (
            <div className="bg-nerds-green/10 p-1.5 rounded-full">
              <CheckCircle className="text-nerds-green w-5 h-5" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="bg-nerds-blue/10 text-nerds-blue border-nerds-blue/20 hover:bg-nerds-blue/20">
            {category}
          </Badge>
          <Badge variant="outline" className={`${getDifficultyColor()} border-transparent hover:bg-opacity-20`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
        
        <div className="flex justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{estimatedMinutes} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4 text-nerds-yellow" />
            <span>{pointsAwarded} pts</span>
          </div>
        </div>
        
        {isLocked ? (
          <Button 
            className="w-full bg-nerds-gray/20 hover:bg-nerds-gray/30 text-gray-300"
            disabled={true}
          >
            <Lock className="w-4 h-4 mr-2" />
            Unlock
          </Button>
        ) : (
          <Button 
            asChild
            className="w-full bg-nerds-green hover:bg-nerds-green/90 text-nerds-darkblue font-medium"
          >
            <Link to={`/labs/environment/${id}`}>
              {isCompleted ? 'Review Lab' : 'Start Lab'}
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default LabCard;
