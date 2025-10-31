import { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Code2, ArrowRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Splash } from '@/components/Splash';
import { SessionResume } from '@/components/SessionResume';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

const DarkVeil = lazy(() => import('@/components/DarkVeil'));

export default function Home() {
  const { state, updateLesson } = useApp();
  const [showSplash, setShowSplash] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  useKeyboardShortcuts();
  
  // Guard against undefined state
  if (!state) {
    return <Splash onComplete={() => {}} />;
  }
  
  const lessons = state?.lessons ?? [];
  const recentLesson = lessons[lessons.length - 1];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setTimeout(() => setShowContent(true), 100);
    }, 1400);
    
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <Splash onComplete={() => setShowSplash(false)} />;
  }
  
  return (
    <>
      <Suspense fallback={<div />}>
        <DarkVeil 
          hueShift={0} 
          noiseIntensity={0.03} 
          speed={0.3} 
          warpAmount={0.2}
        />
      </Suspense>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center space-y-8 max-w-4xl"
        >
          {/* Logo and Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-4">
              <span className="gradient-primary bg-clip-text text-transparent glow-primary">
                MathMind
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Your futuristic workspace for math and programming
            </p>
          </motion.div>

          {/* Session Resume */}
          <SessionResume />

          {/* Main Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            <Link to="/lessons">
              <Button className="w-full h-32 text-xl gradient-primary hover-lift glow-primary group">
                <div className="flex flex-col items-center gap-3">
                  <BookOpen className="w-10 h-10" />
                  <span>New Lesson</span>
                </div>
              </Button>
            </Link>
            
            {recentLesson && (
              <Link to="/lessons">
                <Button className="w-full h-32 text-xl glass-strong hover:glow-secondary group">
                  <div className="flex flex-col items-center gap-3">
                    <ArrowRight className="w-10 h-10" />
                    <span>Continue Last</span>
                  </div>
                </Button>
              </Link>
            )}
            
            <Link to="/code">
              <Button className="w-full h-32 text-xl gradient-accent hover-lift glow-accent group">
                <div className="flex flex-col items-center gap-3">
                  <Code2 className="w-10 h-10" />
                  <span>Code Lab</span>
                </div>
              </Button>
            </Link>
          </motion.div>

          {/* Footer Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-muted-foreground/60 text-sm"
          >
            <p>Navigate to <span className="text-primary">Lessons</span> or <span className="text-accent">Code Lab</span> to explore content</p>
            <p className="mt-2 text-xs">Press <kbd className="px-2 py-1 rounded bg-muted/30">⌘K</kbd> to search</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
