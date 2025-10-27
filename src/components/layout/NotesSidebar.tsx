import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyNote, ChevronRight, Save } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export function NotesSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { state, updateNotes } = useApp();
  const { toast } = useToast();
  const [localNotes, setLocalNotes] = useState(state.currentNotes);

  const handleSave = () => {
    updateNotes(localNotes);
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully.",
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-16 bottom-0 w-80 glass-strong border-l p-6 overflow-y-auto shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <StickyNote className="w-5 h-5 text-accent glow-accent" />
                <h2 className="text-lg font-semibold">Quick Notes</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="hover:bg-accent/20"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            <Textarea
              value={localNotes}
              onChange={(e) => setLocalNotes(e.target.value)}
              placeholder="Write your notes here... formulas, ideas, reminders..."
              className="min-h-[400px] glass resize-none mb-4 text-base"
            />
            
            <Button
              onClick={handleSave}
              className="w-full gradient-primary hover:opacity-90 hover-lift"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Notes
            </Button>
          </motion.aside>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          onClick={() => setIsOpen(true)}
          className="fixed right-0 top-24 glass-strong p-3 rounded-l-lg hover:glow-accent transition-all hover-lift shadow-xl"
        >
          <StickyNote className="w-5 h-5 text-accent" />
        </motion.button>
      )}
    </>
  );
}
