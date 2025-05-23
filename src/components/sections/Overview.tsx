"use client";

import React from "react";
import { useTranslations } from "next-intl";
import ImageSlider from "@components/ui/ImageSlider";

export default function Overview() {
  const t = useTranslations("home.overview");

  const overviewItems = [
    {
      id: "living-room",
      image:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      title: "Modern Living, Thoughtfully Designed",
    },
    {
      id: "bedroom-space",
      image:
        "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg",
      title: "Comfortable & Spacious Bedrooms",
    },
    {
      id: "kitchen-area",
      image:
        "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
      title: "Fully Equipped Modern Kitchen",
    },
    {
      id: "outdoor-space",
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      title: "Beautiful Outdoor Spaces",
    },
  ];

  return (
    <section id="overview" className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 max-w-[1300px]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block bg-primary-light bg-opacity-20 px-4 py-1 rounded text-sm font-medium mb-6">
              {t("badge")}
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
              {t("title")}
            </h2>

            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              {t("description")}
            </p>

            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-secondary rounded-full mr-4"></div>
                <span className="text-white/90">{t("feature1")}</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-secondary rounded-full mr-4"></div>
                <span className="text-white/90">{t("feature2")}</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-secondary rounded-full mr-4"></div>
                <span className="text-white/90">{t("feature3")}</span>
              </div>
            </div>
          </div>

          {/* Right Slider */}
          <ImageSlider
            items={overviewItems}
            autoPlay={true}
            className="rounded-lg overflow-hidden max-w-4xl mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
