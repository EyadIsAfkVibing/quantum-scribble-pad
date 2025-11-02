import { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Code, History } from 'lucide-react';
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
        transition={{ duration: 0.8 }}
        className="min-h-screen px-4 md:px-6 py-16 relative z-10"
      >
        <div className="container mx-auto max-w-7xl space-y-16">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center space-y-6"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-black gradient-primary bg-clip-text text-transparent animate-gradient-flow"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              Quantum Pad
            </motion.h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Your futuristic workspace for math, code, and learning powered by AI
            </p>
          </motion.div>

          {/* Main Navigation Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Link to="/lessons" className="group">
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="glass-strong p-8 rounded-2xl border-2 border-primary/20 hover:border-primary/50 transition-all shadow-xl hover:shadow-2xl"
              >
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="p-4 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">New Lesson</h3>
                  <p className="text-muted-foreground">Create and organize study sessions</p>
                </div>
              </motion.div>
            </Link>

            <Link to="/code" className="group">
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="glass-strong p-8 rounded-2xl border-2 border-accent/20 hover:border-accent/50 transition-all shadow-xl hover:shadow-2xl"
              >
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="p-4 rounded-full bg-gradient-to-br from-accent/30 to-secondary/30 group-hover:scale-110 transition-transform">
                    <Code className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold">Code Lab</h3>
                  <p className="text-muted-foreground">Write and run Python & JavaScript</p>
                </div>
              </motion.div>
            </Link>

            <Link to="/history" className="group">
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="glass-strong p-8 rounded-2xl border-2 border-secondary/20 hover:border-secondary/50 transition-all shadow-xl hover:shadow-2xl"
              >
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="p-4 rounded-full bg-gradient-to-br from-secondary/30 to-primary/30 group-hover:scale-110 transition-transform">
                    <History className="w-10 h-10 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold">History</h3>
                  <p className="text-muted-foreground">Review past problems and code</p>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Quick Actions */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold gradient-accent bg-clip-text text-transparent mb-2">
                Quick Actions
              </h2>
              <p className="text-muted-foreground">Solve problems instantly</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <EnhancedMathSolver />
              <QuickSolve />
            </div>
          </motion.section>

          {/* Dashboard */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold gradient-accent bg-clip-text text-transparent mb-2">
                Dashboard
              </h2>
              <p className="text-muted-foreground">Track your progress</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              <SmartSummary />
              <StudyTimer onTimeUpdate={(seconds) => console.log('Study time:', seconds)} />
              <ProblemHistory />
            </div>
          </motion.section>

          {/* Session Resume */}
          {recentLesson && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <SessionResume />
            </motion.div>
          )}
        </div>
      </motion.div>

      <AIAssistant />
    </>
  );
}
