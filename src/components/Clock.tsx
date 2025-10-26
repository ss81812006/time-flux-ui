import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock as ClockIcon } from "lucide-react";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    let period = "";

    if (!is24Hour) {
      period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
    }

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return { hours: formattedHours, minutes: formattedMinutes, seconds: formattedSeconds, period };
  };

  const { hours, minutes, seconds, period } = formatTime(time);
  const date = time.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full">
      <Card className="w-full max-w-4xl bg-card/50 backdrop-blur-sm border-border/50 shadow-2xl p-8 md:p-12">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 text-muted-foreground">
            <ClockIcon className="w-6 h-6" />
            <span className="text-lg font-medium">{date}</span>
          </div>

          <div className="time-display text-center">
            <div className="flex items-center justify-center gap-2 md:gap-4">
              <span className="text-7xl md:text-9xl font-bold text-primary" style={{ textShadow: "var(--glow-primary)" }}>
                {hours}
              </span>
              <span className="text-7xl md:text-9xl font-bold text-primary animate-pulse">:</span>
              <span className="text-7xl md:text-9xl font-bold text-primary" style={{ textShadow: "var(--glow-primary)" }}>
                {minutes}
              </span>
              <span className="text-7xl md:text-9xl font-bold text-primary animate-pulse">:</span>
              <span className="text-7xl md:text-9xl font-bold text-accent" style={{ textShadow: "var(--glow-accent)" }}>
                {seconds}
              </span>
              {!is24Hour && (
                <span className="text-3xl md:text-5xl font-bold text-muted-foreground ml-2 md:ml-4">{period}</span>
              )}
            </div>
          </div>

          <Button
            onClick={() => setIs24Hour(!is24Hour)}
            variant="secondary"
            size="lg"
            className="mt-4 transition-all hover:scale-105"
          >
            {is24Hour ? "12-Hour Format" : "24-Hour Format"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Clock;
