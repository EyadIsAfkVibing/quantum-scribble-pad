import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Code2, History, TrendingUp, Brain, Zap } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { state } = useApp();

  const stats = [
    { label: 'Lessons Created', value: state.lessons.length, icon: BookOpen, color: 'text-primary' },
    { label: 'Problems Solved', value: state.mathHistory.length, icon: Brain, color: 'text-secondary' },
    { label: 'Code Snippets', value: state.codeHistory.length, icon: Code2, color: 'text-accent' },
  ];

  const quickActions = [
    { label: 'Create Lesson', to: '/lessons', icon: BookOpen, gradient: 'gradient-primary' },
    { label: 'Code Playground', to: '/code', icon: Code2, gradient: 'gradient-accent' },
    { label: 'View History', to: '/history', icon: History, gradient: 'bg-gradient-to-r from-primary to-secondary' },
  ];

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold gradient-primary bg-clip-text text-transparent animate-fade-in">
          Welcome to MathMind
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your premium workspace for learning math and programming with interactive visualizations
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <Card className="glass hover:glow-primary transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Keep learning!</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-accent animate-glow-pulse" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.label}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <Link to={action.to}>
                <Card className={`glass hover:glow-primary cursor-pointer h-full ${action.gradient} bg-opacity-10`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <action.icon className="w-6 h-6" />
                      {action.label}
                    </CardTitle>
                    <CardDescription>
                      Jump right into {action.label.toLowerCase()}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center py-12"
      >
        <div className="inline-block glass rounded-2xl p-8 glow-accent">
          <Brain className="w-16 h-16 mx-auto mb-4 text-accent animate-float" />
          <h3 className="text-2xl font-bold mb-2">Ready to learn?</h3>
          <p className="text-muted-foreground mb-6">
            Start by creating a new lesson or exploring the code playground
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/lessons">
              <Button className="gradient-primary hover:opacity-90">
                <BookOpen className="w-4 h-4 mr-2" />
                Create Lesson
              </Button>
            </Link>
            <Link to="/code">
              <Button variant="outline" className="glass">
                <Code2 className="w-4 h-4 mr-2" />
                Code Playground
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
