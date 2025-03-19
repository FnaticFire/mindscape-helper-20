
import React from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import Navigation from '@/components/Navigation';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      <div className="flex flex-1 pt-16 pb-16 md:pb-0 md:pl-20">
        <main className="flex-1 overflow-hidden max-w-5xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
      <Navigation />
    </div>
  );
};

export default Layout;
