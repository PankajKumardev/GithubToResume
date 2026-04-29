import type { ThemeTokens } from './tokens';

/** "San Francisco" — Modern Minimal. Inter throughout, white canvas, cobalt language bar. */
export const minimal: ThemeTokens = {
  id: 'minimal',
  label: 'Minimal',
  description: 'San Francisco — Modern minimalism, generous whitespace.',
  colors: {
    bg: '#FFFFFF',
    textPrimary: '#111827',
    textMuted: '#6B7280',
    accent: '#0066FF',
    rule: '#E5E7EB',
    chipBg: '#F3F4F6',
    chipText: '#111827',
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },
  spacing: { page: 40, section: 18, block: 10, inline: 6 },
  type: { name: 24, section: 9.5, body: 9.5, small: 8 },
  rules: { weight: 0.5 },
  layout: 'single',
  bracketSectionTitles: false,
  topRuleSections: false,
  languageBarStyle: 'accent',
};
