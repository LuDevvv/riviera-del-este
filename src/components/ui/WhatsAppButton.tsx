"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function WhatsAppButton() {
  const t = useTranslations("common.whatsapp");
  const [isVisible, setIsVisible] = useState(false);

  const phoneNumber = "18092995767";
  const message = encodeURIComponent(t("defaultMessage"));
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });

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
    >
      {/* Pulsing background */}
      <div
        className="absolute inset-0 bg-green-500 rounded-full animate-pulse"
        style={{ opacity: 0.3, animationDuration: "2s" }}
      />

      {/* Botón con logo */}
      <div className="relative flex items-center justify-center h-14 w-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg transition-transform duration-300 hover:scale-110">
        <Image
          src="https://res.cloudinary.com/dcuapqoii/image/upload/v1748409989/whatsapp_xbktkq.png"
          alt="WhatsApp logo"
          width={32}
          height={32}
          className="object-contain"
          priority
        />
      </div>
    </a>
  );
}
