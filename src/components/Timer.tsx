import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            toast.success("Timer finished!");
            const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
            audio.play();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    const minutes = parseInt(inputMinutes);
    if (isNaN(minutes) || minutes <= 0) {
      toast.error("Please enter a valid number of minutes");
      return;
    }
    setTimeLeft(minutes * 60);
    setIsRunning(true);
    setInputMinutes("");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] bg-clock-background rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-clock-display">Timer</h2>
      <div className="text-6xl font-mono mb-8 text-clock-display">{formatTime(timeLeft)}</div>
      <div className="flex gap-4">
        {!isRunning ? (
          <>
            <Input
              type="number"
              placeholder="Minutes"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
              className="w-24 text-xl"
            />
            <Button onClick={startTimer} className="bg-blue-600 hover:bg-blue-700">
              Start
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => setIsRunning(false)} variant="outline">
              Pause
            </Button>
            <Button onClick={() => setTimeLeft(0)} variant="destructive">
              Reset
            </Button>
          </>
        )}
      </div>
    </div>
  );
};