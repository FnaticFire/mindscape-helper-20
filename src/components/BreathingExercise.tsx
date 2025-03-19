
import React, { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wind, Play, Pause, RefreshCw, Quote } from 'lucide-react';

const BreathingExercise: React.FC = () => {
  const { breathingExerciseActive, setBreathingExerciseActive, breathingPhase, setBreathingPhase } = useApp();
  const [seconds, setSeconds] = useState(0);
  const [circleSize, setCircleSize] = useState(100);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  
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
  
  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-lg border-0 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md w-full max-w-md mx-auto overflow-hidden">
        <CardContent className="p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))] bg-clip-text text-transparent flex items-center gap-2">
            <Wind className="h-6 w-6 text-[hsl(var(--cyan))]" />
            Breathing Exercise
          </h2>
          
          <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
            {/* SVG for breathing circles */}
            <svg width="200" height="200" viewBox="0 0 200 200" className="absolute">
              {/* Background circle */}
              <circle 
                cx="100" 
                cy="100" 
                r="100" 
                fill="url(#breathGradient)" 
                opacity="0.2"
              />
              
              {/* Animated breathing circle */}
              <circle 
                cx="100" 
                cy="100" 
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
                  cx={100 + bubble.x}
                  cy={100 + bubble.y}
                  r={bubble.size}
                  fill={bubble.color}
                  opacity={bubble.opacity}
                  className="transition-all duration-500 ease-in-out"
                />
              ))}
            </svg>
            
            {/* Text Instruction */}
            <div className="absolute text-center">
              <p className="text-lg font-medium mb-1">{phaseConfig[breathingPhase].instruction}</p>
              <p className="text-sm text-muted-foreground">
                {seconds.toFixed(1)}/{getCurrentPhaseDuration()}s
              </p>
            </div>
            
            {/* Progress Ring */}
            <svg className="absolute w-full h-full -rotate-90">
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="4"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 90 * progressPercent / 100} ${2 * Math.PI * 90 * (1 - progressPercent / 100)}`}
                strokeLinecap="round"
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
      <Card className="shadow-md border-0 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm w-full max-w-md mx-auto">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Quote className="h-6 w-6 text-[hsl(var(--cyan))] shrink-0 mt-1" />
            <blockquote className="italic text-foreground/80 dark:text-foreground/90">
              {quotes[currentQuoteIndex]}
            </blockquote>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BreathingExercise;
