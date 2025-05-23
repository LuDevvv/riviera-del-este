"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SliderItem {
  id: string;
  image: string;
  title?: string;
  category?: string;
}

interface ImageSliderProps {
  items: SliderItem[];
  categories?: string[];
  height?: string;
  autoPlay?: boolean;
  showCategories?: boolean;
  className?: string;
}

export default function ImageSlider({
  items,
  categories = [],
  height = "h-screen md:h-96",
  autoPlay = false,
  showCategories = false,
  className = "",
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [direction, setDirection] = useState(0);

  // Filter items based on active category
  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
    );
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentIndex(0);
    setDirection(0);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Category Filters */}
      {showCategories && categories.length > 0 && (
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-lg shadow-sm border p-1">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-secondary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              View All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all capitalize ${
                  activeCategory === category
                    ? "bg-secondary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Slider */}
      <div className={`relative ${height} overflow-hidden bg-gray-100 w-full`}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={`${activeCategory}-${currentIndex}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 w-full h-full"
          >
            {filteredItems[currentIndex] && (
              <>
                <Image
                  src={filteredItems[currentIndex].image}
                  alt={filteredItems[currentIndex].title || "Slide image"}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />

                {/* Optional title overlay with gradient */}
                {filteredItems[currentIndex].title && (
                  <>
                    {/* Gradient overlay for title readability */}
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent"></div>

                    <div className="absolute top-6 left-6 z-10">
                      <h3 className="text-white text-lg md:text-xl lg:text-2xl font-medium">
                        {filteredItems[currentIndex].title}
                      </h3>
                    </div>
                  </>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {filteredItems.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-secondary hover:bg-secondary-dark text-white rounded-full p-2.5 transition-all shadow-lg z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-secondary hover:bg-secondary-dark text-white rounded-full p-2.5 transition-all shadow-lg z-10"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
