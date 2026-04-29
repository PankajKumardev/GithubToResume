import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        app: {
          bg: '#09090B',
          surface: '#18181B',
          'surface-2': '#1F1F23',
          border: '#27272A',
          'border-strong': '#3F3F46',
          primary: '#FAFAFA',
          muted: '#A1A1AA',
          subtle: '#71717A',
          accent: '#3B82F6',
          'accent-hover': '#60A5FA',
          success: '#22C55E',
          danger: '#EF4444',
          warning: '#F59E0B',
        },
        theme: {
          bg: 'var(--theme-bg)',
          text: 'var(--theme-text-primary)',
          muted: 'var(--theme-text-muted)',
          accent: 'var(--theme-accent)',
          rule: 'var(--theme-rule)',
          chip: 'var(--theme-chip-bg)',
          'chip-text': 'var(--theme-chip-text)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"IBM Plex Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        'theme-heading': ['var(--theme-font-heading)', 'serif'],
        'theme-body': ['var(--theme-font-body)', 'sans-serif'],
        'theme-mono': ['var(--theme-font-mono)', 'monospace'],
      },
      boxShadow: {
        a4: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.04)',
        glow: '0 0 0 1px rgba(59,130,246,0.6), 0 0 30px rgba(59,130,246,0.25)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
