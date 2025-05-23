"use client";
import React, { useRef, useEffect, useState } from "react";

interface VideoBackgroundProps {
  src: string;
  poster: string;
  title?: string;
}

export default function VideoBackground({
  src,
  poster,
  title = "",
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ajusta tamaño al viewport
    const resizeHandler = () => {
      video.style.width = `${window.innerWidth}px`;
      video.style.height = `${window.innerHeight}px`;
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    // Chequea conexión antes de reproducir
    const playIfGood = () => {
      const conn = (navigator as any).connection;
      const downlink = conn?.downlink ?? 10;
      const type = conn?.effectiveType ?? "";
      if (downlink > 2 || !["2g", "3g"].includes(type)) {
        video.play().catch(() => {});
        setVisible(true);
      }
    };

    // Sólo cargamos metadata al inicio
    video.preload = "metadata";
    video.poster = poster;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    playIfGood();
    // un intento extra tras 3s por si cambia status
    setTimeout(playIfGood, 3000);

    return () => window.removeEventListener("resize", resizeHandler);
  }, [poster]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        aria-label={title}
        title={title}
        className={`object-cover w-full h-full transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* Capa de oscuridad */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
