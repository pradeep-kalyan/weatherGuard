/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      backgroundImage: {
        "sun-gradient":
          "linear-gradient(125deg, #FFD54F 20%, #FFB300 50%, #F57C00 100%)",
      },
      colors: {
        sun: {
          light: "#FFF9E3",
          yellow: "#FFD54F",
          amber: "#FFB300",
          orange: "#F57C00",
        },
      },
    },
  },
  plugins: [],
};
