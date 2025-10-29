export interface Lesson {
  id: string;
  name: string;
  notes: string;
  formulas: string[];
  videos: string[]; // Array of video IDs or URLs
  videoUrls: string[]; // Full YouTube URLs
  timeSpent: number; // Time spent studying in minutes
  createdAt: string;
  updatedAt: string;
}

export interface MathProblem {
  id: string;
  expression: string;
  solution: string;
  timestamp: string;
}

export interface CodeSnippet {
  id: string;
  language: 'python' | 'javascript' | 'cpp';
  code: string;
  timestamp: string;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  animationsEnabled: boolean;
  backgroundStyle: 'gradient' | 'particles' | 'waves';
  auroraIntensity: 'low' | 'medium' | 'high';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;
  totalDays: number;
}

export interface AppState {
  lessons: Lesson[];
  mathHistory: MathProblem[];
  codeHistory: CodeSnippet[];
  settings: AppSettings;
  currentNotes: string;
  achievements: Achievement[];
  studyStreak: StudyStreak;
  quickNotes: string;
}
