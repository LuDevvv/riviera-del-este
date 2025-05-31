"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ImageSlider } from "@components/ui/ImageSlider";
import FilterTabs, { FilterOption } from "@components/ui/FilterTabs";
import AnimatedSection from "@components/ui/AnimatedSection";

export default function Gallery() {
  const t = useTranslations("home.gallery");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "exterior" | "interior" | "facilities"
  >("all");

  const galleryItems = [
    {
      id: "interior-1",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748404860/20_ryjnxq.png",
      category: "interior",
    },
    {
      id: "interior-2",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748404859/28_p8wsq7.png",
      category: "interior",
    },
    {
      id: "interior-3",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748404855/19_nqm6zq.png",
      category: "interior",
    },
    {
      id: "interior-4",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748404855/26_sneq4l.png",
      category: "interior",
    },
    {
      id: "interior-5",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748404851/24_wa6ukv.png",
      category: "interior",
    },
    {
      id: "interior-6",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748404849/27_eglygn.png",
      category: "interior",
    },
    {
      id: "interior-7",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748404849/21_grblwz.png",
      category: "interior",
    },
    {
      id: "interior-8",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748404849/30_tepkfk.png",
      category: "interior",
    },
    {
      id: "interior-9",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748404846/23_tlgckx.png",
      category: "interior",
    },
    {
      id: "interior-10",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748404839/22_vakajx.png",
      category: "interior",
    },
    {
      id: "interior-11",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748404838/32_gifqib.png",
      category: "interior",
    },
    {
      id: "interior-12",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748404838/3_hgtsro.png",
      category: "interior",
    },
    {
      id: "interior-13",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748404834/31_ycdtxk.png",
      category: "interior",
    },
    {
      id: "interior-14",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748404830/33_usmyys.png",
      category: "interior",
    },
    {
      id: "interior-15",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748404830/29_rkwdio.png",
      category: "interior",
    },
    {
      id: "exterior-1",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748405009/25_xjhv0i.png",
      category: "exterior",
    },
    {
      id: "exterior-2",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748405005/16_pwyn5g.png",
      category: "exterior",
    },
    {
      id: "exterior-3",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748405003/9_jodkkp.png",
      category: "exterior",
    },
    {
      id: "exterior-4",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748405003/15_lpm9ir.png",
      category: "exterior",
    },
    {
      id: "exterior-5",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748405002/11_lfrori.png",
      category: "exterior",
    },
    {
      id: "exterior-6",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748405000/4_izeawj.png",
      category: "exterior",
    },
    {
      id: "exterior-7",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748404995/2_tmluug.png",
      category: "exterior",
    },
    {
      id: "exterior-8",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748404982/17_b8esiz.png",
      category: "exterior",
    },
    {
      id: "exterior-9",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748404977/10_b0xosz.png",
      category: "exterior",
    },
    {
      id: "exterior-10",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748404975/18_iy0cos.png",
      category: "exterior",
    },
    {
      id: "exterior-11",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748404974/34_uxkcf4.png",
      category: "exterior",
    },
    {
      id: "facilities-1",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748409905/14_xpjwhg.png",
      category: "facilities",
    },
    {
      id: "facilities-2",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748409881/13_vuxlg0.png",
      category: "facilities",
    },
    {
      id: "facilities-3",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,f_auto,q_85/v1748404987/12_u2jqa8.png",
      category: "facilities",
    },
  ];

  const filterOptions: FilterOption<
    "all" | "exterior" | "interior" | "facilities"
  >[] = [
    { value: "all", label: t("viewAll") },
    { value: "exterior", label: t("exterior") },
    { value: "interior", label: t("interior") },
    { value: "facilities", label: t("facilities") },
  ];

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-[1300px]">
        <AnimatedSection animation="fadeIn" threshold={0.3}>
          <div className="flex justify-center mb-4">
            <span className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-semibold">
              {t("badge")}
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={200} threshold={0.3}>
          <h2 className="text-3xl md:text-4xl font-display text-center font-medium mb-4 text-black">
            {t("title")}
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={400} threshold={0.3}>
          <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </AnimatedSection>

        <AnimatedSection
          animation="scaleIn"
          delay={600}
          threshold={0.3}
          className="mb-8 flex justify-center items-center"
        >
          <FilterTabs
            options={filterOptions}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            variant="secondary"
          />
        </AnimatedSection>

        <AnimatedSection animation="fadeIn" delay={800} threshold={0.2}>
          <ImageSlider
            items={filteredItems}
            showGradients={false}
            backgroundColor="bg-white"
            autoPlay={true}
          />
        </AnimatedSection>
      </div>
    </section>
  );
}
