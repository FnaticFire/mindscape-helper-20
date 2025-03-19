
import React, { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, RefreshCw } from 'lucide-react';

const BreathingExercise: React.FC = () => {
  const { breathingExerciseActive, setBreathingExerciseActive, breathingPhase, setBreathingPhase } = useApp();
  const [counter, setCounter] = useState(4);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (breathingExerciseActive) {
      interval = setInterval(() => {
        setCounter(prevCounter => {
          if (prevCounter <= 1) {
            // Move to the next phase when counter reaches 0
            setBreathingPhase(prev => {
              if (prev === 'inhale') return 'hold';
              if (prev === 'hold') return 'exhale';
              if (prev === 'exhale') return 'rest';
              return 'inhale';
            });
            
            // Set the duration for each phase
            switch (breathingPhase) {
              case 'inhale': return 7; // Hold for 7 seconds
              case 'hold': return 8; // Exhale for 8 seconds
              case 'exhale': return 4; // Rest for 4 seconds
              case 'rest': return 4; // Inhale for 4 seconds
              default: return 4;
            }
          }
          return prevCounter - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [breathingExerciseActive, breathingPhase, setBreathingPhase]);
  
  const toggleExercise = () => {
    if (!breathingExerciseActive) {
      // Reset to initial state when starting
      setBreathingPhase('inhale');
      setCounter(4);
    }
    setBreathingExerciseActive(!breathingExerciseActive);
  };
  
  const resetExercise = () => {
    setBreathingExerciseActive(false);
    setBreathingPhase('inhale');
    setCounter(4);
  };
  
  const getInstructions = () => {
    switch (breathingPhase) {
      case 'inhale': return 'Breathe in slowly through your nose';
      case 'hold': return 'Hold your breath';
      case 'exhale': return 'Exhale slowly through your mouth';
      case 'rest': return 'Rest before the next breath';
      default: return '';
    }
  };
  
  const getCircleStyles = () => {
    let bgColor, scaleClass;
    
    switch (breathingPhase) {
      case 'inhale':
        bgColor = 'bg-blue-400';
        scaleClass = 'animate-breathe';
        break;
      case 'hold':
        bgColor = 'bg-green-400';
        scaleClass = '';
        break;
      case 'exhale':
        bgColor = 'bg-teal-400';
        scaleClass = 'animate-breathe';
        break;
      case 'rest':
        bgColor = 'bg-blue-200';
        scaleClass = '';
        break;
      default:
        bgColor = 'bg-blue-400';
        scaleClass = '';
    }
    
    return `${bgColor} ${scaleClass} breathing-circle`;
  };
  
  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Mindful Breathing</CardTitle>
          <CardDescription>A simple breathing exercise to help you relax and focus</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className={getCircleStyles()}>
            <div className="text-white font-bold text-2xl z-10">{counter}</div>
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className={`breathing-circle-inner ${
                  breathingPhase === 'inhale' 
                    ? 'bg-blue-400/50' 
                    : breathingPhase === 'hold' 
                      ? 'bg-green-400/50' 
                      : breathingPhase === 'exhale' 
                        ? 'bg-teal-400/50' 
                        : 'bg-blue-200/50'
                }`}
                style={{
                  width: `${150 - i * 30}px`,
                  height: `${150 - i * 30}px`,
                  opacity: 0.8 - i * 0.2,
                  animation: breathingExerciseActive ? `breathe ${4 + i}s ease-in-out infinite` : 'none',
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
          
          <p className="mt-6 text-lg font-medium text-center">{getInstructions()}</p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button 
            onClick={toggleExercise}
            variant={breathingExerciseActive ? "outline" : "default"}
            className="w-32"
          >
            {breathingExerciseActive ? (
              <>
                <Pause className="mr-2 h-4 w-4" /> Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" /> Start
              </>
            )}
          </Button>
          
          <Button 
            onClick={resetExercise}
            variant="outline"
            disabled={!breathingExerciseActive}
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Benefits of Mindful Breathing</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc pl-5">
            <li>Reduces stress and anxiety</li>
            <li>Lowers heart rate and blood pressure</li>
            <li>Improves focus and concentration</li>
            <li>Helps manage emotional responses</li>
            <li>Promotes better sleep quality</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default BreathingExercise;
