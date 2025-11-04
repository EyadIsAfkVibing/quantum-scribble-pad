import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Home,
  BookOpen,
  Calculator,
  Code2,
  Settings,
  History,
  StickyNote,
  Sparkles,
} from 'lucide-react';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." className="text-base" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => runCommand(() => navigate('/'))}
            className="gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate('/lessons'))}
            className="gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Lessons</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate('/solver'))}
            className="gap-2 cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>Math Solver</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate('/code'))}
            className="gap-2 cursor-pointer"
          >
            <Code2 className="w-4 h-4" />
            <span>CodeLab</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate('/history'))}
            className="gap-2 cursor-pointer"
          >
            <History className="w-4 h-4" />
            <span>History</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate('/settings'))}
            className="gap-2 cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => runCommand(() => {
              const event = new CustomEvent('open-notes');
              window.dispatchEvent(event);
            })}
            className="gap-2 cursor-pointer"
          >
            <StickyNote className="w-4 h-4" />
            <span>Open Notes</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => {
              const event = new CustomEvent('open-ai-assistant');
              window.dispatchEvent(event);
            })}
            className="gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open AI Assistant</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
