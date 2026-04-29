import type { ThemeTokens } from './tokens';

/** "Executive" — Slate-accented, subtle rules above each section, semibold heads. */
export const executive: ThemeTokens = {
  id: 'executive',
  label: 'Executive',
  description: 'Authoritative — Inter Bold, slate accent, hairline section dividers.',
  colors: {
    bg: '#FFFFFF',
    textPrimary: '#0F172A',
    textMuted: '#64748B',
    accent: '#0F172A',
    rule: '#E2E8F0',
    chipBg: '#F1F5F9',
    chipText: '#0F172A',
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'Geist Mono',
  },
  spacing: { page: 42, section: 22, block: 10, inline: 6 },
  type: { name: 28, section: 10, body: 9.5, small: 8 },
  rules: { weight: 0.5 },
  variant: {
    sectionDividers: true,
    monoRepoNames: false,
    monoSectionLabels: false,
    languageBarStyle: 'spectrum',
  },
};
