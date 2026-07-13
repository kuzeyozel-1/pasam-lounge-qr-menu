import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Admin panelden yönetilen logo/favicon/ürün görselleri dış URL olabilir.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
