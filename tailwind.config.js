/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        black: '#171717'
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
