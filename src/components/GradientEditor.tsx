import { useState } from 'react';
import { Palette } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function GradientEditor() {
  const [color1, setColor1] = useState('#22d3ee');
  const [color2, setColor2] = useState('#a855f7');
  
  const gradientStyle = {
    background: `linear-gradient(135deg, ${color1}, ${color2})`
  };

  const applyGradient = () => {
    document.documentElement.style.setProperty('--gradient-primary', `linear-gradient(135deg, ${color1}, ${color2})`);
    document.documentElement.style.setProperty('--primary', color1);
    document.documentElement.style.setProperty('--accent', color2);
  };

  const resetGradient = () => {
    setColor1('#22d3ee');
    setColor2('#a855f7');
    document.documentElement.style.setProperty('--gradient-primary', 'linear-gradient(135deg, #22d3ee, #a855f7)');
  };

  return (
    <Card className="glass-strong hover-lift">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          Custom Gradient Editor
        </CardTitle>
        <CardDescription>
          Design your own color scheme
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="color1">Primary Color</Label>
            <div className="flex gap-2">
              <Input
                id="color1"
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="w-16 h-10 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="glass flex-1"
                placeholder="#22d3ee"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color2">Accent Color</Label>
            <div className="flex gap-2">
              <Input
                id="color2"
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="w-16 h-10 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="glass flex-1"
                placeholder="#a855f7"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Preview</Label>
          <div
            className="h-24 rounded-lg shadow-lg"
            style={gradientStyle}
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={applyGradient}
            className="flex-1 gradient-primary"
          >
            Apply Gradient
          </Button>
          <Button
            onClick={resetGradient}
            variant="outline"
            className="glass"
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
