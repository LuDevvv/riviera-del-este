"use client";

import { useTranslations } from "next-intl";
import FeaturesBar from "../ui/FeaturesBar";
import CounterSection from "../ui/Counter";
import VideoBackground from "../ui/VideoBackground";
import AnimatedSection from "../ui/AnimatedSection";
import { CalendarFold } from "lucide-react";
import { useScrollTo } from "@hooks/useScrollTo";

export default function Hero() {
  const t = useTranslations("home.hero");
  const scrollToSection = useScrollTo();

  const handleGoClick = (
    sectionId: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    scrollToSection(sectionId, e);
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <VideoBackground
        src="https://res.cloudinary.com/dcuapqoii/video/upload/v1748444352/Adjustment_Layer1_1_m0o0rd.mp4"
        poster="https://res.cloudinary.com/dcuapqoii/image/upload/v1748404975/18_iy0cos.png"
        title={t("headline")}
      />

      {/* Contenido */}
      <div className="container mx-auto px-4 z-10 max-w-[1300px] pt-16 md:pt-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-evenly gap-12 md:gap-8">
          <AnimatedSection
            animation="slideUp"
            className="text-white md:max-w-lg"
          >
            <h1 className="font-sans text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-3">
              {t("headline")}
            </h1>

            <AnimatedSection animation="slideUp" delay={200}>
              <p className="text-lg sm:text-xl text-white/90 mb-6">
                {t("subheadline")}
              </p>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={300}>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  onClick={(e) => handleGoClick("contact", e)}
                  className="bg-secondary hover:bg-secondary-dark text-white px-5 py-2 rounded font-medium transition flex items-center justify-center gap-1"
                >
                  <CalendarFold className="w-4 h-4" />
                  {t("cta.schedule")}
                </a>
                <a
                  href="#models"
                  onClick={(e) => handleGoClick("models", e)}
                  className="bg-transparent hover:bg-white/10 text-white border border-white px-5 py-2 rounded font-medium transition"
                >
                  {t("cta.explore")}
                </a>
              </div>
            </AnimatedSection>
          </AnimatedSection>

          {/* Contador */}
          <AnimatedSection
            animation="scaleIn"
            delay={400}
            className="md:self-center"
          >
            <CounterSection />
          </AnimatedSection>
        </div>
      </div>

      {/* Features (oculto en móvil) */}
      <div className="absolute bottom-0 left-0 right-0 z-10 hidden md:block">
        <AnimatedSection animation="slideUp" delay={400}>
          <FeaturesBar />
        </AnimatedSection>
      </div>
    </section>
  );
}
