import React from 'react';
import { Lab } from '@/data/labsData';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface LabCardProps {
  id: string;
  trackId: string;
  moduleId: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  estimatedMinutes: number;
  pointsAwarded: number;
  isCompleted: boolean;
  isLocked: boolean;
}

export const LabCard: React.FC<LabCardProps> = ({
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
  return (
    <Card className="bg-nerds-gray/20 border-nerds-gray/30 text-gray-200 h-full flex flex-col">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-white font-medium">{title}</h3>
          <Badge className={`${
            difficulty === 'easy' ? 'bg-green-500' : 
            difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
          } text-white`}>
            {difficulty}
          </Badge>
        </div>
        <Badge variant="outline" className="mt-1 w-fit">
          {category}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow">
        <p className="text-gray-400 text-sm mb-3">{description}</p>
        <div className="flex flex-wrap gap-2 text-xs text-gray-400">
          <span>⏱️ {estimatedMinutes} min</span>
          <span>🏆 {pointsAwarded} pts</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2">
        <Link to={`/labs/${id}`} className="w-full">
          <Button 
            className="w-full bg-nerds-green text-nerds-darkblue hover:bg-nerds-green/90"
            disabled={isLocked}
          >
            {isLocked ? "Locked" : isCompleted ? "Completed" : "View Lab"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
