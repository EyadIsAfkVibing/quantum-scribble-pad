/**
 * Enhanced Math Solver with linear, quadratic, and square root capabilities
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Target, TrendingUp, Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { solveLinear, solveQuadratic, solveSqrt } from '@/utils/mathSolver';

export function EnhancedMathSolver() {
  const [linearEq, setLinearEq] = useState('');
  const [quadA, setQuadA] = useState('');
  const [quadB, setQuadB] = useState('');
  const [quadC, setQuadC] = useState('');
  const [sqrtValue, setSqrtValue] = useState('');
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleLinearSolve = () => {
    if (!linearEq.trim()) {
      toast({
        title: "Empty equation",
        description: "Please enter a linear equation",
        variant: "destructive",
      });
      return;
    }

    const solution = solveLinear(linearEq);
    if (!solution) {
      toast({
        title: "Invalid equation",
        description: "Please enter a valid linear equation (e.g., 3x + 5 = 14)",
        variant: "destructive",
      });
      return;
    }

    setResult(solution);
    
    // Trigger aurora pulse
    document.dispatchEvent(
      new CustomEvent('aurora:pulse', { 
        detail: { amplitude: 1.5, duration: 600 } 
      })
    );
  };

  const handleQuadraticSolve = () => {
    const a = parseFloat(quadA);
    const b = parseFloat(quadB);
    const c = parseFloat(quadC);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      toast({
        title: "Invalid input",
        description: "Please enter valid numbers for a, b, and c",
        variant: "destructive",
      });
      return;
    }

    if (a === 0) {
      toast({
        title: "Invalid equation",
        description: "Coefficient 'a' cannot be zero in a quadratic equation",
        variant: "destructive",
      });
      return;
    }

    const solution = solveQuadratic(a, b, c);
    setResult(solution);
    
    // Trigger aurora pulse
    document.dispatchEvent(
      new CustomEvent('aurora:pulse', { 
        detail: { amplitude: 1.7, duration: 700 } 
      })
    );
  };

  const handleSqrtSolve = () => {
    const value = parseFloat(sqrtValue);

    if (isNaN(value) || value < 0) {
      toast({
        title: "Invalid input",
        description: "Please enter a non-negative number",
        variant: "destructive",
      });
      return;
    }

    const solution = solveSqrt(value);
    setResult(solution);
    
    // Trigger aurora pulse
    document.dispatchEvent(
      new CustomEvent('aurora:pulse', { 
        detail: { amplitude: 1.4, duration: 500 } 
      })
    );
  };

  return (
    <Card className="glass-strong hover-lift">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Brain className="w-6 h-6 text-accent glow-accent" />
          Advanced Math Solver
        </CardTitle>
        <CardDescription>
          Solve linear equations, quadratics, and compute square roots with step-by-step solutions
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="linear" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 glass">
            <TabsTrigger value="linear">
              <Target className="w-4 h-4 mr-2" />
              Linear
            </TabsTrigger>
            <TabsTrigger value="quadratic">
              <TrendingUp className="w-4 h-4 mr-2" />
              Quadratic
            </TabsTrigger>
            <TabsTrigger value="sqrt">
              <Calculator className="w-4 h-4 mr-2" />
              √ Square Root
            </TabsTrigger>
          </TabsList>

          <TabsContent value="linear" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Enter equation (e.g., 3x + 5 = 14):
              </label>
              <Input
                value={linearEq}
                onChange={(e) => setLinearEq(e.target.value)}
                placeholder="3x + 5 = 14"
                className="glass font-mono"
                onKeyDown={(e) => e.key === 'Enter' && handleLinearSolve()}
              />
            </div>
            <Button
              onClick={handleLinearSolve}
              className="w-full gradient-primary hover-lift"
            >
              Solve for x
            </Button>
          </TabsContent>

          <TabsContent value="quadratic" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                ax² + bx + c = 0
              </label>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  value={quadA}
                  onChange={(e) => setQuadA(e.target.value)}
                  placeholder="a"
                  className="glass font-mono"
                  type="number"
                  step="any"
                />
                <Input
                  value={quadB}
                  onChange={(e) => setQuadB(e.target.value)}
                  placeholder="b"
                  className="glass font-mono"
                  type="number"
                  step="any"
                />
                <Input
                  value={quadC}
                  onChange={(e) => setQuadC(e.target.value)}
                  placeholder="c"
                  className="glass font-mono"
                  type="number"
                  step="any"
                />
              </div>
            </div>
            <Button
              onClick={handleQuadraticSolve}
              className="w-full gradient-accent hover-lift"
            >
              Solve Quadratic
            </Button>
          </TabsContent>

          <TabsContent value="sqrt" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Enter value to find √:
              </label>
              <Input
                value={sqrtValue}
                onChange={(e) => setSqrtValue(e.target.value)}
                placeholder="144"
                className="glass font-mono"
                type="number"
                min="0"
                step="any"
                onKeyDown={(e) => e.key === 'Enter' && handleSqrtSolve()}
              />
            </div>
            <Button
              onClick={handleSqrtSolve}
              className="w-full bg-gradient-to-r from-secondary to-accent hover-lift"
            >
              Calculate √
            </Button>
          </TabsContent>
        </Tabs>

        {/* Results Display */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={result.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 glass-strong rounded-lg p-6 space-y-4"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Calculator className="w-4 h-4" />
                <span>Solution</span>
              </div>

              {result.type === 'linear' && (
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary glow-primary">
                    x = {result.solution.toFixed(4)}
                  </div>
                </div>
              )}

              {result.type === 'quadratic' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1">Root 1</p>
                      <p className="text-lg font-bold text-primary">
                        x₁ = {typeof result.roots.x1 === 'number' ? result.roots.x1.toFixed(4) : result.roots.x1}
                      </p>
                    </div>
                    <div className="glass rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1">Root 2</p>
                      <p className="text-lg font-bold text-primary">
                        x₂ = {typeof result.roots.x2 === 'number' ? result.roots.x2.toFixed(4) : result.roots.x2}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Discriminant:</span>
                      <span className="ml-2 font-semibold">{result.discriminant.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Vertex:</span>
                      <span className="ml-2 font-semibold">
                        ({result.vertex.x.toFixed(2)}, {result.vertex.y.toFixed(2)})
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {result.type === 'sqrt' && (
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-accent glow-accent">
                    √{result.value} = {result.decimal.toFixed(6)}
                  </div>
                  {result.exact !== result.decimal.toFixed(6) && (
                    <div className="text-sm text-muted-foreground">
                      Exact: {result.exact}
                    </div>
                  )}
                </div>
              )}

              {/* Steps */}
              <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                <p className="text-sm font-semibold text-muted-foreground">Steps:</p>
                {result.steps.map((step: string, i: number) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-sm pl-3 border-l-2 border-primary/30"
                  >
                    {step}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
