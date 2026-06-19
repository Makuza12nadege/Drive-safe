
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          500: '#334e68',
          700: '#243b53',
          800: '#1a3a5c', // Primary Deep Navy
          900: '#102a43',
        },
        orange: {
          500: '#f97316', // Accent
          600: '#ea580c',
        }
      },
      boxShadow: {
        'up': '0 -4px 6px -1px rgba(0, 0, 0, 0.05), 0 -2px 4px -1px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
