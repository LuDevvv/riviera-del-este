import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@i18n/routing";
import { Geist } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  metadataBase: new URL("https://rivieradeleste.com"),
  title: {
    default: "Riviera del Este - Residencias de Lujo",
    template: "%s | Riviera del Este",
  },
  description:
    "Descubre las exclusivas residencias de Riviera del Este. Apartamentos de lujo con las mejores amenidades.",
  keywords: [
    "apartamentos",
    "bienes raíces",
    "inversión inmobiliaria",
    "residencias de lujo",
    "riviera del este",
  ],
  openGraph: {
    type: "website",
    locale: "es_DO",
    url: "https://rivieradeleste.com",
    siteName: "Riviera del Este",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Riviera del Este - Residencias de Lujo",
    description: "Descubre las exclusivas residencias de Riviera del Este.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!hasLocale(routing.locales, params.locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${params.locale}.json`))
    .default;

  return (
    <html
      lang={params.locale}
      className={`${geistSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider
          locale={params.locale}
          messages={messages}
          timeZone="America/Santo_Domingo"
        >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
