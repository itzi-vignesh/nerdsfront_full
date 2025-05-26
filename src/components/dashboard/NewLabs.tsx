
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

interface Lab {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isNew: boolean;
  category: string;
}

const newLabs: Lab[] = [
  {
    id: "lab-1",
    title: "SQL Injection Fundamentals",
    difficulty: "beginner",
    isNew: true,
    category: "Web Security"
  },
  {
    id: "lab-2",
    title: "Advanced Network Penetration",
    difficulty: "advanced",
    isNew: true,
    category: "Network"
  },
  {
    id: "lab-3",
    title: "Social Engineering Tactics",
    difficulty: "intermediate",
    isNew: true,
    category: "Human Factor"
  }
];

const difficultyClasses = {
  beginner: "bg-green-500/20 text-green-500",
  intermediate: "bg-nerds-yellow/20 text-nerds-yellow",
  advanced: "bg-nerds-red/20 text-nerds-red"
};

const NewLabs: React.FC = () => {
  return (
    <Card className="border-nerds-gray/30 bg-nerds-darkblue/20 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg text-white">
          <Rocket className="w-5 h-5 mr-2 text-nerds-yellow" />
          New Labs Launched
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {newLabs.map(lab => (
            <div key={lab.id} className="p-3 rounded-md bg-nerds-gray/20 hover:bg-nerds-gray/30 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <Badge className={difficultyClasses[lab.difficulty]}>
                  {lab.difficulty.charAt(0).toUpperCase() + lab.difficulty.slice(1)}
                </Badge>
                <Badge variant="outline" className="bg-nerds-green/10 text-nerds-green border-nerds-green/20 text-xs">
                  NEW
                </Badge>
              </div>
              <h3 className="text-white text-sm font-medium mb-1">{lab.title}</h3>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">{lab.category}</span>
                <Link to={`/labs/${lab.id}`} className="text-nerds-green text-xs flex items-center">
                  View Lab <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewLabs;
