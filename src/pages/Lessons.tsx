import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, BookOpen, Edit, Youtube, Sparkles } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CollapsibleLessonCard } from '@/components/lessons/CollapsibleLessonCard';
import type { Lesson } from '@/types';

export default function Lessons() {
  const { state, addLesson, updateLesson, deleteLesson } = useApp();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newLessonName, setNewLessonName] = useState('');

  const handleCreateLesson = () => {
    if (!newLessonName.trim()) return;
    
    const newLesson: Lesson = {
      id: Date.now().toString(),
      name: newLessonName,
      notes: '',
      formulas: [],
      videos: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    addLesson(newLesson);
    setNewLessonName('');
    setIsCreateOpen(false);
    setSelectedLesson(newLesson);
  };

  const handleAddVideo = (lessonId: string, videoUrl: string) => {
    const lesson = state.lessons.find(l => l.id === lessonId);
    if (lesson) {
      updateLesson(lessonId, {
        videos: [...lesson.videos, videoUrl],
      });
    }
  };

  const handleUpdateNotes = (lessonId: string, notes: string) => {
    updateLesson(lessonId, { notes });
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <BookOpen className="w-10 h-10 text-primary" />
            My Lessons
          </h1>
          <p className="text-muted-foreground mt-2">
            Create and manage your learning materials
          </p>
        </motion.div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary hover:opacity-90 glow-primary hover-lift">
              <Plus className="w-4 h-4 mr-2" />
              Create Lesson
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-strong border-2 border-primary/20">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="w-6 h-6 text-primary" />
                Create New Lesson
              </DialogTitle>
              <DialogDescription>
                Give your lesson a name to get started
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-base">Lesson Name</Label>
                <Input
                  id="name"
                  value={newLessonName}
                  onChange={(e) => setNewLessonName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateLesson();
                    }
                  }}
                  placeholder="e.g., Quadratic Equations"
                  className="glass mt-2 text-base"
                  autoFocus
                />
              </div>
              <Button onClick={handleCreateLesson} className="w-full gradient-primary hover-lift text-base h-11">
                <Sparkles className="w-4 h-4 mr-2" />
                Create Lesson
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Your Lessons
            <span className="text-sm text-muted-foreground font-normal ml-auto">
              {state.lessons.length} total
            </span>
          </h2>
          <AnimatePresence>
            {state.lessons.map((lesson, i) => (
              <CollapsibleLessonCard
                key={lesson.id}
                lesson={lesson}
                isSelected={selectedLesson?.id === lesson.id}
                onClick={() => setSelectedLesson(lesson)}
                onDelete={() => {
                  deleteLesson(lesson.id);
                  if (selectedLesson?.id === lesson.id) {
                    setSelectedLesson(null);
                  }
                }}
                index={i}
              />
            ))}
          </AnimatePresence>
          
          {state.lessons.length === 0 && (
            <Card className="glass">
              <CardContent className="pt-6 text-center text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No lessons yet. Create your first one!</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2">
          {selectedLesson ? (
            <motion.div
              key={selectedLesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="glass-strong hover-lift">
                <CardHeader className="border-b border-white/10">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Edit className="w-6 h-6 text-primary glow-primary" />
                    {selectedLesson.name}
                  </CardTitle>
                  <CardDescription>
                    Last updated {new Date(selectedLesson.updatedAt).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div>
                    <Label className="text-base font-semibold">Notes & Formulas</Label>
                    <Textarea
                      value={selectedLesson.notes}
                      onChange={(e) => handleUpdateNotes(selectedLesson.id, e.target.value)}
                      placeholder="Write your notes, formulas, and explanations here..."
                      className="min-h-[300px] glass resize-none mt-2 text-base"
                    />
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 mb-3 text-base font-semibold">
                      <Youtube className="w-5 h-5 text-destructive" />
                      YouTube Videos
                    </Label>
                    <div className="flex gap-2 mb-4">
                      <Input
                        placeholder="Paste YouTube URL and press Enter..."
                        className="glass text-base"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const input = e.currentTarget;
                            if (input.value.trim()) {
                              handleAddVideo(selectedLesson.id, input.value);
                              input.value = '';
                            }
                          }
                        }}
                      />
                      <Button
                        variant="outline"
                        className="glass hover:glow-accent"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                          if (input?.value.trim()) {
                            handleAddVideo(selectedLesson.id, input.value);
                            input.value = '';
                          }
                        }}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {selectedLesson.videos.length === 0 && (
                        <div className="glass-strong rounded-lg p-6 text-center text-muted-foreground">
                          <Youtube className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p>No videos yet. Add a YouTube URL above.</p>
                        </div>
                      )}
                      {selectedLesson.videos.map((videoUrl, i) => {
                        const videoId = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1];
                        return videoId ? (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="aspect-video rounded-lg overflow-hidden glass-strong shadow-2xl hover-lift"
                          >
                            <iframe
                              src={`https://www.youtube.com/embed/${videoId}`}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </motion.div>
                        ) : (
                          <div key={i} className="glass-strong rounded-lg p-4 text-sm text-destructive">
                            Invalid YouTube URL: {videoUrl}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="glass-strong h-full flex items-center justify-center min-h-[500px]">
              <CardContent className="text-center space-y-4">
                <BookOpen className="w-20 h-20 mx-auto mb-4 text-primary/50 animate-float" />
                <div>
                  <p className="text-2xl font-semibold mb-2">
                    Select a lesson to begin
                  </p>
                  <p className="text-muted-foreground">
                    Choose a lesson from the left or create a new one
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
