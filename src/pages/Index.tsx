
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { Brain, MessageSquare, BarChart, Wind, User, Heart } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useApp();
  
  // Redirect to chat if user already exists
  useEffect(() => {
    if (user) {
      navigate('/chat');
    }
  }, [user, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-blue-50">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full text-primary-foreground">
              <Heart className="w-6 h-6" />
            </div>
            <div className="flex items-center ml-2">
              <h1 className="text-4xl font-bold text-primary">Mind<span className="text-secondary">Haven</span></h1>
              <Brain className="w-6 h-6 ml-1 text-accent" />
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your AI-powered mental health companion for stress, anxiety, and emotional wellbeing
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-primary" />
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
              <Button onClick={() => navigate('/chat')} className="w-full">Start Chatting</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <BarChart className="w-5 h-5 mr-2 text-secondary" />
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
              <Button onClick={() => navigate('/mood')} variant="outline" className="w-full">Track Mood</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Wind className="w-5 h-5 mr-2 text-teal-500" />
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
              <Button onClick={() => navigate('/breathe')} variant="outline" className="w-full">Start Breathing</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 text-accent" />
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
              <Button onClick={() => navigate('/profile')} variant="outline" className="w-full">Set Up Profile</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>MindHaven is designed to provide support, not to replace professional mental health care.</p>
          <p className="mt-1">If you're experiencing a crisis, please contact emergency services or a mental health professional.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
