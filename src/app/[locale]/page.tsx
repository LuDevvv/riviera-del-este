import React from "react";
import LandingPageLayout from "@components/landing/LandingPageLayout";
import Contact from "@components/sections/Contact";

export default function Home() {
  return (
    <LandingPageLayout>
      {/* Overview Section Placeholder */}
      <section id="overview" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center font-display mb-12">
            Overview Section
          </h2>
        </div>
      </section>

      {/* Rooms Section Placeholder */}
      <section id="rooms" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center font-display mb-12">
            Rooms Section
          </h2>
        </div>
      </section>

      {/* Gallery Section Placeholder */}
      <section id="gallery" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center font-display mb-12">
            Gallery Section
          </h2>
        </div>
      </section>

      {/* Floorplan Section Placeholder */}
      <section id="floorplan" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center font-display mb-12">
            Floorplan Section
          </h2>
        </div>
      </section>

      <Contact />

      {/* Footer Placeholder */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <p className="text-center">
            © {new Date().getFullYear()} Riviera del Este. All rights reserved.
          </p>
        </div>
      </footer>
    </LandingPageLayout>
  );
}
