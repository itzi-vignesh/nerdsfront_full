
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ClipboardList, Check, X } from "lucide-react";

interface ProfileCompletionProps {
  completion: number;
}

const ProfileCompletion: React.FC<ProfileCompletionProps> = ({ completion }) => {
  const tasks = [
    { title: "Complete your profile info", completed: completion >= 20 },
    { title: "Verify your email", completed: completion >= 30 },
    { title: "Link social accounts", completed: completion >= 50 },
    { title: "Complete first lab", completed: completion >= 70 },
    { title: "Earn first achievement", completed: completion >= 90 }
  ];

  return (
    <Card className="border-nerds-gray/30 bg-nerds-darkblue/20 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg text-white">
          <ClipboardList className="w-5 h-5 mr-2 text-nerds-green" />
          Profile Completion
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-1 text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="text-nerds-green">{completion}%</span>
          </div>
          <Progress value={completion} className="h-2 bg-nerds-gray/30" />
        </div>
        
        <div className="space-y-2">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-gray-300">{task.title}</span>
              {task.completed ? (
                <Check className="w-4 h-4 text-nerds-green" />
              ) : (
                <X className="w-4 h-4 text-red-500" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletion;
