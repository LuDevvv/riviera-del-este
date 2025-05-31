import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Core performance
  reactStrictMode: true,

  // Experimental optimizations
  experimental: {
    optimizePackageImports: ["lucide-react"],
    // Optimizar carga de imágenes
    optimizeCss: true,
  },

  // Build config
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Bundle optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000,
        maxSize: 200000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
          },
          // Cache específico para imágenes
          images: {
            test: /\.(png|jpg|jpeg|gif|svg|webp|avif)$/,
            name: "images",
            chunks: "all",
            priority: 5,
          },
        },
      };
    }
    return config;
  },

  // Headers optimizados para Cloudinary y performance
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        // Preconectar con Cloudinary
        {
          key: "Link",
          value: [
            "<https://res.cloudinary.com>; rel=preconnect; crossorigin",
            "<https://res.cloudinary.com>; rel=dns-prefetch",
          ].join(", "),
        },
      ],
    },
    {
      // Cache agresivo para assets de Cloudinary
      source: "/images/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      // Headers específicos para recursos de Cloudinary
      source: "/:path*",
      has: [
        {
          type: "host",
          value: "res.cloudinary.com",
        },
      ],
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
        {
          key: "Access-Control-Allow-Origin",
          value: "*",
        },
      ],
    },
  ],

  // Image optimization específica para Cloudinary
  images: {
    // Formatos modernos con prioridad
    formats: ["image/avif", "image/webp"],

    // Tamaños optimizados para el diseño responsive
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Configuración específica para Cloudinary
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],

    // Cache más largo para imágenes
    minimumCacheTTL: 86400 * 30, // 30 días

    // Permitir SVG de Cloudinary
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // Desactivar optimización de Next.js para usar las de Cloudinary
    unoptimized: false,

    // Configuración de loading
    loader: "default",
  },

  // Compress
  compress: true,
  poweredByHeader: false,

  // Optimización de recursos estáticos
  assetPrefix: process.env.NODE_ENV === "production" ? "" : "",

  // Configuración de PWA/Service Worker para cache
  ...(process.env.NODE_ENV === "production" && {
    swcMinify: true,
  }),
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
