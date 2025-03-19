
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Moon, Sun, User as UserIcon, Save } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { user, setUser, darkMode, setDarkMode } = useApp();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || '');
  
  const handleSaveProfile = () => {
    if (!user) return;
    
    setUser({
      name: name,
      password: user.password, // Add the required password field
      streakDays: user.streakDays
    });
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
      duration: 3000
    });
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    
    toast({
      title: darkMode ? "Light Mode Activated" : "Dark Mode Activated",
      description: "Your preference has been saved",
      duration: 2000
    });
  };
  
  if (!user) return null;
  
  return (
    <div className="container max-w-lg mx-auto py-8 px-4">
      <Card className="shadow-lg border-0 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md">
        <CardHeader className="pb-4">
          <div className="w-20 h-20 bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))] rounded-full flex items-center justify-center text-primary-foreground shadow-md text-3xl font-bold mx-auto mb-4">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <CardTitle className="text-2xl text-center bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))] bg-clip-text text-transparent">User Profile</CardTitle>
          <CardDescription className="text-center">Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Username</Label>
            <Input 
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-[hsl(var(--pink-light))] focus-visible:ring-[hsl(var(--pink))]"
            />
          </div>
          
          <div className="pt-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark theme
                </p>
              </div>
              <div className="flex items-center">
                <Sun className="w-4 h-4 mr-2 text-muted-foreground" />
                <Switch
                  checked={darkMode}
                  onCheckedChange={toggleDarkMode}
                  id="dark-mode"
                />
                <Moon className="w-4 h-4 ml-2 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Account Statistics</Label>
              </div>
            </div>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Streak</span>
                <span className="font-medium">{user.streakDays} days</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Account Created</span>
                <span className="font-medium">Today</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSaveProfile} 
            className="w-full bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))] hover:opacity-90 transition-opacity"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserProfile;
