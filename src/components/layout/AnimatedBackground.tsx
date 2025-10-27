import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { CursorBackground } from './CursorBackground';

export function AnimatedBackground() {
  const { state } = useApp();
  const { backgroundStyle } = state.settings;

  if (backgroundStyle === 'gradient') {
    return (
      <>
        <CursorBackground />
        <div className="fixed inset-0 -z-20 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-30"
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
      </>
    );
  }

  if (backgroundStyle === 'particles') {
    return (
      <>
        <CursorBackground />
        <div className="fixed inset-0 -z-20 overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.9, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </>
    );
  }

  // waves
  return (
    <>
      <CursorBackground />
      <div className="fixed inset-0 -z-20 overflow-hidden">
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
    </>
  );
}
