
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';
import { toast } from 'sonner';

const MoodTracker: React.FC = () => {
  const { currentMood, setCurrentMood, moodHistory, addMoodEntry } = useApp();
  const [notes, setNotes] = useState('');
  
  const moodValues = {
    'great': 5,
    'good': 4,
    'okay': 3,
    'bad': 2,
    'awful': 1,
  };
  
  const handleMoodSelect = (mood: 'great' | 'good' | 'okay' | 'bad' | 'awful') => {
    setCurrentMood(mood);
  };
  
  const handleSaveEntry = () => {
    if (!currentMood) {
      toast.error('Please select a mood first');
      return;
    }
    
    addMoodEntry({
      date: new Date(),
      mood: currentMood,
      notes: notes
    });
    
    setNotes('');
    toast.success('Mood entry saved!');
  };
  
  // Prepare data for the chart
  const getLast7DaysMoods = () => {
    const lastWeek = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i);
      const dayMoods = moodHistory.filter(entry => 
        format(entry.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      );
      
      // Calculate average mood if there are multiple entries for a day
      let moodValue = null;
      if (dayMoods.length > 0) {
        const sum = dayMoods.reduce((acc, entry) => 
          acc + (entry.mood ? moodValues[entry.mood] : 0), 0
        );
        moodValue = sum / dayMoods.length;
      }
      
      return {
        date: format(date, 'MMM dd'),
        value: moodValue
      };
    });
    
    return lastWeek;
  };
  
  const chartData = getLast7DaysMoods();
  
  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
          <CardDescription>Select the emoji that best describes your current mood</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around my-6">
            <div 
              className={`mood-emoji ${currentMood === 'great' ? 'selected' : ''}`} 
              onClick={() => handleMoodSelect('great')}
            >
              😄
            </div>
            <div 
              className={`mood-emoji ${currentMood === 'good' ? 'selected' : ''}`} 
              onClick={() => handleMoodSelect('good')}
            >
              🙂
            </div>
            <div 
              className={`mood-emoji ${currentMood === 'okay' ? 'selected' : ''}`} 
              onClick={() => handleMoodSelect('okay')}
            >
              😐
            </div>
            <div 
              className={`mood-emoji ${currentMood === 'bad' ? 'selected' : ''}`} 
              onClick={() => handleMoodSelect('bad')}
            >
              😔
            </div>
            <div 
              className={`mood-emoji ${currentMood === 'awful' ? 'selected' : ''}`} 
              onClick={() => handleMoodSelect('awful')}
            >
              😭
            </div>
          </div>
          
          <Textarea
            placeholder="Add notes about your feelings (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-4"
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveEntry} className="w-full">Save Mood</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Mood History</CardTitle>
          <CardDescription>Track how your mood has changed over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis 
                  domain={[1, 5]} 
                  ticks={[1, 2, 3, 4, 5]} 
                  tickFormatter={(value) => {
                    const labels = ['Awful', 'Bad', 'Okay', 'Good', 'Great'];
                    return labels[value - 1] || '';
                  }} 
                />
                <Tooltip
                  formatter={(value) => {
                    if (value === null) return ['No entry', ''];
                    const labels = ['Awful', 'Bad', 'Okay', 'Good', 'Great'];
                    const index = Math.round(Number(value)) - 1;
                    return [labels[index] || value, 'Mood'];
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0ea5e9" 
                  strokeWidth={2}
                  dot={{ fill: '#0ea5e9', r: 4 }}
                  activeDot={{ r: 6 }}
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {moodHistory.length === 0 && (
            <p className="text-center text-muted-foreground mt-4">
              No mood data yet. Start tracking to see your patterns!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTracker;
