import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  typescript: {
    // Fix SafeMDX.
    ignoreBuildErrors: true
  }
};

export default nextConfig;
