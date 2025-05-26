
import React from 'react';
import { Trophy, Award, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface LeaderboardCardProps {
  rank: number;
  username: string;
  avatarUrl?: string;
  points: number;
  labsCompleted: number;
  achievements: number;
  isCurrentUser?: boolean;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({
  rank,
  username,
  avatarUrl,
  points,
  labsCompleted,
  achievements,
  isCurrentUser = false
}) => {
  // Style based on top ranks
  const getRankStyle = () => {
    if (rank === 1) return 'bg-[#FFD700]/10 border-[#FFD700]/30';
    if (rank === 2) return 'bg-[#C0C0C0]/10 border-[#C0C0C0]/30';
    if (rank === 3) return 'bg-[#CD7F32]/10 border-[#CD7F32]/30';
    return isCurrentUser ? 'bg-nerds-yellow/5 border-nerds-yellow/20' : 'bg-nerds-gray border-nerds-gray/50';
  };

  const getRankIcon = () => {
    if (rank === 1) return <Trophy className="text-[#FFD700] w-5 h-5" />;
    if (rank === 2) return <Trophy className="text-[#C0C0C0] w-5 h-5" />;
    if (rank === 3) return <Trophy className="text-[#CD7F32] w-5 h-5" />;
    return <span className="text-gray-400 font-medium">{rank}</span>;
  };

  return (
    <div className={`p-4 rounded-lg border ${getRankStyle()} transition-all hover:shadow-md`}>
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-8 h-8">
          {getRankIcon()}
        </div>
        
        <div className="flex items-center gap-3 flex-1">
          <Avatar className="w-10 h-10 border-2 border-nerds-gray">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback className="bg-nerds-darkblue text-white">
              {username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <p className={`font-medium ${isCurrentUser ? 'text-nerds-yellow' : 'text-white'}`}>
              {username} {isCurrentUser && <span className="text-xs text-nerds-yellow">(You)</span>}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Award size={12} /> {points} pts
              </span>
              <span>•</span>
              <span>{labsCompleted} labs</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Star size={12} /> {achievements}
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-lg font-bold text-nerds-yellow">{points}</p>
          <p className="text-xs text-gray-400">points</p>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;
