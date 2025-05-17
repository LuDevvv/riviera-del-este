"use client";

import React from "react";
import Navbar from "@components/ui/Navbar";
import Hero from "@components/ui/Hero";

export default function LandingPageLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <main>{children}</main>
    </div>
  );
}
