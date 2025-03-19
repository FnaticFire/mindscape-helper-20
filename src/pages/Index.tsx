
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageSquare, BarChart, Wind, User, Brain, Home, Heart, Moon, Sun, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { user, login, register, darkMode, setDarkMode } = useApp();
  const [showLogin, setShowLogin] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [activeFeature, setActiveFeature] = useState(0);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  
  // Redirect to home if user already exists
  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);
  
  // Cycle through features automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && password) {
      if (authTab === 'login') {
        if (login(name.trim(), password)) {
          navigate('/home');
        }
      } else {
        if (register(name.trim(), password)) {
          navigate('/home');
        }
      }
    }
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const handleModuleClick = (path: string) => {
    // If not logged in, show login first
    if (!user) {
      setShowLogin(true);
      // Store the intended destination for after login
      localStorage.setItem('mindhaven-redirect-after-login', path);
      toast('Please log in to access this feature');
    } else {
      navigate(path);
    }
  };
  
  const features = [
    {
      icon: <MessageSquare className="h-6 w-6 text-[hsl(var(--pink-dark))]" />,
      title: "AI Companion",
      description: "Chat with our AI trained in CBT and mindfulness techniques to help manage anxiety and stress.",
      path: "/chat"
    },
    {
      icon: <BarChart className="h-6 w-6 text-[hsl(var(--pink-dark))]" />,
      title: "Mood Tracker",
      description: "Log and visualize your emotional patterns to gain insights and improve self-awareness.",
      path: "/mood"
    },
    {
      icon: <Wind className="h-6 w-6 text-[hsl(var(--pink-dark))]" />,
      title: "Breathing Exercises",
      description: "Guided breathing techniques to help you manage stress and anxiety in real time.",
      path: "/breathe"
    },
    {
      icon: <User className="h-6 w-6 text-[hsl(var(--pink-dark))]" />,
      title: "Personalized Journey",
      description: "Customize your wellness journey with personalized recommendations and tracking.",
      path: "/profile"
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-b from-background via-[hsl(var(--pink-light))/10] to-[hsl(var(--cyan-light))/10] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 overflow-x-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-20 left-[10%] w-64 h-64 bg-[hsl(var(--pink-light))] rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-[hsl(var(--cyan-light))] rounded-full filter blur-3xl opacity-20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-[20%] w-56 h-56 bg-[hsl(var(--accent))/20] rounded-full filter blur-3xl opacity-20 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Header with dark mode toggle */}
      <header className="relative z-10 px-4 py-3 flex justify-end">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 hover:bg-white/20 dark:hover:bg-black/30 transition-colors"
        >
          {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
        </button>
      </header>
      
      <div className="flex-1 flex flex-col items-center justify-start py-8 md:py-16 px-4 relative z-10">
        <div className="max-w-3xl w-full">
          <div className="text-center mb-8 md:mb-16 relative">
            <div className="flex flex-col items-center justify-center mb-4 relative z-10">
              <img 
                src="/lovable-uploads/ccac2e90-d337-46f0-a75a-31c3d8d246af.png" 
                alt="MindHaven Logo with Tagline" 
                className="h-32 md:h-40 w-auto mb-4 animate-fade-in dark:invert"
              />
            </div>
            
            {!showLogin && (
              <p className="text-xl text-foreground max-w-2xl mx-auto mt-4 animate-fade-in font-medium">
                Your AI-powered mental health companion for stress, anxiety, and emotional wellbeing
              </p>
            )}
          </div>
          
          {showLogin ? (
            <Card className="mb-8 border-[hsl(var(--pink-light))] shadow-xl animate-scale-in bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-center bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))] bg-clip-text text-transparent">
                  <User className="h-6 w-6 inline-block mr-2 text-[hsl(var(--pink))]" />
                  Get Started
                </CardTitle>
                <CardDescription className="text-center">
                  Begin your wellness journey
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleAuth}>
                <CardContent className="space-y-4 pt-4">
                  <Tabs value={authTab} onValueChange={(value) => setAuthTab(value as 'login' | 'register')} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="login" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-name">Username</Label>
                        <Input 
                          id="login-name" 
                          placeholder="Enter your username" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)}
                          className="border-[hsl(var(--pink-light))] focus-visible:ring-[hsl(var(--pink))]"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <Input 
                          id="login-password" 
                          type="password" 
                          placeholder="Enter your password" 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)}
                          className="border-[hsl(var(--pink-light))] focus-visible:ring-[hsl(var(--pink))]"
                          required
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="register" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-name">Create Username</Label>
                        <Input 
                          id="register-name" 
                          placeholder="Choose a username" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)}
                          className="border-[hsl(var(--pink-light))] focus-visible:ring-[hsl(var(--pink))]"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Create Password</Label>
                        <Input 
                          id="register-password" 
                          type="password" 
                          placeholder="Choose a password" 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)}
                          className="border-[hsl(var(--pink-light))] focus-visible:ring-[hsl(var(--pink))]"
                          required
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowLogin(false)}
                    className="w-1/2 mr-2 border-[hsl(var(--pink-light))]"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="w-1/2 ml-2 bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))] hover:opacity-90 transition-opacity"
                  >
                    <User className="mr-2 h-4 w-4" />
                    {authTab === 'login' ? 'Login' : 'Register'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          ) : (
            <>
              {/* Feature highlight section */}
              <div className="mb-12 md:mb-16">
                <div className="relative mb-8 overflow-hidden rounded-2xl shadow-xl h-64 md:h-80 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/20 dark:border-white/5">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={cn(
                        "absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between p-6 md:p-10 transition-opacity duration-500",
                        activeFeature === index ? "opacity-100 z-10" : "opacity-0 z-0"
                      )}
                    >
                      <div className="text-center md:text-left md:max-w-md mb-4 md:mb-0">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))] bg-clip-text text-transparent">
                          {feature.title}
                        </h2>
                        <p className="text-foreground dark:text-gray-200">
                          {feature.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-[hsl(var(--pink-light))] to-[hsl(var(--cyan-light))] rounded-full flex items-center justify-center shadow-lg">
                        <div className="transform scale-150">
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Indicator dots */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveFeature(index)}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all",
                          activeFeature === index 
                            ? "bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))] w-6" 
                            : "bg-gray-300 dark:bg-gray-600"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            
              <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-10">
                <Card 
                  onClick={() => handleModuleClick('/chat')}
                  className="group border-[hsl(var(--pink-light))] shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white/80 to-[hsl(var(--pink-light))]/30 dark:from-gray-800/80 dark:to-gray-700/50 backdrop-blur-sm overflow-hidden relative cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--pink))]/0 to-[hsl(var(--pink))]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[hsl(var(--pink-light))] flex items-center justify-center mr-2">
                        <MessageSquare className="w-5 h-5 text-[hsl(var(--pink-dark))] group-hover:scale-110 transition-transform" />
                      </div>
                      <CardTitle>AI Companion</CardTitle>
                    </div>
                    <CardDescription>
                      Chat with our AI trained in CBT and mindfulness techniques
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground dark:text-gray-200">Our 24/7 AI companion helps identify negative thought patterns and suggests personalized coping strategies.</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleModuleClick('/chat');
                      }} 
                      className="w-full bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))] hover:opacity-90 transition-opacity"
                    >
                      Start Chatting
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card 
                  onClick={() => handleModuleClick('/mood')}
                  className="group border-[hsl(var(--cyan-light))] shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white/80 to-[hsl(var(--cyan-light))]/30 dark:from-gray-800/80 dark:to-gray-700/50 backdrop-blur-sm overflow-hidden relative cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--cyan))]/0 to-[hsl(var(--cyan))]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[hsl(var(--cyan-light))] flex items-center justify-center mr-2">
                        <BarChart className="w-5 h-5 text-[hsl(var(--cyan-dark))] group-hover:scale-110 transition-transform" />
                      </div>
                      <CardTitle>Mood Tracker</CardTitle>
                    </div>
                    <CardDescription>
                      Log and visualize your emotional patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground dark:text-gray-200">Record your daily mood and thoughts to receive personalized insights and recommendations.</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleModuleClick('/mood');
                      }} 
                      variant="outline" 
                      className="w-full border-[hsl(var(--cyan))] text-[hsl(var(--cyan-dark))] hover:bg-[hsl(var(--cyan-light))]/50"
                    >
                      Track Mood
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card 
                  onClick={() => handleModuleClick('/breathe')}
                  className="group border-[hsl(var(--accent))]/30 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white/80 to-[hsl(var(--accent))]/20 dark:from-gray-800/80 dark:to-gray-700/50 backdrop-blur-sm overflow-hidden relative cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--accent))]/0 to-[hsl(var(--accent))]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[hsl(var(--accent))]/30 flex items-center justify-center mr-2">
                        <Wind className="w-5 h-5 text-[hsl(var(--accent))] group-hover:scale-110 transition-transform" />
                      </div>
                      <CardTitle>Breathing Exercises</CardTitle>
                    </div>
                    <CardDescription>
                      Reduce stress with guided breathing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground dark:text-gray-200">Follow our guided breathing exercises to calm your mind and reduce anxiety in moments of stress.</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleModuleClick('/breathe');
                      }} 
                      variant="outline" 
                      className="w-full border-[hsl(var(--accent))] text-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/10"
                    >
                      Start Breathing
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card 
                  onClick={() => handleModuleClick('/profile')}
                  className="group border-[hsl(var(--pink))]/30 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white/80 to-[hsl(var(--pink))]/10 dark:from-gray-800/80 dark:to-gray-700/50 backdrop-blur-sm overflow-hidden relative cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--pink))]/0 to-[hsl(var(--pink))]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[hsl(var(--pink))]/20 flex items-center justify-center mr-2">
                        <User className="w-5 h-5 text-[hsl(var(--pink))] group-hover:scale-110 transition-transform" />
                      </div>
                      <CardTitle>Your Profile</CardTitle>
                    </div>
                    <CardDescription>
                      Personalize your MindHaven experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground dark:text-gray-200">Set up your profile to track your progress, achievements, and customize your mental wellness journey.</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleModuleClick('/profile');
                      }} 
                      variant="outline" 
                      className="w-full border-[hsl(var(--pink))] text-[hsl(var(--pink))] hover:bg-[hsl(var(--pink))]/10"
                    >
                      Set Up Profile
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="flex justify-center mb-8">
                <Button 
                  onClick={() => setShowLogin(true)} 
                  size="lg" 
                  className="bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))] hover:opacity-90 transition-opacity px-8 py-6 text-lg shadow-lg hover:shadow-xl animate-pulse-slow"
                >
                  Get Started
                </Button>
              </div>
              
              {/* Additional features section */}
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))] bg-clip-text text-transparent">Additional Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all">
                    <Sun className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                    <p className="text-sm font-medium">Dark/Light Mode</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all">
                    <Package className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                    <p className="text-sm font-medium">Widgets</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <p className="text-sm font-medium">Live Support</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all">
                    <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
                    <p className="text-sm font-medium">Personalization</p>
                  </div>
                </div>
              </div>
            </>
          )}
          
          <div className="text-center text-sm text-foreground dark:text-gray-300 font-medium">
            <p>MindHaven is designed to provide support, not to replace professional mental health care.</p>
            <p className="mt-1">If you're experiencing a crisis, please contact emergency services or a mental health professional.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
