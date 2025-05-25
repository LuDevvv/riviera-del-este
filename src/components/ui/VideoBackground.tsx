"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useMediaQuery } from "@hooks/useMediaQuery";

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
  const [showVideo, setShowVideo] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  const handleCanPlay = useCallback(() => {
    setIsLoaded(true);
    if (!prefersReducedMotion && !isMobile) {
      setShowVideo(true);
      videoRef.current?.play().catch(() => setHasError(true));
    }
  }, [prefersReducedMotion, isMobile]);

  const handleError = useCallback(() => {
    setHasError(true);
    setShowVideo(false);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Solo cargar video en desktop y si no hay preferencia por movimiento reducido
    if (isMobile || prefersReducedMotion) {
      setShowVideo(false);
      return;
    }

    // Verificar conexión de red
    const connection = (navigator as any).connection;
    if (
      connection &&
      (connection.effectiveType === "2g" || connection.effectiveType === "3g")
    ) {
      setShowVideo(false);
      return;
    }

    // Configurar video
    video.preload = "metadata";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.poster = poster;

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    // Lazy load del video después de un delay
    const timer = setTimeout(() => {
      video.src = src;
    }, 1000);

    return () => {
      clearTimeout(timer);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, [src, poster, isMobile, prefersReducedMotion, handleCanPlay, handleError]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Poster image - always shown as fallback */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${poster})` }}
      />

      {/* Video - only on desktop with good connection */}
      {showVideo && !hasError && (
        <video
          ref={videoRef}
          aria-label={title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
