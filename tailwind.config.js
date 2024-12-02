/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      spacing: {
        '1e': '1em'
      },
      colors: {
        black: '#171717',
        'green-light': '#32cd32',
        green: '#48ff90'
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
      }
    },
    screens: {
      sm: '450px',
      md: '600px',
      tablet: '800px',
      lg: '900px',
      laptop: '1000px',
      xl: '1200px',
      desktop: '1400px'
    }
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-gradient-mask-image')]
}
