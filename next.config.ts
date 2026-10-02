import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A v3 virou a página principal; links antigos para /v3 caem na home.
  async redirects() {
    return [{ source: "/v3", destination: "/", permanent: true }]
  },
};

export default nextConfig;
