import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
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
  }
}

export default withNextIntl(nextConfig)
