import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { EnhancedMathSolver } from '@/components/EnhancedMathSolver';
import { QuickSolve } from '@/components/QuickSolve';

export default function Solver() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Calculator className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
              Math Solver
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Solve linear equations, quadratic equations, and calculate square roots with step-by-step solutions
          </p>
        </div>

        {/* Quick Solve Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <QuickSolve />
        </motion.div>

        {/* Enhanced Math Solver */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <EnhancedMathSolver />
        </motion.div>
      </motion.div>
    </div>
  );
}
