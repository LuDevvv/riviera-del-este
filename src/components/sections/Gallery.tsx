"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ImageSlider } from "@components/ui/ImageSlider";
// AGREGAR SCROOLL AL TAB PARA QUE NO SE ROMPA
export default function Gallery() {
  const t = useTranslations("home.gallery");
  const [activeFilter, setActiveFilter] = useState("all");

  const galleryItems = [
    {
      id: "kitchen",
      image:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      title: "Modern Kitchen",
      category: "interior",
    },
    {
      id: "bedroom",
      image:
        "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg",
      title: "Master Bedroom",
      category: "interior",
    },
    {
      id: "bathroom",
      image:
        "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
      title: "Luxury Bathroom",
      category: "interior",
    },
    {
      id: "exterior1",
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      title: "Building Exterior",
      category: "exterior",
    },
    {
      id: "exterior2",
      image:
        "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      title: "Garden View",
      category: "exterior",
    },
    {
      id: "pool",
      image:
        "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg",
      title: "Swimming Pool",
      category: "facilities",
    },
    {
      id: "gym",
      image:
        "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg",
      title: "Fitness Center",
      category: "facilities",
    },
  ];

  // Filter items based on active filter
  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-[1300px]">
        <div className="flex justify-center mb-4">
          <span className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-semibold">
            {t("badge")}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-display text-center font-medium mb-4 text-black">
          {t("title")}
        </h2>

        <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
          {t("description")}
        </p>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg p-1 gap-1 shadow-md">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeFilter === "all"
                  ? "bg-secondary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {t("viewAll")}
            </button>
            <button
              onClick={() => setActiveFilter("exterior")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeFilter === "exterior"
                  ? "bg-secondary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {t("exterior")}
            </button>
            <button
              onClick={() => setActiveFilter("interior")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeFilter === "interior"
                  ? "bg-secondary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {t("interior")}
            </button>
            <button
              onClick={() => setActiveFilter("facilities")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeFilter === "facilities"
                  ? "bg-secondary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {t("facilities")}
            </button>
          </div>
        </div>

        {/* Image Slider */}
        <ImageSlider
          items={filteredItems}
          showGradients={false}
          backgroundColor="bg-white"
          autoPlay={true}
        />
      </div>
    </section>
  );
}
