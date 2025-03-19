
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
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
  
  const moodColors = {
    'great': '#8B5CF6', // Vivid Purple
    'good': '#0EA5E9', // Ocean Blue
    'okay': '#F97316', // Bright Orange
    'bad': '#F43F5E', // Pink
    'awful': '#9F1239', // Dark Red
  };
  
  const moodEmojis = {
    'great': '😄',
    'good': '🙂',
    'okay': '😐',
    'bad': '😔',
    'awful': '😭',
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
      let moodKey = null;
      if (dayMoods.length > 0) {
        const sum = dayMoods.reduce((acc, entry) => 
          acc + (entry.mood ? moodValues[entry.mood] : 0), 0
        );
        moodValue = sum / dayMoods.length;
        // Find nearest mood key based on value
        const roundedValue = Math.round(moodValue);
        moodKey = Object.keys(moodValues).find(key => 
          moodValues[key as keyof typeof moodValues] === roundedValue
        ) as keyof typeof moodEmojis || null;
      }
      
      return {
        date: format(date, 'MMM dd'),
        value: moodValue,
        mood: moodKey,
        emoji: moodKey ? moodEmojis[moodKey as keyof typeof moodEmojis] : null
      };
    });
    
    return lastWeek;
  };
  
  const chartData = getLast7DaysMoods();

  // Custom tooltip component for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      if (value === null) return null;
      
      const roundedValue = Math.round(value);
      const moodKey = Object.keys(moodValues).find(
        key => moodValues[key as keyof typeof moodValues] === roundedValue
      ) as keyof typeof moodEmojis;
      
      const emoji = moodEmojis[moodKey];
      
      return (
        <div className="bg-white dark:bg-gray-800 p-2 rounded-md border border-border shadow-lg text-foreground">
          <p className="font-semibold">{label}</p>
          <p className="flex items-center gap-2">
            <span className="text-xl">{emoji}</span>
            <span>{moodKey.charAt(0).toUpperCase() + moodKey.slice(1)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom dot component to show emojis instead of dots
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    
    if (payload.emoji) {
      return (
        <text 
          x={cx} 
          y={cy} 
          dy={-5}
          fontSize={16} 
          textAnchor="middle" 
          fill={props.stroke}
        >
          {payload.emoji}
        </text>
      );
    }
    
    // Fall back to regular dot if no emoji
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={6} 
        stroke={props.stroke} 
        strokeWidth={2} 
        fill="#fff" 
      />
    );
  };
  
  return (
    <div className="space-y-6 p-4">
      <Card className="border-[hsl(var(--pink-light))] shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-2 bg-gradient-to-r from-[hsl(var(--pink-light))]/10 to-[hsl(var(--cyan-light))]/10">
          <CardTitle>How are you feeling today?</CardTitle>
          <CardDescription>Select the emoji that best describes your current mood</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around my-6">
            {Object.entries(moodEmojis).map(([mood, emoji]) => (
              <div 
                key={mood}
                className={`${
                  currentMood === mood 
                    ? 'scale-125 shadow-lg border-2 border-[hsl(var(--pink))]' 
                    : 'hover:scale-110'
                } w-16 h-16 rounded-full flex items-center justify-center text-3xl cursor-pointer transition-all duration-300 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-700`}
                onClick={() => handleMoodSelect(mood as any)}
              >
                {emoji}
              </div>
            ))}
          </div>
          
          <Textarea
            placeholder="Add notes about your feelings (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-4 border-[hsl(var(--pink-light))] focus-visible:ring-[hsl(var(--pink))]"
          />
        </CardContent>
        <CardFooter className="bg-gradient-to-r from-[hsl(var(--pink-light))]/10 to-[hsl(var(--cyan-light))]/10">
          <Button 
            onClick={handleSaveEntry} 
            className="w-full bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))] hover:opacity-90 transition-opacity"
          >
            Save Mood
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="border-[hsl(var(--cyan-light))] shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-2 bg-gradient-to-r from-[hsl(var(--cyan-light))]/10 to-[hsl(var(--pink-light))]/10">
          <CardTitle>Your Mood History</CardTitle>
          <CardDescription>Track how your mood has changed over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={chartData}
                margin={{ top: 20, right: 20, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis 
                  dataKey="date" 
                  stroke="#888888" 
                  tick={{ fill: '#888888', fontSize: 12 }}
                />
                <YAxis 
                  domain={[1, 5]} 
                  ticks={[1, 2, 3, 4, 5]} 
                  tickFormatter={(value) => {
                    const labels = ['Awful', 'Bad', 'Okay', 'Good', 'Great'];
                    return labels[value - 1] || '';
                  }}
                  stroke="#888888"
                  tick={{ fill: '#888888', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="url(#colorGradient)" 
                  strokeWidth={3}
                  dot={<CustomDot />}
                  activeDot={{ 
                    r: 8,
                    stroke: '#8B5CF6',
                    strokeWidth: 2,
                    fill: '#E5DEFF'
                  }}
                  connectNulls
                  animationDuration={1500}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#0EA5E9" />
                  </linearGradient>
                </defs>
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
