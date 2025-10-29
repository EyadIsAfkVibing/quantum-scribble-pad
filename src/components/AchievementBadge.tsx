/**
 * Achievement badge component with unlock animation
 */

import { motion } from 'framer-motion';
import { Trophy, Star, Zap } from 'lucide-react';
import type { Achievement } from '@/types';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
}

export function AchievementBadge({ achievement, size = 'md' }: AchievementBadgeProps) {
  const icons = {
    trophy: Trophy,
    star: Star,
    zap: Zap,
  };

  const Icon = icons[achievement.icon as keyof typeof icons] || Trophy;
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center cursor-pointer
        ${achievement.unlocked 
          ? 'bg-gradient-to-br from-accent to-primary glow-primary' 
          : 'bg-muted/50 grayscale'
        }`}
      title={`${achievement.title}\n${achievement.description}`}
    >
      <Icon className={`${iconSizes[size]} ${achievement.unlocked ? 'text-white' : 'text-muted-foreground'}`} />
    </motion.div>
  );
}
