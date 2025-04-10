import type { NextConfig } from 'next'
import svg from '@neodx/svg/webpack'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

// import path from 'path'
// import { fileURLToPath } from 'url'
// const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
// const __dirname = path.dirname(__filename) // get the name of the director

// import os from 'os'

// const interfaces = os.networkInterfaces()

// const localIps = Object.values(interfaces)
//   .flat()
//   .filter((iface) => iface.family === 'IPv4' && !iface.internal)
//   .map((iface) => `http://${iface.address}:8080`)

// const allowedDevOrigins = ['http://localhost:3000', ...localIps]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    if (options.isServer) {
      config.plugins.push(
        svg({
          root: 'public/svg-icons',
          output: 'public/sprites',
          group: true,
          fileName: '{name}.{hash:8}.svg',
          metadata: {
            path: 'src/sprite.gen.ts',
            runtime: {
              size: true,
              viewBox: true
            }
          }
        })
      )
    }

    return config
  },
  experimental: {
    optimizePackageImports: ['react-select', 'react-hook-form']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.rtkstore.org'
      }
    ]
  },
  devIndicators: {
    position: 'top-right'
  }
}

export default withNextIntl(nextConfig)
