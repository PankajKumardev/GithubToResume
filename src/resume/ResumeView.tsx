import type { ResumeData } from '@/resume/types';
import type { ThemeTokens } from '@/resume/themes';
import { cssVarsFor } from '@/resume/themes';
import { HeaderSection } from './sections/Header';
import { SummarySection } from './sections/Summary';
import { StatsSection } from './sections/Stats';
import { LanguagesSection } from './sections/Languages';
import { PinnedSection } from './sections/Pinned';
import { TopReposSection } from './sections/TopRepos';
import { OrgsSection } from './sections/Orgs';

/** A4 @ 96 dpi == 794 x 1123 px. */
export const PAGE_WIDTH = 794;
export const PAGE_HEIGHT = 1123;

export function ResumeView({ data, theme }: { data: ResumeData; theme: ThemeTokens }) {
  return (
    <div
      data-theme={theme.id}
      style={{
        ...cssVarsFor(theme),
        background: 'var(--theme-bg)',
        color: 'var(--theme-text-primary)',
        fontFamily: 'var(--theme-font-body)',
        width: PAGE_WIDTH,
        minHeight: PAGE_HEIGHT,
        padding: 56,
      }}
      className="flex flex-col gap-6"
    >
      <HeaderSection data={data} theme={theme} />
      {data.profile.bio && <SummarySection data={data} />}
      <StatsSection data={data} />
      <LanguagesSection data={data} theme={theme} />
      <PinnedSection data={data} theme={theme} />
      <TopReposSection data={data} theme={theme} />
      <OrgsSection data={data} theme={theme} />
    </div>
  );
}
