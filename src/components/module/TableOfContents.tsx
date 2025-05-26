
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

export type ContentSection = {
  id: string;
  title: string;
  isCompleted: boolean;
  subSections?: ContentSection[];
};

interface TableOfContentsProps {
  sections: ContentSection[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  progressPercentage: number;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  sections,
  activeSection,
  onSectionClick,
  progressPercentage
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const renderSection = (section: ContentSection, level = 0) => {
    const hasSubSections = section.subSections && section.subSections.length > 0;
    const isExpanded = expandedSections.has(section.id);
    const isActive = activeSection === section.id;

    return (
      <li key={section.id} className="my-1">
        <div
          className={cn(
            "flex items-center px-3 py-2 rounded-md text-sm transition-colors cursor-pointer",
            isActive
              ? "bg-nerds-yellow/10 text-nerds-yellow"
              : "text-gray-300 hover:text-white hover:bg-nerds-gray/50",
            level > 0 && "ml-4"
          )}
          onClick={() => onSectionClick(section.id)}
        >
          {hasSubSections && (
            <button
              onClick={(e) => toggleSection(section.id, e)}
              className="mr-1 text-gray-400 hover:text-white"
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          )}
          <span className="flex-1 truncate">{section.title}</span>
          {section.isCompleted && (
            <CheckCircle2 size={16} className="text-green-500 ml-2" />
          )}
        </div>
        {hasSubSections && isExpanded && (
          <ul className="mt-1 space-y-1">
            {section.subSections!.map(subSection => renderSection(subSection, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="bg-nerds-darkblue border-r border-nerds-gray/30 h-full overflow-y-auto fixed left-0 top-[64px] w-1/4 bottom-0">
      <div className="p-4">
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-white font-medium">Table of Contents</h2>
            <span className={`text-sm ${progressPercentage === 100 ? "text-green-500" : "text-nerds-yellow"}`}>
              {progressPercentage}%
            </span>
          </div>
          <Progress 
            value={progressPercentage} 
            className={`h-2 ${
              progressPercentage === 100 
                ? "bg-green-500/20" 
                : "bg-nerds-darkblue/50"
            }`} 
          />
        </div>
        <ul className="space-y-1">
          {sections.map(section => renderSection(section))}
        </ul>
      </div>
    </div>
  );
};

export default TableOfContents;
