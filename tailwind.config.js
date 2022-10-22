const colors = require("tailwindcss/colors");

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
        white: "#FCFEF8",
        purple: "#3f3cbb",
        grey: {
          100: "#ECECEC",
          600: "#606F73",
        },
        sun: {
          100: "#FFF3B7",
          400: "#FAD042",
        },
        water: {
          100: "#DDE7FA",
          400: "#B7DCFF",
        },
        monstera: {
          100: "#ECEFE5",
          200: "#D7FFB7",
          300: "#8DB572",
          400: "#5C8B57",
          700: "#32695F",
          800: "#3F5214",
          
        },
      },
      keyframes: {
        riseEaseOutElastic: {
          "0%": {
            transform: "translateY(100%)",
          },

          "40%": {
            transform: " translateY(-2%)",
          },

          "100%": {
            transform: "translateY(0%)",
          },
        },
        fallEaseOutElastic: {
          "0%": {
            transform: "translateY(0%)",
          },
          "40%": {
            transform: " translateY(2%)",
          },
          "100%": {
            transform: "translateY(100%)",
          },
        },
      },
      animation: {
        rise: "riseEaseOutElastic 590ms",
        fall: "fallEaseOutElastic 590ms",
      },
    },
  },
  plugins: [],
};
