"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ImageSlider } from "@components/ui/ImageSlider";
import FilterTabs, { FilterOption } from "@components/ui/FilterTabs";
import AnimatedSection from "@components/ui/AnimatedSection";

export default function Gallery() {
  const t = useTranslations("home.gallery");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "exterior" | "interior" | "facilities"
  >("all");

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

  // Filter options for the tabs
  const filterOptions: FilterOption<
    "all" | "exterior" | "interior" | "facilities"
  >[] = [
    { value: "all", label: t("viewAll") },
    { value: "exterior", label: t("exterior") },
    { value: "interior", label: t("interior") },
    { value: "facilities", label: t("facilities") },
  ];

  // Filter items based on active filter
  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-[1300px]">
        {/* Header Section */}
        <AnimatedSection animation="fadeIn" threshold={0.3}>
          <div className="flex justify-center mb-4">
            <span className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-semibold">
              {t("badge")}
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={200} threshold={0.3}>
          <h2 className="text-3xl md:text-4xl font-display text-center font-medium mb-4 text-black">
            {t("title")}
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={400} threshold={0.3}>
          <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </AnimatedSection>

        {/* Filter Tabs */}
        <AnimatedSection
          animation="scaleIn"
          delay={600}
          threshold={0.3}
          className="mb-4"
        >
          <FilterTabs
            options={filterOptions}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            variant="secondary"
          />
        </AnimatedSection>

        {/* Image Slider */}
        <AnimatedSection animation="fadeIn" delay={800} threshold={0.2}>
          <ImageSlider
            items={filteredItems}
            showGradients={false}
            backgroundColor="bg-white"
            autoPlay={true}
          />
        </AnimatedSection>
      </div>
    </section>
  );
}
