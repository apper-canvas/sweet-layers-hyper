/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D4667A',
        secondary: '#6B4C5A',
        accent: '#F4A460',
        surface: '#FFF5F0',
        background: '#FEFAF7',
        success: '#7FB069',
        warning: '#F4A460',
        error: '#E56B6F',
        info: '#87CEEB',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['DM Sans', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.64rem',
        'sm': '0.8rem',
        'base': '1rem',
        'lg': '1.25rem',
        'xl': '1.563rem',
        '2xl': '1.953rem',
        '3xl': '2.441rem',
        '4xl': '3.052rem',
        '5xl': '3.815rem',
      },
      animation: {
        'bounce-soft': 'bounce 1s ease-in-out infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
      rotate: {
        '-2': '-2deg',
        '2': '2deg',
      },
    },
  },
  plugins: [],
}