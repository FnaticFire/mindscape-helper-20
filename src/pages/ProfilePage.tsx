
import React from 'react';
import UserProfile from '@/components/UserProfile';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-background to-orange-50/30">
      <div className="flex items-center justify-between p-4 border-b bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/ccac2e90-d337-46f0-a75a-31c3d8d246af.png" 
            alt="MindHaven Logo" 
            className="h-8 w-auto"
          />
          <h1 className="text-xl font-bold text-orange-500">Your Profile</h1>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <Home className="h-4 w-4" />
          <span>Home</span>
        </Button>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <UserProfile />
      </div>
    </div>
  );
};

export default ProfilePage;
