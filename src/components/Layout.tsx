
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import Navigation from '@/components/Navigation';
import { useApp } from '@/contexts/AppContext';

const Layout: React.FC = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to landing page if not logged in, and handle saved redirects
  useEffect(() => {
    if (!user) {
      navigate('/');
    } else if (location.pathname === '/' || location.pathname === '') {
      // Check if there's a saved redirect in localStorage
      const savedRedirect = localStorage.getItem('mindhaven-redirect-after-login');
      if (savedRedirect) {
        localStorage.removeItem('mindhaven-redirect-after-login');
        navigate(savedRedirect);
      } else {
        navigate('/home');
      }
    }
  }, [user, navigate, location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <AppHeader />
      <div className="flex flex-1 pt-16 pb-16 md:pb-0 md:pl-20">
        <main className="flex-1 overflow-auto max-w-5xl mx-auto w-full animate-fade-in">
          <Outlet />
        </main>
      </div>
      <Navigation />
    </div>
  );
};

export default Layout;
