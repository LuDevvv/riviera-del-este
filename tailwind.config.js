/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3C7269",
          light: "#96BAB3",
          dark: "#2A514A",
        },
        secondary: {
          DEFAULT: "#B07E50",
          light: "#D4B18C",
          dark: "#8C6540",
        },
      },
    },
  },
};
