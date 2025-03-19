
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Settings, LogOut, Home } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

const AppHeader: React.FC = () => {
  const { user, setUser, darkMode, setDarkMode } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast({
      title: darkMode ? "Light mode activated" : "Dark mode activated",
      description: "Your preference has been saved",
      duration: 2000
    });
    
    // Toggle class on document element
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };
  
  const handleLogoClick = () => navigate('/');
  
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('mindhaven-user');
    toast({
      title: "Logged out successfully",
      description: "See you again soon!",
      duration: 3000
    });
    navigate('/');
  };
  
  return (
    <header className="w-full py-3 px-4 md:px-6 flex items-center justify-between bg-background/80 backdrop-blur-md border-b transition-all duration-300 fixed top-0 left-0 right-0 z-40">
      <div className="flex items-center gap-2">
        <img 
          src="/lovable-uploads/ccac2e90-d337-46f0-a75a-31c3d8d246af.png" 
          alt="MindHaven Logo" 
          className="h-10 w-auto cursor-pointer transition-transform hover:scale-105 dark:invert"
          onClick={handleLogoClick}
        />
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/')}
          className="hidden md:flex items-center gap-1 ml-2 text-muted-foreground hover:text-foreground"
        >
          <Home className="h-4 w-4" />
          <span>Home</span>
        </Button>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center mr-2">
          <Switch
            checked={darkMode}
            onCheckedChange={toggleDarkMode}
            id="dark-mode"
            className="mr-2"
          />
          <label htmlFor="dark-mode" className="text-sm cursor-pointer">
            {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </label>
        </div>
        
        {user && (
          <div className="hidden md:block">
            <div className="flex items-center gap-2">
              <div className="w-full max-w-32">
                <Progress value={user.streakDays * 10} className="h-2 bg-gray-200 dark:bg-gray-700" />
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{user.streakDays} day streak</span>
            </div>
          </div>
        )}
        
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="text-sm text-right hidden md:block">
                  <p className="font-medium">{user.name}</p>
                </div>
                <div className="w-9 h-9 bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))] rounded-full flex items-center justify-center text-primary-foreground shadow-md hover:shadow-lg transition-shadow">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 animate-scale-in">
              <div className="flex items-center justify-start p-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))] rounded-full flex items-center justify-center text-primary-foreground mr-2">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.streakDays} day streak</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer flex items-center" onClick={toggleDarkMode}>
                {darkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))] text-white hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Get Started
          </Button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
