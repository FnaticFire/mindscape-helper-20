
import React from 'react';
import MoodTracker from '@/components/MoodTracker';

const MoodPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-xl font-bold p-4 border-b">Mood Tracker</h1>
      <div className="flex-1 overflow-auto">
        <MoodTracker />
      </div>
    </div>
  );
};

export default MoodPage;
