import path from 'path'
import svg from '@neodx/svg/webpack'
import { fileURLToPath } from 'url'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the director

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import '@/styles/scss-globals.scss';`
  },
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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  }
}

export default withNextIntl(nextConfig)
