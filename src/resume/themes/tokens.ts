export type ThemeId = 'minimal' | 'executive' | 'developer';

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
  variant: {
    /** A 1px subtle rule above each section title (executive). */
    sectionDividers: boolean;
    /** Repo names rendered in mono font (developer). */
    monoRepoNames: boolean;
    /** Section titles + stat labels rendered in mono (developer). */
    monoSectionLabels: boolean;
    /** Single-accent stepped-opacity language bar (minimal) vs spectrum colors. */
    languageBarStyle: 'spectrum' | 'accent';
  };
}
