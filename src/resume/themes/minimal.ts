import type { ThemeTokens } from './tokens';

/** "Minimal" — Modern, ocean-blue accent, single-accent language bar. */
export const minimal: ThemeTokens = {
  id: 'minimal',
  label: 'Minimal',
  description: 'Modern minimalism — Inter, ocean-blue accent, generous whitespace.',
  colors: {
    bg: '#FFFFFF',
    textPrimary: '#0F172A',
    textMuted: '#64748B',
    accent: '#3B82F6',
    rule: '#E2E8F0',
    chipBg: '#F1F5F9',
    chipText: '#0F172A',
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'Geist Mono',
  },
  spacing: { page: 40, section: 16, block: 10, inline: 6 },
  type: { name: 26, section: 9.5, body: 9.5, small: 8 },
  rules: { weight: 0.5 },
  variant: {
    sectionDividers: false,
    monoRepoNames: false,
    monoSectionLabels: false,
    languageBarStyle: 'accent',
  },
};
