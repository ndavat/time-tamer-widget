import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TIMEZONES = [
  { value: "America/New_York", label: "New York" },
  { value: "America/Los_Angeles", label: "Los Angeles" },
  { value: "Europe/London", label: "London" },
  { value: "Europe/Paris", label: "Paris" },
  { value: "Asia/Tokyo", label: "Tokyo" },
  { value: "Australia/Sydney", label: "Sydney" },
];

export const TimeZone = () => {
  const [selectedZone, setSelectedZone] = useState(TIMEZONES[0].value);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeForZone = (date: Date, timezone: string) => {
    return date.toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] bg-clock-background rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-clock-display">World Clock</h2>
      <Select value={selectedZone} onValueChange={setSelectedZone}>
        <SelectTrigger className="w-48 mb-4">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {TIMEZONES.map((zone) => (
            <SelectItem key={zone.value} value={zone.value}>
              {zone.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="text-5xl font-mono text-clock-display">
        {formatTimeForZone(time, selectedZone)}
      </div>
      <div className="text-lg text-gray-600 mt-4">
        {new Date().toLocaleDateString("en-US", {
          timeZone: selectedZone,
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  );
};