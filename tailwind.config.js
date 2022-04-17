const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        flexa: ["Flexa", "sans-serif"],
        alpina: ["Alpina", "serif"],
      },

      colors: {
        'white': '#FCFEF8',
        'purple': '#3f3cbb',
        'grey': {
          100: '#ECECEC',
          600: '#606F73',
        },
        'sun': {
          100: '#FFF3B7',
          400: "#FAD042"
        },
        'monstera': {
          200: '#D7FFB7',
          300: '#8DB572',
          400: '#5C8B57',
          800: '#3F5214',
        },
      },
    },
  },
  plugins: [],
}