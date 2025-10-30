/**
 * YouTube video embed with draggable/resizable functionality
 */

import { X, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoEmbedProps {
  videoId: string;
  lessonId: string;
  onClose: () => void;
}

export function VideoEmbed({ videoId, lessonId, onClose }: VideoEmbedProps) {
  return (
    <div className="glass-strong rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-2 bg-background/50">
        <span className="text-xs text-muted-foreground font-medium">Video Player</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-6 w-6"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="relative" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
