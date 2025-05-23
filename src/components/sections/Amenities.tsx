"use client";

import React from "react";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Amenities() {
  const t = useTranslations("home.amenities");

  // Left column amenities from the brochure, structured for two columns
  const leftColumnAmenities = [
    "multiUseCourt",
    "tennisCourt",
    "paddleCourt",
    "swimmingPool",
    "bikePath",
    "outdoorGym",
    "indoorGym",
  ];

  // Right column amenities from the brochure
  const rightColumnAmenities = [
    "linearParks",
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
          <div className="flex flex-col items-start md:pr-4">
            <div className="bg-[#2c5651]/80 px-4 py-1.5 rounded-md mb-3 text-sm">
              {t("badge")}
            </div>

            <h2 className="text-4xl md:text-5xl font-light mb-5">
              {t("primeLocation")}
            </h2>

            <p className="text-white/90 mb-6 md:mb-0 max-w-md">
              {t("locationDescription")}
            </p>
          </div>

          <div className="flex flex-row">
            {/* Left column */}
            <div className="mr-10">
              {leftColumnAmenities.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Check className="text-amber-600 mr-2 flex-shrink-0 h-5 w-5" />
                  <span className="text-white/90 text-sm md:text-base">
                    {t(`items.${item}`)}
                  </span>
                </div>
              ))}
            </div>

            {/* Right column */}
            <div>
              {rightColumnAmenities.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Check className="text-amber-600 mr-2 flex-shrink-0 h-5 w-5" />
                  <span className="text-white/90 text-sm md:text-base">
                    {t(`items.${item}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
