"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
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
  showPagination?: boolean;
  showPlayPause?: boolean;
}

export function ImageSlider({
  items,
  height = "h-[400px] md:h-[500px] lg:h-[600px]",
  autoPlay = false,
  autoPlayInterval = 4000,
  showGradients = true,
  gradientColor = "primary",
  backgroundColor = "",
  showPagination = false,
  showPlayPause = false,
}: ImageSliderProps) {
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const handleSwiperInit = (swiper: any) => {
    setSwiperRef(swiper);

    // Set up navigation
    if (prevRef.current && nextRef.current) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  };

  const toggleAutoplay = () => {
    if (!swiperRef) return;

    if (isPlaying) {
      swiperRef.autoplay.stop();
      setIsPlaying(false);
    } else {
      swiperRef.autoplay.start();
      setIsPlaying(true);
    }
  };

  const handlePrevClick = () => {
    if (swiperRef) {
      swiperRef.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef) {
      swiperRef.slideNext();
    }
  };

  if (!items.length) return null;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl ${backgroundColor || (showGradients ? "bg-primary" : "bg-white")} ${height}`}
    >
      {/* Gradient overlays */}
      {showGradients && (
        <>
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 w-12 md:w-16 bg-gradient-to-r from-${gradientColor} to-transparent z-20`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 w-12 md:w-16 bg-gradient-to-l from-${gradientColor} to-transparent z-20`}
          />
        </>
      )}

      {/* Navigation buttons */}
      <button
        ref={prevRef}
        onClick={handlePrevClick}
        aria-label="Previous slide"
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 
          bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 md:p-3 
          shadow-lg transition-all duration-200 backdrop-blur-sm opacity-80 hover:opacity-100"
      >
        <ChevronLeft size={18} className="md:w-5 md:h-5" />
      </button>

      <button
        ref={nextRef}
        onClick={handleNextClick}
        aria-label="Next slide"
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 
          bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 md:p-3 
          shadow-lg transition-all duration-200 backdrop-blur-sm opacity-80 hover:opacity-100"
      >
        <ChevronRight size={18} className="md:w-5 md:h-5" />
      </button>

      {/* Play/Pause button */}
      {showPlayPause && autoPlay && (
        <button
          onClick={toggleAutoplay}
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          className="absolute top-4 right-4 z-30 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-200"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      )}

      <Swiper
        modules={[Navigation, Autoplay]}
        onSwiper={handleSwiperInit}
        loop={true}
        centeredSlides={true}
        autoplay={
          autoPlay
            ? {
                delay: autoPlayInterval,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
        }}
        className="h-full"
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.id} className="relative">
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl bg-gray-100">
              <Image
                src={item.image}
                alt={item.title || `Slide ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 85vw"
                priority={index < 2}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />

              {/* Image overlay with title */}
              {item.title && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg md:text-xl lg:text-2xl font-medium drop-shadow-lg">
                      {item.title}
                    </h3>
                  </div>
                </div>
              )}

              {/* Loading state */}
              <div
                className="absolute inset-0 bg-gray-200 animate-pulse"
                style={{ zIndex: -1 }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
