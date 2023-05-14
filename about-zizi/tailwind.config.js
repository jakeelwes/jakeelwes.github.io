/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html"],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      // 'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      // 'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
        title: ["ui-serif", "Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
      }
    },
  },
  plugins: [],
}
