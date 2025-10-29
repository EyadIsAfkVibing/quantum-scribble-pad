import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Moon, Sun, Type, Sparkles } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

  const handleAuroraIntensityChange = (intensity: 'low' | 'medium' | 'high') => {
    updateSettings({ auroraIntensity: intensity });
    
    // Trigger aurora update
    const intensityMap = {
      low: { amplitude: 0.8, blend: 0.4 },
      medium: { amplitude: 1.0, blend: 0.5 },
      high: { amplitude: 1.3, blend: 0.7 },
    };
    
    document.dispatchEvent(
      new CustomEvent('aurora:set', { 
        detail: intensityMap[intensity]
      })
    );
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
          <Card className="glass-strong hover-lift">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="flex items-center gap-2">
                {settings.theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                Appearance
              </CardTitle>
              <CardDescription>
                Customize the look and feel with smooth transitions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="theme" className="text-base font-semibold">Dark Mode</Label>
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
          <Card className="glass-strong hover-lift">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Aurora Background
              </CardTitle>
              <CardDescription>
                Control the intensity of the Aurora background effect
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label htmlFor="aurora">Aurora Intensity</Label>
                <Select
                  value={settings.auroraIntensity}
                  onValueChange={(value: 'low' | 'medium' | 'high') =>
                    handleAuroraIntensityChange(value)
                  }
                >
                  <SelectTrigger id="aurora" className="glass">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Subtle and calm</SelectItem>
                    <SelectItem value="medium">Medium - Balanced</SelectItem>
                    <SelectItem value="high">High - Vibrant and dynamic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
