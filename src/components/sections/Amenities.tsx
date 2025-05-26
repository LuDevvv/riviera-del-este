"use client";

import React from "react";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import AnimatedSection, { AnimatedList } from "@components/ui/AnimatedSection";

export default function Amenities() {
  const t = useTranslations("home.amenities");

  const leftColumnAmenities = [
    "multiUseCourt",
    "tennisCourt",
    "swimmingPool",
    "bikePath",
    "outdoorGym",
    "indoorGym",
    "linearParks",
  ];

  const rightColumnAmenities = [
    "gardens",
    "kidsArea",
    "gazebo",
    "viewpoints",
    "shops",
    "church",
    "supermarket",
  ];

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4 max-w-[1300px]">
        <div className="flex flex-col md:flex-row items-start justify-between">
          {/* Título y descripción */}
          <div className="flex flex-col items-start md:pr-4">
            <AnimatedSection animation="fadeIn" threshold={0.3}>
              <div className="bg-[#2c5651]/80 px-4 py-1.5 rounded-md mb-3 text-sm">
                {t("badge")}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={200} threshold={0.3}>
              <h2 className="text-4xl md:text-5xl font-light mb-5">
                {t("primeLocation")}
              </h2>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={400} threshold={0.3}>
              <p className="text-white/90 mb-6 md:mb-0 max-w-md">
                {t("locationDescription")}
              </p>
            </AnimatedSection>
          </div>

          {/* Lista de amenidades con animación staggered */}
          <div className="flex flex-row">
            {/* Columna izquierda */}
            <div className="mr-10">
              <AnimatedList
                animation="slideIn"
                staggerDelay={80}
                threshold={0.2}
              >
                {leftColumnAmenities.map((item, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Check className="text-amber-600 mr-2 flex-shrink-0 h-5 w-5" />
                    <span className="text-white/90 text-sm md:text-base">
                      {t(`items.${item}`)}
                    </span>
                  </div>
                ))}
              </AnimatedList>
            </div>

            {/* Columna derecha */}
            <div>
              <AnimatedList
                animation="slideIn"
                staggerDelay={80}
                threshold={0.2}
              >
                {rightColumnAmenities.map((item, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Check className="text-amber-600 mr-2 flex-shrink-0 h-5 w-5" />
                    <span className="text-white/90 text-sm md:text-base">
                      {t(`items.${item}`)}
                    </span>
                  </div>
                ))}
              </AnimatedList>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
