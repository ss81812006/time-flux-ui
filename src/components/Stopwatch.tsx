import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    return {
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
      milliseconds: String(ms).padStart(2, "0"),
    };
  };

  const { minutes, seconds, milliseconds } = formatTime(time);

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full">
      <Card className="w-full max-w-4xl bg-card/50 backdrop-blur-sm border-border/50 shadow-2xl p-8 md:p-12">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Timer className="w-6 h-6" />
            <span className="text-lg font-medium">Stopwatch</span>
          </div>

          <div className="time-display text-center">
            <div className="flex items-center justify-center gap-2 md:gap-4">
              <span className="text-7xl md:text-9xl font-bold text-primary" style={{ textShadow: "var(--glow-primary)" }}>
                {minutes}
              </span>
              <span className="text-7xl md:text-9xl font-bold text-primary">:</span>
              <span className="text-7xl md:text-9xl font-bold text-primary" style={{ textShadow: "var(--glow-primary)" }}>
                {seconds}
              </span>
              <span className="text-5xl md:text-7xl font-bold text-accent mt-auto mb-2" style={{ textShadow: "var(--glow-accent)" }}>
                .{milliseconds}
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              variant={isRunning ? "secondary" : "default"}
              size="lg"
              className="w-32 transition-all hover:scale-105"
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
        </div>
      </Card>
    </div>
  );
};

export default Stopwatch;
