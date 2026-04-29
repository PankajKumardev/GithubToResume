import type { RateLimit } from '@/resume/types';
import { formatResetTime, rateLimitPercent } from '@/github/rateLimit';
import { cn } from '@/lib/format';

interface Props {
  rateLimit: RateLimit | undefined;
}

export function RateLimitChip({ rateLimit }: Props) {
  if (!rateLimit) return null;
  const pct = rateLimitPercent(rateLimit);
  const reset = formatResetTime(rateLimit);
  const tone =
    pct < 10
      ? 'text-red-600 border-red-200 bg-red-50'
      : pct < 30
        ? 'text-amber-700 border-amber-200 bg-amber-50'
        : 'text-muted border-border bg-surface';

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'hidden whitespace-nowrap items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[10.5px] tabular-nums lg:inline-flex',
        tone,
      )}
      title={`${rateLimit.remaining} of ${rateLimit.limit} GraphQL requests remaining`}
    >
      <span>
        {rateLimit.remaining}/{rateLimit.limit}
      </span>
      {reset && <span className="opacity-70">· {reset}</span>}
    </div>
  );
}
