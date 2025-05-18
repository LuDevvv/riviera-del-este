import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Optimización de rendimiento
  reactStrictMode: true,
  swcMinify: true,

  // Configuraciones de SEO y rendimiento
  poweredByHeader: false,

  // Optimización de imágenes
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rivieradeleste.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "madebydesignesia.com",
        port: "",
        pathname: "/themes/residem/images/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Seguridad y headers
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains; preload",
        },
      ],
    },
  ],

  // Otras optimizaciones
  compress: true,

  // Configuración de webpack (opcional)
  webpack: (config, { isServer }) => {
    // Optimizaciones específicas
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        maxInitialRequests: 30,
        maxAsyncRequests: 30,
      };
    }
    return config;
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
