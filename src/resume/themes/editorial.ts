import type { ThemeTokens } from './tokens';

/** Editorial — Serif Authority. IBM Plex Serif headers + Inter body, 1px section top borders. */
export const editorial: ThemeTokens = {
  id: 'editorial',
  label: 'Editorial',
  description: 'Serif authority — IBM Plex Serif heads, two-column grid.',
  colors: {
    bg: '#FFFFFF',
    textPrimary: '#0F172A',
    textMuted: '#475569',
    accent: '#0F172A',
    rule: '#E2E8F0',
    chipBg: '#F1F5F9',
    chipText: '#0F172A',
  },
  fonts: {
    heading: 'IBM Plex Serif',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },
  spacing: { page: 40, section: 18, block: 10, inline: 6 },
  type: { name: 24, section: 10, body: 9.5, small: 8 },
  rules: { weight: 0.5 },
  layout: 'two-column',
  bracketSectionTitles: false,
  topRuleSections: true,
  languageBarStyle: 'spectrum',
};
