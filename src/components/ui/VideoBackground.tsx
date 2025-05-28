"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

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
  const [hasError, setHasError] = useState(false);

  const handleCanPlay = useCallback(() => {
    setIsLoaded(true);
    // Intentar reproducir automáticamente
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        setHasError(true);
      });
    }
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Verificar conexión de red
    const connection = (navigator as any).connection;

    const isSlowConnection =
      connection &&
      (connection.effectiveType === "2g" ||
        connection.effectiveType === "slow-2g" ||
        connection.downlink < 1.5);

    if (isSlowConnection) {
      setHasError(true);
      return;
    }

    // Configurar video
    video.preload = "metadata"; // Usar metadata para conexiones normales
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.poster = poster;

    // Cargar video con delay para conexiones lentas
    const timer = setTimeout(
      () => {
        video.src = src;
      },
      isSlowConnection ? 2000 : 500
    );

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    return () => {
      clearTimeout(timer);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, [src, poster, handleCanPlay, handleError]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${poster})` }}
      />
      <video
        ref={videoRef}
        aria-label={title}
        muted
        loop
        playsInline
        autoPlay
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded && !hasError ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
