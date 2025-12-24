import type { Config } from 'tailwindcss'
// @ts-expect-error - there are no types for the plugin
import tailwindGradientMaskImage from 'tailwind-gradient-mask-image'

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true
  },
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'cap-pattern':
          'linear-gradient(90deg, #fa8bff 0%, #2bff88 26%, #000000 65%, #000000 90%, #2bff88 99%)',
        suitcases: "url('/assets/suitcases.jpeg')",
        checkoutPromo: "url('/assets/balloons-pattern.jpg')"
      },
      transitionProperty: {
        expand: 'height, opacity',
        'expand-grid': 'grid-template-rows, opacity'
      },
      transitionDuration: {
        expand: '400ms, 200ms',
        'expand-grid': '400ms, 200ms'
      },
      transitionDelay: {
        expand: '0ms, 200ms',
        'expand-grid': '0ms, 200ms'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      gridTemplateRows: {
        'height-open': '1fr',
        'height-closed': '0fr'
      }
    }
  },
  plugins: [tailwindGradientMaskImage]
}

export default config
