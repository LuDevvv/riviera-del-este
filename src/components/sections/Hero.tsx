"use client";

import { useTranslations } from "next-intl";
import FeaturesBar from "../ui/FeaturesBar";
import CounterSection from "../ui/Counter";
import VideoBackground from "../ui/VideoBackground";
import { CalendarFold } from "lucide-react";

export default function Hero() {
  const t = useTranslations("home.hero");
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <VideoBackground
        src="https://res.cloudinary.com/dcuapqoii/video/upload/v1748036698/Adjustment_Layer1_1_inqowt.mp4"
        poster="/images/hero-poster.jpg"
        title={t("headline")}
      />

      {/* Contenido */}
      <div className="container mx-auto px-4 z-10 max-w-[1300px] pt-16 md:pt-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12 md:gap-8">
          <div className="text-white md:max-w-lg">
            <h1 className="font-sans text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-3">
              {t("headline")}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-6">
              {t("subheadline")}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="bg-secondary hover:bg-secondary-dark text-white px-5 py-2 rounded font-medium transition flex items-center justify-center
gap-1"
              >
                <CalendarFold className="w-4 h-4" />

                {t("cta.schedule")}
              </a>
              <a
                href="#overview"
                className="bg-transparent hover:bg-white/10 text-white border border-white px-5 py-2 rounded font-medium transition"
              >
                {t("cta.explore")}
              </a>
            </div>
          </div>

          {/* Contador */}
          <div className="md:self-center">
            <CounterSection />
          </div>
        </div>
      </div>

      {/* Features (oculto en móvil) */}
      <div className="absolute bottom-0 left-0 right-0 z-10 hidden md:block">
        <FeaturesBar />
      </div>
    </section>
  );
}
