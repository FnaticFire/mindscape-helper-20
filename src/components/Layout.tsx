
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import Navigation from '@/components/Navigation';
import { useApp } from '@/contexts/AppContext';

const Layout: React.FC = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to home if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

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
