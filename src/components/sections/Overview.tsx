import { useTranslations } from "next-intl";
import { ImageSlider } from "@components/ui/ImageSlider";
import AnimatedSection from "@components/ui/AnimatedSection";

export default function Overview() {
  const t = useTranslations("home.overview");

  const overviewItems = [
    {
      id: "edif-premium",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/v1748409409/7_mrjkmj.png",
      title: t("items.edifPremium"),
    },
    {
      id: "terraza-ph",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/v1748409447/15_zo8u0b.png",
      title: t("items.terrazaPh"),
    },
    {
      id: "patio-1er-nivel",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/v1748409591/4_kssl2x.png",
      title: t("items.patio1erNivel"),
    },
    {
      id: "vista-interior",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/v1748409672/3_u9nij0.png",
      title: t("items.vistaInterior"),
    },
    {
      id: "edif-residence",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/v1748409620/5_apdyyx.png",
      title: t("items.edifResidence"),
    },
  ];

  return (
    <section id="overview" className="bg-primary text-white pt-9 md:pt-20">
      <div className="container mx-auto">
        <AnimatedSection
          animation="slideUp"
          className="mx-auto max-w-[1300px] px-4 flex flex-col space-y-6 mb-9"
          threshold={0.2}
        >
          <button className="self-center sm:self-start bg-white/10 backdrop-blur-sm text-sm uppercase font-medium px-4 py-1.5 rounded">
            {t("badge")}
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-start">
            <AnimatedSection animation="slideIn" delay={200}>
              <h1 className="text-3xl sm:text-5xl font-light leading-tight text-center sm:text-left">
                {t("title")}
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="slideIn" delay={400}>
              <p className="text-base sm:text-lg text-white/80 text-center sm:text-left">
                {t("description")}
              </p>
            </AnimatedSection>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeIn" delay={600} threshold={0.1}>
          <ImageSlider
            items={overviewItems}
            autoPlay={true}
            showGradients={true}
            gradientColor="primary"
          />
        </AnimatedSection>
      </div>
    </section>
  );
}
