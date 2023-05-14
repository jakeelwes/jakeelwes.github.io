/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
        title: ["ui-serif", "Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
      }
    },
  },
  plugins: [],
}
