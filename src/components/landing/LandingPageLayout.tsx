"use client";

import React from "react";
import Navbar from "@components/ui/Navbar";
import Hero from "@components/sections/Hero";
import { useSmoothScroll } from "@hooks/useSmoothScroll";

export default function LandingPageLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  useSmoothScroll();

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <main>{children}</main>
    </div>
  );
}
