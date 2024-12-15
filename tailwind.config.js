/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f21a2d",
        text: "#676c97",
        headingText: "#676c97",
        textGray: "#303030",
        black: "#111723",
        hotPink: "#fd2c79",
        hotRed: "#f21a2d",
        gold: "#f8c928",
      }
    },
  },
  plugins: [],
}

