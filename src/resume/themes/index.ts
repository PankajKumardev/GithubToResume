import type { CSSProperties } from 'react';
import type { ThemeId, ThemeTokens } from './tokens';
import { grid } from './grid';
import { editorial } from './editorial';
import { terminal } from './terminal';

export const themes: Record<ThemeId, ThemeTokens> = {
  grid,
  editorial,
  terminal,
};

export const themeList: ThemeTokens[] = [grid, editorial, terminal];

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

export function formatSectionTitle(theme: ThemeTokens, label: string): string {
  const upper = label.toUpperCase();
  return theme.bracketSectionTitles ? `[ ${upper} ]` : upper;
}

export type { ThemeId, ThemeTokens } from './tokens';
