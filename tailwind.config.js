/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'restaurant-cream': '#F5F1E8',
        'restaurant-brown': '#8B6F47',
        'restaurant-dark': '#3E2723',
        'restaurant-gold': '#D4AF37',
      },
    },
  },
  plugins: [],
}

