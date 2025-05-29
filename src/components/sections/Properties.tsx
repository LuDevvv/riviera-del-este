"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import PropertyCard from "@components/ui/PropertyCard";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "@components/ui/AnimatedSection";
import FilterTabs, { FilterOption } from "@components/ui/FilterTabs";
import { Gift, Calendar } from "lucide-react";

// Real property data based on Riviera del Este specifications
interface PropertyDetails {
  id: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  floor: number;
  type: "residences" | "premium";
  hasTerraza?: boolean;
  hasPatio?: boolean;
  hasEstudio?: boolean;
  isPenthouse?: boolean;
  isLimitedUnits?: boolean;
  image: string;
}

export default function Properties() {
  const t = useTranslations("home.properties");
  const [activeTab, setActiveTab] = useState<"all" | "residences" | "premium">(
    "all"
  );

  // Real property data from Riviera del Este
  const properties: PropertyDetails[] = [
    {
      id: "tipo-a-1er-piso",
      name: "Tipo A - 1er Piso",
      bedrooms: 2,
      bathrooms: 2,
      area: 85,
      floor: 1,
      type: "residences",
      hasPatio: true,
      isLimitedUnits: false,
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_400,q_70,f_auto,c_fill/v1748409672/3_u9nij0.png",
    },
    {
      id: "tipo-a-3er-piso",
      name: "Tipo A - 3er Piso",
      bedrooms: 2,
      bathrooms: 2,
      area: 75,
      floor: 3,
      type: "residences",
      isLimitedUnits: false,
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_400,q_70,f_auto,c_fill/v1748409447/15_zo8u0b.png",
    },
    {
      id: "tipo-a-4to-piso-terraza",
      name: "Tipo A - 4to Piso",
      bedrooms: 2,
      bathrooms: 2,
      area: 100, // 75 apto + 25 terraza
      floor: 4,
      type: "premium",
      hasTerraza: true,
      isLimitedUnits: true,
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_400,q_70,f_auto,c_fill/v1748404979/7_sdb0sy.png",
    },
    {
      id: "tipo-b-3-habs",
      name: "Tipo B - 3 Habitaciones",
      bedrooms: 3,
      bathrooms: 2,
      area: 115,
      floor: 2,
      type: "residences",
      isLimitedUnits: false,
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_400,q_70,f_auto,c_fill/v1748404979/7_sdb0sy.png",
    },
    {
      id: "tipo-d-1er-piso-patio",
      name: "Tipo D - 1er Piso",
      bedrooms: 3,
      bathrooms: 3,
      area: 115,
      floor: 1,
      type: "premium",
      hasPatio: true,
      isLimitedUnits: true,
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_400,q_70,f_auto,c_fill/v1748409591/4_kssl2x.png",
    },
    {
      id: "penthouse-4to-piso",
      name: "Penthouse Premium",
      bedrooms: 3,
      bathrooms: 3,
      area: 200,
      floor: 4,
      type: "premium",
      hasTerraza: true,
      hasEstudio: true,
      isPenthouse: true,
      isLimitedUnits: true,
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_400,q_70,f_auto,c_fill/v1748404979/7_sdb0sy.png",
    },
  ];

  // Filter options
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
    <section id="models" className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-[1300px]">
        {/* Header Section */}
        <div className="text-center mb-6">
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

          {/* Special Offer */}
          <AnimatedSection animation="scaleIn" delay={600} threshold={0.3}>
            <div className="mx-auto">
              <div className="flex flex-col justify-center items-center bg-secondary rounded-2xl p-3 md:p-4 text-white relative overflow-hidden">
                <div className="max-w-lg">
                  <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20">
                    <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                      {t("specialOffer.limited")}
                    </div>
                  </div>

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
