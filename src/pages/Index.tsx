import { useState } from "react";
import { Clock } from "@/components/Clock";
import { Alarm } from "@/components/Alarm";
import { Timer } from "@/components/Timer";
import { Stopwatch } from "@/components/Stopwatch";
import { TimeZone } from "@/components/TimeZone";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-clock-display">World Clock</h1>
        <Tabs defaultValue="clock" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="clock">Clock</TabsTrigger>
            <TabsTrigger value="alarm">Alarm</TabsTrigger>
            <TabsTrigger value="timer">Timer</TabsTrigger>
            <TabsTrigger value="stopwatch">Stopwatch</TabsTrigger>
            <TabsTrigger value="timezone">Timezone</TabsTrigger>
          </TabsList>
          <TabsContent value="clock">
            <Clock />
          </TabsContent>
          <TabsContent value="alarm">
            <Alarm />
          </TabsContent>
          <TabsContent value="timer">
            <Timer />
          </TabsContent>
          <TabsContent value="stopwatch">
            <Stopwatch />
          </TabsContent>
          <TabsContent value="timezone">
            <TimeZone />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;