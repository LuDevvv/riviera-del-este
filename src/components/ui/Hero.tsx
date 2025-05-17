"use client";

import { useTranslations } from "next-intl";
import FeaturesBar from "./FeaturesBar";
import CounterSection from "./CounterSection";

export default function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section
      id="home"
      className="relative h-screen flex items-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
        >
          <source
            src="https://videos.pexels.com/video-files/8783214/8783214-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
          {/* Fallback for browsers that don't support video */}
          <div className="absolute inset-0 bg-black/60" />
        </video>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-[1300px] mx-auto flex flex-col space-y-16 md:space-y-20">
          {/* Hero Text */}
          <div className="text-white">
            <h1 className="font-sans text-5xl md:text-6xl font-medium leading-tight mb-4">
              {t("headline")} <br />
              {t("subheadline")}
            </h1>
            <p className="text-xl mt-4 text-white/90">{t("address")}</p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#contact"
                className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-md font-normal transition-colors inline-block"
              >
                {t("cta.schedule")}
              </a>
              <a
                href="#overview"
                className="bg-transparent hover:bg-white/10 text-white border border-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
              >
                {t("cta.explore")}
              </a>
            </div>
          </div>

          {/* Counter Section */}
          <CounterSection />
        </div>
      </div>

      {/* Features Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <FeaturesBar />
      </div>
    </section>
  );
}
