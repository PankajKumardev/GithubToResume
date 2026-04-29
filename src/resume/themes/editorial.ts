import type { ThemeTokens } from './tokens';

/** Editorial — IBM Plex Serif name + Inter body, 2-column wrap, top-rule sections. */
export const editorial: ThemeTokens = {
  id: 'editorial',
  label: 'Editorial',
  description: 'Serif authority — IBM Plex Serif heads, two-column grid.',
  colors: {
    bg: '#F4F4F0',
    textPrimary: '#050505',
    textMuted: '#5C5C57',
    accent: '#050505',
    rule: '#C8C8BE',
    chipBg: '#EAEAE5',
    chipText: '#050505',
  },
  fonts: {
    heading: 'IBM Plex Serif',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },
  spacing: { page: 40, section: 18, block: 10, inline: 6 },
  type: { name: 28, section: 10, body: 9.5, small: 8 },
  rules: { weight: 0.6 },
  layout: 'two-column',
  bracketSectionTitles: false,
  borderedSections: false,
  topRuleSections: true,
  languageBarStyle: 'spectrum',
};
