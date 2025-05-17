"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CounterProps {
  endValue: number;
  label: string;
}

function Counter({ endValue, label }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (count < endValue) {
      interval = setInterval(() => {
        setCount((prevCount) => {
          const nextCount = prevCount + 1;
          if (nextCount >= endValue) {
            clearInterval(interval);
            return endValue;
          }
          return nextCount;
        });
      }, 50);
    }

    return () => clearInterval(interval);
  }, [count, endValue]);

  return (
    <div className="text-center flex flex-col items-center">
      <div className="text-6xl md:text-7xl font-bold text-white leading-none">
        {String(count).padStart(2, "0")}
      </div>
      <div className="text-xs uppercase tracking-widest text-white/70 mt-1">
        {label}
      </div>
    </div>
  );
}

export default function CounterSection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set a future date - 24 hours from now
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 24);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <h2 className="text-center text-2xl md:text-3xl font-medium text-white mb-4">
        Everything starts about
      </h2>

      <div className="flex justify-center items-center gap-4 md:gap-6">
        <Counter endValue={timeLeft.hours} label="HOURS" />
        <div className="text-5xl md:text-6xl text-white font-thin mb-5">:</div>
        <Counter endValue={timeLeft.minutes} label="MINUTES" />
        <div className="text-5xl md:text-6xl text-white font-thin mb-5">:</div>
        <Counter endValue={timeLeft.seconds} label="SECONDS" />
      </div>
    </motion.div>
  );
}
