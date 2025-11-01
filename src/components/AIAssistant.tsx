import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '👋 Hi! I can help you solve math problems, explain coding concepts, and answer questions. Try asking me:\n\n- "Solve 3x + 5 = 20"\n- "Explain recursion in simple terms"\n- "Write a loop that prints even numbers"'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate AI response (replace with actual AI API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response = generateResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get AI response',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    // Math problem detection
    if (q.includes('solve') || q.includes('=')) {
      return `## Solution\n\nLet me solve that for you:\n\nFor equation like **3x + 5 = 20**:\n\n**Step 1:** Subtract 5 from both sides\n\`\`\`\n3x = 15\n\`\`\`\n\n**Step 2:** Divide by 3\n\`\`\`\nx = 5\n\`\`\`\n\n✅ **Answer: x = 5**`;
    }
    
    // Programming concepts
    if (q.includes('recursion')) {
      return `## Recursion Explained\n\nRecursion is when a function calls itself to solve smaller versions of the same problem.\n\n**Example:**\n\`\`\`javascript\nfunction factorial(n) {\n  if (n === 0) return 1;  // Base case\n  return n * factorial(n - 1);  // Recursive call\n}\n\`\`\`\n\n**Key Points:**\n- Always have a base case to stop recursion\n- Break problem into smaller subproblems\n- Each call works on a simpler version`;
    }
    
    if (q.includes('loop') || q.includes('even')) {
      return `## Print Even Numbers\n\nHere's a simple loop:\n\n**JavaScript:**\n\`\`\`javascript\nfor (let i = 0; i <= 20; i += 2) {\n  console.log(i);\n}\n\`\`\`\n\n**Python:**\n\`\`\`python\nfor i in range(0, 21, 2):\n    print(i)\n\`\`\`\n\nThis prints: 0, 2, 4, 6, ..., 20`;
    }
    
    return `I understand you're asking about: **"${query}"**\n\nI can help with:\n- Math problems (equations, calculus, algebra)\n- Programming concepts (loops, functions, algorithms)\n- Code examples (JavaScript, Python, C++)\n\nPlease ask a specific question!`;
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full gradient-primary shadow-2xl hover-lift glow-primary z-40"
        size="icon"
      >
        <Bot className="w-6 h-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] z-50"
          >
            <Card className="glass-strong h-full flex flex-col shadow-2xl border-primary/20">
              <CardHeader className="border-b border-white/10 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Assistant
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-destructive/20"
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
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-lg p-3 ${
                            msg.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'glass'
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
                        <div className="glass rounded-lg p-3">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </ScrollArea>
                
                <div className="p-4 border-t border-white/10 flex-shrink-0">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask me anything..."
                      className="glass"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                      className="gradient-accent"
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
