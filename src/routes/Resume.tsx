import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ChevronLeft, KeyRound, Github } from 'lucide-react';
import { fetchResume, ResumeError } from '@/github/client';
import { useTokenStore } from '@/store/tokenStore';
import { usePrefsStore } from '@/store/prefsStore';
import { themes } from '@/resume/themes';
import type { ResumeData, RateLimit } from '@/resume/types';
import { ResumePreview } from '@/components/ResumePreview';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ExportBar } from '@/components/ExportBar';
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
  const rateLimit = query.data?.rateLimit;

  return (
    <div className="flex min-h-screen flex-col bg-app-surface-2">
      <TopBar
        username={username}
        avatarUrl={data?.profile.avatarUrl}
        rateLimit={rateLimit}
        data={data}
        onOpenToken={() => setTokenDialogOpen(true)}
      />

      <main className="flex-1 px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        {query.isError && query.error instanceof ResumeError ? (
          <ErrorState
            kind={query.error.kind}
            message={query.error.message}
            username={username}
            onRetry={() => query.refetch()}
            onOpenToken={() => setTokenDialogOpen(true)}
          />
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
          <div className="no-print mx-auto mt-6 max-w-md rounded-xl border border-app-border bg-white p-3 text-center text-xs text-app-muted shadow-soft">
            <span className="font-medium text-app-primary">Tip:</span> Add a personal access
            token to lift the anonymous 60/hr limit to 5,000/hr.{' '}
            <button
              onClick={() => setTokenDialogOpen(true)}
              className="text-app-accent hover:underline"
            >
              Add token →
            </button>
          </div>
        )}
      </main>

      <TokenDialog open={tokenDialogOpen} onClose={() => setTokenDialogOpen(false)} />
    </div>
  );
}

interface TopBarProps {
  username: string;
  avatarUrl?: string;
  rateLimit?: RateLimit;
  data: ResumeData | null;
  onOpenToken: () => void;
}

function TopBar({ username, avatarUrl, rateLimit, data, onOpenToken }: TopBarProps) {
  const { theme: themeId } = usePrefsStore();
  const theme = themes[themeId];
  return (
    <header className="no-print fixed inset-x-0 top-0 z-40 border-b border-app-border bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-md p-1 text-app-muted hover:bg-app-surface hover:text-app-primary"
            aria-label="Home"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-app-border bg-white px-2 py-1 shadow-soft">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt=""
                aria-hidden="true"
                className="h-6 w-6 rounded-full object-cover"
              />
            ) : (
              <Github className="h-5 w-5 text-app-muted" />
            )}
            <span className="font-mono text-sm text-app-primary">@{username}</span>
          </div>
          <RateLimitChip rateLimit={rateLimit} />
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <button
            onClick={onOpenToken}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-app-border bg-white px-2.5 text-xs text-app-muted hover:bg-app-surface hover:text-app-primary"
            aria-label="Token settings"
          >
            <KeyRound className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Token</span>
          </button>
          <ExportBar data={data} theme={theme} />
        </div>
      </div>
    </header>
  );
}
