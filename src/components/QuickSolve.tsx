/**
 * Quick Solve widget for instant math evaluations
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Square, Radical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { evaluateExpression } from '@/utils/mathSolver';
import { useToast } from '@/hooks/use-toast';

export function QuickSolve() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSolve = () => {
    if (!input.trim()) return;
    
    try {
      const value = evaluateExpression(input);
      setResult(value.toString());
      
      // Aurora pulse effect
      document.dispatchEvent(
        new CustomEvent('aurora:pulse', { 
          detail: { amplitude: 1.4, duration: 500 } 
        })
      );
    } catch (error) {
      toast({
        title: 'Invalid Expression',
        description: 'Please enter a valid mathematical expression',
        variant: 'destructive',
      });
    }
  };

  const handleSqrt = () => {
    if (!input.trim()) return;
    
    try {
      const value = parseFloat(input);
      if (isNaN(value)) throw new Error('Invalid number');
      const sqrtResult = Math.sqrt(value);
      setResult(`√${value} = ${sqrtResult}`);
      
      document.dispatchEvent(
        new CustomEvent('aurora:pulse', { 
          detail: { amplitude: 1.4, duration: 500 } 
        })
      );
    } catch (error) {
      toast({
        title: 'Invalid Number',
        description: 'Please enter a valid number for square root',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="glass-strong">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="w-5 h-5" />
          Quick Solve
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
            placeholder="Enter expression (e.g., 2+2, 5*10)"
            className="flex-1"
          />
          <Button onClick={handleSqrt} variant="outline" size="icon" title="Square Root">
            <Radical className="w-4 h-4" />
          </Button>
          <Button onClick={handleSolve}>
            Solve
          </Button>
        </div>
        
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass rounded-lg p-4"
            >
              <div className="text-sm text-muted-foreground">Result:</div>
              <div className="text-2xl font-bold text-primary mt-1">{result}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
