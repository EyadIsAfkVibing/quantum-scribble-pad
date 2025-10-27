import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Moon, Sun, Type, Sparkles } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Settings() {
  const { state, updateSettings } = useApp();
  const { settings } = state;

  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
  };

  const setFontSize = (size: 'small' | 'medium' | 'large') => {
    updateSettings({ fontSize: size });
    document.documentElement.style.fontSize = 
      size === 'small' ? '14px' : size === 'large' ? '18px' : '16px';
  };

  const setBackgroundStyle = (style: 'gradient' | 'particles' | 'waves') => {
    updateSettings({ backgroundStyle: style });
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold flex items-center gap-3 mb-2">
          <SettingsIcon className="w-10 h-10 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground">
          Customize your MathMind experience
        </p>
      </motion.div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {settings.theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                Appearance
              </CardTitle>
              <CardDescription>
                Customize the look and feel of the app
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="theme">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark themes
                  </p>
                </div>
                <Switch
                  id="theme"
                  checked={settings.theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="animations">Animations</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable smooth transitions and effects
                  </p>
                </div>
                <Switch
                  id="animations"
                  checked={settings.animationsEnabled}
                  onCheckedChange={(checked) => updateSettings({ animationsEnabled: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="w-5 h-5" />
                Typography
              </CardTitle>
              <CardDescription>
                Adjust text size for better readability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  variant={settings.fontSize === 'small' ? 'default' : 'outline'}
                  onClick={() => setFontSize('small')}
                  className={settings.fontSize === 'small' ? 'gradient-primary' : 'glass'}
                >
                  Small
                </Button>
                <Button
                  variant={settings.fontSize === 'medium' ? 'default' : 'outline'}
                  onClick={() => setFontSize('medium')}
                  className={settings.fontSize === 'medium' ? 'gradient-primary' : 'glass'}
                >
                  Medium
                </Button>
                <Button
                  variant={settings.fontSize === 'large' ? 'default' : 'outline'}
                  onClick={() => setFontSize('large')}
                  className={settings.fontSize === 'large' ? 'gradient-primary' : 'glass'}
                >
                  Large
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Background Style
              </CardTitle>
              <CardDescription>
                Choose your preferred background animation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  variant={settings.backgroundStyle === 'gradient' ? 'default' : 'outline'}
                  onClick={() => setBackgroundStyle('gradient')}
                  className={settings.backgroundStyle === 'gradient' ? 'gradient-primary' : 'glass'}
                >
                  Gradient
                </Button>
                <Button
                  variant={settings.backgroundStyle === 'particles' ? 'default' : 'outline'}
                  onClick={() => setBackgroundStyle('particles')}
                  className={settings.backgroundStyle === 'particles' ? 'gradient-primary' : 'glass'}
                >
                  Particles
                </Button>
                <Button
                  variant={settings.backgroundStyle === 'waves' ? 'default' : 'outline'}
                  onClick={() => setBackgroundStyle('waves')}
                  className={settings.backgroundStyle === 'waves' ? 'gradient-primary' : 'glass'}
                >
                  Waves
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
