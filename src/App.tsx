import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { Navigation } from "@/components/layout/Navigation";
import { NotesSidebar } from "@/components/layout/NotesSidebar";
import { QuickNotesButton } from "@/components/QuickNotesButton";
import { AIAssistant } from "@/components/AIAssistant";
import { CommandPalette } from "@/components/CommandPalette";
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import Solver from "./pages/Solver";
import Code from "./pages/Code";
import History from "./pages/History";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen w-full relative">
              <Navigation />
              <main className="pt-16 pb-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/lessons" element={<Lessons />} />
                  <Route path="/solver" element={<Solver />} />
                  <Route path="/code" element={<Code />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <NotesSidebar />
              <QuickNotesButton />
              <AIAssistant />
              <CommandPalette />
            </div>
          </BrowserRouter>
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
