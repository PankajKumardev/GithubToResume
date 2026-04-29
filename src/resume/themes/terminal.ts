import type { ThemeTokens } from './tokens';

/** Terminal — Dark mode résumé. JetBrains Mono everywhere, green accent. */
export const terminal: ThemeTokens = {
  id: 'terminal',
  label: 'Terminal',
  description: 'Dark monospace — green accent, [ bracketed ] headers.',
  colors: {
    bg: '#0E0E0E',
    textPrimary: '#E5E5E5',
    textMuted: '#8A8A85',
    accent: '#00FF66',
    rule: '#2A2A2A',
    chipBg: '#1A1A1A',
    chipText: '#00FF66',
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
  borderedSections: false,
  topRuleSections: false,
  languageBarStyle: 'spectrum',
};
