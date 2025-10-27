import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Play, Save } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { CodeSnippet } from '@/types';

const defaultCode = {
  python: '# Python Playground\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nprint(fibonacci(10))',
  javascript: '// JavaScript Playground\nconst fibonacci = (n) => {\n  if (n <= 1) return n;\n  return fibonacci(n-1) + fibonacci(n-2);\n};\n\nconsole.log(fibonacci(10));',
  cpp: '// C++ Playground\n#include <iostream>\nusing namespace std;\n\nint fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n-1) + fibonacci(n-2);\n}\n\nint main() {\n    cout << fibonacci(10) << endl;\n    return 0;\n}',
};

export default function Code() {
  const [code, setCode] = useState(defaultCode);
  const [activeTab, setActiveTab] = useState<'python' | 'javascript' | 'cpp'>('python');
  const [output, setOutput] = useState('');
  const { addCodeSnippet } = useApp();
  const { toast } = useToast();

  const handleRun = () => {
    setOutput('⚠️ Code execution requires a backend. This is a visualization playground.');
    toast({
      title: "Code Preview",
      description: "This is a frontend-only playground. Execution would require backend integration.",
    });
  };

  const handleSave = () => {
    const snippet: CodeSnippet = {
      id: Date.now().toString(),
      language: activeTab,
      code: code[activeTab],
      timestamp: new Date().toISOString(),
    };
    addCodeSnippet(snippet);
    toast({
      title: "Code saved",
      description: "Your code snippet has been saved to history.",
    });
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold flex items-center gap-3 mb-2">
          <Code2 className="w-10 h-10 text-accent" />
          Code Playground
        </h1>
        <p className="text-muted-foreground">
          Write and visualize Python, JavaScript, and C++ code
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Editor</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSave}
                    className="glass"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleRun}
                    className="gradient-accent hover:opacity-90"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Run
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
                <TabsList className="glass mb-4">
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="cpp">C++</TabsTrigger>
                </TabsList>
                
                {(['python', 'javascript', 'cpp'] as const).map((lang) => (
                  <TabsContent key={lang} value={lang} className="space-y-4">
                    <Textarea
                      value={code[lang]}
                      onChange={(e) => setCode({ ...code, [lang]: e.target.value })}
                      className="font-mono text-sm glass min-h-[500px] resize-none"
                      spellCheck={false}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle>Syntax Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden">
                <div className="rounded-lg overflow-hidden">
                  <pre className="text-sm p-4 m-0 rounded-md overflow-auto bg-muted/20">
                    <code className="font-mono">{code[activeTab]}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Output</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/20 rounded-lg p-4 min-h-[200px] font-mono text-sm">
                {output || 'No output yet. Click "Run" to execute code.'}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
