import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    reactCompiler: true,
    viewTransition: true,
  },
}

export default nextConfig
