/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xsm': '440px',
      },
      colors: {
        "primary-light": "#E8E8E8",
        "primary-dark": "#1E2021"
      }
    },
  },
  plugins: [],
}

