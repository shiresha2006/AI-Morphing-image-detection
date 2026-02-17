/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'black-bg': '#0a0a0a',
        'black-card': '#1a1a1a',
        'danger': '#ff0050',
        'success': '#00ff88',
        'primary': '#0ea5e9',
        'warning': '#ff9500',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 0, 80, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 0, 80, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}