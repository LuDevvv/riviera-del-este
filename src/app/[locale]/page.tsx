import React from "react";
import LandingPageLayout from "@components/landing/LandingPageLayout";
import Contact from "@components/sections/Contact";
import Partners from "@components/sections/Partners";
import Location from "@components/sections/Location";
import Amenities from "@components/sections/Amenities";
import Properties from "@components/sections/Properties";
import Overview from "@components/sections/Overview";
import Gallery from "@components/sections/Gallery";

export default function Home() {
  return (
    <LandingPageLayout>
      <Overview />
      <Amenities />
      <Properties />
      <Gallery />
      <Location />
      <Partners />
      <Contact />
    </LandingPageLayout>
  );
}
