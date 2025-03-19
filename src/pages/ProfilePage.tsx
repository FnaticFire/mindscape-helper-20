
import React from 'react';
import UserProfile from '@/components/UserProfile';

const ProfilePage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-xl font-bold p-4 border-b">Your Profile</h1>
      <div className="flex-1 overflow-auto">
        <UserProfile />
      </div>
    </div>
  );
};

export default ProfilePage;
