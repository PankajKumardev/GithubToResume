export type ThemeId = 'minimal' | 'editorial' | 'mono';

export interface ThemeTokens {
  id: ThemeId;
  label: string;
  description: string;
  colors: {
    bg: string;
    textPrimary: string;
    textMuted: string;
    accent: string;
    rule: string;
    chipBg: string;
    chipText: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  /** PDF-only spacing scale (points). 1pt = 1/72 inch. */
  spacing: {
    page: number;
    section: number;
    block: number;
    inline: number;
  };
  /** PDF type scale (points). */
  type: {
    name: number;
    section: number;
    body: number;
    small: number;
  };
  /** Hairline weight (pt) for rules and dividers. */
  rules: { weight: number };
  layout: 'single' | 'two-column';
  /** Render section titles wrapped in [ BRACKETS ]. */
  bracketSectionTitles: boolean;
  /** Render a 1px top border above each section title. */
  topRuleSections: boolean;
  /** Language stacked-bar style: per-language colors, or single accent with opacity steps. */
  languageBarStyle: 'spectrum' | 'accent';
}
