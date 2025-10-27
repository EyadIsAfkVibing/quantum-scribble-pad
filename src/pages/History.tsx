import { motion } from 'framer-motion';
import { History as HistoryIcon, Brain, Code2, Trash2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function History() {
  const { state } = useApp();

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold flex items-center gap-3 mb-2">
          <HistoryIcon className="w-10 h-10 text-secondary" />
          History
        </h1>
        <p className="text-muted-foreground">
          View your previously solved problems and code snippets
        </p>
      </motion.div>

      <Tabs defaultValue="math" className="space-y-6">
        <TabsList className="glass">
          <TabsTrigger value="math">
            <Brain className="w-4 h-4 mr-2" />
            Math Problems
          </TabsTrigger>
          <TabsTrigger value="code">
            <Code2 className="w-4 h-4 mr-2" />
            Code Snippets
          </TabsTrigger>
        </TabsList>

        <TabsContent value="math" className="space-y-4">
          {state.mathHistory.length === 0 ? (
            <Card className="glass">
              <CardContent className="pt-6 text-center text-muted-foreground">
                <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No math problems solved yet</p>
              </CardContent>
            </Card>
          ) : (
            state.mathHistory.map((problem, i) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass hover:glow-primary transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="font-mono text-lg">{problem.expression}</span>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      {new Date(problem.timestamp).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="glass rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Solution:</p>
                      <p className="font-mono text-lg text-primary">{problem.solution}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </TabsContent>

        <TabsContent value="code" className="space-y-4">
          {state.codeHistory.length === 0 ? (
            <Card className="glass">
              <CardContent className="pt-6 text-center text-muted-foreground">
                <Code2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No code snippets saved yet</p>
              </CardContent>
            </Card>
          ) : (
            state.codeHistory.map((snippet, i) => (
              <motion.div
                key={snippet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass hover:glow-accent transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className="gradient-accent">{snippet.language}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(snippet.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="glass rounded-lg p-4 overflow-x-auto">
                      <code className="text-sm font-mono">{snippet.code}</code>
                    </pre>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
