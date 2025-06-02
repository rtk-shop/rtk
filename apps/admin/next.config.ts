import type { NextConfig } from 'next'
// import svg from '@neodx/svg/webpack'

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['urql', '@urql/exchange-auth']
  },
  /*
    @neodx/svg does not support turbopack.
    Run without --turbopack, comment out after use
  */
  // webpack(config, options) {
  //   if (options.isServer) {
  //     config.plugins.push(
  //       svg({
  //         root: '../../packages/icons/admin',
  //         output: 'public/sprites',
  //         group: true,
  //         fileName: '{name}.{hash:8}.svg',
  //         metadata: {
  //           path: './src/sprite.gen.ts',
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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.rtkstore.org'
      }
    ]
  }
}

export default nextConfig
