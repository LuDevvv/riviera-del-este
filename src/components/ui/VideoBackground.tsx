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
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  // Evaluar si debe cargar video basado en conexión
  const shouldLoadVideoBasedOnConnection = useCallback((): boolean => {
    // Verificar Network Information API
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    if (connection) {
      const { effectiveType, saveData, downlink } = connection;

      // No cargar si está activado el ahorro de datos
      if (saveData) return false;

      // No cargar en conexiones muy lentas
      if (effectiveType === "slow-2g" || effectiveType === "2g") return false;

      // Para 3G, verificar ancho de banda
      if (effectiveType === "3g" && downlink && downlink < 1.5) return false;

      // Si hay información de ancho de banda muy bajo
      if (downlink && downlink < 1) return false;
    }

    // Si no hay información de conexión, permitir carga
    // (mejor experiencia por defecto)
    return true;
  }, []);

  // Detectar si debe cargar video
  useEffect(() => {
    const canLoadVideo = shouldLoadVideoBasedOnConnection();

    if (canLoadVideo) {
      const timer = setTimeout(() => {
        setShouldLoadVideo(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [shouldLoadVideoBasedOnConnection]);

  // Escuchar cambios en la conexión
  useEffect(() => {
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    if (!connection) return;

    const handleConnectionChange = () => {
      const canLoadVideo = shouldLoadVideoBasedOnConnection();

      // Si la conexión mejora y no estaba cargando video, empezar a cargarlo
      if (canLoadVideo && !shouldLoadVideo) {
        setShouldLoadVideo(true);
      }
    };

    connection.addEventListener("change", handleConnectionChange);
    return () =>
      connection.removeEventListener("change", handleConnectionChange);
  }, [shouldLoadVideoBasedOnConnection, shouldLoadVideo]);

  const handleCanPlay = useCallback(() => {
    setIsLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video play error:", error);
      });
    }
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo) return;

    const video = videoRef.current;
    if (!video) return;

    // Configurar video
    video.preload = "metadata";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    // Atributos adicionales para mejor compatibilidad móvil
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x5-playsinline", "true");

    video.src = src;
    video.load();

    // Event listeners
    const handleLoadedData = () => {
      // Video data loaded
    };

    const handleError = (e: Event) => {
      console.error("Video error:", e);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
    };
  }, [shouldLoadVideo, src, handleCanPlay]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Imagen de fondo siempre visible */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${poster})` }}
      />

      {/* Video solo si debe cargarse */}
      {shouldLoadVideo && (
        <video
          ref={videoRef}
          aria-label={title}
          muted
          loop
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
