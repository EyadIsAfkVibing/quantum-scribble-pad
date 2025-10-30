/**
 * Smart session resume card showing last activity
 */

import { motion } from 'framer-motion';
import { Play, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function SessionResume() {
  const { state } = useApp();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const lessons = state?.lessons || [];
  const mathHistory = state?.mathHistory || [];
  const codeHistory = state?.codeHistory || [];

  // Find most recent activity
  const getLastActivity = () => {
    const activities = [
      ...lessons.map(l => ({ type: 'lesson', data: l, time: new Date(l.updatedAt).getTime() })),
      ...mathHistory.slice(0, 5).map(m => ({ type: 'math', data: m, time: new Date(m.timestamp).getTime() })),
      ...codeHistory.slice(0, 5).map(c => ({ type: 'code', data: c, time: new Date(c.timestamp).getTime() })),
    ];

    activities.sort((a, b) => b.time - a.time);
    return activities[0];
  };

  const lastActivity = getLastActivity();

  useEffect(() => {
    // Animate progress bar
    const timer = setTimeout(() => setProgress(65), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!lastActivity) return null;

  const handleResume = () => {
    switch (lastActivity.type) {
      case 'lesson':
        navigate('/lessons');
        break;
      case 'math':
        navigate('/');
        break;
      case 'code':
        navigate('/code');
        break;
    }

    document.dispatchEvent(
      new CustomEvent('aurora:pulse', { 
        detail: { amplitude: 1.6, duration: 600 } 
      })
    );
  };

  const getTitle = () => {
    switch (lastActivity.type) {
      case 'lesson':
        return (lastActivity.data as any).name;
      case 'math':
        return 'Math Problem';
      case 'code':
        return 'Code Snippet';
      default:
        return 'Recent Activity';
    }
  };

  const getSubtitle = () => {
    switch (lastActivity.type) {
      case 'lesson':
        return 'Continue learning';
      case 'math':
        return (lastActivity.data as any).expression;
      case 'code':
        return `${(lastActivity.data as any).language} code`;
      default:
        return 'Resume';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="glass-strong hover-lift overflow-hidden group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-secondary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Continue Where You Left Off
                </span>
              </div>
              <h3 className="text-xl font-bold mb-1">{getTitle()}</h3>
              <p className="text-sm text-muted-foreground">{getSubtitle()}</p>
            </div>
            
            <Button
              onClick={handleResume}
              size="lg"
              className="gradient-primary hover-lift glow-primary"
            >
              <Play className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Session Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
