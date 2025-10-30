/**
 * Circular progress indicator for navbar showing weekly activity
 */

import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function ProgressIndicator() {
  const { state } = useApp();
  
  const mathHistory = state?.mathHistory || [];
  const lessons = state?.lessons || [];
  
  // Calculate weekly activity (last 7 days)
  const weeklyActivity = mathHistory.filter(m => {
    const problemDate = new Date(m.timestamp);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return problemDate >= weekAgo;
  }).length;

  const totalLessons = lessons.length;
  const progress = Math.min((weeklyActivity / 20) * 100, 100); // 20 problems = 100%
  const circumference = 2 * Math.PI * 16; // radius = 16
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative w-10 h-10 cursor-pointer"
          >
            <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="3"
              />
              <motion.circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="url(#progress-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--secondary))" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">{weeklyActivity}</span>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-center">
            <div className="font-semibold">{weeklyActivity} problems this week</div>
            <div className="text-xs text-muted-foreground">{totalLessons} total lessons</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
