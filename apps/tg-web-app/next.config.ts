import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
// import svg from '@neodx/svg/webpack'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // webpack(config, options) {
  //   if (options.isServer) {
  //     config.plugins.push(
  //       svg({
  //         root: 'public/svg-icons',
  //         output: 'public/sprites',
  //         group: true,
  //         fileName: '{name}.{hash:8}.svg',
  //         metadata: {
  //           path: 'src/sprite.gen.ts',
  //           runtime: {
  //             size: true,
  //             viewBox: true
  //           }
  //         }
  //       })
  //     )
  //   }

  //   return config
  // },
  experimental: {
    optimizePackageImports: ['urql', '@urql/exchange-auth']
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
