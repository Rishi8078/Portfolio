/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: '#F0F2F5',
        ink: '#1A1A2E',
        'soft-gray': '#E8EAED',
        'soft-white': '#FFFFFF',
        'accent': '#4A6CF7',
        'accent-light': '#EEF1FE',
        'accent-dark': '#3451B2',
        'muted': '#6B7280',
        'muted-light': '#9CA3AF',
        'warm-gray': '#F7F8FA',
        'card-border': '#E5E7EB',
        'star-yellow': '#F59E0B',
        'dark-bg': '#0F172A',
        'dark-card': '#1E293B',
        'dark-card-alt': '#334155',
        'dark-border': '#475569',
        'dark-text': '#F1F5F9',
        'dark-accent': '#60A5FA',
        'dark-muted': '#94A3B8',
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.06)',
        'soft-md': '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',
        'soft-lg': '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)',
        'soft-xl': '0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04)',
        'card': '0 2px 8px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.1)',
      },
      borderWidth: {
        '1': '1px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'pixel': ['Silkscreen', 'monospace'],
        'mono': ['Space Mono', 'monospace'],
        'body': ['Space Grotesk', 'sans-serif'],
      },
      backgroundColor: {
        'white/8': 'rgba(255,255,255,0.08)',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
    },
  },
  plugins: [],
}