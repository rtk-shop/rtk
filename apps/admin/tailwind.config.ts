import type { Config } from 'tailwindcss'

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true
  },
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      gridTemplateRows: {
        'height-open': '1fr',
        'height-closed': '0fr'
      }
    }
  }
}

export default config
