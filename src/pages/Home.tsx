import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Code2, History, Play, Zap } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EnhancedMathSolver } from '@/components/EnhancedMathSolver';
import { StreakDisplay } from '@/components/StreakDisplay';
import { AchievementBadge } from '@/components/AchievementBadge';
import Aurora from '@/components/Aurora';

export default function Home() {
  const { state } = useApp();
  
  const auroraIntensityMap = {
    low: { amplitude: 0.8, blend: 0.4 },
    medium: { amplitude: 1.0, blend: 0.5 },
    high: { amplitude: 1.3, blend: 0.7 },
  };

  const auroraSettings = auroraIntensityMap[state.settings.auroraIntensity];

  const handleQuickAction = () => {
    document.dispatchEvent(
      new CustomEvent('aurora:pulse', { 
        detail: { amplitude: 1.6, duration: 600 } 
      })
    );
  };

  const recentLesson = state.lessons[state.lessons.length - 1];
  const recentProblem = state.mathHistory[0];

  return (
    <>
      <Aurora {...auroraSettings} speed={0.8} />
      
      <div className="container mx-auto px-6 py-8 space-y-8 relative z-10">
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
            <StreakDisplay streak={state.studyStreak} />
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
            {state.achievements.map((achievement) => (
              <AchievementBadge key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </motion.div>

        {/* Enhanced Math Solver */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <EnhancedMathSolver />
        </motion.div>
      </div>
    </>
  );
}
