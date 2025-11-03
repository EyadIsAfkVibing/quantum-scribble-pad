import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Code2, 
  BarChart3, 
  Zap, 
  Target, 
  Trophy,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 25,
    },
  },
};

const navItems = [
  {
    title: 'Learn',
    description: 'Adaptive lessons that evolve with you',
    icon: BookOpen,
    path: '/lessons',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Code Lab',
    description: 'Write, run, and master code',
    icon: Code2,
    path: '/code',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Dashboard',
    description: 'Track your growth and achievements',
    icon: BarChart3,
    path: '/history',
    gradient: 'from-orange-500 to-red-500',
  },
];

const features = [
  {
    icon: Target,
    title: 'Adaptive Learning',
    description: 'AI-powered curriculum that adjusts to your skill level',
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description: 'Get real-time solutions and explanations',
  },
  {
    icon: Trophy,
    title: 'ELO Progression',
    description: 'Track your improvement with intelligent scoring',
  },
];

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--primary) / 0.3) 0%, transparent 50%)`,
            transition: 'background 0.3s ease',
          }}
        />
        <div className="absolute inset-0 gradient-mesh animate-gradient-shift" />
      </div>

      <div className="container mx-auto px-4 py-16 space-y-32">
        {/* Hero Section */}
        <motion.section
          style={{ opacity }}
          className="relative min-h-[80vh] flex flex-col items-center justify-center text-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.2,
            }}
            className="relative"
          >
            <div className="absolute inset-0 gradient-glow animate-pulse-ring rounded-full" />
            <div className="relative glass-strong p-8 rounded-full animate-float">
              <Sparkles className="w-16 h-16 text-primary" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6 max-w-4xl"
          >
            <h1 className="text-7xl md:text-9xl font-black tracking-tight">
              <span className="gradient-primary bg-clip-text text-transparent animate-gradient-shift">
                Quantum
              </span>
              <br />
              <span className="gradient-secondary bg-clip-text text-transparent animate-gradient-shift">
                Learning
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Adaptive AI platform that evolves with your learning journey. 
              Master math and code like never before.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4"
          >
            <Button size="lg" className="group" asChild>
              <Link to="/lessons">
                Start Learning
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="glass" asChild>
              <Link to="/code">
                Explore Code Lab
              </Link>
            </Button>
          </motion.div>

          <motion.div
            style={{ y: y1 }}
            className="absolute top-20 right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-20 left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"
          />
        </motion.section>

        {/* Main Navigation Cards */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          <motion.div variants={item} className="text-center space-y-4">
            <h2 className="text-5xl font-bold gradient-primary bg-clip-text text-transparent">
              Choose Your Path
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three powerful tools to accelerate your learning
            </p>
          </motion.div>

          <motion.div 
            variants={container}
            className="grid md:grid-cols-3 gap-8"
          >
            {navItems.map((navItem, index) => (
              <motion.div
                key={navItem.title}
                variants={item}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.98 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Link to={navItem.path} className="block h-full">
                  <Card className="h-full group cursor-pointer overflow-hidden relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${navItem.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    <CardHeader className="relative">
                      <div className="mb-4 inline-flex p-4 rounded-2xl glass group-hover:scale-110 transition-transform duration-300">
                        <navItem.icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-3xl">{navItem.title}</CardTitle>
                      <CardDescription className="text-base">
                        {navItem.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-primary font-semibold group-hover:translate-x-2 transition-transform">
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          <motion.div variants={item} className="text-center space-y-4">
            <h2 className="text-5xl font-bold gradient-secondary bg-clip-text text-transparent">
              Intelligent Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powered by adaptive AI and modern learning science
            </p>
          </motion.div>

          <motion.div 
            variants={container}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={item}
                whileHover={{ y: -8 }}
              >
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="mx-auto mb-6 p-6 rounded-3xl glass-strong inline-flex animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                      <feature.icon className="w-10 h-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 gradient-primary opacity-5" />
            <CardHeader className="text-center space-y-6 py-16">
              <CardTitle className="text-5xl md:text-6xl">
                Ready to Transform Your Learning?
              </CardTitle>
              <CardDescription className="text-xl max-w-2xl mx-auto">
                Join thousands of learners mastering math and code with AI-powered adaptive education
              </CardDescription>
              <div className="pt-4">
                <Button size="lg" className="text-lg px-12" asChild>
                  <Link to="/lessons">
                    Begin Your Journey
                    <ArrowRight className="ml-3" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
