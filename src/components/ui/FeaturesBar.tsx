"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { BedDouble, Trees, Shirt, Waves } from "lucide-react";

export default function FeaturesBar() {
  const t = useTranslations("home.features");

  const features = [
    {
      id: "spaciousRooms",
      label: t("spaciousRooms"),
      icon: BedDouble,
    },
    {
      id: "privateGarden",
      label: t("privateGarden"),
      icon: Trees,
    },
    {
      id: "walkInClosets",
      label: t("walkInClosets"),
      icon: Shirt,
    },
    {
      id: "swimmingPool",
      label: t("swimmingPool"),
      icon: Waves,
    },
  ];

  return (
    <div className="w-full py-8">
      <div className="container mx-auto max-w-[1300px]">
        <div className="grid grid-cols-4 gap-4">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="flex justify-center items-center text-center gap-2"
              >
                <IconComponent className="w-4 h-4 text-white" />
                <p className="text-white font-medium text-sm md:text-base">
                  {feature.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
