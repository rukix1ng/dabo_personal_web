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
  // 优化构建性能
  typescript: {
    // 构建时不进行类型检查（类型检查在开发时进行）
    ignoreBuildErrors: false,
  },
  eslint: {
    // 构建时不进行 ESLint 检查（检查在开发时进行）
    ignoreDuringBuilds: false,
  },
  // Note: swcMinify is enabled by default in Next.js 16, no need to specify
};

export default nextConfig;
