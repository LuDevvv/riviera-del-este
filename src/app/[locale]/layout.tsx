import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@i18n/routing";
import { DM_Sans, Jost } from "next/font/google";
import "../globals.css";
import "@styles/minimal-animations.css";
import type { Metadata } from "next";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  preload: true,
  weight: ["400", "500", "600"],
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "arial"],
});

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
  preload: false,
  weight: ["400", "500"],
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://riviera.casalinainmobiliaria.com"),
  title: {
    default: "Riviera del Este - Residencias de Lujo en San Pedro de Macorís",
    template: "%s | Riviera del Este",
  },
  description:
    "Descubre Riviera del Este: apartamentos de lujo de 2 y 3 habitaciones en San Pedro de Macorís. Penthouse premium, amenidades exclusivas y vistas espectaculares. Reserva desde $1,000 USD. Feria inmobiliaria 6-8 junio 2025.",

  keywords: [
    "Riviera del Este",
    "apartamentos lujo San Pedro Macorís",
    "residencias premium República Dominicana",
    "penthouse terraza",
    "propiedades frente al mar",
    "Casalina Inmobiliaria",
    "apartamentos 2 habitaciones",
    "apartamentos 3 habitaciones",
    "reserva $1000 USD",
    "amenidades premium",
    "piscina gimnasio",
    "Santos Alcalá",
  ],

  authors: [{ name: "Casalina Inmobiliaria" }],
  creator: "Casalina Inmobiliaria",
  publisher: "Casalina Inmobiliaria",

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

  // Open Graph optimized for real estate
  openGraph: {
    type: "website",
    locale: "es_DO",
    alternateLocale: ["en_US"],
    url: "https://riviera.casalinainmobiliaria.com",
    siteName: "Riviera del Este",
    title: "Riviera del Este - Residencias de Lujo en San Pedro de Macorís",
    description:
      "Apartamentos premium de 2-3 habitaciones con amenidades exclusivas. Penthouse con terraza, piscina, gimnasio y más. Reserva desde $1,000 USD.",
    images: [
      {
        url: "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,h_630,c_fill,g_center,f_auto,q_85/v1748404975/18_iy0cos.png",
        width: 1200,
        height: 630,
        alt: "Riviera del Este - Apartamentos de lujo con vista panorámica",
        type: "image/png",
      },
      {
        url: "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,h_630,c_fill,g_center,f_auto,q_85/v1748409409/7_mrjkmj.png",
        width: 1200,
        height: 630,
        alt: "Edificio Premium Riviera del Este",
        type: "image/png",
      },
    ],
  },

  // Twitter Card optimized
  twitter: {
    card: "summary_large_image",
    site: "@casalinasrl",
    creator: "@casalinasrl",
    title: "Riviera del Este - Residencias de Lujo",
    description:
      "Apartamentos premium en San Pedro de Macorís. Penthouse, amenidades exclusivas. Reserva desde $1,000 USD.",
    images: [
      {
        url: "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,h_630,c_fill,g_center,f_auto,q_85/v1748404975/18_iy0cos.png",
        alt: "Riviera del Este - Vista exterior del complejo residencial",
      },
    ],
  },

  // Enhanced icons with multiple sizes
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#3C7269" },
    ],
  },

  manifest: "/site.webmanifest",

  // Additional meta tags
  other: {
    "msapplication-TileColor": "#3C7269",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#3C7269",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "mobile-web-app-capable": "yes",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@i18n/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${dmSans.variable} ${jost.variable}`}
      prefix="og: https://ogp.me/ns#"
    >
      <head>
        {/* DNS prefetch for external resources */}
        <link
          rel="preconnect"
          href="https://res.cloudinary.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://wa.me" />

        {/* Preload critical hero image */}
        <link
          rel="preload"
          href="https://res.cloudinary.com/dcuapqoii/image/upload/w_1920,h_1080,c_fill,g_center,f_auto,q_75/v1748404975/18_iy0cos.png"
          as="image"
          type="image/png"
        />

        {/* Viewport with enhanced mobile support */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
        />

        {/* Enhanced format detection */}
        <meta
          name="format-detection"
          content="telephone=no, date=no, address=no, email=no"
        />

        {/* Apple specific tags */}
        <meta name="apple-mobile-web-app-title" content="Riviera del Este" />
        <meta name="application-name" content="Riviera del Este" />

        {/* Business/Location specific meta tags */}
        <meta name="geo.region" content="DO-17" />
        <meta name="geo.placename" content="San Pedro de Macorís" />
        <meta name="geo.position" content="18.4502;-69.3233" />
        <meta name="ICBM" content="18.4502, -69.3233" />

        {/* Local business schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "Riviera del Este - Casalina Inmobiliaria",
              image:
                "https://res.cloudinary.com/dcuapqoii/image/upload/v1748404975/18_iy0cos.png",
              description:
                "Residencias de lujo en San Pedro de Macorís con amenidades premium",
              url: "https://riviera.casalinainmobiliaria.com",
              telephone: "+1-809-299-5767",
              email: "info@casalinainmobiliaria.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Calle Santos Alcalá",
                addressLocality: "San Pedro de Macorís",
                postalCode: "21000",
                addressCountry: "DO",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 18.4502,
                longitude: -69.3233,
              },
              openingHours: "Mo-Su 10:00-17:00",
              sameAs: [
                "https://www.facebook.com/casalinainmobiliaria",
                "https://www.instagram.com/casalinasrl/",
              ],
            }),
          }}
        />
      </head>

      <body
        className="antialiased font-sans bg-white text-gray-900"
        suppressHydrationWarning
      >
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="America/Santo_Domingo"
        >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
