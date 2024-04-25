/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      primary: "#ED9455",
      secondary: "#FFBB70",
      "ash-black": "#222",
      tertiary: "#FFEC9E",
      quard: "#FFFBDA",
      current: "currentColor",
      white: "#ffffff",
      blacky: "#030303",
      purple: "#3f3cbb",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      orange: "#fd7702",
      yellow: "#ffbb00",
    },
    extend: {},
  },
  plugins: [],
};
