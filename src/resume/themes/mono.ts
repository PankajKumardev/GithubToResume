import type { ThemeTokens } from './tokens';

/** Engineer — Monospace. JetBrains Mono everywhere, [ BRACKETED ] section titles. */
export const mono: ThemeTokens = {
  id: 'mono',
  label: 'Engineer',
  description: 'Monospace — JetBrains Mono, [ bracketed ] sections.',
  colors: {
    bg: '#FFFFFF',
    textPrimary: '#0F172A',
    textMuted: '#6B7280',
    accent: '#0066FF',
    rule: '#E5E7EB',
    chipBg: '#F3F4F6',
    chipText: '#0F172A',
  },
  fonts: {
    heading: 'JetBrains Mono',
    body: 'JetBrains Mono',
    mono: 'JetBrains Mono',
  },
  spacing: { page: 36, section: 16, block: 9, inline: 5 },
  type: { name: 22, section: 9, body: 8.5, small: 7.5 },
  rules: { weight: 0.5 },
  layout: 'single',
  bracketSectionTitles: true,
  topRuleSections: false,
  languageBarStyle: 'spectrum',
};
