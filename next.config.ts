import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Core performance
  reactStrictMode: true,
  swcMinify: true,

  // Experimental optimizations - solo las probadas
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // Build config
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Bundle optimization crítica
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000,
        maxSize: 200000, // Reducido para chunks más pequeños
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
          },
        },
      };
    }
    return config;
  },

  // Headers de performance
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
      ],
    },
    {
      source: "/images/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],

  // Image optimization - configuración más agresiva
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1200, 1920], // Reducido
    imageSizes: [32, 64, 128, 256], // Reducido
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: true,
  },

  // Compress
  compress: true,
  poweredByHeader: false,
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
