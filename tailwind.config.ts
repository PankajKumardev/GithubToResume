import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        app: {
          bg: '#FFFFFF',
          surface: '#F8FAFC',
          'surface-2': '#F1F5F9',
          border: '#F1F5F9',
          'border-strong': '#E2E8F0',
          primary: '#0F172A',
          muted: '#64748B',
          subtle: '#94A3B8',
          accent: '#3B82F6',
          'accent-hover': '#2563EB',
          success: '#10B981',
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
        sans: ['Geist', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
        'theme-heading': ['var(--theme-font-heading)', 'sans-serif'],
        'theme-body': ['var(--theme-font-body)', 'sans-serif'],
        'theme-mono': ['var(--theme-font-mono)', 'monospace'],
      },
      boxShadow: {
        glass: '0 8px 32px -8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)',
        soft: '0 20px 40px -15px rgba(0,0,0,0.05)',
        a4: '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
      },
      letterSpacing: {
        crisp: '-0.02em',
        tighter: '-0.04em',
      },
    },
  },
  plugins: [],
};

export default config;
