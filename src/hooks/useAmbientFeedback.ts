/**
 * Ambient feedback system for sounds and visual effects
 */

import { useEffect, useRef } from 'react';

interface FeedbackOptions {
  enabled: boolean;
  soundEnabled: boolean;
  visualEnabled: boolean;
}

export function useAmbientFeedback(options: FeedbackOptions) {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (options.soundEnabled && typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    return () => {
      audioContextRef.current?.close();
    };
  }, [options.soundEnabled]);

  const playClick = () => {
    if (!options.enabled || !options.soundEnabled || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  };

  const playSuccess = () => {
    if (!options.enabled || !options.soundEnabled || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    
    // Play two notes for success
    [600, 800].forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';
      
      const startTime = ctx.currentTime + i * 0.1;
      gainNode.gain.setValueAtTime(0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.2);
    });
  };

  const visualPulse = () => {
    if (!options.enabled || !options.visualEnabled) return;

    document.dispatchEvent(
      new CustomEvent('aurora:pulse', { 
        detail: { amplitude: 1.5, duration: 400 } 
      })
    );
  };

  return {
    playClick,
    playSuccess,
    visualPulse,
  };
}
