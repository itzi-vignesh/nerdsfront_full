
import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ContentSectionProps {
  id: string;
  title: string;
  content: React.ReactNode;
  isCompleted: boolean;
  onMarkComplete: () => void;
  onNextSection: () => void;
  isLastSection: boolean;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  id,
  title,
  content,
  isCompleted,
  onMarkComplete,
  onNextSection,
  isLastSection
}) => {
  return (
    <div id={id} className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {isCompleted && (
          <div className="flex items-center text-green-500 text-sm">
            <CheckCircle size={16} className="mr-1" />
            Completed
          </div>
        )}
      </div>
      
      <div className="prose prose-invert max-w-none mb-8 flex-grow overflow-y-auto">
        {content}
      </div>
      
      <div className="flex justify-between pt-4 border-t border-nerds-gray/30 mt-auto">
        {!isCompleted ? (
          <Button 
            onClick={onMarkComplete}
            className="bg-nerds-yellow text-nerds-darkblue hover:bg-nerds-yellow/90"
          >
            Mark as Complete
          </Button>
        ) : (
          <Button 
            variant="outline" 
            disabled
            className="border-green-500/30 text-green-500"
          >
            <CheckCircle size={16} className="mr-2" />
            Completed
          </Button>
        )}
        
        {!isLastSection && (
          <Button 
            onClick={onNextSection}
            className={cn(
              "ml-auto",
              isCompleted ? "bg-nerds-yellow text-nerds-darkblue hover:bg-nerds-yellow/90" : "bg-nerds-gray/50 text-white hover:bg-nerds-gray"
            )}
          >
            Next Section <ArrowRight size={16} className="ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ContentSection;
