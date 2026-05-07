/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        clash: ['"Clash Display"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        surface: {
          base: 'var(--color-surface-base)',
          elevated: 'var(--color-surface-elevated)',
          overlay: 'var(--color-surface-overlay)',
        },
        accent: {
          blue: 'var(--color-accent-blue)',
          'blue-hover': 'var(--color-accent-blue-hover)',
          violet: 'var(--color-accent-violet)',
          gold: 'var(--color-accent-gold)',
          green: 'var(--color-accent-green)',
          red: 'var(--color-accent-red)',
        },
        /* Fallbacks/aliases for existing classes to minimize immediate breakage */
        ieee: {
          blue: 'var(--color-accent-blue)',
          'blue-dk': 'var(--color-surface-elevated)',
          'blue-dp': 'var(--color-surface-overlay)',
          'blue-lt': 'var(--color-accent-blue-hover)',
          accent: 'var(--color-accent-blue)',
          gold: 'var(--color-accent-gold)',
        },
        base: {
          DEFAULT: 'var(--color-surface-base)',
          2: 'var(--color-surface-elevated)',
          3: 'var(--color-surface-overlay)',
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
        scan:     { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100vh)' } },
        shimmer:  { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
        navReveal:  { from: { opacity: 0, transform: 'translateY(-8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        underlineExpand: { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
        statusPulse: { '0%,100%': { opacity: 0.4 }, '50%': { opacity: 1 } },
      },
      animation: {
        'fade-up':  'fadeUp 0.6s ease both',
        'pulse-dot': 'pulse 2s infinite',
        'scroll-arrow': 'bounce 2s infinite',
        'slide-in': 'slideIn 0.35s ease both',
        'glow':     'glow 3s ease-in-out infinite',
        'scan':     'scan 3s ease-in-out infinite',
        'shimmer':  'shimmer 2s infinite',
        'nav-reveal': 'navReveal 0.35s cubic-bezier(0.16,1,0.3,1) both',
        'underline-expand': 'underlineExpand 0.3s cubic-bezier(0.16,1,0.3,1) both',
        'status-pulse': 'statusPulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}