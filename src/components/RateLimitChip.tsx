import type { RateLimit } from '@/resume/types';
import { Activity } from 'lucide-react';
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
      ? 'text-app-danger border-red-100 bg-red-50'
      : pct < 30
        ? 'text-amber-700 border-amber-100 bg-amber-50'
        : 'text-app-muted border-app-border bg-app-surface';

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'hidden items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10.5px] tabular-nums lg:inline-flex',
        tone,
      )}
      title={`${rateLimit.remaining} of ${rateLimit.limit} GraphQL requests remaining`}
    >
      <Activity className="h-3 w-3" />
      <span>
        {rateLimit.remaining}/{rateLimit.limit}
      </span>
      {reset && <span className="opacity-70">· resets {reset}</span>}
    </div>
  );
}
