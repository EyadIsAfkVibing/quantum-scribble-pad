export interface Lesson {
  id: string;
  name: string;
  notes: string;
  formulas: string[];
  videos: string[];
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
}

export interface AppState {
  lessons: Lesson[];
  mathHistory: MathProblem[];
  codeHistory: CodeSnippet[];
  settings: AppSettings;
  currentNotes: string;
}
