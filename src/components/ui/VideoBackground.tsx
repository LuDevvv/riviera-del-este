"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface VideoBackgroundProps {
  src: string;
  poster: string;
  title?: string;
  className?: string;
}

export default function VideoBackground({
  src,
  poster,
  title = "",
  className = "",
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);

  // Detect slow connections and mobile
  const isSlowConnection = useCallback(() => {
    const connection = (navigator as any).connection;
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    return (
      isMobile ||
      (connection &&
        (connection.effectiveType === "2g" ||
          connection.effectiveType === "slow-2g" ||
          connection.downlink < 2))
    );
  }, []);

  useEffect(() => {
    // Only load video on fast connections and after initial load
    const timer = setTimeout(() => {
      if (!isSlowConnection()) {
        setShouldPlayVideo(true);
      }
    }, 1000); // Delay video loading

    return () => clearTimeout(timer);
  }, [isSlowConnection]);

  const handleCanPlay = useCallback(() => {
    setIsLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback to poster image
      });
    }
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Optimized poster image - always visible */}
      <Image
        src={poster}
        alt={title}
        fill
        priority
        quality={75}
        className="object-cover"
        sizes="100vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />

      {/* Video - only on fast connections */}
      {shouldPlayVideo && (
        <video
          ref={videoRef}
          aria-label={title}
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={handleCanPlay}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
