import { useState } from 'react';
import { motion } from 'framer-motion';
import { History, Trash2, Play } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

export function ProblemHistory() {
  const { state, deleteMathProblem } = useApp();
  const { mathHistory } = state;
  const { toast } = useToast();

  const handleRerun = (expression: string) => {
    toast({
      title: 'Problem Rerun',
      description: `Rerunning: ${expression}`,
    });
  };

  const handleDelete = (id: string) => {
    deleteMathProblem(id);
    toast({
      title: 'Deleted',
      description: 'Problem removed from history',
    });
  };

  return (
    <Card className="glass-strong hover-lift h-full">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5 text-accent" />
          Problem History
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="h-[400px]">
          {mathHistory.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p>No problems solved yet</p>
              <p className="text-sm mt-2">Solve equations to see them here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mathHistory.map((problem, idx) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="glass p-3 rounded-lg hover:glow-primary transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm text-primary truncate">
                        {problem.expression}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        = {problem.solution}
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-1">
                        {new Date(problem.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRerun(problem.expression)}
                        className="h-8 w-8 p-0 hover:bg-primary/20"
                      >
                        <Play className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(problem.id)}
                        className="h-8 w-8 p-0 hover:bg-destructive/20"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
