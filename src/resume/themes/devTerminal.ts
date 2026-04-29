import type { ThemeTokens } from './tokens';

export const devTerminal: ThemeTokens = {
  id: 'dev-terminal',
  label: 'Dev Terminal',
  description: 'Monospace headlines, GitHub blue accent.',
  colors: {
    bg: '#F6F8FA',
    textPrimary: '#24292F',
    textMuted: '#57606A',
    accent: '#0969DA',
    rule: '#D0D7DE',
    chipBg: '#DDF4FF',
    chipText: '#0969DA',
  },
  fonts: {
    heading: 'JetBrains Mono',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },
  spacing: { page: 36, section: 18, block: 10, inline: 6 },
  type: { name: 22, section: 10, body: 9.5, small: 8 },
  rules: { weight: 0.5 },
  layout: 'single',
};
