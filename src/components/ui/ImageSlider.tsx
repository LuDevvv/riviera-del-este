"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
}

export function ImageSlider({
  items,
  height = "h-[400px] md:h-[500px] lg:h-[600px]",
  autoPlay = false,
  autoPlayInterval = 4000,
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
    <div className={`relative w-full overflow-hidden bg-primary ${height}`}>
      {/* Gradientes laterales */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-primary" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-primary" />

      {/* Flechas */}
      <button
        ref={prevRef}
        aria-label="Anterior"
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 bg-secondary hover:bg-secondary/90 text-white rounded-full p-3 shadow-lg transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        ref={nextRef}
        aria-label="Siguiente"
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 bg-secondary hover:bg-secondary/90 text-white rounded-full p-3 shadow-lg transition"
      >
        <ChevronRight size={24} />
      </button>

      <Swiper
        modules={[Navigation, Autoplay]}
        onInit={onSwiperInit}
        loop
        centeredSlides
        autoplay={autoPlay ? { delay: autoPlayInterval } : false}
        spaceBetween={16}
        slidesPerView={1} // fallback para móvil
        breakpoints={{
          640: {
            // tablet
            slidesPerView: 1.2, // 20% de peek
            spaceBetween: 20,
          },
          1024: {
            // desktop
            slidesPerView: 1.5, // 50% central, 25% a cada lado
            spaceBetween: 32,
          },
        }}
        className="h-full"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="relative h-full">
            <img
              src={item.image}
              alt={item.title || ""}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
            {item.title && (
              <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm px-3 py-1 rounded drop-shadow-lg">
                <h3 className="text-white text-lg md:text-xl lg:text-2xl font-medium">
                  {item.title}
                </h3>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
