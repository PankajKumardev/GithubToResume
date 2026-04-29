import type { ThemeTokens } from './tokens';

export const swissMinimal: ThemeTokens = {
  id: 'swiss-minimal',
  label: 'Swiss Minimal',
  description: 'Generous whitespace, single accent, two-column grid.',
  colors: {
    bg: '#FFFFFF',
    textPrimary: '#000000',
    textMuted: '#888888',
    accent: '#0055FF',
    rule: '#E5E5E5',
    chipBg: '#F3F4F6',
    chipText: '#000000',
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },
  spacing: { page: 40, section: 20, block: 10, inline: 6 },
  type: { name: 22, section: 9, body: 9, small: 7.5 },
  rules: { weight: 0.4 },
  layout: 'two-column',
};
