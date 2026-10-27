import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // GoDaddy Airo-preview laadt de dev-server via een eigen domein; zonder deze regel blokkeert
  // Next.js de HMR-verbinding (cross-origin) vanaf dat domein.
  allowedDevOrigins: ["*.airoapp.ai", "68p1ucn8j1.preview.c35.airoapp.ai"],
  transpilePackages: ["three"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
