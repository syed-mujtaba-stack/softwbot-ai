import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "whatsapp-web.js",
    "qrcode",
    "puppeteer-core",
    "puppeteer",
    "@aws-sdk/client-s3",
  ],
};

export default nextConfig;
