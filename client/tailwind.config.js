/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        customPrimary: '#faed26',
        customBody: '#46344e',
        customText: '#fff',
        customSections: '#5a5560',
        customComplementary: '#9b786f',
      },
    },
  },
  plugins: [],
};
