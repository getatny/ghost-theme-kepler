/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      spacing: {
        website: "1004px",
      },
      colors: {
        title: "#1f1f1f",
        text: "#434343",
        main: "rgba(109, 147, 100, 1)",
        second: "#bababa",
      },
      minHeight: {
        website: "calc(100vh - 260px)",
      },
      screens: {
        small: "668px",
        normal: "1004px",
      },
    },
  },
  plugins: [],
};
