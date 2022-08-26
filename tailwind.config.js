/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  content: [],
  theme: {
    extend: {
      spacing: {
        website: "940px",
      },
      colors: {
        title: "#1f1f1f",
        text: "#434343",
        main: "rgba(109, 147, 100, 1)",
        second: "#bababa",
      },
      minHeight: {
        website: "calc(100vh - 196px)",
      },
    },
  },
  plugins: [],
};
