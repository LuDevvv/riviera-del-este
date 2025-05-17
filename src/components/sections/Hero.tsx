"use client";

import { useTranslations } from "next-intl";
import FeaturesBar from "../ui/FeaturesBar";
import CounterSection from "../ui/Counter";

export default function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
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
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-2 z-10 max-w-[1300px]">
        {/* Flex Container for Side-by-Side Layout */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
          {/* Hero Text */}
          <div className="text-white md:max-w-xl">
            <h1 className="font-sans text-5xl md:text-6xl font-medium leading-tight mb-4">
              {t("headline")} <br />
              {t("subheadline")}
            </h1>
            <p className="text-xl mt-4 text-white/90">{t("address")}</p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#contact"
                className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-sm font-normal transition-colors inline-block"
              >
                {t("cta.schedule")}
              </a>
              <a
                href="#overview"
                className="bg-transparent hover:bg-white/10 text-white border border-white px-6 py-3 rounded-sm font-normal transition-colors inline-block"
              >
                {t("cta.explore")}
              </a>
            </div>
          </div>

          {/* Counter Section - Side by Side */}
          <div className="md:self-center">
            <CounterSection />
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <FeaturesBar />
      </div>
    </section>
  );
}
