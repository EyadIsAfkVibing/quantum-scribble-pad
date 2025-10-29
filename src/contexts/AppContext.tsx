import React, { createContext, useContext, ReactNode, useReducer } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { AppState, Lesson, MathProblem, CodeSnippet, AppSettings, Achievement, StudyStreak } from '@/types';

const defaultSettings: AppSettings = {
  theme: 'dark',
  fontSize: 'medium',
  animationsEnabled: true,
  backgroundStyle: 'gradient',
  auroraIntensity: 'medium',
};

const defaultStreak: StudyStreak = {
  currentStreak: 0,
  longestStreak: 0,
  lastStudyDate: '',
  totalDays: 0,
};

const defaultAchievements: Achievement[] = [
  { id: '1', title: 'First Lesson', description: 'Create your first lesson', icon: 'star', unlocked: false },
  { id: '2', title: 'Math Master', description: 'Solve 10 math problems', icon: 'trophy', unlocked: false },
  { id: '3', title: 'Code Warrior', description: 'Save 5 code snippets', icon: 'zap', unlocked: false },
];

const defaultState: AppState = {
  lessons: [],
  mathHistory: [],
  codeHistory: [],
  settings: defaultSettings,
  currentNotes: '',
  achievements: defaultAchievements,
  studyStreak: defaultStreak,
  quickNotes: '',
};

type AppAction =
  | { type: 'ADD_LESSON'; payload: Lesson }
  | { type: 'UPDATE_LESSON'; payload: { id: string; updates: Partial<Lesson> } }
  | { type: 'DELETE_LESSON'; payload: string }
  | { type: 'ADD_MATH_PROBLEM'; payload: MathProblem }
  | { type: 'ADD_CODE_SNIPPET'; payload: CodeSnippet }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<AppSettings> }
  | { type: 'UPDATE_NOTES'; payload: string }
  | { type: 'UPDATE_QUICK_NOTES'; payload: string }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: string }
  | { type: 'UPDATE_STREAK'; payload: Partial<StudyStreak> };

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  addLesson: (lesson: Lesson) => void;
  updateLesson: (id: string, updates: Partial<Lesson>) => void;
  deleteLesson: (id: string) => void;
  addMathProblem: (problem: MathProblem) => void;
  addCodeSnippet: (snippet: CodeSnippet) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  updateNotes: (notes: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_LESSON':
      return { ...state, lessons: [...state.lessons, action.payload] };
    case 'UPDATE_LESSON':
      return {
        ...state,
        lessons: state.lessons.map(l =>
          l.id === action.payload.id
            ? { ...l, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : l
        ),
      };
    case 'DELETE_LESSON':
      return { ...state, lessons: state.lessons.filter(l => l.id !== action.payload) };
    case 'ADD_MATH_PROBLEM':
      return { ...state, mathHistory: [action.payload, ...state.mathHistory].slice(0, 50) };
    case 'ADD_CODE_SNIPPET':
      return { ...state, codeHistory: [action.payload, ...state.codeHistory].slice(0, 50) };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case 'UPDATE_NOTES':
      return { ...state, currentNotes: action.payload };
    case 'UPDATE_QUICK_NOTES':
      return { ...state, quickNotes: action.payload };
    case 'UNLOCK_ACHIEVEMENT':
      return {
        ...state,
        achievements: state.achievements.map(a =>
          a.id === action.payload ? { ...a, unlocked: true, unlockedAt: new Date().toISOString() } : a
        ),
      };
    case 'UPDATE_STREAK':
      return { ...state, studyStreak: { ...state.studyStreak, ...action.payload } };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<AppState>('mathMind-state', defaultState);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const dispatch = (action: AppAction) => {
    setState((prev) => {
      const newState = appReducer(prev, action);
      return newState;
    });
  };

  const addLesson = (lesson: Lesson) => {
    setState(prev => ({
      ...prev,
      lessons: [...prev.lessons, lesson],
    }));
  };

  const updateLesson = (id: string, updates: Partial<Lesson>) => {
    setState(prev => ({
      ...prev,
      lessons: prev.lessons.map(l => 
        l.id === id ? { ...l, ...updates, updatedAt: new Date().toISOString() } : l
      ),
    }));
  };

  const deleteLesson = (id: string) => {
    setState(prev => ({
      ...prev,
      lessons: prev.lessons.filter(l => l.id !== id),
    }));
  };

  const addMathProblem = (problem: MathProblem) => {
    setState(prev => ({
      ...prev,
      mathHistory: [problem, ...prev.mathHistory].slice(0, 50),
    }));
  };

  const addCodeSnippet = (snippet: CodeSnippet) => {
    setState(prev => ({
      ...prev,
      codeHistory: [snippet, ...prev.codeHistory].slice(0, 50),
    }));
  };

  const updateSettings = (settings: Partial<AppSettings>) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settings },
    }));
  };

  const updateNotes = (notes: string) => {
    setState(prev => ({
      ...prev,
      currentNotes: notes,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        addLesson,
        updateLesson,
        deleteLesson,
        addMathProblem,
        addCodeSnippet,
        updateSettings,
        updateNotes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
