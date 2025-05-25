// src/app/[locale]/layout.tsx - Solo optimizaciones críticas
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@i18n/routing";
import { DM_Sans, Jost } from "next/font/google";
import { Suspense } from "react";
import "../globals.css";
import "../styles/minimal-animations.css";

// Optimización: preload solo las fuentes esenciales
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  preload: true,
  weight: ["400", "500", "600"], // Solo los pesos que usamos
});

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
  preload: false, // No precargar si es secundaria
  weight: ["400", "500"],
});

export const metadata = {
  metadataBase: new URL("https://rivieradeleste.com"),
  title: {
    default: "Riviera del Este - Residencias de Lujo",
    template: "%s | Riviera del Este",
  },
  description:
    "Descubre las exclusivas residencias de Riviera del Este. Apartamentos de lujo en San Pedro de Macorís.",
  // Reducir metadata no esencial
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;

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
        {/* Solo preloads críticos */}
        <link
          rel="preload"
          href="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
          as="image"
          type="image/jpeg"
          fetchPriority="high"
        />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://images.pexels.com" />

        {/* Critical CSS inline - solo lo esencial */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body { 
              font-family: var(--font-dm-sans, system-ui); 
              margin: 0;
              padding: 0;
            }
            .loading-skeleton { 
              background: #f0f0f0; 
              animation: pulse 1.5s ease-in-out infinite alternate;
            }
            @keyframes pulse { to { opacity: 0.6; } }
          `,
          }}
        />
      </head>

      <body className="antialiased" suppressHydrationWarning>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="America/Santo_Domingo"
        >
          <Suspense
            fallback={
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="loading-skeleton w-full h-16 rounded" />
              </div>
            }
          >
            {children}
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
