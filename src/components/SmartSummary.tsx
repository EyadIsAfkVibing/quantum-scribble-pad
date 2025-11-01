import { motion } from 'framer-motion';
import { Brain, Clock, Target, TrendingUp } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SmartSummary() {
  const { state } = useApp();
  const { mathHistory, lessons } = state;
  const studyStreak = state.studyStreak || {
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: '',
    totalDays: 0
  };

  const todayProblems = mathHistory.filter(p => {
    const today = new Date().toDateString();
    return new Date(p.timestamp).toDateString() === today;
  }).length;

  const totalStudyTime = lessons.reduce((acc, lesson) => acc + (lesson.timeSpent || 0), 0);

  const stats = [
    {
      icon: Target,
      label: 'Problems Today',
      value: todayProblems,
      color: 'text-primary'
    },
    {
      icon: TrendingUp,
      label: 'Current Streak',
      value: `${studyStreak.currentStreak} days`,
      color: 'text-accent'
    },
    {
      icon: Clock,
      label: 'Total Study Time',
      value: `${totalStudyTime} mins`,
      color: 'text-secondary'
    },
    {
      icon: Brain,
      label: 'Lessons',
      value: lessons.length,
      color: 'text-primary'
    }
  ];

  return (
    <Card className="glass-strong hover-lift">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary glow-primary" />
          Smart Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-4 rounded-lg text-center hover-lift"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4 glass p-3 rounded-lg">
          <p className="text-sm text-center text-muted-foreground">
            {todayProblems > 0 
              ? `🔥 Great work! You've solved ${todayProblems} problem${todayProblems > 1 ? 's' : ''} today!`
              : '👋 Start solving problems to track your progress!'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
