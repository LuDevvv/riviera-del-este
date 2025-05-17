"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("common.languageSwitcher");
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const availableLocales = {
    en: t("en"),
    es: t("es"),
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-800 hover:text-primary transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-1"
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </motion.svg>
        <span className="text-sm font-medium hidden md:inline-block">
          {availableLocales[locale as keyof typeof availableLocales]}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-1 z-50"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
          >
            {Object.entries(availableLocales).map(
              ([localeCode, localeName]) => (
                <Link
                  key={localeCode}
                  href={pathname}
                  locale={localeCode}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                    locale === localeCode ? "bg-gray-100 font-medium" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {localeName}
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
