import { createSvgSpriteBuilder } from '@neodx/svg'

// https://neodx.pages.dev/svg/setup/node.html
const builder = createSvgSpriteBuilder({
  inputRoot: 'public/svg-icons',
  output: 'public/sprites',
  fileName: '{name}.{hash:8}.svg',
  metadata: {
    path: 'src/sprite.gen.ts',
    runtime: {
      size: true,
      viewBox: true
    }
  },
  group: true
})

await builder.load('**/*.svg') // Find all SVGs
await builder.build() // Build sprites & metadata
