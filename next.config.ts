import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Enable static optimization for better SEO
  output: 'standalone',
  // Optimize images for SEO
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable compression for better performance
  compress: true,
  // Optimize build performance
  experimental: {
    // 启用并行构建（如果支持）
    optimizePackageImports: ['lucide-react'],
  },
  // Note: swcMinify is enabled by default in Next.js 16, no need to specify
};

export default nextConfig;
