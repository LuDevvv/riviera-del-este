"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import { useNavbarScroll } from "@hooks/useNavbarScroll";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("common.nav");
  const { scrollPosition, scrollDirection, mobileMenuOpen, setMobileMenuOpen } =
    useNavbarScroll();
  const isMobile = useMediaQuery("(max-width: 768px)");

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

  // Smoother fade animation for navbar
  const navbarVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  // Navbar styles with smooth transition
  const navbarStyle = {
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    width: scrollPosition < 10 && !isMobile ? "calc(100% - 2rem)" : "100%",
    borderRadius: scrollPosition < 10 && !isMobile ? "0.6rem" : "0",
    margin: scrollPosition < 10 && !isMobile ? "3rem auto" : "0",
    maxWidth: scrollPosition < 10 && !isMobile ? "1300px" : "100%",
    transition: "all 0.6s ease", // Slower, smoother transition
  };

  const navbarVisibility =
    scrollDirection === "down" && scrollPosition > 80 ? "hidden" : "visible";

  const scrollToSection = (
    sectionId: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      className="fixed w-full z-50"
      initial="visible"
      animate={navbarVisibility}
      variants={navbarVariants}
    >
      <motion.div
        className="py-4"
        style={navbarStyle}
        initial={false}
        animate={{ opacity: 1 }}
        key={scrollPosition < 10 ? "floating" : "full"}
      >
        <div className="container mx-auto py-[6px] px-6">
          <div className="flex gap-2 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="https://madebydesignesia.com/themes/residem/images/logo-black.webp"
                alt="Riviera del Este Logo"
                width={140}
                height={28}
                className="h-7 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center space-x-2 lg:space-x-6 flex-1">
              {[
                "home",
                "overview",
                "rooms",
                "gallery",
                "floorplan",
                "contact",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => scrollToSection(item, e)}
                  className="text-1xl font-bold transition-colors text-gray-800 hover:text-primary px-1"
                >
                  {t(item)}
                </a>
              ))}
              <div className="ml-2">
                <LanguageSwitcher />
              </div>
            </div>

            <button className="hidden md:flex bg-secondary hover:bg-secondary-dark text-white rounded px-4 py-2 text-sm font-medium transition-colors ml-4">
              {t("schedule")}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-800 z-50"
              aria-label="Toggle menu"
            >
              {!mobileMenuOpen ? <Menu size={28} /> : <X size={28} />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed top-[60px] inset-x-0 bottom-0 bg-white z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="overflow-y-auto h-full">
              <nav>
                {[
                  "home",
                  "overview",
                  "rooms",
                  "gallery",
                  "floorplan",
                  "contact",
                ].map((item, index) => (
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
                ))}

                {/* Language switcher */}
                <div className="px-4 py-4 flex justify-center border-t mt-4">
                  <div className="inline-block">
                    <LanguageSwitcher />
                  </div>
                </div>

                {/* Schedule button */}
                <div className="px-4 py-6">
                  <button className="w-full bg-secondary hover:bg-secondary-dark text-white rounded-md py-3 text-base font-medium transition-colors">
                    {t("schedule")}
                  </button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
