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
      ? 'text-app-danger'
      : pct < 30
        ? 'text-amber-700'
        : 'text-app-muted';

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'hidden font-mono text-[10px] uppercase tracking-widest tabular-nums sm:inline-flex',
        tone,
      )}
      title={`${rateLimit.remaining} of ${rateLimit.limit} GraphQL requests remaining`}
    >
      <span>RATE: {rateLimit.remaining}/{rateLimit.limit}</span>
      {reset && <span className="ml-2 opacity-70">· RESET {reset}</span>}
    </div>
  );
}
