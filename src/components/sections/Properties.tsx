"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import PropertyCard from "@components/ui/PropertyCard";
import { AnimatePresence, motion } from "framer-motion";

export default function Properties() {
  const t = useTranslations("home.properties");
  const [activeTab, setActiveTab] = useState<"all" | "residences" | "premium">(
    "all"
  );

  // Property data based on the brochure
  const properties = [
    {
      id: "residences-2bed",
      image:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      bedrooms: 2,
      area: 75,
      hasPatio: true,
      type: "residences" as const,
    },
    {
      id: "residences-3bed",
      image:
        "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg",
      bedrooms: 3,
      area: 90,
      hasPatio: true,
      type: "residences" as const,
    },
    {
      id: "premium-1bed",
      image:
        "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
      bedrooms: 1,
      area: 60,
      hasPatio: true,
      type: "premium" as const,
    },
    {
      id: "premium-2bed",
      image:
        "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      bedrooms: 2,
      area: 75,
      hasPatio: true,
      type: "premium" as const,
    },
    {
      id: "premium-3bed",
      image:
        "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg",
      bedrooms: 3,
      area: 90,
      hasPatio: true,
      type: "premium" as const,
    },
  ];

  // Filter properties based on active tab
  const filteredProperties =
    activeTab === "all"
      ? properties
      : properties.filter((property) => property.type === activeTab);

  return (
    <section id="models" className="py-16 bg-white">
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
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === "all"
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("all")}
            >
              {t("allProperties")}
            </button>
            <button
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === "residences"
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("residences")}
            >
              {t("residences")}
            </button>
            <button
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === "premium"
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("premium")}
            >
              {t("premium")}
            </button>
          </div>
        </div>

        {/* Property Grid with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
