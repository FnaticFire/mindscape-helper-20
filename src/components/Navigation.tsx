
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare, BarChart, Wind, User, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-300",
          isActive 
            ? "bg-gradient-to-r from-[hsl(var(--pink-light))] to-[hsl(var(--cyan-light))] text-[hsl(var(--pink-dark))] font-medium shadow-md" 
            : "text-muted-foreground hover:bg-[hsl(var(--background))] hover:text-foreground"
        )
      }
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
};

const Navigation: React.FC = () => {
  const { toast } = useToast();
  
  const handleSupportClick = () => {
    toast({
      title: "Support Chat",
      description: "Live support will be available soon!",
      duration: 3000
    });
  };
  
  return (
    <nav className="flex md:flex-col justify-around md:justify-start items-center md:items-stretch p-2 md:p-4 glass-card md:bg-transparent border-t md:border-t-0 md:border-r fixed bottom-0 md:top-16 left-0 right-0 md:right-auto md:bottom-0 md:w-20 z-30 animate-fade-in">
      <NavItem to="/chat" icon={<MessageSquare size={20} className="transition-transform group-hover:scale-110" />} label="Chat" />
      <NavItem to="/mood" icon={<BarChart size={20} className="transition-transform group-hover:scale-110" />} label="Mood" />
      <NavItem to="/breathe" icon={<Wind size={20} className="transition-transform group-hover:scale-110" />} label="Breathe" />
      <NavItem to="/profile" icon={<User size={20} className="transition-transform group-hover:scale-110" />} label="Profile" />
      <NavItem to="#" icon={<HelpCircle size={20} className="transition-transform group-hover:scale-110" />} label="Support" onClick={handleSupportClick} />
    </nav>
  );
};

export default Navigation;
