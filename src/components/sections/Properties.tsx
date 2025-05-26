"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import PropertyCard from "@components/ui/PropertyCard";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "@components/ui/AnimatedSection";
import FilterTabs, { FilterOption } from "@components/ui/FilterTabs";
import { Gift, Calendar, Zap } from "lucide-react";

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
        {/* Header Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Title & Description */}
          <div className="lg:col-span-2">
            <AnimatedSection animation="fadeIn" threshold={0.3}>
              <div className="flex justify-start mb-4">
                <span className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-semibold">
                  {t("badge")}
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={200} threshold={0.3}>
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-4 text-black text-left">
                {t("title")}
              </h2>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={400} threshold={0.3}>
              <p className="text-gray-500 mb-6 text-left max-w-xl">
                {t("description")}
              </p>
            </AnimatedSection>
          </div>

          {/* Right Column - Special Offer */}
          <div className="lg:col-span-1">
            <AnimatedSection animation="scaleIn" delay={600} threshold={0.3}>
              <div className="bg-gradient-to-br from-secondary to-secondary-dark rounded-2xl p-6 text-white relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 -translate-x-6"></div>

                <div className="relative z-10">
                  <div className="flex items-center mb-3">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                      <Gift className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-sm uppercase tracking-wide">
                      Oferta Especial
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 leading-tight">
                    ¡Se Regala en Grande!
                  </h3>

                  <p className="text-white/90 text-sm mb-4 leading-relaxed">
                    Si reserva del <strong>6 al 8 de Junio</strong> con solo
                    <span className="text-yellow-300 font-bold"> $1,000</span>,
                    le incluimos <strong>estufa y nevera</strong> completamente
                    gratis.
                  </p>

                  <div className="flex items-center text-xs text-white/80">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Válido solo durante el evento</span>
                  </div>

                  {/* Pulsing effect */}
                  <div className="absolute -top-1 -right-1">
                    <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                      ¡LIMITADO!
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
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
