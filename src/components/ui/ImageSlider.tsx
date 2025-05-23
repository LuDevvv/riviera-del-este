"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface SliderItem {
  id: string;
  image: string;
  title?: string;
}

interface ImageSliderProps {
  items: SliderItem[];
  height?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showGradients?: boolean;
  gradientColor?: string;
  backgroundColor?: string;
}

export function ImageSlider({
  items,
  height = "h-[400px] md:h-[500px] lg:h-[600px]",
  autoPlay = false,
  autoPlayInterval = 4000,
  showGradients = true,
  gradientColor = "primary",
  backgroundColor = "",
}: ImageSliderProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const onSwiperInit = (swiper: any) => {
    if (prevRef.current && nextRef.current) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  };

  if (!items.length) return null;

  return (
    <div
      className={`relative w-full overflow-hidden ${backgroundColor || (showGradients ? "bg-primary" : "bg-white")} ${height}`}
    >
      {/* Conditional gradient overlays */}
      {showGradients && (
        <>
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-${gradientColor} to-transparent z-20`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-${gradientColor} to-transparent z-20`}
          />
        </>
      )}

      {/* Navigation arrows */}
      <button
        ref={prevRef}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-secondary hover:bg-secondary-dark text-white rounded-full p-2 md:p-3 shadow-lg transition-all duration-200 opacity-80 hover:opacity-100"
      >
        <ChevronLeft size={20} className="md:w-6 md:h-6" />
      </button>
      <button
        ref={nextRef}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-secondary hover:bg-secondary-dark text-white rounded-full p-2 md:p-3 shadow-lg transition-all duration-200 opacity-80 hover:opacity-100"
      >
        <ChevronRight size={20} className="md:w-6 md:h-6" />
      </button>

      <Swiper
        modules={[Navigation, Autoplay]}
        onInit={onSwiperInit}
        loop
        centeredSlides
        autoplay={
          autoPlay
            ? { delay: autoPlayInterval, disableOnInteraction: false }
            : false
        }
        spaceBetween={40}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1.05, // Minimal peek on tablets
            spaceBetween: 48,
          },
          1024: {
            slidesPerView: 1.08, // Very subtle peek on desktop
            spaceBetween: 60,
          },
        }}
        className="h-full"
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.id} className="relative h-full">
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src={item.image}
                alt={item.title || `Slide ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 85vw"
                priority={index < 2} // Prioritize first 2 images
              />
              {item.title && (
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <h3 className="text-white text-base md:text-lg lg:text-xl font-medium">
                    {item.title}
                  </h3>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
