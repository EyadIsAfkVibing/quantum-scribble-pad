import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Code2, BarChart3, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { path: '/', label: 'Home', icon: Sparkles },
  { path: '/lessons', label: 'Lessons', icon: BookOpen },
  { path: '/code', label: 'Code Lab', icon: Code2 },
  { path: '/history', label: 'Dashboard', icon: BarChart3 },
  { path: '/settings', label: 'Profile', icon: User },
];

export function Navigation() {
  const location = useLocation();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring" as const, stiffness: 200, damping: 25 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="container mx-auto">
        <div className="glass-strong rounded-3xl px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="p-2 rounded-xl gradient-primary"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
              Quantum
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      size="sm"
                      className="relative gap-2"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 gradient-primary rounded-xl"
                          transition={{ type: "spring" as const, stiffness: 380, damping: 30 }}
                        />
                      )}
                      <Icon className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">{item.label}</span>
                    </Button>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="glass" size="sm" asChild>
                <Link to="/settings">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
