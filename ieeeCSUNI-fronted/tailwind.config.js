/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ieee: {
          blue:      '#006699',
          'blue-dk': '#004f77',
          'blue-dp': '#003050',
          'blue-lt': '#0088cc',
          accent:    '#00d4ff',
          gold:      '#f5a800',
        },
        base: {
          DEFAULT: '#0a0f1c',
          2:       '#0e1627',
          3:       '#131d35',
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(0,150,200,0.04) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0,150,200,0.04) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      keyframes: {
        fadeUp:   { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        pulse:    { '0%,100%': { opacity: 1, transform: 'scale(1)' }, '50%': { opacity: 0.6, transform: 'scale(0.85)' } },
        bounce:   { '0%,100%': { transform: 'rotate(45deg) translateY(0)' }, '50%': { transform: 'rotate(45deg) translateY(5px)' } },
        slideIn:  { from: { opacity: 0, transform: 'translateX(-16px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        glow:     { '0%,100%': { opacity: 0.4 }, '50%': { opacity: 1 } },
      },
      animation: {
        'fade-up':  'fadeUp 0.6s ease both',
        'pulse-dot': 'pulse 2s infinite',
        'scroll-arrow': 'bounce 2s infinite',
        'slide-in': 'slideIn 0.35s ease both',
        'glow':     'glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}