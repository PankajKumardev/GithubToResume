import { Link } from 'react-router-dom';
import type { ResumeErrorKind } from '@/github/client';

interface Props {
  kind: ResumeErrorKind;
  message: string;
  username?: string;
  onRetry?: () => void;
  onOpenToken?: () => void;
}

export function ErrorState({ kind, message, username, onRetry, onOpenToken }: Props) {
  const code = CODES[kind];
  return (
    <div className="mx-auto max-w-md border border-app-primary bg-app-bg">
      <div className="border-b border-app-primary bg-app-primary px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-app-bg">
        [ {code} ] {TITLES[kind]}
      </div>
      <div className="p-6 font-mono">
        <p className="text-sm text-app-primary">{message}</p>
        {kind === 'user-not-found' && username && (
          <a
            href={`https://github.com/${encodeURIComponent(username)}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-[11px] uppercase tracking-widest text-app-accent hover:underline"
          >
            [ CHECK ON GITHUB.COM ]
          </a>
        )}
        <div className="mt-6 flex flex-wrap gap-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="border border-app-primary bg-app-bg px-3 py-1.5 text-[11px] uppercase tracking-widest hover:bg-app-surface"
            >
              [ RETRY ]
            </button>
          )}
          {(kind === 'rate-limited' || kind === 'unauthorized') && onOpenToken && (
            <button
              onClick={onOpenToken}
              className="border border-app-primary bg-app-accent px-3 py-1.5 text-[11px] uppercase tracking-widest text-white hover:bg-app-primary"
            >
              [ ADD TOKEN ]
            </button>
          )}
          <Link
            to="/"
            className="border border-app-primary bg-app-bg px-3 py-1.5 text-[11px] uppercase tracking-widest hover:bg-app-surface"
          >
            [ HOME ]
          </Link>
        </div>
      </div>
    </div>
  );
}

const TITLES: Record<ResumeErrorKind, string> = {
  'user-not-found': 'USER NOT FOUND',
  unauthorized: 'TOKEN REJECTED',
  'rate-limited': 'RATE LIMIT EXCEEDED',
  network: 'NETWORK ERROR',
  unknown: 'UNKNOWN FAILURE',
};
const CODES: Record<ResumeErrorKind, string> = {
  'user-not-found': 'ERROR_404',
  unauthorized: 'ERROR_401',
  'rate-limited': 'ERROR_403',
  network: 'ERROR_NET',
  unknown: 'ERROR_500',
};
