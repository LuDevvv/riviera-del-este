"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@i18n/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";
import Image from "next/image";

interface LocaleInfo {
  name: string;
  flag: string;
}

interface Locales {
  [key: string]: LocaleInfo;
}

export default function LanguageSwitcher(): React.ReactElement {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("common.languageSwitcher");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const locales: Locales = {
    en: { name: t("en"), flag: "/images/flags/en.svg" },
    es: { name: t("es"), flag: "/images/flags/es.svg" },
  };

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center text-gray-700 hover:bg-gray-200 bg-gray-100 rounded-full transition-colors focus:outline-none ${
          isMobile ? "justify-center p-1.5" : "px-2 py-1"
        }`}
        aria-expanded={isOpen}
      >
        <Globe size={16} className="text-gray-600" />
        {!isMobile && (
          <>
            <span className="text-sm font-medium mx-1">
              {locale.toUpperCase()}
            </span>
            <ChevronDown
              size={14}
              className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </>
        )}
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-1 bg-white rounded-md shadow-md py-1 z-50 border border-gray-100 ${
            isMobile ? "w-28" : "w-32"
          }`}
        >
          {Object.entries(locales).map(([code, { name, flag }]) => (
            <Link
              key={code}
              href={pathname}
              locale={code}
              className={`flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 ${
                locale === code ? "bg-gray-50 text-gray-900" : "text-gray-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <Image
                  src={flag}
                  alt={name}
                  width={16}
                  height={12}
                  className="mr-2"
                />
                {name}
              </div>
              {!isMobile && locale === code && (
                <Check size={14} className="text-green-500" />
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
