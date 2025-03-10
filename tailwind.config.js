/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector'],
  future: {
    hoverOnlyWhenSupported: true
  },
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      spacing: {
        '1e': '1em'
      },
      backgroundImage: {
        'cap-pattern':
          'linear-gradient(90deg, #fa8bff 0%, #2bff88 26%, #000000 65%, #000000 90%, #2bff88 99%)',
        suitcases: "url('/assets/suitcases.jpeg')",
        checkoutPromo: "url('/assets/balloons-pattern.jpg')"
      },
      borderWidth: {
        6: '6px'
      },
      transitionProperty: {
        expand: 'height, opacity'
      },
      transitionDuration: {
        expand: '400ms, 200ms'
      },
      transitionDelay: {
        expand: '0ms, 220ms'
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
  plugins: [require('tailwindcss-animate'), require('tailwind-gradient-mask-image')]
}
