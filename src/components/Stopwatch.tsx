import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] bg-clock-background rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-clock-display">Stopwatch</h2>
      <div className="text-6xl font-mono mb-8 text-clock-display">{formatTime(time)}</div>
      <div className="flex gap-4 mb-8">
        <Button
          onClick={() => setIsRunning(!isRunning)}
          className={isRunning ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}
        >
          {isRunning ? "Stop" : "Start"}
        </Button>
        <Button onClick={handleLap} disabled={!isRunning} variant="outline">
          Lap
        </Button>
        <Button onClick={handleReset} variant="destructive">
          Reset
        </Button>
      </div>
      {laps.length > 0 && (
        <div className="w-full max-h-40 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-2">Laps</h3>
          {laps.map((lap, index) => (
            <div key={index} className="text-lg mb-1">
              Lap {index + 1}: {formatTime(lap)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};