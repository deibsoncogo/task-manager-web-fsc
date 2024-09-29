/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    fontFamily: { sans: ["Poppins", "sans-serif"] },
    extend: {
      colors: {
        brand: {
          primary: "#00ADB5",
          background: "#F8F8F8",
          border: "#F4F4F5",
          process: "#FFAA04",
          danger: "#EF4444",
          "dark-blue": "#35383E",
          "dark-gray": "#818181",
          "text-gray": "#9A9C9F",
          "light-gray": "#EEEEEE",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
}
