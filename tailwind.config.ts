import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        app: {
          bg: '#FFFFFF',
          surface: '#F8F9FA',
          'surface-2': '#F3F4F6',
          border: '#E5E7EB',
          'border-strong': '#D1D5DB',
          primary: '#0F172A',
          muted: '#6B7280',
          subtle: '#9CA3AF',
          accent: '#0066FF',
          'accent-hover': '#3B82F6',
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
        mono: [
          '"Geist Mono"',
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'monospace',
        ],
        serif: ['"IBM Plex Serif"', 'ui-serif', 'Georgia', 'serif'],
        // Theme-driven fonts used inside the résumé canvas
        'theme-heading': ['var(--theme-font-heading)', 'sans-serif'],
        'theme-body': ['var(--theme-font-body)', 'sans-serif'],
        'theme-mono': ['var(--theme-font-mono)', 'monospace'],
      },
      boxShadow: {
        cmd: '0 8px 30px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.04)',
        a4: '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
        soft: '0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)',
      },
      letterSpacing: {
        crisp: '-0.02em',
      },
    },
  },
  plugins: [],
};

export default config;
