"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useScrollTo } from "@hooks/useScrollTo";
import { motion } from "framer-motion";
import {
  Bed,
  Square,
  CheckCircle,
  AlertTriangle,
  Bath,
  Home,
  Crown,
  TreePine,
} from "lucide-react";

interface PropertyCardProps {
  id: string;
  name: string;
  image: string;
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
}

export default function PropertyCard({
  id,
  name,
  image,
  bedrooms,
  bathrooms,
  area,
  floor,
  type,
  hasTerraza = false,
  hasPatio = false,
  hasEstudio = false,
  isPenthouse = false,
  isLimitedUnits = false,
}: PropertyCardProps) {
  const t = useTranslations("home.properties");
  const scrollToSection = useScrollTo();

  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    scrollToSection("contact");
  };

  const showLimitedBadge = type === "premium" && isLimitedUnits;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 relative flex flex-col h-full"
    >
      {/* Penthouse Badge */}
      {isPenthouse && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <Crown size={12} />
            PENTHOUSE
          </div>
        </div>
      )}

      {/* Limited Units Badge */}
      {showLimitedBadge && !isPenthouse && (
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
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Premium overlay gradient */}
        {type === "premium" && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        )}

        {/* Floor indicator */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
            {floor}° Piso
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-5 flex flex-col h-auto">
        {/* Property Name */}
        <h3 className="font-semibold text-gray-900 mb-3 text-base">{name}</h3>

        {/* Features Row - Main + Special in same line */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          {/* Main Features */}
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center">
              <Bed size={16} className="mr-1 text-primary" />
              <span className="text-sm font-medium">{bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath size={16} className="mr-1 text-primary" />
              <span className="text-sm font-medium">{bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square size={16} className="mr-1 text-primary" />
              <span className="text-sm font-medium">{area}m²</span>
            </div>
          </div>

          {/* Special Features */}
          <div className="flex gap-1 flex-wrap">
            {hasPatio && (
              <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">
                <TreePine size={10} className="mr-1" />
                {t("patio")}
              </div>
            )}
            {hasTerraza && (
              <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                <Home size={10} className="mr-1" />
                {t("terraza")}
              </div>
            )}
            {hasEstudio && (
              <div className="flex items-center bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs">
                <CheckCircle size={10} className="mr-1" />
                {t("studio")}
              </div>
            )}
          </div>
        </div>

        {/* Reserve Button */}
        <div>
          <button
            onClick={handleContactClick}
            className="w-full rounded-lg py-3 text-sm font-medium transition-colors bg-primary hover:bg-primary-dark text-white"
          >
            {t("reserveButton")}
          </button>

          {/* Limited units warning */}
          {showLimitedBadge && (
            <p className="text-center text-red-600 text-xs font-medium mt-2">
              {t("onlyFewLeft")}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
