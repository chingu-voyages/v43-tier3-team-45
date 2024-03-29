/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-white' : 'rgba(255,255,255,0.18)'
      }
    },
  },
  plugins: [],
}
