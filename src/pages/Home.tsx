import { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Code2, History, Play, Zap } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EnhancedMathSolver } from '@/components/EnhancedMathSolver';
import { StreakDisplay } from '@/components/StreakDisplay';
import { AchievementBadge } from '@/components/AchievementBadge';
import { Splash } from '@/components/Splash';
import { QuickSolve } from '@/components/QuickSolve';
import { StudyTimer } from '@/components/StudyTimer';

const Aurora = lazy(() => import('@/components/Aurora'));

export default function Home() {
  const { state, updateLesson } = useApp();
  const [showSplash, setShowSplash] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  // Safe state reads with fallbacks
  const lessons = state.lessons ?? [];
  const achievements = state.achievements ?? [];
  const history = state.mathHistory ?? [];
  const streak = state.studyStreak ?? { currentStreak: 0, longestStreak: 0, totalDays: 0, lastStudyDate: '' };
  
  const auroraIntensityMap = {
    low: { amplitude: 0.8, blend: 0.4 },
    medium: { amplitude: 1.0, blend: 0.5 },
    high: { amplitude: 1.3, blend: 0.7 },
  };

  const auroraSettings = auroraIntensityMap[state.settings.auroraIntensity];
  
  useEffect(() => {
    // Minimum splash duration for premium feel
    const timer = setTimeout(() => {
      setShowSplash(false);
      setTimeout(() => setShowContent(true), 100);
    }, 1400);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleTimerUpdate = (seconds: number) => {
    // Update study time for current session
    const activeLesson = lessons.find(l => l.id === state.currentNotes);
    if (activeLesson) {
      updateLesson(activeLesson.id, { 
        timeSpent: Math.floor(seconds / 60) 
      });
    }
  };

  const handleQuickAction = () => {
    document.dispatchEvent(
      new CustomEvent('aurora:pulse', { 
        detail: { amplitude: 1.6, duration: 600 } 
      })
    );
  };

  const recentLesson = lessons[lessons.length - 1];
  const recentProblem = history[0];

  if (showSplash) {
    return <Splash onComplete={() => setShowSplash(false)} />;
  }
  
  return (
    <>
      <Suspense fallback={<div />}>
        <Aurora {...auroraSettings} speed={0.8} />
      </Suspense>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-8 space-y-8 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-6xl font-bold gradient-primary bg-clip-text text-transparent">
            MathMind
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your futuristic workspace for math and programming
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-accent" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/lessons" onClick={handleQuickAction}>
              <Button className="w-full h-24 text-lg gradient-primary hover-lift glow-primary">
                <BookOpen className="w-6 h-6 mr-3" />
                New Lesson
              </Button>
            </Link>
            
            {recentLesson && (
              <Link to="/lessons" onClick={handleQuickAction}>
                <Button className="w-full h-24 text-lg glass hover:glow-secondary">
                  <Play className="w-6 h-6 mr-3" />
                  Continue Last
                </Button>
              </Link>
            )}
            
            <Link to="/code" onClick={handleQuickAction}>
              <Button className="w-full h-24 text-lg gradient-accent hover-lift glow-accent">
                <Code2 className="w-6 h-6 mr-3" />
                Code Lab
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Recent Activity & Streak */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StreakDisplay streak={streak} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-strong hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentLesson && (
                  <div className="glass rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Last Lesson</p>
                    <p className="font-semibold">{recentLesson.name}</p>
                  </div>
                )}
                {recentProblem && (
                  <div className="glass rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Last Problem</p>
                    <p className="font-mono text-sm">{recentProblem.expression}</p>
                  </div>
                )}
                {!recentLesson && !recentProblem && (
                  <p className="text-muted-foreground text-center py-4">Start your journey!</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-4">Achievements</h3>
          <div className="flex gap-4">
            {(achievements || []).map((achievement) => (
              <AchievementBadge key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </motion.div>

        {/* Quick Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <QuickSolve />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <StudyTimer onTimeUpdate={handleTimerUpdate} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-1"
          >
            <EnhancedMathSolver />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
