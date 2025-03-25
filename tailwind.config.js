/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html, js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#00072D",
        secondary: "#0E6BA8",
        text_primary: "#FFFFFF",
      },
      width: {
        "max-container": "1400px",
      },
    },
  },
  plugins: [],
};
