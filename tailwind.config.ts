import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        app: {
          bg: '#F4F4F0',
          surface: '#EAEAE5',
          'surface-2': '#DEDED5',
          border: '#D1D1C7',
          'border-strong': '#A8A89E',
          primary: '#050505',
          muted: '#73736E',
          subtle: '#9C9C95',
          accent: '#002FA7',
          'accent-hover': '#001E78',
          danger: '#B00020',
          success: '#0A6B3A',
          warning: '#9C6E00',
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
        sans: ['Geist', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Newsreader', '"IBM Plex Serif"', 'serif'],
        mono: ['"JetBrains Mono"', '"Geist Mono"', 'ui-monospace', 'monospace'],
        'theme-heading': ['var(--theme-font-heading)', 'sans-serif'],
        'theme-body': ['var(--theme-font-body)', 'sans-serif'],
        'theme-mono': ['var(--theme-font-mono)', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        widest: '0.15em',
      },
      boxShadow: {
        a4: '0 25px 50px -12px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(5,5,5,0.05)',
        offset: '20px 20px 0px 0px rgba(5,5,5,0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
