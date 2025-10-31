import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BookOpen, Code2, History, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UniversalSearch } from '@/components/UniversalSearch';
import { ProgressIndicator } from '@/components/ProgressIndicator';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/lessons', label: 'Lessons', icon: BookOpen },
  { path: '/code', label: 'Code', icon: Code2 },
  { path: '/history', label: 'History', icon: History },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b backdrop-blur-3xl">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-center gap-4">
        <div className="flex items-center gap-4 max-w-4xl w-full">
          <div className="flex-1 flex items-center justify-center max-w-md">
            <UniversalSearch />
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <ProgressIndicator />
          
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map(({ path, label, icon: Icon }) => {
                const isActive = location.pathname === path;
                return (
                  <Link key={path} to={path}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "relative px-3 py-2 rounded-lg transition-all flex items-center gap-2",
                        isActive 
                          ? "text-primary-foreground" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 gradient-primary rounded-lg glow-primary"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                      <Icon className="w-4 h-4 relative z-10" />
                      <span className="relative z-10 font-medium hidden xl:inline">{label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
