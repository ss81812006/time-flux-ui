import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Pause, RotateCcw, AlarmClock } from "lucide-react";
import { toast } from "sonner";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [inputMinutes, setInputMinutes] = useState("");
  const [inputSeconds, setInputSeconds] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1000) {
            setIsRunning(false);
            toast.success("Timer completed!", {
              description: "Time's up!",
            });
            playAlarm();
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, time]);

  const playAlarm = () => {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return {
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  };

  const { minutes, seconds } = formatTime(time);

  const handleSetTimer = () => {
    const mins = parseInt(inputMinutes) || 0;
    const secs = parseInt(inputSeconds) || 0;
    const totalTime = (mins * 60 + secs) * 1000;

    if (totalTime > 0) {
      setTime(totalTime);
      setIsSetup(true);
      setIsRunning(false);
    } else {
      toast.error("Please enter a valid time");
    }
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setIsSetup(false);
    setInputMinutes("");
    setInputSeconds("");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full">
      <Card className="w-full max-w-4xl bg-card/50 backdrop-blur-sm border-border/50 shadow-2xl p-8 md:p-12">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3 text-muted-foreground">
            <AlarmClock className="w-6 h-6" />
            <span className="text-lg font-medium">Countdown Timer</span>
          </div>

          {!isSetup ? (
            <div className="flex flex-col items-center gap-6 w-full">
              <div className="flex gap-4 items-center">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-muted-foreground text-center">Minutes</label>
                  <Input
                    type="number"
                    min="0"
                    max="99"
                    placeholder="00"
                    value={inputMinutes}
                    onChange={(e) => setInputMinutes(e.target.value)}
                    className="w-24 text-center text-2xl h-16 bg-secondary/50"
                  />
                </div>
                <span className="text-4xl font-bold text-muted-foreground mt-8">:</span>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-muted-foreground text-center">Seconds</label>
                  <Input
                    type="number"
                    min="0"
                    max="59"
                    placeholder="00"
                    value={inputSeconds}
                    onChange={(e) => setInputSeconds(e.target.value)}
                    className="w-24 text-center text-2xl h-16 bg-secondary/50"
                  />
                </div>
              </div>
              <Button onClick={handleSetTimer} size="lg" className="w-full transition-all hover:scale-105">
                Set Timer
              </Button>
            </div>
          ) : (
            <>
              <div className="time-display text-center">
                <div className="flex items-center justify-center gap-2 md:gap-4">
                  <span className="text-7xl md:text-9xl font-bold text-primary" style={{ textShadow: "var(--glow-primary)" }}>
                    {minutes}
                  </span>
                  <span className="text-7xl md:text-9xl font-bold text-primary">:</span>
                  <span className="text-7xl md:text-9xl font-bold text-accent" style={{ textShadow: "var(--glow-accent)" }}>
                    {seconds}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setIsRunning(!isRunning)}
                  variant={isRunning ? "secondary" : "default"}
                  size="lg"
                  className="w-32 transition-all hover:scale-105"
                  disabled={time === 0}
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Start
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                  className="w-32 transition-all hover:scale-105"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Timer;
