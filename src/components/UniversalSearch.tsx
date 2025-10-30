/**
 * Universal search across lessons, notes, problems, and code snippets
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Calculator, Code2, X } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  type: 'lesson' | 'problem' | 'code';
  title: string;
  preview: string;
  path: string;
}

export function UniversalSearch() {
  const { state } = useApp();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search lessons
    (state?.lessons || []).forEach(lesson => {
      if (lesson.name.toLowerCase().includes(lowerQuery) || 
          lesson.notes.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          id: lesson.id,
          type: 'lesson',
          title: lesson.name,
          preview: lesson.notes.slice(0, 80),
          path: '/lessons'
        });
      }
    });

    // Search math history
    (state?.mathHistory || []).slice(0, 20).forEach(problem => {
      if (problem.expression.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          id: problem.id,
          type: 'problem',
          title: problem.expression,
          preview: problem.solution,
          path: '/history'
        });
      }
    });

    // Search code snippets
    (state?.codeHistory || []).slice(0, 20).forEach(snippet => {
      if (snippet.code.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          id: snippet.id,
          type: 'code',
          title: `${snippet.language} code`,
          preview: snippet.code.slice(0, 80),
          path: '/code'
        });
      }
    });

    setResults(searchResults.slice(0, 8));
  }, [query, state]);

  const handleResultClick = (result: SearchResult) => {
    navigate(result.path);
    setIsOpen(false);
    setQuery('');
    
    document.dispatchEvent(
      new CustomEvent('aurora:pulse', { 
        detail: { amplitude: 1.4, duration: 500 } 
      })
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'lesson': return BookOpen;
      case 'problem': return Calculator;
      case 'code': return Code2;
      default: return Search;
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:glow-secondary transition-all group"
        aria-label="Open search (⌘K)"
      >
        <Search className="w-4 h-4 text-muted-foreground group-hover:text-secondary" />
        <span className="text-sm text-muted-foreground hidden md:inline">Search...</span>
        <kbd className="hidden md:inline-flex h-5 px-1.5 items-center gap-1 rounded bg-muted/50 text-[10px] font-medium text-muted-foreground">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
            >
              <Card className="glass-strong p-4 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search lessons, problems, code..."
                    className="pl-10 pr-10 h-12 text-base bg-background/50"
                    autoFocus
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {results.length > 0 && (
                  <div className="space-y-1 max-h-96 overflow-y-auto">
                    {results.map((result) => {
                      const Icon = getIcon(result.type);
                      return (
                        <motion.button
                          key={result.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          onClick={() => handleResultClick(result)}
                          className="w-full p-3 rounded-lg glass hover:glow-primary transition-all text-left group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm mb-1">{result.title}</div>
                              <div className="text-xs text-muted-foreground truncate">
                                {result.preview}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground capitalize">
                              {result.type}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                )}

                {query && results.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No results found for "{query}"</p>
                  </div>
                )}

                {!query && (
                  <div className="text-xs text-muted-foreground text-center py-2">
                    Start typing to search across lessons, problems, and code
                  </div>
                )}
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
