"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import AnimatedSection from "@components/ui/AnimatedSection";

const PARTNERS = [
  {
    id: "novaforza",
    name: "NovaForza",
    logo: "https://res.cloudinary.com/dcuapqoii/image/upload/v1748037716/123_lps2yb.png",
  },
  {
    id: "casalina",
    name: "Casalina",
    logo: "https://res.cloudinary.com/dcuapqoii/image/upload/v1748037716/LOGO-12_zzdft1.png",
  },
  {
    id: "riviera-del-este",
    name: "Riviera Del Este",
    logo: "https://res.cloudinary.com/dcuapqoii/image/upload/v1748037715/gria_hlzos8.png",
  },
];

export default function Partners() {
  const t = useTranslations("home.partners");

  // Duplicamos los partners múltiples veces para un loop seamless
  const duplicatedPartners = [
    ...PARTNERS,
    ...PARTNERS,
    ...PARTNERS,
    ...PARTNERS,
    ...PARTNERS,
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-[1300px]">
        <AnimatedSection animation="fadeIn" threshold={0.3}>
          <div className="flex justify-center mb-6 md:mb-8">
            <span className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-semibold">
              {t("title")}
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeIn" delay={400} threshold={0.2}>
          <div className="relative overflow-hidden">
            <div className="absolute top-0 left-[-1px] w-16 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-[-1px] w-16 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <Swiper
              modules={[Autoplay]}
              spaceBetween={60}
              slidesPerView="auto"
              loop={true}
              loopAdditionalSlides={3}
              allowTouchMove={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                reverseDirection: false,
              }}
              speed={8000}
              freeMode={true}
              className="partners-infinite-slider"
            >
              {duplicatedPartners.map((partner, index) => (
                <SwiperSlide key={`${partner.id}-${index}`} className="!w-auto">
                  <div className="flex items-center justify-center px-0 sm:px-4">
                    <div className="w-32 h-16 relative grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        className="object-contain"
                        fill
                        sizes="128px"
                        priority={index < 3}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
