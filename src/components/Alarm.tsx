import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Alarm = () => {
  const [alarmTime, setAlarmTime] = useState("");
  const [isSet, setIsSet] = useState(false);
  const [alarmTimeout, setAlarmTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleSetAlarm = () => {
    if (!alarmTime) {
      toast.error("Please set a time for the alarm");
      return;
    }

    const [hours, minutes] = alarmTime.split(":");
    const now = new Date();
    const alarm = new Date();
    alarm.setHours(parseInt(hours));
    alarm.setMinutes(parseInt(minutes));
    alarm.setSeconds(0);

    if (alarm < now) {
      alarm.setDate(alarm.getDate() + 1);
    }

    const timeout = setTimeout(() => {
      toast.success("Alarm!");
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
      audio.play();
      setIsSet(false);
    }, alarm.getTime() - now.getTime());

    setAlarmTimeout(timeout);
    setIsSet(true);
    toast.success("Alarm set!");
  };

  const handleCancelAlarm = () => {
    if (alarmTimeout) {
      clearTimeout(alarmTimeout);
    }
    setIsSet(false);
    setAlarmTime("");
    toast.info("Alarm cancelled");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] bg-clock-background rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-clock-display">Set Alarm</h2>
      <div className="flex gap-4 items-center">
        <Input
          type="time"
          value={alarmTime}
          onChange={(e) => setAlarmTime(e.target.value)}
          className="text-xl p-4 w-48"
          disabled={isSet}
        />
        {!isSet ? (
          <Button onClick={handleSetAlarm} className="bg-blue-600 hover:bg-blue-700">
            Set Alarm
          </Button>
        ) : (
          <Button onClick={handleCancelAlarm} variant="destructive">
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};