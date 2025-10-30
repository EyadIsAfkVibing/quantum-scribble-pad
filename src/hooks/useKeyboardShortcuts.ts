/**
 * Keyboard shortcuts hook for quick actions
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useKeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if not typing in an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      // Cmd/Ctrl + shortcuts
      if (e.metaKey || e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case 'h':
            e.preventDefault();
            navigate('/');
            break;
          case 'l':
            e.preventDefault();
            navigate('/lessons');
            break;
          case 'e':
            e.preventDefault();
            navigate('/code');
            break;
          case 'i':
            e.preventDefault();
            navigate('/history');
            break;
        }
        return;
      }

      // Single key shortcuts (when not in input)
      switch (e.key.toLowerCase()) {
        case 'n':
          if (!e.metaKey && !e.ctrlKey && !e.altKey) {
            e.preventDefault();
            navigate('/lessons');
            document.dispatchEvent(
              new CustomEvent('aurora:pulse', { 
                detail: { amplitude: 1.5, duration: 600 } 
              })
            );
          }
          break;
        case 's':
          if (!e.metaKey && !e.ctrlKey && !e.altKey) {
            e.preventDefault();
            // Focus on math solver input if on home page
            const mathInput = document.querySelector('[data-math-input]') as HTMLInputElement;
            if (mathInput) mathInput.focus();
          }
          break;
        case '?':
          // Show keyboard shortcuts help
          e.preventDefault();
          alert(`
Keyboard Shortcuts:

⌘/Ctrl + K - Universal Search
⌘/Ctrl + H - Home
⌘/Ctrl + L - Lessons
⌘/Ctrl + E - Code Lab
⌘/Ctrl + I - History

N - New Lesson
S - Focus Math Solver
? - Show this help
          `.trim());
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);
}
