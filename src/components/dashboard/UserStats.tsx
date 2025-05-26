
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Star, Flag, Award } from "lucide-react";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer 
} from 'recharts';

interface UserStatsProps {
  stats: {
    labsCompleted: number;
    achievementsEarned: number;
    currentStreak: number;
    totalPoints: number;
    weeklyActivity: Array<{
      day: string;
      points: number;
    }>;
  };
}

const UserStats: React.FC<UserStatsProps> = ({ stats }) => {
  return (
    <Card className="border-nerds-gray/30 bg-nerds-darkblue/20 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg text-white">
          <Activity className="w-5 h-5 mr-2 text-nerds-blue" />
          Your Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-nerds-gray/20 rounded-md">
            <div className="flex items-center mb-1">
              <Flag className="text-nerds-green w-4 h-4 mr-1" />
              <span className="text-xs text-gray-400">Labs Completed</span>
            </div>
            <p className="text-lg font-bold text-white">{stats.labsCompleted}</p>
          </div>
          <div className="p-3 bg-nerds-gray/20 rounded-md">
            <div className="flex items-center mb-1">
              <Award className="text-nerds-yellow w-4 h-4 mr-1" />
              <span className="text-xs text-gray-400">Achievements</span>
            </div>
            <p className="text-lg font-bold text-white">{stats.achievementsEarned}</p>
          </div>
          <div className="p-3 bg-nerds-gray/20 rounded-md">
            <div className="flex items-center mb-1">
              <Star className="text-nerds-yellow w-4 h-4 mr-1" />
              <span className="text-xs text-gray-400">Current Streak</span>
            </div>
            <p className="text-lg font-bold text-white">{stats.currentStreak} days</p>
          </div>
          <div className="p-3 bg-nerds-gray/20 rounded-md">
            <div className="flex items-center mb-1">
              <Trophy className="text-nerds-yellow w-4 h-4 mr-1" />
              <span className="text-xs text-gray-400">Total Points</span>
            </div>
            <p className="text-lg font-bold text-white">{stats.totalPoints}</p>
          </div>
        </div>
        
        <div className="bg-nerds-gray/20 p-3 rounded-md">
          <h4 className="text-white text-sm mb-2">Weekly Activity</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 10, fill: '#aaa' }}
                  axisLine={{ stroke: '#333' }}
                />
                <YAxis 
                  tick={{ fontSize: 10, fill: '#aaa' }}
                  axisLine={{ stroke: '#333' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '4px'
                  }}
                />
                <Bar dataKey="points" fill="#00FF8C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Fallback icon for TypeScript
const Trophy = Award;

export default UserStats;
