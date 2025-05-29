"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { MapPin, ExternalLink } from "lucide-react";

export default function Location() {
  const t = useTranslations("home.location");

  // Real coordinates from Google Maps
  const buildingImage =
    "https://res.cloudinary.com/dcuapqoii/image/upload/w_600,q_70,f_auto,c_fill/v1748404986/1_xwydtj.png";
  const googleMapsUrl =
    "https://www.google.com/maps/place/18%C2%B027'00.7%22N+69%C2%B019'24.0%22W/@18.4506609,-69.3237455,17.61z/data=!4m4!3m3!8m2!3d18.4501944!4d-69.3233333?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D";

  return (
    <section id="location" className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-[1300px]">
        <div className="flex justify-center mb-4">
          <span className="bg-gray-100 text-gray-800 px-6 py-2 rounded-full text-sm font-semibold">
            {t("badge")}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-display text-center font-medium mb-8 text-black">
          {t("title")}
        </h2>

        {/* Mobile card */}
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

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-gray-700 font-medium text-sm">
                  {t("coordinates")}
                </span>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-secondary hover:text-secondary-dark text-sm font-medium"
                >
                  {t("openMaps")}
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
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

        {/* Map container */}
        <div className="relative w-full h-[350px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
          {/* Embedded Google Map */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d2486.5216227206597!2d-69.32374545219207!3d18.45066089388451!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDI3JzAwLjciTiA2OcKwMTknMjQuMCJX!5e0!3m2!1sen!2sdo!4v1748022438996!5m2!1sen!2sdo"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl"
            title="Riviera del Este Location"
          />

          {/* Desktop info card overlay */}
          <div className="hidden md:block absolute top-6 left-6 w-[350px] z-10">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                    <p className="text-gray-600 text-xs mt-1">
                      {t("reference")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-gray-700 font-medium text-sm">
                    {t("coordinates")}
                  </span>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-secondary hover:text-secondary-dark text-sm font-medium transition-colors"
                  >
                    {t("openMaps")}
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>

              <div className="relative h-[140px] w-full">
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
