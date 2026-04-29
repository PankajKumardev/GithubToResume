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
      ? 'text-app-danger border-app-danger/40 bg-app-danger/10'
      : pct < 30
        ? 'text-app-warning border-app-warning/30 bg-app-warning/10'
        : 'text-app-muted border-app-border bg-app-surface';

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[11px] tabular-nums',
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
