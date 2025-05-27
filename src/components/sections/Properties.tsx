"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import PropertyCard from "@components/ui/PropertyCard";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "@components/ui/AnimatedSection";
import FilterTabs, { FilterOption } from "@components/ui/FilterTabs";
import { Gift, Calendar } from "lucide-react";

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
      isLimitedUnits: false,
    },
    {
      id: "residences-3bed",
      image:
        "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg",
      bedrooms: 3,
      area: 90,
      hasPatio: true,
      type: "residences" as const,
      isLimitedUnits: false,
    },
    {
      id: "premium-1bed",
      image:
        "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
      bedrooms: 1,
      area: 60,
      hasPatio: true,
      type: "premium" as const,
      isLimitedUnits: true, // Limited units for premium 1-bed
    },
    {
      id: "premium-2bed",
      image:
        "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      bedrooms: 2,
      area: 75,
      hasPatio: true,
      type: "premium" as const,
      isLimitedUnits: true, // Limited units for premium 2-bed
    },
    {
      id: "premium-3bed",
      image:
        "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg",
      bedrooms: 3,
      area: 90,
      hasPatio: true,
      type: "premium" as const,
      isLimitedUnits: false, // Plenty available for 3-bed premium
    },
  ];

  // Filter options for the tabs
  const propertyFilterOptions: FilterOption<
    "all" | "residences" | "premium"
  >[] = [
    { value: "all", label: t("allProperties") },
    { value: "residences", label: t("residences") },
    { value: "premium", label: t("premium") },
  ];

  // Filter properties based on active tab
  const filteredProperties =
    activeTab === "all"
      ? properties
      : properties.filter((property) => property.type === activeTab);

  return (
    <section id="models" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-[1300px]">
        {/* Header Section - Centered */}
        <div className="text-center mb-12">
          <AnimatedSection animation="fadeIn" threshold={0.3}>
            <div className="flex justify-center mb-4">
              <span className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-semibold">
                {t("badge")}
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slideUp" delay={200} threshold={0.3}>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-4 text-black">
              {t("title")}
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="slideUp" delay={400} threshold={0.3}>
            <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
              {t("description")}
            </p>
          </AnimatedSection>

          {/* Special Offer - Centered */}
          <AnimatedSection animation="scaleIn" delay={600} threshold={0.3}>
            <div className="max-w-lg mx-auto mb-8">
              <div className="bg-secondary rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
                {/* Limited Badge - Responsive positioning */}
                <div className="absolute top-3 right-2 md:top-4 md:right-4 z-20">
                  <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                    {t("specialOffer.limited")}
                  </div>
                </div>

                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 -translate-x-6"></div>

                <div className="relative z-10 pt-2">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-white/20 p-3 rounded-xl mr-3">
                      <Gift className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-base uppercase tracking-wide">
                      {t("specialOffer.badge")}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight text-center">
                    {t("specialOffer.title")}
                  </h3>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                    <p className="text-white text-sm md:text-base leading-relaxed text-center">
                      {t("specialOffer.description.part1")}{" "}
                      <strong>{t("specialOffer.description.dates")}</strong>{" "}
                      {t("specialOffer.description.part2")}
                      <span className="text-yellow-300 font-bold text-lg">
                        {" "}
                        {t("specialOffer.description.amount")}
                      </span>
                      {t("specialOffer.description.part3")}{" "}
                      <strong>{t("specialOffer.description.items")}</strong>{" "}
                      {t("specialOffer.description.part4")}
                    </p>
                  </div>

                  <div className="flex items-center justify-center text-sm text-white/90 bg-white/5 rounded-lg py-2 px-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{t("specialOffer.validity")}</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Filter Tabs */}
        <AnimatedSection
          animation="scaleIn"
          delay={800}
          threshold={0.3}
          className="mb-8"
        >
          <FilterTabs
            options={propertyFilterOptions}
            activeFilter={activeTab}
            onFilterChange={setActiveTab}
            variant="primary"
          />
        </AnimatedSection>

        {/* Property Grid */}
        <AnimatedSection animation="fadeIn" delay={1000} threshold={0.2}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </motion.div>
          </AnimatePresence>
        </AnimatedSection>
      </div>
    </section>
  );
}
