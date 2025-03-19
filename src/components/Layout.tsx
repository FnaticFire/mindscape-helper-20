
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import Navigation from '@/components/Navigation';
import { useApp } from '@/contexts/AppContext';

const Layout: React.FC = () => {
  const location = useLocation();
  const { setIsLoading } = useApp();
  
  // Add page transition effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Short loading time for transitions
    
    return () => clearTimeout(timer);
  }, [location.pathname, setIsLoading]);
  
  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <AppHeader />
      <div className="flex flex-1 pt-16 pb-16 md:pb-0 md:pl-20">
        <main className="flex-1 overflow-hidden max-w-5xl mx-auto w-full animate-fade-in">
          <Outlet />
        </main>
      </div>
      <Navigation />
    </div>
  );
};

export default Layout;
