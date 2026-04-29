import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { fetchResume, ResumeError } from '@/github/client';
import { useTokenStore } from '@/store/tokenStore';
import { usePrefsStore } from '@/store/prefsStore';
import { themes } from '@/resume/themes';
import type { ResumeData, RateLimit } from '@/resume/types';
import { ResumePreview } from '@/components/ResumePreview';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ExportBar, SecondaryActions } from '@/components/ExportBar';
import { RateLimitChip } from '@/components/RateLimitChip';
import { ErrorState } from '@/components/ErrorState';
import { TokenDialog } from '@/components/TokenDialog';
import { springSoft } from '@/lib/motion';

export default function ResumeRoute() {
  const { username = '' } = useParams<{ username: string }>();
  const { token } = useTokenStore();
  const { theme: themeId, pushRecent } = usePrefsStore();
  const theme = themes[themeId];
  const [tokenDialogOpen, setTokenDialogOpen] = useState(false);

  const envToken = import.meta.env.VITE_GITHUB_TOKEN ?? null;
  const effectiveToken = envToken && envToken.length > 0 ? envToken : token;

  const query = useQuery({
    queryKey: ['resume', username.toLowerCase(), Boolean(effectiveToken)],
    queryFn: () => fetchResume(username, effectiveToken),
    enabled: username.length > 0,
    staleTime: 5 * 60 * 1000,
    retry: (count, err) => {
      if (err instanceof ResumeError) {
        if (err.kind === 'user-not-found' || err.kind === 'unauthorized') return false;
      }
      return count < 1;
    },
  });

  useEffect(() => {
    if (query.data) pushRecent(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data]);

  const data: ResumeData | null = query.data?.data ?? null;
  const rateLimit: RateLimit | undefined = query.data?.rateLimit;

  const status = query.isError
    ? 'ERROR'
    : query.isFetching || query.isLoading
      ? 'RENDERING'
      : 'READY';

  return (
    <div className="min-h-screen bg-app-bg p-2 sm:p-4">
      {/* Picture frame */}
      <div className="flex min-h-[calc(100vh-1rem)] flex-col border border-app-border bg-app-surface sm:min-h-[calc(100vh-2rem)]">
        {/* Row 1: status + identity */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-app-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-app-muted">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:text-app-accent">
              [ ← HOME ]
            </Link>
            <span>STATUS: <span className="text-app-primary">{status}</span></span>
            <RateLimitChip rateLimit={rateLimit} />
          </div>
          <div className="flex items-center gap-3">
            <span>USER: <span className="text-app-primary">{username}</span></span>
            <span className="hidden sm:inline">THEME: <span className="text-app-primary">{theme.label.toUpperCase()}</span></span>
            <button
              onClick={() => setTokenDialogOpen(true)}
              className="hover:text-app-accent"
            >
              {effectiveToken ? '[ TOKEN: STORED ]' : '[ CONFIGURE_AUTH_TOKEN ]'}
            </button>
          </div>
        </div>

        {/* Row 2: massive download button */}
        <ExportBar data={data} theme={theme} />

        {/* Row 3: secondary actions + theme switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-app-border px-4 py-2">
          <ThemeSwitcher />
          <SecondaryActions />
        </div>

        {/* Canvas */}
        <main className="flex-1 px-4 py-12 sm:px-8">
          {query.isError && query.error instanceof ResumeError ? (
            <div className="mt-8">
              <ErrorState
                kind={query.error.kind}
                message={query.error.message}
                username={username}
                onRetry={() => query.refetch()}
                onOpenToken={() => setTokenDialogOpen(true)}
              />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springSoft}
              className="mx-auto max-w-[820px]"
            >
              <ResumePreview
                data={data}
                theme={theme}
                loading={query.isLoading || query.isFetching}
              />
            </motion.div>
          )}

          {!effectiveToken && (
            <div className="no-print mx-auto mt-8 max-w-md border border-app-border bg-app-bg p-3 text-center font-mono text-[11px] uppercase tracking-widest text-app-muted">
              <span className="text-app-primary">TIP ·</span> ANONYMOUS LIMIT 60/HR.{' '}
              <button
                onClick={() => setTokenDialogOpen(true)}
                className="text-app-accent hover:underline"
              >
                [ ADD TOKEN ]
              </button>
            </div>
          )}
        </main>
      </div>

      <TokenDialog open={tokenDialogOpen} onClose={() => setTokenDialogOpen(false)} />
    </div>
  );
}
