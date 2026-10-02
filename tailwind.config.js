/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#06070a',
          900: '#0b0d14',
          850: '#10131c',
          800: '#161a26',
          700: '#1f2436',
          600: '#2b324a',
        },
        gold: {
          50: '#fbf8ea',
          100: '#f5efc9',
          200: '#eddca1',
          300: '#e3c473',
          400: '#d9ac4b',
          500: '#d4af37',
          600: '#b88d27',
          700: '#926a20',
          800: '#765320',
          900: '#634520',
        },
        mystic: {
          violet: '#8b5cf6',
          purple: '#a855f7',
          emerald: '#10b981',
          cyan: '#06b6d4',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Cinzel"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #fef3c7 0%, #d4af37 50%, #b45309 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'gold-glow': '0 0 20px -5px rgba(212, 175, 55, 0.2)',
        'violet-glow': '0 0 20px -5px rgba(139, 92, 246, 0.2)',
        'emerald-glow': '0 0 20px -5px rgba(16, 185, 129, 0.2)',
      }
    },
  },
  plugins: [],
}
