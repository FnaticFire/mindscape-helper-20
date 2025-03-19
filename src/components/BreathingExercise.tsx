
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
  
  // Map phases to colors for visual cues
  const getPhaseColor = () => {
    switch (breathingPhase) {
      case 'inhale': return { 
        bg: 'from-blue-400 to-blue-500',
        text: 'text-blue-50',
        ring: 'ring-blue-300'
      };
      case 'hold': return { 
        bg: 'from-green-400 to-green-500', 
        text: 'text-green-50',
        ring: 'ring-green-300'
      };
      case 'exhale': return { 
        bg: 'from-teal-400 to-teal-500',
        text: 'text-teal-50',
        ring: 'ring-teal-300'
      };
      case 'rest': return { 
        bg: 'from-purple-400 to-purple-500',
        text: 'text-purple-50',
        ring: 'ring-purple-300'
      };
      default: return { 
        bg: 'from-blue-400 to-blue-500',
        text: 'text-blue-50',
        ring: 'ring-blue-300'
      };
    }
  };
  
  const phaseColor = getPhaseColor();
  
  return (
    <div className="space-y-6 p-4">
      <Card className="border-[hsl(var(--pink-light))] shadow-lg transition-all duration-300">
        <CardHeader className="pb-2 bg-gradient-to-r from-[hsl(var(--pink-light))]/10 to-[hsl(var(--cyan-light))]/10">
          <CardTitle>Mindful Breathing</CardTitle>
          <CardDescription>A simple breathing exercise to help you relax and focus</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-8">
          <div className={`relative flex items-center justify-center h-56 w-56 mb-8`}>
            {/* Main breathing circle */}
            <div 
              className={`absolute rounded-full bg-gradient-to-br ${phaseColor.bg} shadow-xl transition-all duration-500 flex items-center justify-center ${phaseColor.text} font-bold text-2xl z-20`}
              style={{
                width: '160px',
                height: '160px',
                transform: `scale(${breathingPhase === 'inhale' ? 1.2 : breathingPhase === 'exhale' ? 0.9 : 1})`,
                transition: 'transform 3s ease-in-out, background-color 1s ease'
              }}
            >
              <span className="drop-shadow-md">{counter}</span>
            </div>
            
            {/* Pulse rings */}
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className={`absolute rounded-full ${phaseColor.ring} opacity-0`}
                style={{
                  width: `${160 + i * 30}px`,
                  height: `${160 + i * 30}px`,
                  animation: breathingExerciseActive 
                    ? `pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite ${i * 0.5}s` 
                    : 'none',
                  backgroundColor: 'transparent',
                  border: '2px solid',
                  borderColor: breathingPhase === 'inhale' 
                    ? 'rgba(96, 165, 250, 0.7)' 
                    : breathingPhase === 'hold' 
                      ? 'rgba(74, 222, 128, 0.7)' 
                      : breathingPhase === 'exhale' 
                        ? 'rgba(45, 212, 191, 0.7)' 
                        : 'rgba(192, 132, 252, 0.7)',
                  zIndex: 10 - i
                }}
              />
            ))}
            
            {/* Animated wave effect */}
            <div 
              className="absolute rounded-full overflow-hidden bg-white/10"
              style={{
                width: '190px',
                height: '190px',
                opacity: breathingExerciseActive ? 1 : 0,
                transition: 'opacity 1s ease',
                zIndex: 5
              }}
            >
              <div 
                className="absolute top-0 left-0 right-0 h-full w-full"
                style={{
                  background: `radial-gradient(circle at center, transparent 30%, ${
                    breathingPhase === 'inhale' 
                      ? 'rgba(96, 165, 250, 0.3)' 
                      : breathingPhase === 'hold' 
                        ? 'rgba(74, 222, 128, 0.3)' 
                        : breathingPhase === 'exhale' 
                          ? 'rgba(45, 212, 191, 0.3)' 
                          : 'rgba(192, 132, 252, 0.3)'
                  } 70%)`,
                  animation: breathingExerciseActive 
                    ? `${breathingPhase === 'inhale' ? 'breatheIn' : breathingPhase === 'exhale' ? 'breatheOut' : 'none'} 4s ease-in-out infinite` 
                    : 'none'
                }}
              />
            </div>
          </div>
          
          <div className={`mt-2 p-3 rounded-lg font-medium text-center text-lg transition-colors duration-500 ${phaseColor.bg} ${phaseColor.text} shadow-md w-full max-w-md`}>
            {getInstructions()}
          </div>
          
          <style jsx global>{`
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 0; }
              50% { transform: scale(1.05); opacity: 0.2; }
            }
            
            @keyframes breatheIn {
              0%, 100% { transform: scale(0.95); opacity: 0.3; }
              50% { transform: scale(1.05); opacity: 0.6; }
            }
            
            @keyframes breatheOut {
              0%, 100% { transform: scale(1.05); opacity: 0.6; }
              50% { transform: scale(0.95); opacity: 0.3; }
            }
          `}</style>
        </CardContent>
        <CardFooter className="flex justify-center gap-4 bg-gradient-to-r from-[hsl(var(--pink-light))]/10 to-[hsl(var(--cyan-light))]/10">
          <Button 
            onClick={toggleExercise}
            variant={breathingExerciseActive ? "outline" : "default"}
            className={`w-32 transition-all duration-300 ${
              !breathingExerciseActive ? 'bg-gradient-to-r from-[hsl(var(--pink))] to-[hsl(var(--cyan))]' : ''
            }`}
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
            className="border-[hsl(var(--pink-light))]"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="border-[hsl(var(--cyan-light))] shadow-lg transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-[hsl(var(--cyan-light))]/10 to-[hsl(var(--pink-light))]/10">
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
