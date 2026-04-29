import type { ThemeTokens } from './tokens';

export const modernSerif: ThemeTokens = {
  id: 'modern-serif',
  label: 'Modern Serif',
  description: 'Editorial serif headlines, charcoal accents.',
  colors: {
    bg: '#FDFCF8',
    textPrimary: '#1C1C19',
    textMuted: '#78716C',
    accent: '#0F172A',
    rule: '#E7E5E0',
    chipBg: '#F1EFE7',
    chipText: '#1C1C19',
  },
  fonts: {
    heading: 'IBM Plex Serif',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },
  spacing: { page: 36, section: 18, block: 10, inline: 6 },
  type: { name: 24, section: 11, body: 9.5, small: 8 },
  rules: { weight: 0.5 },
  layout: 'single',
};
