import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyNote, ChevronRight, Eye, Edit, Sparkles, Check } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from '@/hooks/use-toast';

export function NotesSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isPreview, setIsPreview] = useState(false);
  const { state, updateNotes } = useApp();
  const [localNotes, setLocalNotes] = useState(state.currentNotes);
  const [saved, setSaved] = useState(true);
  const [wordCount, setWordCount] = useState(0);

  // Calculate word count
  useEffect(() => {
    const words = localNotes.trim().split(/\s+/).filter(w => w.length > 0);
    setWordCount(words.length);
  }, [localNotes]);

  // Autosave to localStorage and context
  useEffect(() => {
    setSaved(false);
    const timer = setTimeout(() => {
      if (localNotes !== state.currentNotes) {
        updateNotes(localNotes);
        localStorage.setItem('mathMindNotes', localNotes);
        setSaved(true);
      }
    }, 5000); // 5 second autosave
    return () => clearTimeout(timer);
  }, [localNotes, state.currentNotes, updateNotes]);

  // Listen for command palette open event
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-notes', handleOpen);
    return () => window.removeEventListener('open-notes', handleOpen);
  }, []);

  const handleAISummarize = async () => {
    if (!localNotes.trim()) {
      toast({
        title: "No notes to summarize",
        description: "Write some notes first!",
      });
      return;
    }

    toast({
      title: "AI Summarizing...",
      description: "This feature connects to your AI assistant",
    });

    // Trigger AI assistant with summarize request
    const event = new CustomEvent('ai-summarize', { detail: { text: localNotes } });
    window.dispatchEvent(event);
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
            className="fixed right-0 top-16 bottom-0 w-80 glass-strong border-l shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 pb-4 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-2">
                <StickyNote className="w-5 h-5 text-accent glow-accent" />
                <div>
                  <h2 className="text-lg font-semibold">Quick Notes</h2>
                  <p className="text-xs text-muted-foreground">{wordCount} words</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAISummarize}
                  className="hover:bg-accent/20"
                  title="AI Summarize"
                >
                  <Sparkles className="w-4 h-4" />
                </Button>
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
                <div className="prose prose-invert prose-sm max-w-none text-foreground">
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
                  className="min-h-[calc(100vh-200px)] bg-background/95 resize-y text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  autoFocus
                />
              )}
            </ScrollArea>
            
            <div className="p-6 pt-4 border-t border-white/10 flex-shrink-0">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Markdown supported
                </p>
                {saved ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-1 text-xs text-green-500"
                  >
                    <Check className="w-3 h-3" />
                    <span>Saved</span>
                  </motion.div>
                ) : (
                  <span className="text-xs text-muted-foreground">Saving...</span>
                )}
              </div>
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
