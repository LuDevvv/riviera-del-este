"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function CounterSection() {
  const t = useTranslations("home.counter");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    // Event starts June 6th, 2025 at 10:00 AM
    const targetDate = new Date(2025, 5, 6, 10, 0, 0);

    const updateCounter = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ days, hours, minutes });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <p className="text-xl font-light text-white mb-4">{t("startsAbout")}</p>

      <div className="flex justify-center items-center gap-1">
        <TimeUnit value={timeLeft.days} label={t("days")} />
        <Separator />
        <TimeUnit value={timeLeft.hours} label={t("hours")} />
        <Separator />
        <TimeUnit value={timeLeft.minutes} label={t("minutes")} />
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center px-2">
      <div className="w-16 md:w-20 h-12 md:h-16 flex items-center justify-center">
        <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white tabular-nums leading-none tracking-tight">
          {String(value).padStart(2, "0")}
        </div>
      </div>
      <div className="text-xs uppercase tracking-wider text-white/80 mt-1 font-medium">
        {label}
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div className="text-white flex flex-col justify-center h-12 mx-1">
      <div className="w-1.5 h-1.5 bg-white/80 rounded-full mb-1.5"></div>
      <div className="w-1.5 h-1.5 bg-white/80 rounded-full"></div>
    </div>
  );
}
