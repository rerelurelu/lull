import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  typedRoutes: true,
  experimental: {
    reactCompiler: true,
    viewTransition: true,
  },
}

export default nextConfig
