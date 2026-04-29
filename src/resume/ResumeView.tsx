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
  const isTwoCol = theme.layout === 'two-column';
  const isGrid = theme.borderedSections;

  const cellClass = isGrid ? 'border p-3' : '';
  const cellStyle = isGrid ? { borderColor: 'var(--theme-rule)' } : {};
  const stackStyle = isGrid ? { rowGap: 0 } : { rowGap: '20px' as string };

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
        padding: 48,
      }}
      className="flex flex-col"
    >
      <div style={stackStyle} className="flex flex-col">
        <div className={cellClass} style={cellStyle}>
          <HeaderSection data={data} theme={theme} />
        </div>
        {data.profile.bio && (
          <div
            className={cellClass}
            style={{
              ...cellStyle,
              marginTop: isGrid ? '-1px' : undefined,
            }}
          >
            <SummarySection data={data} />
          </div>
        )}
        <div
          className={cellClass}
          style={{
            ...cellStyle,
            marginTop: isGrid ? '-1px' : undefined,
          }}
        >
          <StatsSection data={data} />
        </div>

        {isTwoCol ? (
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: '230px 1fr',
              marginTop: isGrid ? '-1px' : undefined,
            }}
          >
            <div className="flex flex-col" style={stackStyle}>
              <Cell isGrid={isGrid}>
                <LanguagesSection data={data} theme={theme} />
              </Cell>
              <Cell isGrid={isGrid} negativeTop>
                <OrgsSection data={data} theme={theme} />
              </Cell>
            </div>
            <div className="flex flex-col" style={stackStyle}>
              <Cell isGrid={isGrid}>
                <PinnedSection data={data} theme={theme} />
              </Cell>
              <Cell isGrid={isGrid} negativeTop>
                <TopReposSection data={data} theme={theme} />
              </Cell>
            </div>
          </div>
        ) : (
          <>
            <Cell isGrid={isGrid} negativeTop>
              <LanguagesSection data={data} theme={theme} />
            </Cell>
            <Cell isGrid={isGrid} negativeTop>
              <PinnedSection data={data} theme={theme} />
            </Cell>
            <Cell isGrid={isGrid} negativeTop>
              <TopReposSection data={data} theme={theme} />
            </Cell>
            <Cell isGrid={isGrid} negativeTop>
              <OrgsSection data={data} theme={theme} />
            </Cell>
          </>
        )}
      </div>
    </div>
  );
}

function Cell({
  isGrid,
  negativeTop = false,
  children,
}: {
  isGrid: boolean;
  negativeTop?: boolean;
  children: React.ReactNode;
}) {
  if (!isGrid) return <div>{children}</div>;
  return (
    <div
      className="border p-3"
      style={{
        borderColor: 'var(--theme-rule)',
        marginTop: negativeTop ? '-1px' : undefined,
      }}
    >
      {children}
    </div>
  );
}
