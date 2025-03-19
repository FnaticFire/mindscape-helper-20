
import React from 'react';
import BreathingExercise from '@/components/BreathingExercise';

const BreathePage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-xl font-bold p-4 border-b">Breathing Exercises</h1>
      <div className="flex-1 overflow-auto">
        <BreathingExercise />
      </div>
    </div>
  );
};

export default BreathePage;
