
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageSquare, BarChart, Wind, User, Brain, Home } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useApp();
  const [showLogin, setShowLogin] = React.useState(false);
  const [name, setName] = React.useState('');
  
  // Redirect to chat if user already exists
  useEffect(() => {
    if (user) {
      navigate('/chat');
    }
  }, [user, navigate]);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setUser({
        name: name.trim(),
        streakDays: 1,
      });
      navigate('/chat');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background via-blue-50 to-purple-50">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/ccac2e90-d337-46f0-a75a-31c3d8d246af.png" 
              alt="MindHaven Logo with Tagline" 
              className="h-40 w-auto mb-4"
            />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4 animate-fade-in">
            Your AI-powered mental health companion for stress, anxiety, and emotional wellbeing
          </p>
        </div>
        
        {showLogin ? (
          <Card className="mb-8 border-primary/20 shadow-lg animate-scale-in bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-center text-primary">
                <User className="h-6 w-6 inline-block mr-2 text-primary" />
                Get Started
              </CardTitle>
              <CardDescription className="text-center">
                Enter your name to begin your wellness journey
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="border-primary/30 focus-visible:ring-primary"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowLogin(false)}
                  className="w-1/2 mr-2"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className="w-1/2 ml-2 bg-gradient-to-r from-primary to-accent"
                >
                  <User className="mr-2 h-4 w-4" />
                  Continue
                </Button>
              </CardFooter>
            </form>
          </Card>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="group border-blue-200 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
                <CardHeader>
                  <div className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-primary group-hover:scale-110 transition-transform" />
                    <CardTitle>AI Companion</CardTitle>
                  </div>
                  <CardDescription>
                    Chat with our AI trained in CBT and mindfulness techniques
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Our 24/7 AI companion helps identify negative thought patterns and suggests personalized coping strategies.</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => setShowLogin(true)} 
                    className="w-full bg-gradient-to-r from-primary to-blue-400 hover:opacity-90 transition-opacity"
                  >
                    Start Chatting
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="group border-teal-200 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-teal-50">
                <CardHeader>
                  <div className="flex items-center">
                    <BarChart className="w-5 h-5 mr-2 text-teal-500 group-hover:scale-110 transition-transform" />
                    <CardTitle>Mood Tracker</CardTitle>
                  </div>
                  <CardDescription>
                    Log and visualize your emotional patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Record your daily mood and thoughts to receive personalized insights and recommendations.</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => setShowLogin(true)} 
                    variant="outline" 
                    className="w-full border-teal-300 text-teal-700 hover:bg-teal-50"
                  >
                    Track Mood
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="group border-purple-200 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-purple-50">
                <CardHeader>
                  <div className="flex items-center">
                    <Wind className="w-5 h-5 mr-2 text-purple-500 group-hover:scale-110 transition-transform" />
                    <CardTitle>Breathing Exercises</CardTitle>
                  </div>
                  <CardDescription>
                    Reduce stress with guided breathing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Follow our guided breathing exercises to calm your mind and reduce anxiety in moments of stress.</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => setShowLogin(true)} 
                    variant="outline" 
                    className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    Start Breathing
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="group border-orange-200 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-orange-50">
                <CardHeader>
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-orange-500 group-hover:scale-110 transition-transform" />
                    <CardTitle>Your Profile</CardTitle>
                  </div>
                  <CardDescription>
                    Personalize your MindHaven experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Set up your profile to track your progress, achievements, and customize your mental wellness journey.</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => setShowLogin(true)} 
                    variant="outline" 
                    className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
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
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity px-8 py-6 text-lg"
              >
                Get Started
              </Button>
            </div>
          </>
        )}
        
        <div className="text-center text-sm text-muted-foreground">
          <p>MindHaven is designed to provide support, not to replace professional mental health care.</p>
          <p className="mt-1">If you're experiencing a crisis, please contact emergency services or a mental health professional.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
