import type { CSSProperties } from 'react';
import type { ThemeId, ThemeTokens } from './tokens';
import { modernSerif } from './modernSerif';
import { swissMinimal } from './swissMinimal';
import { devTerminal } from './devTerminal';

export const themes: Record<ThemeId, ThemeTokens> = {
  'modern-serif': modernSerif,
  'swiss-minimal': swissMinimal,
  'dev-terminal': devTerminal,
};

export const themeList: ThemeTokens[] = [modernSerif, swissMinimal, devTerminal];

/**
 * Returns the inline-style object that wires the theme into CSS variables for
 * the on-screen renderer. The PDF renderer reads `theme` directly.
 */
export function cssVarsFor(theme: ThemeTokens): CSSProperties {
  return {
    ['--theme-bg' as string]: theme.colors.bg,
    ['--theme-text-primary' as string]: theme.colors.textPrimary,
    ['--theme-text-muted' as string]: theme.colors.textMuted,
    ['--theme-accent' as string]: theme.colors.accent,
    ['--theme-rule' as string]: theme.colors.rule,
    ['--theme-chip-bg' as string]: theme.colors.chipBg,
    ['--theme-chip-text' as string]: theme.colors.chipText,
    ['--theme-font-heading' as string]: `'${theme.fonts.heading}'`,
    ['--theme-font-body' as string]: `'${theme.fonts.body}'`,
    ['--theme-font-mono' as string]: `'${theme.fonts.mono}'`,
  };
}

export type { ThemeId, ThemeTokens } from './tokens';
