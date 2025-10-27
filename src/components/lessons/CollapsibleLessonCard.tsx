import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Trash2, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { Lesson } from '@/types';

interface CollapsibleLessonCardProps {
  lesson: Lesson;
  isSelected: boolean;
  onClick: () => void;
  onDelete: () => void;
  index: number;
}

export function CollapsibleLessonCard({
  lesson,
  isSelected,
  onClick,
  onDelete,
  index,
}: CollapsibleLessonCardProps) {
  const [isOpen, setIsOpen] = useState(isSelected);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="hover-lift"
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Card
          className={`glass cursor-pointer transition-all ${
            isSelected ? 'glow-primary ring-2 ring-primary' : ''
          }`}
          onClick={onClick}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span>{lesson.name}</span>
                </CardTitle>
                <CardDescription className="flex items-center gap-2 mt-2">
                  <Calendar className="w-3 h-3" />
                  {new Date(lesson.updatedAt).toLocaleDateString()}
                </CardDescription>
              </div>
              
              <div className="flex items-center gap-1">
                <CollapsibleTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </Button>
                </CollapsibleTrigger>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CollapsibleContent>
            <CardContent className="pt-0 space-y-2">
              <div className="glass-strong rounded-lg p-3 space-y-1">
                <p className="text-xs text-muted-foreground">Preview</p>
                <p className="text-sm line-clamp-3">
                  {lesson.notes || 'No notes yet...'}
                </p>
              </div>
              
              {lesson.videos.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
                  {lesson.videos.length} video{lesson.videos.length !== 1 ? 's' : ''} attached
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </motion.div>
  );
}
