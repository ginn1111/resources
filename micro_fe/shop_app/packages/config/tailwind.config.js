/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,vue}', './public/index.html'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(500px, 1fr))',
      },
    },
  },
  plugins: [],
};
