
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare, BarChart, Wind, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center justify-center p-3 rounded-lg transition-colors",
          isActive 
            ? "bg-primary/10 text-primary" 
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )
      }
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
};

const Navigation: React.FC = () => {
  return (
    <nav className="flex md:flex-col justify-around md:justify-start items-center md:items-stretch p-2 md:p-4 bg-card md:bg-transparent border-t md:border-t-0 md:border-r fixed bottom-0 md:top-16 left-0 right-0 md:right-auto md:bottom-0 md:w-20 z-10">
      <NavItem to="/" icon={<MessageSquare size={20} />} label="Chat" />
      <NavItem to="/mood" icon={<BarChart size={20} />} label="Mood" />
      <NavItem to="/breathe" icon={<Wind size={20} />} label="Breathe" />
      <NavItem to="/profile" icon={<User size={20} />} label="Profile" />
    </nav>
  );
};

export default Navigation;
