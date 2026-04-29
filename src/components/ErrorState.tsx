import { AlertCircle, Github, RefreshCw, Key, Home } from 'lucide-react';
import type { ResumeErrorKind } from '@/github/client';
import { Link } from 'react-router-dom';

interface Props {
  kind: ResumeErrorKind;
  message: string;
  username?: string;
  onRetry?: () => void;
  onOpenToken?: () => void;
}

export function ErrorState({ kind, message, username, onRetry, onOpenToken }: Props) {
  const title = TITLES[kind];

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-app-border bg-app-surface p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-app-danger/10 text-app-danger">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h2 className="text-lg font-semibold text-app-primary">{title}</h2>
      <p className="text-sm text-app-muted">{message}</p>
      {kind === 'user-not-found' && username && (
        <a
          href={`https://github.com/${encodeURIComponent(username)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-app-accent hover:underline"
        >
          <Github className="h-3.5 w-3.5" />
          Check on github.com
        </a>
      )}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 rounded-lg border border-app-border bg-app-bg px-3 py-1.5 text-sm text-app-primary hover:bg-white/5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </button>
        )}
        {(kind === 'rate-limited' || kind === 'unauthorized') && onOpenToken && (
          <button
            onClick={onOpenToken}
            className="inline-flex items-center gap-1.5 rounded-lg bg-app-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-app-accent-hover"
          >
            <Key className="h-3.5 w-3.5" />
            Add token
          </button>
        )}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-lg border border-app-border bg-app-bg px-3 py-1.5 text-sm text-app-primary hover:bg-white/5"
        >
          <Home className="h-3.5 w-3.5" />
          Home
        </Link>
      </div>
    </div>
  );
}

const TITLES: Record<ResumeErrorKind, string> = {
  'user-not-found': 'User not found',
  unauthorized: 'Token rejected',
  'rate-limited': 'Rate limit exceeded',
  network: 'Network error',
  unknown: 'Something went wrong',
};
