
import React from 'react';
import BreathingExercise from '@/components/BreathingExercise';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BreathePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-background via-[hsl(var(--cyan-light))]/5 to-[hsl(var(--pink-light))]/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
      <div className="flex items-center justify-between p-4 border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/ccac2e90-d337-46f0-a75a-31c3d8d246af.png" 
            alt="MindHaven Logo" 
            className="h-8 w-auto cursor-pointer"
            onClick={() => navigate('/')}
          />
          <h1 className="text-xl font-bold bg-gradient-to-r from-[hsl(var(--cyan))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">Breathing Exercises</h1>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground border-[hsl(var(--cyan-light))]"
        >
          <Home className="h-4 w-4" />
          <span>Home</span>
        </Button>
      </div>
      <div className="flex-1 overflow-auto p-4 animate-fade-in">
        <BreathingExercise />
      </div>
    </div>
  );
};

export default BreathePage;
