/**
 * Daily study streak display component
 */

import { motion } from 'framer-motion';
import { Flame, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { StudyStreak } from '@/types';

interface StreakDisplayProps {
  streak: StudyStreak;
}

export function StreakDisplay({ streak }: StreakDisplayProps) {
  // Guard against undefined
  if (!streak) {
    return (
      <Card className="glass hover-lift">
        <CardContent className="p-4">
          <div className="text-muted-foreground text-center">No streak data</div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="glass hover-lift">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500"
            >
              <Flame className="w-6 h-6 text-white" />
            </motion.div>
            
            <div>
              <div className="text-2xl font-bold text-primary">
                {streak.currentStreak} {streak.currentStreak === 1 ? 'day' : 'days'}
              </div>
              <div className="text-xs text-muted-foreground">Current Streak</div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm font-semibold text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              Best: {streak.longestStreak}
            </div>
            <div className="text-xs text-muted-foreground">
              {streak.totalDays} total days
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
