import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const DEFAULT_TIMEZONES = [
  { value: "UTC", label: "UTC" },
  { value: "America/New_York", label: "New York" },
  { value: "America/Chicago", label: "Chicago" },
  { value: "America/Los_Angeles", label: "Los Angeles" },
  { value: "Europe/London", label: "London" },
  { value: "Europe/Paris", label: "Paris" },
  { value: "Asia/Tokyo", label: "Tokyo" },
  { value: "Asia/Kolkata", label: "Mumbai" },
  { value: "Australia/Sydney", label: "Sydney" },
];

// List of all IANA timezone identifiers
const ALL_TIMEZONES = Intl.supportedValuesOf('timeZone').map(tz => ({
  value: tz,
  label: tz.split("/").pop()?.replace("_", " ") || tz,
}));

export const TimeZone = () => {
  const [selectedZone, setSelectedZone] = useState(DEFAULT_TIMEZONES[0].value);
  const [time, setTime] = useState(new Date());
  const [customTimezone, setCustomTimezone] = useState("");
  const [timezones, setTimezones] = useState(DEFAULT_TIMEZONES);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeForZone = (date: Date, timezone: string) => {
    try {
      return date.toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch (error) {
      return "Invalid Timezone";
    }
  };

  const addCustomTimezone = (timezoneToAdd: string = customTimezone) => {
    if (!timezoneToAdd) return;

    try {
      // Test if the timezone is valid
      new Date().toLocaleString("en-US", { timeZone: timezoneToAdd });
      
      // Check if timezone already exists
      if (timezones.some(tz => tz.value === timezoneToAdd)) {
        toast({
          title: "Timezone already exists",
          description: "This timezone is already in the list.",
          variant: "destructive",
        });
        return;
      }

      // Add new timezone
      const newTimezone = {
        value: timezoneToAdd,
        label: timezoneToAdd.split("/").pop()?.replace("_", " ") || timezoneToAdd,
      };
      
      setTimezones([...timezones, newTimezone]);
      setCustomTimezone("");
      setOpen(false);
      toast({
        title: "Timezone added",
        description: "New timezone has been added to the list.",
      });
    } catch (error) {
      toast({
        title: "Invalid timezone",
        description: "Please enter a valid IANA timezone identifier (e.g., 'America/Toronto')",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] bg-clock-background rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-clock-display">World Clock</h2>
      
      <div className="flex gap-2 mb-4 w-full max-w-md">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Input
              placeholder="Add timezone (e.g., America/Toronto)"
              value={customTimezone}
              onChange={(e) => setCustomTimezone(e.target.value)}
              className="flex-1"
            />
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder="Search timezone..." />
              <CommandEmpty>No timezone found.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-y-auto">
                {ALL_TIMEZONES
                  .filter(tz => 
                    tz.value.toLowerCase().includes(customTimezone.toLowerCase()) ||
                    tz.label.toLowerCase().includes(customTimezone.toLowerCase())
                  )
                  .map((tz) => (
                    <CommandItem
                      key={tz.value}
                      onSelect={() => {
                        setCustomTimezone(tz.value);
                        addCustomTimezone(tz.value);
                      }}
                    >
                      {tz.label} ({tz.value})
                    </CommandItem>
                  ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Button onClick={() => addCustomTimezone()}>Add</Button>
      </div>

      <Select value={selectedZone} onValueChange={setSelectedZone}>
        <SelectTrigger className="w-48 mb-4">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {timezones.map((zone) => (
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