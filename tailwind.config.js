/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const colors = require("tailwindcss/colors")

// eslint-disable-next-line no-undef
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html", 
    "./src/**/*.{vue,js,ts,jsx,tsx}", 
    "./node_modules/vue-tailwind-datepicker/**/*.js"
  ],
  theme: {
      extend: {
        colors: {
          "vtd-primary": colors.sky, // Light mode Datepicker color
          "vtd-secondary": colors.white // Dark mode Datepicker color
        },
      },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/forms'),
  ],
}