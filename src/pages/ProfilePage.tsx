
import React from 'react';
import UserProfile from '@/components/UserProfile';

const ProfilePage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 p-4 border-b">
        <img 
          src="/lovable-uploads/0d769958-5df9-4f15-a450-2b515c04e2a7.png" 
          alt="Healthy Mindset Logo" 
          className="h-8 w-auto"
        />
        <h1 className="text-xl font-bold">Your Profile</h1>
      </div>
      <div className="flex-1 overflow-auto">
        <UserProfile />
      </div>
    </div>
  );
};

export default ProfilePage;
