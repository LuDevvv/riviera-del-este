import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@i18n/routing";
import { DM_Sans, Jost } from "next/font/google";
import { Suspense } from "react";
import "../globals.css";
import "@styles/minimal-animations.css";
import type { Metadata } from "next";

// Optimize font loading
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  preload: true,
  weight: ["400", "500", "600"],
  fallback: ["system-ui", "arial"],
});

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
  preload: false,
  weight: ["400", "500"],
  fallback: ["georgia", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rivieradeleste.com"),
  title: {
    default: "Riviera del Este - Residencias de Lujo",
    template: "%s | Riviera del Este",
  },
  description:
    "Descubre las exclusivas residencias de Riviera del Este. Apartamentos de lujo en San Pedro de Macorís con vistas al mar y amenidades premium.",

  // Open Graph for social sharing
  openGraph: {
    title: "Riviera del Este - Residencias de Lujo",
    description: "Apartamentos de lujo frente al mar en San Pedro de Macorís",
    url: "https://rivieradeleste.com",
    siteName: "Riviera del Este",
    images: [
      {
        url: "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,h_630,c_fill,f_auto,q_auto/v1748404975/18_iy0cos.png",
        width: 1200,
        height: 630,
        alt: "Riviera del Este - Vista panorámica",
      },
    ],
    locale: "es_DO",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Riviera del Este - Residencias de Lujo",
    description: "Apartamentos de lujo frente al mar en San Pedro de Macorís",
    images: [
      "https://res.cloudinary.com/dcuapqoii/image/upload/w_1200,h_630,c_fill,f_auto,q_auto/v1748404975/18_iy0cos.png",
    ],
  },

  // Favicon optimized
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#3C7269",
    "theme-color": "#3C7269",
  },
};

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
      <div className="text-center text-white">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-medium">Cargando...</p>
      </div>
    </div>
  );
}

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
    <html lang={locale} className={`${dmSans.variable} ${jost.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link
          rel="preload"
          href="https://res.cloudinary.com/dcuapqoii/image/upload/w_1920,q_75,f_auto/v1748404975/18_iy0cos.png"
          as="image"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="America/Santo_Domingo"
        >
          <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
