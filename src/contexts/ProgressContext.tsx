
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types
type ModuleProgress = {
  [moduleId: string]: {
    completedSections: string[];
    totalSections: number;
  };
};

type TrackProgress = {
  [trackId: string]: {
    modules: ModuleProgress;
  };
};

interface ProgressContextType {
  progress: TrackProgress;
  markSectionComplete: (trackId: string, moduleId: string, sectionId: string) => void;
  getModuleProgress: (trackId: string, moduleId: string) => number;
  isSectionCompleted: (trackId: string, moduleId: string, sectionId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<TrackProgress>(() => {
    const savedProgress = localStorage.getItem('userProgress');
    return savedProgress ? JSON.parse(savedProgress) : {};
  });

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(progress));
  }, [progress]);

  const markSectionComplete = (trackId: string, moduleId: string, sectionId: string) => {
    setProgress(prev => {
      // Create deep copy to avoid direct state mutation
      const newProgress = { ...prev };
      
      // Initialize track if it doesn't exist
      if (!newProgress[trackId]) {
        newProgress[trackId] = { modules: {} };
      }
      
      // Initialize module if it doesn't exist
      if (!newProgress[trackId].modules[moduleId]) {
        newProgress[trackId].modules[moduleId] = {
          completedSections: [],
          totalSections: 0  // This will be set properly when the module is loaded
        };
      }
      
      // Add section to completed sections if not already there
      const completedSections = newProgress[trackId].modules[moduleId].completedSections;
      if (!completedSections.includes(sectionId)) {
        newProgress[trackId].modules[moduleId].completedSections = [...completedSections, sectionId];
      }
      
      return newProgress;
    });
  };

  const getModuleProgress = (trackId: string, moduleId: string): number => {
    if (!progress[trackId] || !progress[trackId].modules[moduleId]) {
      return 0;
    }
    
    const { completedSections, totalSections } = progress[trackId].modules[moduleId];
    if (totalSections === 0) return 0;
    
    return Math.round((completedSections.length / totalSections) * 100);
  };

  const isSectionCompleted = (trackId: string, moduleId: string, sectionId: string): boolean => {
    if (!progress[trackId] || !progress[trackId].modules[moduleId]) {
      return false;
    }
    
    return progress[trackId].modules[moduleId].completedSections.includes(sectionId);
  };

  const setTotalSections = (trackId: string, moduleId: string, count: number) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      
      if (!newProgress[trackId]) {
        newProgress[trackId] = { modules: {} };
      }
      
      if (!newProgress[trackId].modules[moduleId]) {
        newProgress[trackId].modules[moduleId] = {
          completedSections: [],
          totalSections: count
        };
      } else {
        newProgress[trackId].modules[moduleId].totalSections = count;
      }
      
      return newProgress;
    });
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markSectionComplete,
        getModuleProgress,
        isSectionCompleted,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
