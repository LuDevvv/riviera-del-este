import { useTranslations } from "next-intl";
import { ImageSlider } from "@components/ui/ImageSlider";

export default function Overview() {
  const t = useTranslations("home.overview");

  const overviewItems = [
    {
      id: "edif-premium",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_900,q_70,f_auto,c_fill/v1748409409/7_mrjkmj.png",
      title: t("items.edifPremium"),
    },
    {
      id: "terraza-ph",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_900,q_70,f_auto,c_fill/v1748409447/15_zo8u0b.png",
      title: t("items.terrazaPh"),
    },
    {
      id: "patio-1er-nivel",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_900,q_70,f_auto,c_fill/v1748409591/4_kssl2x.png",
      title: t("items.patio1erNivel"),
    },
    {
      id: "vista-interior",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_900,q_70,f_auto,c_fill/v1748409672/3_u9nij0.png",
      title: t("items.vistaInterior"),
    },
    {
      id: "edif-residence",
      image:
        "https://res.cloudinary.com/dcuapqoii/image/upload/w_900,q_70,f_auto,c_fill/v1748409620/5_apdyyx.png",
      title: t("items.edifResidence"),
    },
  ];

  return (
    <section id="overview" className="bg-primary text-white pt-9 md:pt-20">
      <div className="container mx-auto">
        <div className="mx-auto max-w-[1300px] px-4 flex flex-col space-y-6 mb-9 opacity-0 translate-y-4 animate-[slideUpFade_800ms_ease-out_200ms_forwards]">
          <button className="self-center sm:self-start bg-white/10 backdrop-blur-sm text-sm uppercase font-medium px-4 py-1.5 rounded">
            {t("badge")}
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-start">
            <div className="opacity-0 -translate-x-4 animate-[slideInLeft_700ms_ease-out_400ms_forwards]">
              <h1 className="text-3xl sm:text-5xl font-light leading-tight text-center sm:text-left">
                {t("title")}
              </h1>
            </div>

            <div className="opacity-0 -translate-x-4 animate-[slideInLeft_700ms_ease-out_600ms_forwards]">
              <p className="text-base sm:text-lg text-white/80 text-center sm:text-left">
                {t("description")}
              </p>
            </div>
          </div>
        </div>

        <div className="opacity-0 animate-[fadeIn_900ms_ease-out_800ms_forwards]">
          <ImageSlider
            items={overviewItems}
            autoPlay={true}
            showGradients={true}
            gradientColor="primary"
          />
        </div>
      </div>
    </section>
  );
}
