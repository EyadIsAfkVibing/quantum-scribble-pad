import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';

export function AnimatedBackground() {
  const { state } = useApp();
  const { backgroundStyle } = state.settings;

  if (backgroundStyle === 'gradient') {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(circle at 20% 50%, hsl(260 90% 65% / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, hsl(180 95% 55% / 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 20%, hsl(320 95% 65% / 0.2) 0%, transparent 50%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    );
  }

  if (backgroundStyle === 'particles') {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    );
  }

  // waves
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(45deg, hsl(260 90% 65%), hsl(180 95% 55%), hsl(320 95% 65%))',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
