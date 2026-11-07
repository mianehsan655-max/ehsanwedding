/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF6EE',
          pearl: '#FFFDF9',
          warm: '#F2E9D8',
          border: '#DEC48A',
        },
        gold: {
          light: '#DFB752',
          DEFAULT: '#B38728',
          metallic: '#C69A32',
          deep: '#8A6012',
          darkest: '#6E4B0B',
          champagne: '#F3E3BE',
        },
        espresso: {
          DEFAULT: '#281D12',
          muted: '#665038',
        },
        emerald: {
          royal: '#1A522C',
        }
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', '"Cinzel"', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        arabic: ['"Amiri"', '"Scheherazade New"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'royal': '0 20px 60px -15px rgba(138, 96, 18, 0.20), 0 0 1px 1px rgba(179, 135, 40, 0.42)',
        'royal-lg': '0 30px 80px -20px rgba(138, 96, 18, 0.30), 0 0 2px 1px rgba(179, 135, 40, 0.55)',
        'wax': '0 14px 28px rgba(120, 12, 18, 0.45), inset 0 3px 8px rgba(255, 160, 165, 0.45), inset 0 -6px 12px rgba(75, 5, 10, 0.75)',
      }
    },
  },
  plugins: [],
}
