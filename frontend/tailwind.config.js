/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#070a13',
          900: '#0c1222',
          800: '#151e33',
          700: '#1e2942',
          600: '#2c3b5c',
        },
        primary: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        accent: {
          blue: '#3b82f6',
          cyan: '#06b6d4',
          indigo: '#6366f1',
          purple: '#8b5cf6',
          rose: '#f43f5e',
        }
      },
      boxShadow: {
        'neon-emerald': '0 0 15px rgba(16, 185, 129, 0.15)',
        'neon-cyan': '0 0 15px rgba(6, 180, 212, 0.15)',
        'neon-purple': '0 0 15px rgba(139, 92, 246, 0.15)',
      }
    },
  },
  plugins: [],
}
