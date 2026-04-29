import type { ThemeTokens } from '@/resume/themes';
import { cssVarsFor } from '@/resume/themes';
import { PAGE_HEIGHT, PAGE_WIDTH } from '@/resume/ResumeView';

export function LoadingSkeleton({ theme }: { theme: ThemeTokens }) {
  const isTwoCol = theme.layout === 'two-column';
  return (
    <div
      data-theme={theme.id}
      style={{
        ...cssVarsFor(theme),
        background: 'var(--theme-bg)',
        width: PAGE_WIDTH,
        minHeight: PAGE_HEIGHT,
        padding: 52,
      }}
      className="flex flex-col gap-5"
      aria-busy="true"
      aria-label="Loading résumé"
    >
      <div className="flex items-start gap-5">
        <div className="h-20 w-20 shrink-0 animate-pulse rounded-full bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-7 w-2/3 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
          <div className="flex gap-3 pt-1">
            <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-28 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>

      <div className="h-3.5 w-3/4 animate-pulse rounded bg-gray-200" />

      <div
        className="grid grid-cols-7 gap-2 pt-3"
        style={{ borderTop: '1px solid var(--theme-rule)' }}
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-2 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-5 w-1/2 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>

      {isTwoCol ? (
        <div className="grid gap-6" style={{ gridTemplateColumns: '230px 1fr' }}>
          <div className="space-y-5">
            <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-2 w-full animate-pulse rounded-full bg-gray-200" />
            <div className="grid grid-cols-2 gap-1.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-3 animate-pulse rounded bg-gray-200" />
              ))}
            </div>
            <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
            <div className="flex flex-wrap gap-1.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-6 w-16 animate-pulse rounded bg-gray-200" />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-md"
                  style={{ border: '1px solid var(--theme-rule)' }}
                />
              ))}
            </div>
            <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-3 w-full animate-pulse rounded bg-gray-200" />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-2 w-full animate-pulse rounded-full bg-gray-200" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-3 w-20 animate-pulse rounded bg-gray-200" />
            ))}
          </div>

          <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-md"
                style={{ border: '1px solid var(--theme-rule)' }}
              />
            ))}
          </div>

          <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-3 w-full animate-pulse rounded bg-gray-200" />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
