
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid2X2 } from "lucide-react";

interface SkillMatrixProps {
  skills: Record<string, number>;
}

const SkillMatrix: React.FC<SkillMatrixProps> = ({ skills }) => {
  return (
    <Card className="border-nerds-gray/30 bg-nerds-darkblue/20 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg text-white">
          <Grid2X2 className="w-5 h-5 mr-2 text-nerds-blue" />
          Skills Matrix
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Object.entries(skills).map(([skill, level]) => (
            <div key={skill} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">{skill}</span>
                <span className="text-nerds-green">{level}%</span>
              </div>
              <div className="h-2 w-full bg-nerds-gray/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-nerds-green/70 to-nerds-green" 
                  style={{ width: `${level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillMatrix;
