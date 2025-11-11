import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  reactCompiler: true,
  experimental: {
    viewTransition: true,
  },
}

export default nextConfig
