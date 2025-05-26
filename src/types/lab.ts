
export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'extreme';

export interface Lab {
  id: string;
  trackId: string;
  moduleId: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  category: string;
  estimatedMinutes: number;
  pointsAwarded: number;
  isCompleted: boolean;
  isLocked: boolean;
}
