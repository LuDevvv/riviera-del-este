import { useTranslations } from "next-intl";
import { ImageSlider } from "@components/ui/ImageSlider";

export default function Overview() {
  const t = useTranslations("home.overview");

  const overviewItems = [
    {
      id: "master-bedroom",
      image:
        "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg",
      title: "Master Bedroom",
    },
    {
      id: "bathroom",
      image:
        "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
      title: "Bathroom",
    },
    {
      id: "kitchen",
      image:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      title: "Kitchen",
    },
  ];

  return (
    <section id="overview" className="bg-primary text-white pt-9 md:pt-20">
      <div className="container mx-auto">
        <div className="mx-auto max-w-[1300px] px-4 flex flex-col space-y-6 mb-9">
          <button className="self-center sm:self-start bg-white/10 backdrop-blur-sm text-sm uppercase font-medium px-4 py-1.5 rounded">
            {t("badge")}
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-start">
            <h1 className="text-3xl sm:text-5xl font-light leading-tight text-center sm:text-left">
              {t("title")}
            </h1>
            <p className="text-base sm:text-lg text-white/80 text-center sm:text-left">
              {t("description")}
            </p>
          </div>
        </div>

        <ImageSlider items={overviewItems} autoPlay={true} />
      </div>
    </section>
  );
}
