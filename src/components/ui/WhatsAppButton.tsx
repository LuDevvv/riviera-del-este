"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const t = useTranslations("common.whatsapp");
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Phone number without any special characters
  const phoneNumber = "18092995767";

  // Pre-filled message (URL encoded)
  const message = encodeURIComponent(t("defaultMessage"));

  // WhatsApp URL
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Show button after a delay even if no scroll
    const timer = setTimeout(() => setIsVisible(true), 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("ariaLabel")}
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center transform transition-all duration-300 
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 bg-green-500 rounded-full animate-pulse"
        style={{
          opacity: 0.3,
          animationDuration: "2s",
          display: isHovered ? "none" : "block",
        }}
      />
      <div className="relative flex items-center">
        {isHovered && (
          <div className="absolute right-full mr-3 whitespace-nowrap bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
            {t("buttonText")}
            <div className="absolute top-1/2 right-0 transform translate-x-2 -translate-y-1/2 rotate-45 w-2 h-2 bg-white" />
          </div>
        )}
        <div className="flex items-center justify-center h-14 w-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg text-white transition-all duration-300 hover:scale-110">
          <MessageCircle size={28} className="fill-current" />
        </div>
      </div>
    </a>
  );
}
