import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Code2, History, TrendingUp, Brain, Zap, Calculator } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MathSolver } from '@/components/math/MathSolver';

export default function Home() {
  const { state } = useApp();

  const stats = [
    { label: 'Lessons Created', value: state.lessons.length, icon: BookOpen, color: 'text-primary' },
    { label: 'Problems Solved', value: state.mathHistory.length, icon: Brain, color: 'text-accent' },
    { label: 'Code Snippets', value: state.codeHistory.length, icon: Code2, color: 'text-secondary' },
  ];

  const quickActions = [
    { label: 'Create Lesson', to: '/lessons', icon: BookOpen, gradient: 'gradient-primary' },
    { label: 'Code Playground', to: '/code', icon: Code2, gradient: 'gradient-accent' },
    { label: 'View History', to: '/history', icon: History, gradient: 'bg-gradient-to-r from-accent to-secondary' },
  ];

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-6xl font-bold gradient-primary bg-clip-text text-transparent animate-fade-in">
          Welcome to MathMind
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your futuristic workspace for learning math and programming with stunning interactive visualizations
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
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <Card className="glass-strong hover:glow-primary transition-all hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{stat.value}</div>
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
                <Card className={`glass-strong hover:glow-primary cursor-pointer h-full hover-lift`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-lg">
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

      {/* Math Solver Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <MathSolver />
        
        <Card className="glass-strong hover-lift">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Calculator className="w-6 h-6 text-primary glow-primary" />
              Getting Started
            </CardTitle>
            <CardDescription>
              Tips to make the most of MathMind
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-3">
              <div className="glass-strong rounded-lg p-4 hover:glow-primary transition-all">
                <h4 className="font-semibold mb-1 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Create Lessons
                </h4>
                <p className="text-sm text-muted-foreground">
                  Organize your study materials with lessons, notes, and video links
                </p>
              </div>
              
              <div className="glass-strong rounded-lg p-4 hover:glow-accent transition-all">
                <h4 className="font-semibold mb-1 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-accent" />
                  Solve Math Problems
                </h4>
                <p className="text-sm text-muted-foreground">
                  Use the math solver with quick symbol buttons for fast input
                </p>
              </div>
              
              <div className="glass-strong rounded-lg p-4 hover:glow-secondary transition-all">
                <h4 className="font-semibold mb-1 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-secondary" />
                  Practice Code
                </h4>
                <p className="text-sm text-muted-foreground">
                  Write and save code snippets in Python, JavaScript, and C++
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center py-12"
      >
        <div className="inline-block glass-strong rounded-2xl p-8 glow-accent hover-lift">
          <Brain className="w-16 h-16 mx-auto mb-4 text-accent animate-float" />
          <h3 className="text-2xl font-bold mb-2">Ready to learn?</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Start by creating a new lesson, solving math problems, or exploring the code playground
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/lessons">
              <Button className="gradient-primary hover:opacity-90 hover-lift">
                <BookOpen className="w-4 h-4 mr-2" />
                Create Lesson
              </Button>
            </Link>
            <Link to="/code">
              <Button variant="outline" className="glass hover:glow-accent">
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
