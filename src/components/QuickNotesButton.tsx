/**
 * Floating quick notes button with autosave
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyNote, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

export function QuickNotesButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useApp();
  const [notes, setNotes] = useState(state.quickNotes || '');
  const { toast } = useToast();

  useEffect(() => {
    setNotes(state.quickNotes || '');
  }, [state.quickNotes]);

  // Autosave every 2 seconds after typing stops
  useEffect(() => {
    const timer = setTimeout(() => {
      if (notes !== state.quickNotes) {
        dispatch({ type: 'UPDATE_QUICK_NOTES', payload: notes });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [notes, state.quickNotes, dispatch]);

  const handleSave = () => {
    dispatch({ type: 'UPDATE_QUICK_NOTES', payload: notes });
    toast({
      title: "Notes saved",
      description: "Your quick notes have been saved",
    });
    
    // Trigger aurora pulse
    document.dispatchEvent(
      new CustomEvent('aurora:pulse', { 
        detail: { amplitude: 1.3, duration: 400 } 
      })
    );
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full gradient-accent shadow-lg hover-lift glow-accent"
          size="icon"
        >
          <StickyNote className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* Notes Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100, y: 100 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100, y: 100 }}
            className="fixed bottom-24 right-6 z-50 w-96 glass-strong rounded-lg shadow-2xl border border-white/20"
          >
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <StickyNote className="w-4 h-4 text-accent" />
                  Quick Notes
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSave}
                    className="h-7 w-7 p-0"
                    title="Save notes"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-7 w-7 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Jot down quick thoughts..."
                className="min-h-[200px] resize-none bg-background/95 border-white/20 text-foreground"
                autoFocus
              />
              
              <p className="text-xs text-muted-foreground">
                Auto-saves after 2 seconds
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
