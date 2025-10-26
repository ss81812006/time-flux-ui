import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Clock from "@/components/Clock";
import Stopwatch from "@/components/Stopwatch";
import Timer from "@/components/Timer";
import { Clock as ClockIcon, Timer as TimerIcon, CircleDot } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold text-primary" style={{ textShadow: "var(--glow-primary)" }}>
            Digital Clock & Timer
          </h1>
          <p className="text-lg text-muted-foreground">
            Track time with style
          </p>
        </div>

        <Tabs defaultValue="clock" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/50 backdrop-blur-sm p-1 h-14">
            <TabsTrigger 
              value="clock" 
              className="flex items-center gap-2 text-base data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-all"
            >
              <ClockIcon className="w-5 h-5" />
              Clock
            </TabsTrigger>
            <TabsTrigger 
              value="stopwatch"
              className="flex items-center gap-2 text-base data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-all"
            >
              <CircleDot className="w-5 h-5" />
              Stopwatch
            </TabsTrigger>
            <TabsTrigger 
              value="timer"
              className="flex items-center gap-2 text-base data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-all"
            >
              <TimerIcon className="w-5 h-5" />
              Timer
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="clock" className="mt-0">
              <Clock />
            </TabsContent>

            <TabsContent value="stopwatch" className="mt-0">
              <Stopwatch />
            </TabsContent>

            <TabsContent value="timer" className="mt-0">
              <Timer />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
