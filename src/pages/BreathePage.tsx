
import React from 'react';
import BreathingExercise from '@/components/BreathingExercise';

const BreathePage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 p-4 border-b">
        <img 
          src="/lovable-uploads/ccac2e90-d337-46f0-a75a-31c3d8d246af.png" 
          alt="MindHaven Logo" 
          className="h-8 w-auto"
        />
        <h1 className="text-xl font-bold">Breathing Exercises</h1>
      </div>
      <div className="flex-1 overflow-auto">
        <BreathingExercise />
      </div>
    </div>
  );
};

export default BreathePage;
