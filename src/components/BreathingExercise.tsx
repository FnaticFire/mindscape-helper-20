
import React, { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wind, Play, Pause } from 'lucide-react';

const BreathingExercise: React.FC = () => {
  const { breathingExerciseActive, setBreathingExerciseActive, breathingPhase, setBreathingPhase } = useApp();
  const [seconds, setSeconds] = useState(0);
  const [circleSize, setCircleSize] = useState(100);
  const [completedCycles, setCompletedCycles] = useState(0);
  
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
  }, [breathingExerciseActive, seconds, breathingPhase]);
  
  const toggleExercise = () => {
    if (!breathingExerciseActive) {
      setBreathingPhase('inhale');
      setSeconds(0);
      setCircleSize(100);
    }
    setBreathingExerciseActive(!breathingExerciseActive);
  };
  
  const progressPercent = (seconds / getCurrentPhaseDuration()) * 100;

  const breathingBubbles = Array.from({ length: 8 }).map((_, index) => {
    // Calculate angle to distribute bubbles in a circle
    const angle = (index / 8) * 2 * Math.PI;
    const wobble = Math.sin(Date.now() / 2000 + index) * 10; // Wobble effect

    // Calculate bubble position (with wobble)
    const x = Math.cos(angle) * (circleSize/2 + wobble) + 100;
    const y = Math.sin(angle) * (circleSize/2 + wobble) + 100;
    
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
    <Card className="shadow-lg border-0 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md w-full max-w-md mx-auto overflow-hidden">
      <CardContent className="p-6 flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))] bg-clip-text text-transparent flex items-center gap-2">
          <Wind className="h-6 w-6 text-[hsl(var(--cyan))]" />
          Breathing Exercise
        </h2>
        
        <div className="relative w-64 h-64 mb-8">
          {/* SVG for breathing circles */}
          <svg width="200" height="200" viewBox="0 0 200 200" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
                cx={bubble.x}
                cy={bubble.y}
                r={bubble.size}
                fill={bubble.color}
                opacity={bubble.opacity}
                className="transition-all duration-500 ease-in-out"
              />
            ))}
          </svg>
          
          {/* Text Instruction */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-lg font-medium mb-1">{phaseConfig[breathingPhase].instruction}</p>
            <p className="text-sm text-muted-foreground">
              {seconds.toFixed(1)}/{getCurrentPhaseDuration()}s
            </p>
          </div>
          
          {/* Progress Ring */}
          <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
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
        
        <div className="text-center mb-5">
          <div className="mb-4">
            <p className="text-lg font-medium">{breathingPhase.charAt(0).toUpperCase() + breathingPhase.slice(1)}</p>
            <p className="text-sm text-muted-foreground">Completed Cycles: {completedCycles}</p>
          </div>
          
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
  );
};

export default BreathingExercise;
