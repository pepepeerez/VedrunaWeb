import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", 
  images: {
    domains: ["lh3.googleusercontent.com"], // ✅ Google profile images
  },
};

export default nextConfig;
