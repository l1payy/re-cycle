/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"]
      },
      colors: {
        brand: {
          dark: "#1b4332",
          light: "#95d5b2"
        },
        ocean: "#4dabf7",
        earth: "#8d6e63"
      },
      boxShadow: {
        card: "0 18px 45px rgba(15,23,42,0.45)"
      }
    }
  },
  plugins: []
};
