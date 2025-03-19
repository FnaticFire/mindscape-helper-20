
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AppHeader: React.FC = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between bg-background border-b">
      <div className="flex items-center gap-2">
        <img 
          src="/lovable-uploads/ccac2e90-d337-46f0-a75a-31c3d8d246af.png" 
          alt="MindHaven Logo" 
          className="h-10 w-auto"
        />
      </div>
      
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-2">
            <div className="text-sm text-right">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.streakDays} day streak</p>
            </div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        ) : (
          <Button 
            onClick={() => navigate('/profile')}
            variant="outline"
            className="text-sm"
          >
            Get Started
          </Button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
