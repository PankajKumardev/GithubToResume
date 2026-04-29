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
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-xl border border-border bg-white p-8 text-center shadow-cmd">
      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-red-200 bg-red-50 text-red-600">
        <AlertCircle className="h-5 w-5" />
      </div>
      <h2 className="text-lg font-semibold tracking-tight text-ink">{title}</h2>
      <p className="text-sm leading-relaxed text-muted">{message}</p>
      {kind === 'user-not-found' && username && (
        <a
          href={`https://github.com/${encodeURIComponent(username)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink underline-offset-2 hover:underline"
        >
          <Github className="h-3.5 w-3.5" />
          Check on github.com
        </a>
      )}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-3 py-1.5 text-sm text-ink hover:bg-surface"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </button>
        )}
        {(kind === 'rate-limited' || kind === 'unauthorized') && onOpenToken && (
          <button
            onClick={onOpenToken}
            className="inline-flex items-center gap-1.5 rounded-md bg-ink px-3 py-1.5 text-sm font-medium text-white hover:bg-black"
          >
            <Key className="h-3.5 w-3.5" />
            Add token
          </button>
        )}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-3 py-1.5 text-sm text-ink hover:bg-surface"
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
