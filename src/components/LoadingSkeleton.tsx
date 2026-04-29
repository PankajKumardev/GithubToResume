import type { ThemeTokens } from '@/resume/themes';
import { cssVarsFor } from '@/resume/themes';
import { PAGE_HEIGHT, PAGE_WIDTH } from '@/resume/ResumeView';

/**
 * Geometric wireframe skeleton matching the résumé layout exactly. No
 * pulsing blobs — just structural 1px boxes that mirror what's coming.
 */
export function LoadingSkeleton({ theme }: { theme: ThemeTokens }) {
  const isTwoCol = theme.layout === 'two-column';
  const isGrid = theme.borderedSections;
  const lineCls = 'border border-current/20';

  return (
    <div
      data-theme={theme.id}
      style={{
        ...cssVarsFor(theme),
        background: 'var(--theme-bg)',
        color: 'var(--theme-text-muted)',
        width: PAGE_WIDTH,
        minHeight: PAGE_HEIGHT,
        padding: 48,
      }}
      className="flex flex-col gap-5"
      aria-busy="true"
      aria-label="Loading résumé"
    >
      <Cell isGrid={isGrid}>
        <div className="flex items-start gap-5">
          <div className={`h-20 w-20 shrink-0 ${lineCls}`} />
          <div className="flex-1 space-y-2">
            <div className={`h-7 w-1/2 ${lineCls}`} />
            <div className={`h-4 w-1/4 ${lineCls}`} />
            <div className="flex gap-3 pt-1">
              <div className={`h-3 w-20 ${lineCls}`} />
              <div className={`h-3 w-24 ${lineCls}`} />
              <div className={`h-3 w-28 ${lineCls}`} />
            </div>
          </div>
        </div>
      </Cell>

      <Cell isGrid={isGrid} negativeTop>
        <div className={`h-3 w-3/4 ${lineCls}`} />
      </Cell>

      <Cell isGrid={isGrid} negativeTop>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className={`h-2 w-3/4 ${lineCls}`} />
              <div className={`h-5 w-1/2 ${lineCls}`} />
            </div>
          ))}
        </div>
      </Cell>

      {isTwoCol ? (
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: '230px 1fr', marginTop: isGrid ? '-1px' : undefined }}
        >
          <div className="space-y-5">
            <div className={`h-3 w-24 ${lineCls}`} />
            <div className={`h-2 w-full ${lineCls}`} />
            <div className="grid grid-cols-2 gap-1.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`h-3 ${lineCls}`} />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className={`h-3 w-32 ${lineCls}`} />
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`h-24 ${lineCls}`} />
              ))}
            </div>
            <div className={`h-3 w-32 ${lineCls}`} />
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={`h-3 w-full ${lineCls}`} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <Cell isGrid={isGrid} negativeTop>
            <div className={`mb-2 h-3 w-24 ${lineCls}`} />
            <div className={`h-2 w-full ${lineCls}`} />
            <div className="mt-2 flex flex-wrap gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={`h-3 w-20 ${lineCls}`} />
              ))}
            </div>
          </Cell>

          <Cell isGrid={isGrid} negativeTop>
            <div className={`mb-2 h-3 w-32 ${lineCls}`} />
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`h-24 ${lineCls}`} />
              ))}
            </div>
          </Cell>

          <Cell isGrid={isGrid} negativeTop>
            <div className={`mb-2 h-3 w-32 ${lineCls}`} />
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={`h-3 w-full ${lineCls}`} />
              ))}
            </div>
          </Cell>
        </>
      )}
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
