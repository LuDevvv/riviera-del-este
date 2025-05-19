"use client";

import React, { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { LatLngTuple, Map, Icon as LeafletIcon } from "leaflet";
import { MapPin } from "lucide-react";

// Dynamically import Leaflet components
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const ZoomControl = dynamic(
  () => import("react-leaflet").then((mod) => mod.ZoomControl),
  { ssr: false }
);

// Helper component to handle map interactions
interface MapEventHandlerProps {
  setMapActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function MapEventHandler({ setMapActive }: MapEventHandlerProps) {
  // Import useMap directly here, since it's a hook
  const { useMap } = require("react-leaflet");
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const enableMapInteraction = () => {
      setMapActive(true);
      map.scrollWheelZoom.enable();
    };

    const disableMapInteraction = () => {
      setMapActive(false);
      map.scrollWheelZoom.disable();
    };

    // Get the map container element
    const mapContainer = map.getContainer();

    // Enable map interaction on click or touch
    map.on("click", enableMapInteraction);
    map.on("touchstart", enableMapInteraction);

    // Disable scroll zoom when mouse leaves the map area
    mapContainer.addEventListener("mouseleave", disableMapInteraction);

    return () => {
      // Clean up all event listeners
      if (mapContainer) {
        mapContainer.removeEventListener("mouseleave", disableMapInteraction);
      }
      map.off("click", enableMapInteraction);
      map.off("touchstart", enableMapInteraction);
    };
  }, [setMapActive, map]);

  return null;
}

export default function Location() {
  const t = useTranslations("home.location");
  const [mapIcon, setMapIcon] = useState<LeafletIcon | null>(null);
  const [mapActive, setMapActive] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Riviera del Este location
  const position: LatLngTuple = [18.428611, -68.972778];
  const buildingImage =
    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg";

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((L) => {
        setMapIcon(
          new L.Icon({
            iconUrl: "/images/map-marker.svg",
            iconSize: [60, 60],
            iconAnchor: [30, 60],
          })
        );
      });
    }

    // Add global scroll listener to reset map active state when scrolling the page
    const handleGlobalScroll = () => {
      if (mapActive && mapRef.current) {
        // Check if we're scrolling outside the map's bounding rect
        const mapRect = mapRef.current.getBoundingClientRect();
        const isOutsideMapY =
          window.scrollY < mapRect.top || window.scrollY > mapRect.bottom;

        if (isOutsideMapY) {
          setMapActive(false);
        }
      }
    };

    window.addEventListener("scroll", handleGlobalScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleGlobalScroll);
    };
  }, [mapActive]);

  return (
    <section id="location" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-[1100px]">
        <div className="flex justify-center mb-4">
          <span className="bg-gray-100 text-gray-800 px-6 py-2 rounded-full text-sm font-semibold">
            {t("badge")}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-display text-center font-medium mb-8 text-black">
          {t("title")}
        </h2>

        {/* Mobile card - shown only on small screens */}
        <div className="md:hidden mb-4">
          <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t("propertyName")}
              </h3>

              <div className="flex items-start mb-3">
                <MapPin
                  className="text-secondary mr-2 flex-shrink-0 mt-0.5"
                  size={18}
                />
                <div>
                  <p className="text-gray-800 text-sm">{t("address1")}</p>
                  <p className="text-gray-800 text-sm">{t("address2")}</p>
                </div>
              </div>

              <table className="w-full text-sm border-collapse border-t border-gray-100 pt-2">
                <tbody>
                  <tr>
                    <td className="py-2 text-gray-700 font-medium">
                      {t("latitude")}
                    </td>
                    <td className="py-2 text-gray-800 text-right">
                      {position[0].toFixed(6)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-700 font-medium">
                      {t("longitude")}
                    </td>
                    <td className="py-2 text-gray-800 text-right">
                      {position[1].toFixed(6)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="relative h-[180px] w-full">
              <Image
                src={buildingImage}
                alt="Riviera del Este"
                fill
                sizes="(max-width: 768px) 100vw, 280px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Map container with rounded corners and shadow */}
        <div
          className="relative w-full h-[350px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg"
          ref={mapRef}
        >
          {/* Map */}
          <div className="absolute inset-0 w-full h-full z-0">
            {typeof window !== "undefined" && (
              <>
                <link
                  rel="stylesheet"
                  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                  integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                  crossOrigin=""
                />

                {/* Map interaction overlay - shown only when map is inactive */}
                {!mapActive && (
                  <div
                    className="absolute inset-0 z-20 bg-black bg-opacity-5 flex items-center justify-center cursor-pointer"
                    onClick={() => setMapActive(true)}
                  >
                    <div className="bg-white p-3 rounded-full shadow-md">
                      <MapPin className="text-secondary" size={24} />
                    </div>
                    <span className="sr-only">Click to activate map</span>
                  </div>
                )}

                {mapIcon ? (
                  <MapContainer
                    center={position}
                    zoom={16}
                    style={{ height: "100%", width: "100%" }}
                    scrollWheelZoom={false}
                    attributionControl={false}
                    zoomControl={false}
                    className="rounded-2xl"
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={position} icon={mapIcon} />
                    <ZoomControl position="bottomright" />
                    <MapEventHandler setMapActive={setMapActive} />
                  </MapContainer>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Desktop unified card with image - hidden on mobile */}
          <div className="hidden md:block absolute top-10 left-10 w-[350px] z-10">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Card content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t("propertyName")}
                </h3>

                <div className="flex items-start mb-4">
                  <MapPin
                    className="text-secondary mr-2 flex-shrink-0 mt-0.5"
                    size={18}
                  />
                  <div>
                    <p className="text-gray-800 text-sm">{t("address1")}</p>
                    <p className="text-gray-800 text-sm">{t("address2")}</p>
                  </div>
                </div>

                <table className="w-full text-sm border-collapse border-t border-gray-100 pt-3">
                  <tbody>
                    <tr>
                      <td className="py-2 text-gray-700 font-medium">
                        {t("latitude")}
                      </td>
                      <td className="py-2 text-gray-800 text-right">
                        {position[0].toFixed(6)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-700 font-medium">
                        {t("longitude")}
                      </td>
                      <td className="py-2 text-gray-800 text-right">
                        {position[1].toFixed(6)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Image directly attached to the card */}
              <div className="relative h-[180px] w-full">
                <Image
                  src={buildingImage}
                  alt="Riviera del Este"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
