import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Sparkles, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { chatWithAI, checkBackendHealth } from '@/services/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '👋 Hi! I\'m your AI assistant powered by Ollama. I can help you solve math problems, explain coding concepts, and answer questions.\n\n**Try asking:**\n- "Solve 3x + 5 = 20"\n- "Explain recursion"\n- "Write a loop that prints even numbers"'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBackendOnline, setIsBackendOnline] = useState(false);
  const { toast } = useToast();

  // Check backend health on mount and when opening
  useEffect(() => {
    if (isOpen) {
      checkHealth();
    }
  }, [isOpen]);

  const checkHealth = async () => {
    const online = await checkBackendHealth();
    setIsBackendOnline(online);
    if (!online && isOpen) {
      toast({
        title: 'Backend Offline',
        description: 'AI backend at localhost:8080 is not reachable. Make sure your Python FastAPI server is running.',
        variant: 'destructive',
      });
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      if (isBackendOnline) {
        // Use real backend with Ollama
        const response = await chatWithAI(currentInput, messages);
        const assistantMessage: Message = { 
          role: 'assistant', 
          content: response.response 
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // Fallback simulated response
        await new Promise(resolve => setTimeout(resolve, 1500));
        const response = generateResponse(currentInput);
        const assistantMessage: Message = { role: 'assistant', content: response };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      toast({
        title: 'Connection Error',
        description: 'Failed to reach AI backend. Ensure http://localhost:8080 is running.',
        variant: 'destructive',
      });
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ **Backend Connection Failed**\n\nPlease ensure:\n1. Python FastAPI server is running\n2. Ollama is serving at localhost:8080\n3. CORS is enabled\n\nUsing fallback mode for now.'
      }]);
      setIsBackendOnline(false);
    } finally {
      setIsLoading(false);
    }
  };

  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes('solve') || q.includes('=')) {
      return `## Solution\n\n**Example:** 3x + 5 = 20\n\n**Step 1:** Subtract 5 from both sides\n\`\`\`\n3x = 15\n\`\`\`\n\n**Step 2:** Divide by 3\n\`\`\`\nx = 5\n\`\`\`\n\n✅ **Answer: x = 5**\n\n*Note: Connect to backend for AI-powered solutions!*`;
    }
    
    if (q.includes('recursion')) {
      return `## Recursion\n\nA function calling itself to solve smaller problems.\n\n\`\`\`javascript\nfunction factorial(n) {\n  if (n === 0) return 1;\n  return n * factorial(n - 1);\n}\n\`\`\`\n\n**Key:** Base case + recursive call`;
    }
    
    if (q.includes('loop') || q.includes('even')) {
      return `## Even Numbers Loop\n\n\`\`\`javascript\nfor (let i = 0; i <= 20; i += 2) {\n  console.log(i);\n}\n\`\`\`\n\nPrints: 0, 2, 4, 6, ..., 20`;
    }
    
    return `**Question:** "${query}"\n\nI can help with:\n- Math problems\n- Programming concepts\n- Code examples\n\n*Connect backend for full AI capabilities!*`;
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 rounded-full gradient-primary shadow-2xl hover-lift glow-primary animate-float"
          size="icon"
        >
          <Bot className="w-8 h-8" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-28 right-8 w-full max-w-md h-[650px] z-50"
          >
            <Card className="glass-strong h-full flex flex-col shadow-2xl border-primary/30 overflow-hidden">
              <CardHeader className="border-b border-white/10 flex-shrink-0 bg-gradient-to-r from-primary/20 to-accent/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary animate-pulse-glow" />
                    <span className="gradient-primary bg-clip-text text-transparent">AI Assistant</span>
                    {isBackendOnline ? (
                      <span title="Backend Online">
                        <Wifi className="w-4 h-4 text-green-400" />
                      </span>
                    ) : (
                      <span title="Backend Offline">
                        <WifiOff className="w-4 h-4 text-red-400" />
                      </span>
                    )}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-destructive/20 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl p-4 ${
                            msg.role === 'user'
                              ? 'gradient-primary text-white shadow-lg'
                              : 'glass-strong'
                          }`}
                        >
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            className="text-sm prose prose-invert prose-sm max-w-none"
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="glass-strong rounded-2xl p-4">
                          <div className="flex gap-1.5">
                            <motion.span 
                              className="w-2.5 h-2.5 bg-primary rounded-full"
                              animate={{ y: [0, -8, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            />
                            <motion.span 
                              className="w-2.5 h-2.5 bg-accent rounded-full"
                              animate={{ y: [0, -8, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                            />
                            <motion.span 
                              className="w-2.5 h-2.5 bg-secondary rounded-full"
                              animate={{ y: [0, -8, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </ScrollArea>
                
                <div className="p-4 border-t border-white/10 flex-shrink-0 bg-background/50 backdrop-blur-xl">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                      placeholder="Ask me anything..."
                      className="glass-strong border-primary/20 focus:border-primary/50"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                      className="gradient-accent hover-lift"
                      size="icon"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
