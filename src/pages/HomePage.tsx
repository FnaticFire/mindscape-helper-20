
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, BarChart, Wind, User, Brain } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useApp();
  
  const modules = [
    {
      title: "AI Companion",
      description: "Chat with our AI trained in CBT and mindfulness techniques",
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      color: "from-[hsl(var(--pink))] to-[hsl(var(--pink-dark))]",
      path: "/chat",
      bgCard: "from-white/80 to-[hsl(var(--pink-light))]/30"
    },
    {
      title: "Mood Tracker",
      description: "Log and visualize your emotional patterns",
      icon: <BarChart className="h-6 w-6 text-white" />,
      color: "from-[hsl(var(--cyan))] to-[hsl(var(--cyan-dark))]",
      path: "/mood",
      bgCard: "from-white/80 to-[hsl(var(--cyan-light))]/30"
    },
    {
      title: "Breathing Exercises",
      description: "Reduce stress with guided breathing",
      icon: <Wind className="h-6 w-6 text-white" />,
      color: "from-[hsl(var(--accent))] to-[hsl(var(--primary))]",
      path: "/breathe",
      bgCard: "from-white/80 to-[hsl(var(--accent))]/20"
    },
    {
      title: "User Profile",
      description: "Customize your MindHaven experience",
      icon: <User className="h-6 w-6 text-white" />,
      color: "from-[hsl(var(--primary))] to-[hsl(var(--pink))]",
      path: "/profile",
      bgCard: "from-white/80 to-[hsl(var(--pink))]/10"
    }
  ];

  return (
    <div className="container py-8 px-4 max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))] bg-clip-text text-transparent flex items-center justify-center gap-2">
          <Brain className="h-8 w-8 text-[hsl(var(--pink))]" />
          Welcome to MindHaven
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Your personal mental wellness companion. Choose a module below to begin your journey.
        </p>
        
        {user && (
          <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-[hsl(var(--pink-light))] to-[hsl(var(--cyan-light))]/50 px-4 py-2 rounded-full">
            <div className="w-6 h-6 bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))] rounded-full flex items-center justify-center text-primary-foreground shadow-sm text-xs font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium">{user.streakDays} day streak</span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module, index) => (
          <Card key={index} className={`group border-[hsl(var(--border))] shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br dark:from-gray-800/80 dark:to-gray-700/50 ${module.bgCard} backdrop-blur-sm overflow-hidden relative`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[hsl(var(--background))]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader>
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${module.color} flex items-center justify-center mr-2 shadow-md`}>
                  {module.icon}
                </div>
                <CardTitle className="text-xl">{module.title}</CardTitle>
              </div>
              <CardDescription>
                {module.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-24 flex items-center justify-center">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${module.color} flex items-center justify-center opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-300`}>
                {module.icon}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => navigate(module.path)} 
                className={`w-full bg-gradient-to-r ${module.color} hover:opacity-90 transition-opacity text-white`}
              >
                Open {module.title}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-xl font-medium mb-3 bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))] bg-clip-text text-transparent">Daily Wellness Tip</h2>
        <Card className="max-w-xl mx-auto bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
          <CardContent className="pt-6">
            <blockquote className="italic text-muted-foreground">
              "Small steps taken consistently lead to significant improvements in mental wellbeing. Remember to celebrate your progress, no matter how small."
            </blockquote>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
