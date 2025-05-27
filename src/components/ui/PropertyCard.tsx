"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useScrollTo } from "@hooks/useScrollTo";
import { motion } from "framer-motion";
import { Bed, Square, CheckCircle, AlertTriangle } from "lucide-react";

interface PropertyCardProps {
  id: string;
  image: string;
  area: number;
  bedrooms: number;
  hasPatio: boolean;
  type: "residences" | "premium";
  isLimitedUnits?: boolean;
}

export default function PropertyCard({
  id,
  image,
  area,
  bedrooms,
  hasPatio,
  type,
  isLimitedUnits = false,
}: PropertyCardProps) {
  const t = useTranslations("home.properties");
  const scrollToSection = useScrollTo();

  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    scrollToSection("contact");
  };

  // Determine if this is a premium with limited units
  const showLimitedBadge = type === "premium" && isLimitedUnits;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 relative"
    >
      {/* Limited Units Badge */}
      {showLimitedBadge && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg animate-pulse">
            <AlertTriangle size={12} />
            {t("limitedUnits")}
          </div>
        </div>
      )}

      {/* Property Image */}
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={image}
          alt={`${bedrooms} ${t("bedrooms")} apartment`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Premium overlay gradient for premium types */}
        {type === "premium" && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        )}
      </div>

      {/* Property Details */}
      <div className="p-5">
        {/* Features */}
        <div className="flex gap-4 text-gray-600 mb-5">
          <div className="flex items-center">
            <Bed size={16} className="mr-1" />
            <span className="text-sm">{bedrooms}</span>
          </div>

          <div className="flex items-center">
            <Square size={16} className="mr-1" />
            <span className="text-sm">{area} m²</span>
          </div>

          {hasPatio && (
            <div className="flex items-center">
              <CheckCircle size={16} className="mr-1 text-green-500" />
              <span className="text-sm">Patio</span>
            </div>
          )}
        </div>

        {/* Contact Button */}
        <button
          onClick={handleContactClick}
          className="w-full rounded-lg py-3 text-sm font-medium transition-colors bg-primary hover:bg-primary-dark text-white"
        >
          {t("contactAgent")}
        </button>

        {showLimitedBadge && (
          <p className="text-center text-red-600 text-xs mt-2 font-medium">
            {t("onlyFewLeft")}
          </p>
        )}
      </div>
    </motion.div>
  );
}
