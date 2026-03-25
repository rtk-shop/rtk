import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  reactCompiler: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['urql', '@urql/exchange-auth']
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.rtkstore.org'
      }
    ]
  }
}

export default withNextIntl(nextConfig)
