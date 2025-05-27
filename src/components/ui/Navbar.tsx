"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, X, ChevronDown, CalendarFold } from "lucide-react";
import { useScrollTo } from "@hooks/useScrollTo";

export default function Navbar() {
  const t = useTranslations("common.nav");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const scrollToSection = useScrollTo();

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  // Fixed navbar styles
  const navbarStyle = {
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    width: "100%",
  };

  const handleNavClick = (
    sectionId: string,
    e: React.MouseEvent<HTMLElement>
  ) => {
    scrollToSection(sectionId, e);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed w-full z-[9999]">
      <div className="py-4" style={navbarStyle}>
        <div className="max-w-[1300px] mx-auto py-[6px] px-6">
          <div className="flex gap-2 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="https://res.cloudinary.com/dcuapqoii/image/upload/v1748035946/Artboard_2_opvcvu.png"
                alt="Casalina Logo"
                width={160}
                height={64}
                className="object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center space-x-2 lg:space-x-6 flex-1">
              {["models", "gallery", "location", "contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => handleNavClick(item, e)}
                  className="text-1xl font-bold transition-colors text-gray-800 hover:text-primary px-1"
                >
                  {t(item)}
                </a>
              ))}
              <div className="ml-2">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Mobile actions */}
            <div className="flex items-center gap-3 md:hidden">
              <LanguageSwitcher />

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-800 z-50"
                aria-label="Toggle menu"
              >
                {!mobileMenuOpen ? <Menu size={28} /> : <X size={28} />}
              </button>
            </div>

            <a
              href="#contact"
              onClick={(e) => handleNavClick("contact", e)}
              className="hidden md:flex items-center justify-center bg-secondary hover:bg-secondary-dark text-white rounded px-4 py-2 text-sm font-medium transition-colors ml-4 gap-1"
            >
              <CalendarFold className="w-4 h-4" />

              {t("schedule")}
            </a>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div
            className="fixed top-[84px] inset-x-0 bottom-0 bg-white z-40 md:hidden"
            style={{
              animation: "fadeIn 0.2s ease-in-out forwards",
            }}
          >
            <div className="overflow-y-auto h-full">
              <nav>
                {["models", "gallery", "location", "contact"].map(
                  (item, index) => (
                    <React.Fragment key={item}>
                      <div
                        className="flex items-center justify-between px-4 py-4 cursor-pointer"
                        onClick={(e) => scrollToSection(item, e as any)}
                      >
                        <a
                          href={`#${item}`}
                          className="text-base font-medium text-gray-800"
                        >
                          {t(item)}
                        </a>

                        {item === "home" && <ChevronDown size={20} />}
                      </div>
                      {index < 5 && (
                        <div className="h-px bg-gray-200 w-full"></div>
                      )}
                    </React.Fragment>
                  )
                )}

                {/* Schedule button */}
                <div className="px-4 py-6">
                  <button
                    onClick={(e) => handleNavClick("contact", e)}
                    className="w-full bg-secondary hover:bg-secondary-dark text-white rounded-md py-3 text-base font-medium transition-colors"
                  >
                    {t("schedule")}
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
