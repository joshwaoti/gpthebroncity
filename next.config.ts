import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed `output: "export"` — required for Convex Auth (server-side cookie reading)
  // and any dynamic server rendering. The app runs as a standard Next.js server.
};

export default nextConfig;
