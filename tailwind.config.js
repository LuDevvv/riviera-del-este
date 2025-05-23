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

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   plugins: {
//     "@tailwindcss/postcss": {},
//   },
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           DEFAULT: "#0D71B9",
//           light: "#82BCE1",
//           dark: "#426375",
//         },
//         secondary: {
//           DEFAULT: "#FCA205",
//           light: "#FFD966",
//           dark: "#E6920A",
//         },
//         neutral: "#F3F9F3",
//       },
//     },
//   },
// };
