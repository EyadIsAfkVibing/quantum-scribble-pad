import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Send, History } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MathInput } from '@/components/ui/math-input';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import type { MathProblem } from '@/types';

export function MathSolver() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const { addMathProblem } = useApp();
  const { toast } = useToast();

  const solveMath = () => {
    if (!expression.trim()) {
      toast({
        title: "Empty expression",
        description: "Please enter a math expression to solve",
        variant: "destructive",
      });
      return;
    }

    try {
      // Simple evaluation (in a real app, use a proper math parser like math.js)
      const cleanExpression = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, Math.PI.toString())
        .replace(/²/g, '**2')
        .replace(/³/g, '**3');
      
      const solution = eval(cleanExpression).toString();
      setResult(solution);

      const problem: MathProblem = {
        id: Date.now().toString(),
        expression,
        solution,
        timestamp: new Date().toISOString(),
      };
      addMathProblem(problem);

      toast({
        title: "Problem solved!",
        description: `Solution: ${solution}`,
      });
    } catch (error) {
      toast({
        title: "Invalid expression",
        description: "Please check your math expression and try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="glass-strong hover-lift">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Calculator className="w-6 h-6 text-accent glow-accent" />
          Math Solver
        </CardTitle>
        <CardDescription>
          Enter your math expression and get instant solutions
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <MathInput
          value={expression}
          onChange={setExpression}
          placeholder="Enter expression (e.g., 2 + 2 * 5)"
        />

        <Button
          onClick={solveMath}
          className="w-full gradient-accent hover-lift text-base h-11"
          disabled={!expression.trim()}
        >
          <Send className="w-4 h-4 mr-2" />
          Solve Expression
        </Button>

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong rounded-lg p-6 space-y-2"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <History className="w-4 h-4" />
              <span>Solution</span>
            </div>
            <div className="text-3xl font-bold text-primary glow-primary">
              {result}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
