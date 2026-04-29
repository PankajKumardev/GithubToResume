import type { ThemeTokens } from './tokens';

/** "Grid" — Swiss section-as-box layout. Every block is a 1px-bordered cell. */
export const grid: ThemeTokens = {
  id: 'grid',
  label: 'Grid',
  description: 'Swiss boxes — every section bordered, Klein Blue accent.',
  colors: {
    bg: '#F4F4F0',
    textPrimary: '#050505',
    textMuted: '#73736E',
    accent: '#002FA7',
    rule: '#D1D1C7',
    chipBg: '#EAEAE5',
    chipText: '#050505',
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },
  spacing: { page: 36, section: 0, block: 8, inline: 6 },
  type: { name: 26, section: 8.5, body: 9.5, small: 7.5 },
  rules: { weight: 0.6 },
  layout: 'single',
  bracketSectionTitles: false,
  borderedSections: true,
  topRuleSections: false,
  languageBarStyle: 'accent',
};
