/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          dark: '#0a100d',
          card: '#121a16',
          border: '#1f2e27',
          emerald: '#10b981',
          gold: '#f59e0b',
          crimson: '#ef4444',
          accent: '#34d399',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
