"use client";

import { useCallback } from "react";

export function useScrollTo() {
  const scrollToSection = useCallback(
    (sectionId: string, e?: React.MouseEvent<HTMLElement>) => {
      if (e) {
        e.preventDefault();
      }

      // Get Lenis instance if available
      const lenis = (window as any).lenis;

      if (lenis) {
        // Use Lenis for smooth scrolling
        lenis.scrollTo(`#${sectionId}`, {
          offset: -80, // Adjust for navbar height
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        // Fallback if Lenis is not available
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    []
  );

  return scrollToSection;
}
