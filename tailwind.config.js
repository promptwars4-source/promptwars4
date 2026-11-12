/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0c1527',
          800: '#14213D',
          700: '#1d2f54',
          600: '#273e6e',
        },
        primary: {
          DEFAULT: '#14213D', // Deep Navy
          light: '#273e6e',
          dark: '#0c1527',
        },
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#2563EB', // Blue
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#172554',
        },
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22C55E', // Green
          600: '#16a34a',
          700: '#15803d',
        },
        slate: {
          850: '#162032',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(20, 33, 61, 0.06), 0 2px 6px -1px rgba(20, 33, 61, 0.04)',
        'premium': '0 10px 30px -5px rgba(20, 33, 61, 0.08), 0 4px 12px -2px rgba(20, 33, 61, 0.04)',
        'card-hover': '0 20px 35px -8px rgba(37, 99, 235, 0.12), 0 8px 16px -4px rgba(20, 33, 61, 0.06)',
      }
    },
  },
  plugins: [],
}

