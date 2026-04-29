import type { ThemeTokens } from './tokens';

/** "Developer" — Inter body, Geist Mono for repo names + section labels. */
export const developer: ThemeTokens = {
  id: 'developer',
  label: 'Developer',
  description: 'Engineer-friendly — Inter body, Geist Mono repo names + labels.',
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
  spacing: { page: 40, section: 18, block: 10, inline: 6 },
  type: { name: 26, section: 9.5, body: 9.5, small: 8 },
  rules: { weight: 0.5 },
  variant: {
    sectionDividers: false,
    monoRepoNames: true,
    monoSectionLabels: true,
    languageBarStyle: 'spectrum',
  },
};
