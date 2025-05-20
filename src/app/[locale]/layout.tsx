import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@i18n/routing";
import { DM_Sans, Jost } from "next/font/google";
import "../globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
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
    "la romana",
    "república dominicana",
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
        alt: "Riviera del Este - Residencias de Lujo",
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
  const locale = params.locale;

  // Check if the locale is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Using dynamic import to load messages
  let messages;
  try {
    messages = (await import(`@i18n/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${dmSans.variable} ${jost.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="font-sans">
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
