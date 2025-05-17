"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function FeaturesBar() {
  const t = useTranslations("home.features");

  const features = [
    {
      id: "spaciousRooms",
      label: t("spaciousRooms"),
    },
    {
      id: "privateGarden",
      label: t("privateGarden"),
    },
    {
      id: "walkInClosets",
      label: t("walkInClosets"),
    },
    {
      id: "swimmingPool",
      label: t("swimmingPool"),
    },
  ];

  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4 max-w-[1300px]">
        <div className="grid grid-cols-4 gap-4">
          {features.map((feature) => (
            <div key={feature.id} className="text-center">
              <p className="text-white font-medium text-sm md:text-base">
                {feature.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
