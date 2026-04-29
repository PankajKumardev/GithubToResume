export type ThemeId = 'grid' | 'editorial' | 'terminal';

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
  spacing: {
    page: number;
    section: number;
    block: number;
    inline: number;
  };
  type: {
    name: number;
    section: number;
    body: number;
    small: number;
  };
  rules: { weight: number };
  layout: 'single' | 'two-column';
  /** Wrap section titles in [ BRACKETS ]. */
  bracketSectionTitles: boolean;
  /** Render every section as a 1px-bordered box. */
  borderedSections: boolean;
  /** Render a 1px top border above each section title. */
  topRuleSections: boolean;
  /** Language stacked-bar style. */
  languageBarStyle: 'spectrum' | 'accent';
}
