// "use client";

// import React, { useEffect } from "react";
// import { useTranslations } from "next-intl";
// import { Link } from "@i18n/navigation";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import LanguageSwitcher from "./LanguageSwitcher";
// import { useNavbarScroll } from "@hooks/useNavbarScroll";
// import { useMediaQuery } from "@hooks/useMediaQuery";
// import { Menu, X, ChevronDown } from "lucide-react";

// export default function Navbar() {
//   const t = useTranslations("common.nav");
//   const { scrollPosition, scrollDirection, mobileMenuOpen, setMobileMenuOpen } =
//     useNavbarScroll();
//   const isMobile = useMediaQuery("(max-width: 768px)");

//   // Disable body scroll when mobile menu is open
//   useEffect(() => {
//     if (mobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [mobileMenuOpen]);

//   // Navbar styles with smooth transition
//   const navbarStyle = {
//     backgroundColor: "white",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//     width: scrollPosition < 10 && !isMobile ? "calc(100% - 2rem)" : "100%",
//     borderRadius: scrollPosition < 10 && !isMobile ? "0.6rem" : "0",
//     margin: scrollPosition < 10 && !isMobile ? "3rem auto" : "0",
//     maxWidth: scrollPosition < 10 && !isMobile ? "1300px" : "100%",
//     transform: "translateZ(0)", // Forces hardware acceleration
//   };

//   const navbarVisibility =
//     scrollDirection === "down" && scrollPosition > 80 ? "hidden" : "visible";

//   const scrollToSection = (
//     sectionId: string,
//     e: React.MouseEvent<HTMLAnchorElement>
//   ) => {
//     e.preventDefault();

//     // Obtener acceso a la instancia de Lenis
//     const lenis = (window as any).lenis;

//     if (lenis) {
//       // Usar Lenis para desplazarse a la sección
//       lenis.scrollTo(`#${sectionId}`, {
//         offset: 80, // Ajuste para la altura del navbar
//         duration: 1.2,
//         easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       });
//     } else {
//       // Fallback por si Lenis no está disponible
//       const section = document.getElementById(sectionId);
//       if (section) {
//         section.scrollIntoView({ behavior: "smooth" });
//       }
//     }

//     setMobileMenuOpen(false);
//   };

//   return (
//     <motion.header
//       className="fixed w-full z-50"
//       initial={false}
//       animate={{
//         y: navbarVisibility === "hidden" ? -80 : 0,
//         opacity: navbarVisibility === "hidden" ? 0 : 1,
//       }}
//       transition={{ duration: 0.2 }}
//     >
//       <motion.div
//         className="py-4"
//         style={navbarStyle}
//         key={scrollPosition < 10 ? "floating" : "full"}
//       >
//         <div className="max-w-[1300px] mx-auto py-[6px] px-6">
//           <div className="flex gap-2 items-center justify-between">
//             <Link href="/" className="flex items-center">
//               <Image
//                 src="https://madebydesignesia.com/themes/residem/images/logo-black.webp"
//                 alt="Riviera del Este Logo"
//                 width={140}
//                 height={28}
//                 className="h-7 w-auto object-contain"
//               />
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center justify-center space-x-2 lg:space-x-6 flex-1">
//               {[
//                 "home",
//                 "overview",
//                 "rooms",
//                 "gallery",
//                 "floorplan",
//                 "contact",
//               ].map((item) => (
//                 <a
//                   key={item}
//                   href={`#${item}`}
//                   onClick={(e) => scrollToSection(item, e)}
//                   className="text-1xl font-bold transition-colors text-gray-800 hover:text-primary px-1"
//                 >
//                   {t(item)}
//                 </a>
//               ))}
//               <div className="ml-2">
//                 <LanguageSwitcher />
//               </div>
//             </div>

//             {/* Mobile actions */}
//             <div className="flex items-center gap-3 md:hidden">
//               <LanguageSwitcher />

//               <button
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 className="text-gray-800 z-50"
//                 aria-label="Toggle menu"
//               >
//                 {!mobileMenuOpen ? <Menu size={28} /> : <X size={28} />}
//               </button>
//             </div>

//             {/* Desktop Schedule button */}
//             <button className="hidden md:flex bg-secondary hover:bg-secondary-dark text-white rounded px-4 py-2 text-sm font-medium transition-colors ml-4">
//               {t("schedule")}
//             </button>
//           </div>
//         </div>
//       </motion.div>

//       {/* Mobile menu */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <div
//             className="fixed top-[60px] inset-x-0 bottom-0 bg-white z-40 md:hidden"
//             style={{
//               animation: "fadeIn 0.2s ease-in-out forwards",
//             }}
//           >
//             <div className="overflow-y-auto h-full">
//               <nav>
//                 {[
//                   "home",
//                   "overview",
//                   "rooms",
//                   "gallery",
//                   "floorplan",
//                   "contact",
//                 ].map((item, index) => (
//                   <React.Fragment key={item}>
//                     <div
//                       className="flex items-center justify-between px-4 py-4 cursor-pointer"
//                       onClick={(e) => scrollToSection(item, e as any)}
//                     >
//                       <a
//                         href={`#${item}`}
//                         className="text-base font-medium text-gray-800"
//                       >
//                         {t(item)}
//                       </a>

//                       {item === "home" && <ChevronDown size={20} />}
//                     </div>
//                     {index < 5 && (
//                       <div className="h-px bg-gray-200 w-full"></div>
//                     )}
//                   </React.Fragment>
//                 ))}

//                 {/* Schedule button */}
//                 <div className="px-4 py-6">
//                   <button className="w-full bg-secondary hover:bg-secondary-dark text-white rounded-md py-3 text-base font-medium transition-colors">
//                     {t("schedule")}
//                   </button>
//                 </div>
//               </nav>
//             </div>
//           </div>
//         )}
//       </AnimatePresence>
//     </motion.header>
//   );
// }

"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, X, ChevronDown } from "lucide-react";
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
    e: React.MouseEvent<HTMLAnchorElement>
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
                src="https://res.cloudinary.com/dcuapqoii/image/upload/v1747850957/LOGO-09_4_11zon_joutfi.webp"
                // src={"/logo/casalina.png"}
                alt="Casalina Logo"
                width={200}
                height={200}
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

            {/* Desktop Schedule button */}
            <button className="hidden md:flex bg-secondary hover:bg-secondary-dark text-white rounded px-4 py-2 text-sm font-medium transition-colors ml-4">
              {t("schedule")}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div
            className="fixed top-[60px] inset-x-0 bottom-0 bg-white z-40 md:hidden"
            style={{
              animation: "fadeIn 0.2s ease-in-out forwards",
            }}
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

                {/* Schedule button */}
                <div className="px-4 py-6">
                  <button className="w-full bg-secondary hover:bg-secondary-dark text-white rounded-md py-3 text-base font-medium transition-colors">
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
