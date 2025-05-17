"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function CounterSection() {
  const t = useTranslations("home.counter");
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 58,
    seconds: 7,
  });

  useEffect(() => {
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
    <div className="text-center">
      <p className="text-xl font-light text-white mb-3">{t("startsAbout")}</p>

      <div className="flex justify-center items-center">
        <TimeUnit value={timeLeft.hours} label={t("hours")} />
        <Separator />
        <TimeUnit value={timeLeft.minutes} label={t("minutes")} />
        <Separator />
        <TimeUnit value={timeLeft.seconds} label={t("seconds")} />
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center px-2">
      <motion.div
        key={value}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-5xl md:text-6xl font-medium text-white leading-none"
      >
        {String(value).padStart(2, "0")}
      </motion.div>
      <div className="text-xs uppercase tracking-wider text-white/80 mt-1">
        {label}
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div className="text-white flex flex-col justify-center h-14 mx-2">
      <div className="w-1.5 h-1.5 bg-white/80 rounded-full mb-1.5"></div>
      <div className="w-1.5 h-1.5 bg-white/80 rounded-full"></div>
    </div>
  );
}
