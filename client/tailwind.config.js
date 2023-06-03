/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#080b16",
        accent: "#5a7dc2",
        lighter: "#141827",
        hover: "#172B51",
        light_font: "#CBD5E1",
        alternative: '#ff4c00'
      },
      width: {
        available: 'calc(100vw - 270px)'
      },
      height: {
        full_image: 'calc(100dvh - 80px)',
        responsive_height: '100dvh'
      },
      animation: {
        'slide-right': 'slide-right 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-in': 'slide-in 0.2s ease-in-out'
      },
      keyframes: {
        'slide-right': {
          '0%' : { transform: 'translateX(-248px)' },
          '100%' : { transform: 'translateX(0)' }
        },
        'slide-in': {
          '0%' : { transform: 'translateY(100px)'},
          '100%' : { transform: 'translateY(0)'}
        }
      }
    },
  },
  plugins: [],
};
