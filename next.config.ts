import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"], // Permite cargar imágenes desde Google
  },
};

export default nextConfig;
