/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ejs,js}",
    "./views/**/*.{html,ejs,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
}
