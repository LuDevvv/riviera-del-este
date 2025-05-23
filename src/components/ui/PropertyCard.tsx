"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useScrollTo } from "@hooks/useScrollTo";
import { motion } from "framer-motion";
import { Bed, Square, CheckCircle } from "lucide-react";

interface PropertyCardProps {
  id: string;
  image: string;
  area: number;
  bedrooms: number;
  hasPatio: boolean;
  type: "residences" | "premium";
}

export default function PropertyCard({
  id,
  image,
  area,
  bedrooms,
  hasPatio,
  type,
}: PropertyCardProps) {
  const t = useTranslations("home.properties");
  const scrollToSection = useScrollTo();

  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    scrollToSection("contact");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
    >
      {/* Property Image */}
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={image}
          alt={`${bedrooms} ${t("bedrooms")} apartment`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
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
          className="w-full bg-primary hover:bg-primary-dark text-white rounded-lg py-3 text-sm font-medium transition-colors"
        >
          {t("contactAgent")}
        </button>
      </div>
    </motion.div>
  );
}
