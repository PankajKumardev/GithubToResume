import type { ThemeTokens } from '@/resume/themes';
import { cssVarsFor } from '@/resume/themes';
import { PAGE_HEIGHT, PAGE_WIDTH } from '@/resume/ResumeView';

/**
 * Pixel-perfect skeleton wireframe matching the résumé layout. Soft rounded
 * pulse blocks. No content shift when data arrives.
 */
export function LoadingSkeleton({ theme }: { theme: ThemeTokens }) {
  return (
    <div
      data-theme={theme.id}
      style={{
        ...cssVarsFor(theme),
        background: 'var(--theme-bg)',
        width: PAGE_WIDTH,
        minHeight: PAGE_HEIGHT,
        padding: 56,
      }}
      className="flex flex-col gap-6"
      aria-busy="true"
      aria-label="Loading résumé"
    >
      {/* Header */}
      <div className="flex items-start gap-5">
        <div className="h-20 w-20 shrink-0 animate-pulse rounded-full bg-slate-200" />
        <div className="flex-1 space-y-2">
          <div className="h-7 w-2/3 animate-pulse rounded-md bg-slate-200" />
          <div className="h-4 w-1/3 animate-pulse rounded-md bg-slate-200" />
          <div className="flex gap-3 pt-1">
            <div className="h-3 w-20 animate-pulse rounded-md bg-slate-200" />
            <div className="h-3 w-24 animate-pulse rounded-md bg-slate-200" />
            <div className="h-3 w-28 animate-pulse rounded-md bg-slate-200" />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="h-3.5 w-3/4 animate-pulse rounded-md bg-slate-200" />

      {/* Stats */}
      <div
        className="grid grid-cols-7 gap-2 pt-3"
        style={{ borderTop: '1px solid var(--theme-rule)' }}
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-2 w-3/4 animate-pulse rounded bg-slate-200" />
            <div className="h-5 w-1/2 animate-pulse rounded bg-slate-200" />
          </div>
        ))}
      </div>

      {/* Languages */}
      <div className="space-y-3">
        <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
        <div className="h-2 w-full animate-pulse rounded-full bg-slate-200" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-3 w-20 animate-pulse rounded bg-slate-200" />
          ))}
        </div>
      </div>

      {/* Pinned */}
      <div className="space-y-3">
        <div className="h-3 w-32 animate-pulse rounded bg-slate-200" />
        <div className="grid grid-cols-2 gap-2.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-xl"
              style={{ border: '1px solid var(--theme-rule)' }}
            />
          ))}
        </div>
      </div>

      {/* Top repos */}
      <div className="space-y-3">
        <div className="h-3 w-32 animate-pulse rounded bg-slate-200" />
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-3 w-full animate-pulse rounded bg-slate-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
