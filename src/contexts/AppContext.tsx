import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { AppState, Lesson, MathProblem, CodeSnippet, AppSettings } from '@/types';

const defaultSettings: AppSettings = {
  theme: 'dark',
  fontSize: 'medium',
  animationsEnabled: true,
  backgroundStyle: 'gradient',
};

const defaultState: AppState = {
  lessons: [],
  mathHistory: [],
  codeHistory: [],
  settings: defaultSettings,
  currentNotes: '',
};

interface AppContextType {
  state: AppState;
  addLesson: (lesson: Lesson) => void;
  updateLesson: (id: string, updates: Partial<Lesson>) => void;
  deleteLesson: (id: string) => void;
  addMathProblem: (problem: MathProblem) => void;
  addCodeSnippet: (snippet: CodeSnippet) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  updateNotes: (notes: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<AppState>('mathMind-state', defaultState);

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
