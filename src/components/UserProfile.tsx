
import React, { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Calendar, Heart, Award, RefreshCw } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { user, setUser, moodHistory } = useApp();
  const [name, setName] = useState(user?.name || '');
  
  const handleSaveProfile = () => {
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    
    setUser({
      name: name.trim(),
      streakDays: user?.streakDays || 1
    });
    
    toast.success('Profile saved!');
  };
  
  // Calculate stats
  const totalEntries = moodHistory.length;
  const lastWeekEntries = moodHistory.filter(
    entry => entry.date > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;
  
  // Get common mood
  const getMostCommonMood = () => {
    if (moodHistory.length === 0) return null;
    
    const moodCounts: Record<string, number> = {};
    moodHistory.forEach(entry => {
      if (entry.mood) {
        moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
      }
    });
    
    return Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0][0];
  };
  
  const commonMood = getMostCommonMood();
  const moodEmojis: Record<string, string> = {
    'great': '😄',
    'good': '🙂',
    'okay': '😐',
    'bad': '😔',
    'awful': '😭'
  };
  
  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveProfile} className="w-full">Save Profile</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Your MindHaven Stats</CardTitle>
          <CardDescription>Track your mental wellness journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-4 flex flex-col items-center">
              <Calendar className="h-8 w-8 text-primary mb-2" />
              <h3 className="text-2xl font-bold">{totalEntries}</h3>
              <p className="text-sm text-muted-foreground text-center">Total Mood Entries</p>
            </div>
            
            <div className="bg-muted rounded-lg p-4 flex flex-col items-center">
              <RefreshCw className="h-8 w-8 text-secondary mb-2" />
              <h3 className="text-2xl font-bold">{lastWeekEntries}</h3>
              <p className="text-sm text-muted-foreground text-center">Entries Last Week</p>
            </div>
            
            {user && (
              <div className="bg-muted rounded-lg p-4 flex flex-col items-center">
                <Award className="h-8 w-8 text-accent mb-2" />
                <h3 className="text-2xl font-bold">{user.streakDays}</h3>
                <p className="text-sm text-muted-foreground text-center">Day Streak</p>
              </div>
            )}
            
            {commonMood && (
              <div className="bg-muted rounded-lg p-4 flex flex-col items-center">
                <Heart className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-2xl font-bold">{moodEmojis[commonMood]}</h3>
                <p className="text-sm text-muted-foreground text-center">Most Common Mood</p>
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">Achievements</h3>
            <div className="flex flex-wrap gap-2">
              {totalEntries > 0 && (
                <Badge variant="outline" className="bg-primary/10">First Entry</Badge>
              )}
              {totalEntries >= 7 && (
                <Badge variant="outline" className="bg-secondary/10">Week Tracker</Badge>
              )}
              {user?.streakDays >= 3 && (
                <Badge variant="outline" className="bg-accent/10">3 Day Streak</Badge>
              )}
              {lastWeekEntries >= 5 && (
                <Badge variant="outline" className="bg-primary/10">Consistent Check-ins</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
