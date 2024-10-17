/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      spacing: {
        '1e': '1em'
      },
      colors: {
        black: '#171717',
        'gray-light': '#ededed'
      },
      backgroundImage: {
        'cap-pattern':
          'linear-gradient(90deg, #fa8bff 0%, #2bff88 26%, #000000 65%, #000000 90%, #2bff88 99%)',
        suitcases: "url('/assets/suitcases.jpeg')"
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
  plugins: []
}
