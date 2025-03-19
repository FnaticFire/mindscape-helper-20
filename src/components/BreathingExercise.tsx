
import React, { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wind, Play, Pause, RefreshCw, Quote, Sparkles, Cloud, Moon, Sun } from 'lucide-react';

const BreathingExercise: React.FC = () => {
  const { breathingExerciseActive, setBreathingExerciseActive, breathingPhase, setBreathingPhase } = useApp();
  const [seconds, setSeconds] = useState(0);
  const [circleSize, setCircleSize] = useState(100);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'day' | 'evening' | 'night'>('day');
  
  const quotes = [
    "Breathing is the greatest pleasure in life. - Giovanni Papini",
    "Breath is the bridge which connects life to consciousness. - Thich Nhat Hanh",
    "When you own your breath, nobody can steal your peace. - Unknown",
    "Breath is the link between mind and body. - Dan Brulé",
    "The nose is for breathing, the mouth is for eating. - Proverb",
    "Inhale peace, exhale stress. - Unknown",
    "All chronic pain, suffering, and diseases are caused by a lack of oxygen at the cell level. - Dr. Arthur C. Guyton"
  ];
  
  const phaseConfig = {
    inhale: { duration: 4, instruction: "Breathe in slowly..." },
    hold: { duration: 7, instruction: "Hold your breath..." },
    exhale: { duration: 8, instruction: "Exhale slowly..." },
    rest: { duration: 3, instruction: "Rest..." }
  };
  
  const getCurrentPhaseDuration = () => phaseConfig[breathingPhase].duration;
  
  const getPhaseColor = () => {
    switch (breathingPhase) {
      case 'inhale': return 'from-[hsl(var(--cyan-light))] to-[hsl(var(--cyan))]';
      case 'hold': return 'from-[hsl(var(--cyan))] to-[hsl(var(--primary))]';
      case 'exhale': return 'from-[hsl(var(--primary))] to-[hsl(var(--pink))]';
      case 'rest': return 'from-[hsl(var(--pink))] to-[hsl(var(--pink-light))]';
    }
  };
  
  const getCircleSize = () => {
    switch (breathingPhase) {
      case 'inhale': return 100 + (seconds / getCurrentPhaseDuration() * 60);
      case 'hold': return 160;
      case 'exhale': return 160 - (seconds / getCurrentPhaseDuration() * 60);
      case 'rest': return 100;
    }
  };
  
  const getNextPhase = (currentPhase: 'inhale' | 'hold' | 'exhale' | 'rest') => {
    switch (currentPhase) {
      case 'inhale': return 'hold';
      case 'hold': return 'exhale';
      case 'exhale': return 'rest';
      case 'rest': return 'inhale';
    }
  };
  
  // Set time of day based on current hour
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setTimeOfDay('morning');
    } else if (hour >= 12 && hour < 18) {
      setTimeOfDay('day');
    } else if (hour >= 18 && hour < 22) {
      setTimeOfDay('evening');
    } else {
      setTimeOfDay('night');
    }
  }, []);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (breathingExerciseActive) {
      timer = setInterval(() => {
        if (seconds >= getCurrentPhaseDuration()) {
          const nextPhase = getNextPhase(breathingPhase);
          setBreathingPhase(nextPhase);
          setSeconds(0);
          
          if (nextPhase === 'inhale') {
            setCompletedCycles(prev => prev + 1);
            // Change quote after completing a cycle
            setCurrentQuoteIndex(prev => (prev + 1) % quotes.length);
          }
        } else {
          setSeconds(prev => prev + 0.1);
          setCircleSize(getCircleSize());
        }
      }, 100);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [breathingExerciseActive, seconds, breathingPhase, quotes.length]);
  
  const toggleExercise = () => {
    if (!breathingExerciseActive) {
      setBreathingPhase('inhale');
      setSeconds(0);
      setCircleSize(100);
    }
    setBreathingExerciseActive(!breathingExerciseActive);
  };
  
  const resetExercise = () => {
    setBreathingExerciseActive(false);
    setBreathingPhase('inhale');
    setSeconds(0);
    setCircleSize(100);
    setCompletedCycles(0);
  };
  
  const progressPercent = (seconds / getCurrentPhaseDuration()) * 100;

  // Background particles that float around
  const particles = Array.from({ length: 12 }).map((_, index) => {
    const angle = (index / 12) * 2 * Math.PI;
    const distance = 150 + Math.sin(Date.now() / 3000 + index) * 30;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const size = 6 + Math.sin(Date.now() / 2000 + index * 0.5) * 4;
    const opacity = 0.1 + Math.sin(Date.now() / 2500 + index) * 0.05;
    
    return { x, y, size, opacity };
  });

  // Dynamic breathing bubbles
  const breathingBubbles = Array.from({ length: 8 }).map((_, index) => {
    // Calculate angle to distribute bubbles in a circle
    const angle = (index / 8) * 2 * Math.PI;
    const wobble = Math.sin(Date.now() / 2000 + index) * 10; // Wobble effect

    // Calculate bubble position (with wobble)
    const x = Math.cos(angle) * (circleSize/2 + wobble);
    const y = Math.sin(angle) * (circleSize/2 + wobble);
    
    // Size oscillation
    const size = 7 + Math.sin(Date.now() / 1500 + index * 0.5) * 3;
    
    // Opacity based on breathing phase
    let opacity = 0.4;
    if (breathingPhase === 'inhale') opacity = 0.3 + (seconds / getCurrentPhaseDuration() * 0.7);
    if (breathingPhase === 'exhale') opacity = 1 - (seconds / getCurrentPhaseDuration() * 0.7);

    return {
      x,
      y,
      size,
      opacity,
      color: index % 2 === 0 ? 'rgba(124, 58, 237, 0.7)' : 'rgba(14, 165, 233, 0.7)'
    };
  });

  // Get background classes based on time of day
  const getBackgroundClasses = () => {
    switch (timeOfDay) {
      case 'morning':
        return 'from-cyan-100 via-sky-200 to-blue-100 dark:from-gray-900 dark:via-blue-900/40 dark:to-gray-900';
      case 'day':
        return 'from-blue-50 via-cyan-100 to-sky-50 dark:from-gray-900 dark:via-blue-900/30 dark:to-gray-900';
      case 'evening':
        return 'from-orange-50 via-pink-100 to-purple-100 dark:from-gray-900 dark:via-purple-900/30 dark:to-gray-900';
      case 'night':
        return 'from-indigo-100 via-purple-100 to-indigo-50 dark:from-gray-900 dark:via-indigo-950/40 dark:to-gray-900';
    }
  };

  // Time of day icon
  const getTimeIcon = () => {
    switch (timeOfDay) {
      case 'morning':
        return <Sun className="h-6 w-6 text-amber-400" />;
      case 'day':
        return <Sun className="h-6 w-6 text-amber-500" />;
      case 'evening':
        return <Sun className="h-6 w-6 text-orange-400" />;
      case 'night':
        return <Moon className="h-6 w-6 text-indigo-300" />;
    }
  };
  
  return (
    <div className={`flex flex-col gap-6 p-6 rounded-xl bg-gradient-to-b ${getBackgroundClasses()} shadow-inner min-h-[85vh]`}>
      <Card className="shadow-lg border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md w-full max-w-md mx-auto overflow-hidden">
        <CardContent className="p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))] bg-clip-text text-transparent flex items-center gap-2">
            <Wind className="h-6 w-6 text-[hsl(var(--cyan))]" />
            Breathing Exercise
            {getTimeIcon()}
          </h2>
          
          <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
            {/* Background decoration */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent dark:from-white/5 backdrop-blur-sm"></div>
            
            {/* Background decorative particles */}
            <svg width="300" height="300" viewBox="-150 -150 300 300" className="absolute">
              {particles.map((particle, index) => (
                <circle
                  key={`particle-${index}`}
                  cx={particle.x}
                  cy={particle.y}
                  r={particle.size}
                  fill={index % 3 === 0 ? 'rgba(14, 165, 233, 0.3)' : index % 3 === 1 ? 'rgba(139, 92, 246, 0.3)' : 'rgba(236, 72, 153, 0.3)'}
                  opacity={particle.opacity}
                  className="animate-pulse-slow"
                />
              ))}
            </svg>
            
            {/* SVG for breathing circles */}
            <svg width="280" height="280" viewBox="-140 -140 280 280" className="absolute">
              {/* Background circle */}
              <circle 
                cx="0" 
                cy="0" 
                r="100" 
                fill="url(#breathGradient)" 
                opacity="0.2"
              />
              
              {/* Animated breathing circle */}
              <circle 
                cx="0" 
                cy="0" 
                r={circleSize / 2} 
                fill="url(#breathGradient)" 
                opacity="0.6"
                className="transition-all duration-300 ease-in-out"
              />
              
              {/* Gradient definition */}
              <defs>
                <radialGradient id="breathGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" className={`stop-${getPhaseColor().split('-')[1]}`} />
                  <stop offset="100%" className={`stop-${getPhaseColor().split('-')[3]}`} />
                </radialGradient>
              </defs>
              
              {/* Breathing bubbles */}
              {breathingBubbles.map((bubble, index) => (
                <circle
                  key={index}
                  cx={bubble.x}
                  cy={bubble.y}
                  r={bubble.size}
                  fill={bubble.color}
                  opacity={bubble.opacity}
                  className="transition-all duration-500 ease-in-out"
                />
              ))}
              
              {/* Decorative sparkles */}
              {breathingPhase === 'inhale' && (
                <>
                  <circle cx={40} cy={-70} r={2} fill="white" opacity={0.7 + seconds/4} />
                  <circle cx={-60} cy={50} r={2} fill="white" opacity={0.7 + seconds/4} />
                  <circle cx={70} cy={30} r={2} fill="white" opacity={0.7 + seconds/4} />
                </>
              )}
            </svg>
            
            {/* Text Instruction */}
            <div className="absolute text-center z-10">
              <p className="text-lg font-medium mb-1 text-foreground drop-shadow-sm">{phaseConfig[breathingPhase].instruction}</p>
              <p className="text-sm text-muted-foreground">
                {seconds.toFixed(1)}/{getCurrentPhaseDuration()}s
              </p>
            </div>
            
            {/* Progress Ring - Properly centered and aligned */}
            <svg className="absolute w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
              <circle
                cx="132"
                cy="132"
                r="120"
                fill="none"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="6"
                className="dark:stroke-white/10"
              />
              <circle
                cx="132"
                cy="132"
                r="120"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 120 * progressPercent / 100} ${2 * Math.PI * 120 * (1 - progressPercent / 100)}`}
                className="transition-all duration-100 ease-linear"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--pink))" />
                  <stop offset="100%" stopColor="hsl(var(--cyan))" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <div className="text-center mb-5 w-full">
            <div className="mb-4">
              <p className="text-lg font-medium">{breathingPhase.charAt(0).toUpperCase() + breathingPhase.slice(1)}</p>
              <p className="text-sm text-muted-foreground">Completed Cycles: {completedCycles}</p>
            </div>
            
            <div className="flex gap-2 justify-center">
              <Button 
                onClick={toggleExercise} 
                className="bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))] hover:opacity-90 transition-opacity flex items-center gap-2"
                size="lg"
              >
                {breathingExerciseActive ? (
                  <>
                    <Pause className="h-4 w-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" /> Start
                  </>
                )}
              </Button>
              
              <Button 
                onClick={resetExercise} 
                variant="outline"
                className="border-[hsl(var(--cyan-light))] flex items-center gap-2"
                size="lg"
              >
                <RefreshCw className="h-4 w-4" /> Reset
              </Button>
            </div>
          </div>
        </CardContent>

        <style>
          {`
            .stop-cyan-light { stop-color: hsl(185, 100%, 85%); }
            .stop-cyan { stop-color: hsl(187, 100%, 55%); }
            .stop-primary { stop-color: hsl(195, 100%, 45%); }
            .stop-pink { stop-color: hsl(328, 100%, 70%); }
            .stop-pink-light { stop-color: hsl(338, 100%, 92%); }
          `}
        </style>
      </Card>
      
      {/* Quote Card */}
      <Card className="shadow-md border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm w-full max-w-md mx-auto">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Quote className="h-6 w-6 text-[hsl(var(--cyan))] shrink-0 mt-1" />
            <blockquote className="italic text-foreground/90 dark:text-foreground/90">
              {quotes[currentQuoteIndex]}
            </blockquote>
          </div>
        </CardContent>
      </Card>
      
      {/* Decorative Elements */}
      <div className="absolute top-16 right-8 opacity-20 dark:opacity-10">
        <Sparkles className="w-8 h-8 text-amber-500" />
      </div>
      <div className="absolute bottom-8 left-8 opacity-20 dark:opacity-10">
        <Cloud className="w-10 h-10 text-blue-300" />
      </div>
    </div>
  );
};

export default BreathingExercise;

