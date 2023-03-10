/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#37AF99",
        secondary: "#D9D9D9",
        card: "#1b2f28",
      },
    },
  },
  plugins: [],
};
