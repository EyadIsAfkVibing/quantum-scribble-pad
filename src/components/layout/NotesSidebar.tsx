import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyNote, ChevronRight, Eye, Edit } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function NotesSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isPreview, setIsPreview] = useState(false);
  const { state, updateNotes } = useApp();
  const [localNotes, setLocalNotes] = useState(state.currentNotes);

  // Autosave to localStorage and context
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localNotes !== state.currentNotes) {
        updateNotes(localNotes);
        localStorage.setItem('mathMindNotes', localNotes);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [localNotes, state.currentNotes, updateNotes]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-16 bottom-0 w-80 glass-strong border-l shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 pb-4 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-2">
                <StickyNote className="w-5 h-5 text-accent glow-accent" />
                <h2 className="text-lg font-semibold">Quick Notes</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPreview(!isPreview)}
                  className="hover:bg-accent/20"
                >
                  {isPreview ? <Edit className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-accent/20"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-6">
              {isPreview ? (
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {localNotes || '*No notes yet. Switch to edit mode to start writing.*'}
                  </ReactMarkdown>
                </div>
              ) : (
                <Textarea
                  value={localNotes}
                  onChange={(e) => setLocalNotes(e.target.value)}
                  placeholder="Write your notes here... Supports **Markdown**!

# Headers
## Subheaders

**Bold** *Italic* `code`

- Lists
- Work too

```javascript
// Code blocks
const x = 10;
```"
                  className="min-h-[calc(100vh-200px)] glass resize-y text-base focus:outline-none focus:ring-2 focus:ring-accent/50"
                  style={{ pointerEvents: 'auto' }}
                />
              )}
            </ScrollArea>
            
            <div className="p-6 pt-4 border-t border-white/10 flex-shrink-0">
              <p className="text-xs text-muted-foreground text-center">
                Auto-saves after 1 second • Markdown supported
              </p>
            </div>
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
