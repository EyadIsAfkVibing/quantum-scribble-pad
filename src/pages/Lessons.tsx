import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, BookOpen, Trash2, Edit, Youtube } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
            <Button className="gradient-primary hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Create Lesson
            </Button>
          </DialogTrigger>
          <DialogContent className="glass">
            <DialogHeader>
              <DialogTitle>Create New Lesson</DialogTitle>
              <DialogDescription>
                Give your lesson a name to get started
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Lesson Name</Label>
                <Input
                  id="name"
                  value={newLessonName}
                  onChange={(e) => setNewLessonName(e.target.value)}
                  placeholder="e.g., Quadratic Equations"
                  className="glass"
                />
              </div>
              <Button onClick={handleCreateLesson} className="w-full gradient-primary">
                Create Lesson
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold">Your Lessons</h2>
          <AnimatePresence>
            {state.lessons.map((lesson, i) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card
                  className={`glass cursor-pointer transition-all ${
                    selectedLesson?.id === lesson.id ? 'glow-primary ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedLesson(lesson)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{lesson.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteLesson(lesson.id);
                          if (selectedLesson?.id === lesson.id) {
                            setSelectedLesson(null);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      Updated {new Date(lesson.updatedAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {state.lessons.length === 0 && (
            <Card className="glass">
              <CardContent className="pt-6 text-center text-muted-foreground">
                No lessons yet. Create your first one!
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
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Edit className="w-6 h-6 text-primary" />
                    {selectedLesson.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Notes & Formulas</Label>
                    <Textarea
                      value={selectedLesson.notes}
                      onChange={(e) => handleUpdateNotes(selectedLesson.id, e.target.value)}
                      placeholder="Write your notes, formulas, and explanations here..."
                      className="min-h-[300px] glass resize-none"
                    />
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <Youtube className="w-4 h-4 text-destructive" />
                      YouTube Videos
                    </Label>
                    <div className="flex gap-2 mb-4">
                      <Input
                        placeholder="Paste YouTube URL..."
                        className="glass"
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
                        className="glass"
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
                      {selectedLesson.videos.map((videoUrl, i) => {
                        const videoId = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1];
                        return videoId ? (
                          <div key={i} className="aspect-video rounded-lg overflow-hidden glass">
                            <iframe
                              src={`https://www.youtube.com/embed/${videoId}`}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        ) : (
                          <p key={i} className="text-sm text-muted-foreground">Invalid YouTube URL</p>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="glass h-full flex items-center justify-center min-h-[400px]">
              <CardContent className="text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground animate-float" />
                <p className="text-xl text-muted-foreground">
                  Select a lesson to view details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
