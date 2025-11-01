import { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Code2, ArrowRight, Calculator, Zap } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Splash } from '@/components/Splash';
import { SessionResume } from '@/components/SessionResume';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { EnhancedMathSolver } from '@/components/EnhancedMathSolver';
import { QuickSolve } from '@/components/QuickSolve';
import { StudyTimer } from '@/components/StudyTimer';
import { ProblemHistory } from '@/components/ProblemHistory';
import { SmartSummary } from '@/components/SmartSummary';
import { AIAssistant } from '@/components/AIAssistant';

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
        className="min-h-screen px-6 py-12 relative z-10"
      >
        <div className="container mx-auto max-w-7xl">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="gradient-primary bg-clip-text text-transparent glow-primary">
                Quantum Pad
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Your futuristic workspace for math and programming
            </p>
          </motion.div>

          {/* Main Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <Link to="/lessons">
              <Button className="w-full h-32 text-xl gradient-primary hover-lift glow-primary group">
                <div className="flex flex-col items-center gap-3">
                  <BookOpen className="w-10 h-10" />
                  <span>New Lesson</span>
                </div>
              </Button>
            </Link>
            
            <Link to="/code">
              <Button className="w-full h-32 text-xl gradient-accent hover-lift glow-accent group">
                <div className="flex flex-col items-center gap-3">
                  <Code2 className="w-10 h-10" />
                  <span>Code Lab</span>
                </div>
              </Button>
            </Link>

            <Link to="/history">
              <Button className="w-full h-32 text-xl glass-strong hover:glow-secondary group">
                <div className="flex flex-col items-center gap-3">
                  <ArrowRight className="w-10 h-10" />
                  <span>History</span>
                </div>
              </Button>
            </Link>
          </motion.div>

          {/* Quick Actions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EnhancedMathSolver />
              <QuickSolve />
            </div>
          </motion.div>

          {/* Dashboard Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-accent" />
              Dashboard
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <SmartSummary />
              <StudyTimer onTimeUpdate={(seconds) => console.log('Study time:', seconds)} />
              <ProblemHistory />
            </div>
          </motion.div>

          {/* Session Resume (if available) */}
          {recentLesson && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <SessionResume />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* AI Assistant */}
      <AIAssistant />
    </>
  );
}
