"use client";

import React, { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const PARTNERS = [
  {
    id: "novaforza",
    name: "NovaForza",
    logo: "https://res.cloudinary.com/dcuapqoii/image/upload/v1748037716/123_lps2yb.png",
  },
  {
    id: "casalina",
    name: "Casalina",
    logo: "https://res.cloudinary.com/dcuapqoii/image/upload/v1748037716/LOGO-12_zzdft1.png",
  },
  {
    id: "riviera-del-este",
    name: "Riviera Del Este",
    logo: "https://res.cloudinary.com/dcuapqoii/image/upload/v1748037715/gria_hlzos8.png",
  },
];

export default function Partners() {
  const t = useTranslations("home.partners");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const container = containerRef.current;
    if (!container) return;

    // Create a keyframe animation that smoothly moves the content
    try {
      // Create one set of partners + clone at the end for seamless loop
      const content = document.createElement("div");
      content.className = "partners-content flex";

      // Original set
      PARTNERS.forEach((partner) => {
        const item = document.createElement("div");
        item.className = "partner-item flex-shrink-0 mx-4 sm:mx-6 md:mx-8";
        item.style.width = "120px";
        container.appendChild(item);
      });

      // CSS animation for smooth infinite scroll
      const keyframes = `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${PARTNERS.length * 120 + PARTNERS.length * 32}px); }
        }
        
        .partners-slider {
          overflow: hidden;
        }
        
        .partners-content {
          animation: scroll 20s linear infinite;
          width: fit-content;
        }
        
        .partners-content:hover {
          animation-play-state: paused;
        }
      `;

      // Create and append style element
      const style = document.createElement("style");
      style.textContent = keyframes;
      document.head.appendChild(style);

      // Clean up
      return () => {
        document.head.removeChild(style);
      };
    } catch (err) {
      console.error("Animation error:", err);
    }
  }, []);

  // Double the partners for seamless loop
  const displayPartners = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1300px]">
        <div className="flex justify-center mb-6 md:mb-8">
          <span className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-semibold">
            {t("title")}
          </span>
        </div>

        <div className="relative">
          {/* Subtle gradient overlay - left */}
          <div className="absolute top-0 left-0 w-8 sm:w-12 md:w-16 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none opacity-70"></div>

          <div className="partners-slider overflow-hidden" ref={containerRef}>
            <div className="partners-content flex animate-[scroll_20s_linear_infinite] hover:pause">
              {displayPartners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="partner-item flex-shrink-0 mx-4 sm:mx-6 md:mx-8 w-28 sm:w-32 md:w-36"
                >
                  <div className="relative h-12 sm:h-14 md:h-16 w-full grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      className="object-contain"
                      fill
                      sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 144px"
                      priority={index < displayPartners.length / 3}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subtle gradient overlay - right */}
          <div className="absolute top-0 right-0 w-8 sm:w-12 md:w-16 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none opacity-70"></div>
        </div>
      </div>
    </section>
  );
}
