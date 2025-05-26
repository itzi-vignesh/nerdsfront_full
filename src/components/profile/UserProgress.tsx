
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, ArrowRight, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserProgressProps {
  level: number;
  experience: number;
  experienceToNextLevel: number;
}

const UserProgress: React.FC<UserProgressProps> = ({
  level,
  experience,
  experienceToNextLevel
}) => {
  const progressPercentage = Math.min(100, Math.round((experience / experienceToNextLevel) * 100));
  
  return (
    <Card className="border-nerds-gray/30 bg-nerds-darkblue/20 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg text-white">
          <BarChart2 className="w-5 h-5 mr-2 text-nerds-green" />
          Level Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-nerds-darkblue border-4 border-nerds-green mb-3">
            <div>
              <Trophy className="w-6 h-6 text-nerds-yellow mx-auto mb-1" />
              <span className="text-2xl font-bold text-white block">{level}</span>
            </div>
          </div>
          <h3 className="text-white font-medium">Cyber Defender</h3>
          <p className="text-gray-400 text-sm">Level {level} Ethical Hacker</p>
        </div>
        
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4 text-nerds-green" />
              <span className="text-white font-medium">Next Level: {level + 1}</span>
            </div>
            <span className="text-nerds-green">{progressPercentage}%</span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-2 bg-nerds-gray/30"
          />
          <div className="flex justify-between text-sm mt-1 text-gray-400">
            <span>{experience} XP</span>
            <span>{experienceToNextLevel} XP</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-white">How to earn more XP:</h4>
          <div className="bg-nerds-gray/20 p-3 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Complete labs</span>
              <span className="text-nerds-yellow text-sm">+50-200 XP</span>
            </div>
          </div>
          <div className="bg-nerds-gray/20 p-3 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Earn badges</span>
              <span className="text-nerds-yellow text-sm">+100 XP</span>
            </div>
          </div>
          <div className="bg-nerds-gray/20 p-3 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Daily login streak</span>
              <span className="text-nerds-yellow text-sm">+10 XP/day</span>
            </div>
          </div>
          
          <Button 
            className="w-full bg-nerds-darkblue hover:bg-nerds-darkblue/80 text-white flex items-center justify-center"
            asChild
          >
            <a href="/labs">
              Explore Labs <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProgress;
