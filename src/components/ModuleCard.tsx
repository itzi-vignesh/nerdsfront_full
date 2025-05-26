
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, FileText, Beaker } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useProgress } from '@/contexts/ProgressContext';

interface ModuleCardProps {
  id: string;
  trackId: string;
  title: string;
  description: string;
  progress?: number;
  isCompleted?: boolean;
  isLocked?: boolean;
  labCount: number;
  contentCount: number;
  estimatedHours: number;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  id,
  trackId,
  title,
  description,
  progress,
  isCompleted = false,
  isLocked = false,
  labCount,
  contentCount,
  estimatedHours
}) => {
  const { getModuleProgress } = useProgress();
  
  // Use context progress if available, otherwise use the prop
  const moduleProgress = progress !== undefined ? progress : getModuleProgress(trackId, id);
  const moduleCompleted = isCompleted || moduleProgress === 100;
  
  return (
    <div className={`bg-nerds-gray rounded-xl overflow-hidden border ${
      moduleCompleted 
        ? 'border-green-500/30' 
        : isLocked 
          ? 'border-gray-600/30 opacity-70' 
          : 'border-nerds-gray/50 hover:border-nerds-yellow/50'
    } transition-all duration-300`}>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          {moduleCompleted && (
            <span className="text-green-500">
              <CheckCircle size={20} />
            </span>
          )}
        </div>
        
        <p className="mt-2 text-gray-400 text-sm line-clamp-2">{description}</p>
        
        {!isLocked && moduleProgress > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Progress</span>
              <span className={moduleCompleted ? "text-green-500" : "text-nerds-yellow"}>
                {moduleCompleted ? 'Completed' : `${moduleProgress}%`}
              </span>
            </div>
            <Progress 
              value={moduleCompleted ? 100 : moduleProgress} 
              className={`h-1 ${moduleCompleted ? "bg-green-500/20" : "bg-nerds-darkblue/50"}`}
            />
          </div>
        )}
        
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <FileText size={14} />
            <span>{contentCount} Lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Beaker size={14} />
            <span>{labCount} Labs</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{estimatedHours} Hours</span>
          </div>
        </div>
        
        {isLocked ? (
          <div className="mt-4 flex items-center justify-center gap-2 py-2.5 w-full rounded-md bg-nerds-darkblue/50 text-gray-400 font-medium cursor-not-allowed">
            Locked <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
        ) : (
          <Link 
            to={`/tracks/${trackId}/modules/${id}`}
            className="mt-4 flex items-center justify-center gap-2 py-2.5 w-full rounded-md bg-nerds-darkblue hover:bg-nerds-darkblue/80 text-white font-medium transition-colors duration-200"
          >
            {moduleCompleted ? 'Review Module' : (moduleProgress > 0 ? 'Continue' : 'Start Module')} <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ModuleCard;
