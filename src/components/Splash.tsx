/**
 * Premium splash screen with logo reveal animation
 */

import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

interface SplashProps {
  onComplete: () => void;
}

export function Splash({ onComplete }: SplashProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative"
      >
        <motion.div
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(99, 102, 241, 0.3)",
              "0 0 40px rgba(99, 102, 241, 0.6)",
              "0 0 20px rgba(99, 102, 241, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="rounded-full bg-gradient-to-br from-primary to-accent p-6"
        >
          <Brain className="w-16 h-16 text-white" />
        </motion.div>
      </motion.div>
      
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6 text-5xl font-bold gradient-primary bg-clip-text text-transparent"
      >
        Quantum Pad
      </motion.h1>
      
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-2 text-lg text-muted-foreground"
      >
        Your futuristic learning workspace
      </motion.p>
      
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-8 h-1 w-32 bg-gradient-to-r from-primary via-accent to-primary rounded-full"
      />
    </motion.div>
  );
}
