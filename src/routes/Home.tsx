import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, KeyRound, ShieldCheck, Sparkles, X } from 'lucide-react';
import { UsernameInput } from '@/components/UsernameInput';
import { TokenDialog } from '@/components/TokenDialog';
import { useTokenStore } from '@/store/tokenStore';
import { usePrefsStore } from '@/store/prefsStore';

export default function Home() {
  const [open, setOpen] = useState(false);
  const { token } = useTokenStore();
  const { recent, clearRecent } = usePrefsStore();

  return (
    <div className="relative flex min-h-screen flex-1 flex-col items-center justify-center overflow-hidden bg-app-bg px-4 py-16">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative z-10 w-full max-w-2xl">
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-app-border bg-app-surface px-3 py-1 text-xs text-app-muted">
            <Sparkles className="h-3 w-3 text-app-accent" /> Vector PDF · 100% client-side
          </span>
        </div>
        <h1 className="text-balance text-center text-4xl font-semibold tracking-tight text-app-primary sm:text-5xl">
          Turn your GitHub into a{' '}
          <span className="bg-gradient-to-r from-app-accent to-sky-300 bg-clip-text text-transparent">
            beautiful résumé.
          </span>
        </h1>
        <p className="mt-4 text-center text-base text-app-muted">
          Type a username, pick a theme, download a sharp printable PDF. No servers, no signup, no
          tracking.
        </p>

        <div className="mt-10">
          <UsernameInput />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-app-muted">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 hover:bg-white/5 hover:text-app-primary"
          >
            <KeyRound className="h-3.5 w-3.5" />
            {token ? 'Manage token' : 'Add GitHub token (optional, recommended)'}
          </button>
          {token && (
            <span className="inline-flex items-center gap-1 text-app-success">
              <ShieldCheck className="h-3.5 w-3.5" />
              Token stored securely in local browser storage only
            </span>
          )}
        </div>

        {recent.length > 0 && (
          <div className="mt-10">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-app-muted">Recent</span>
              <button
                type="button"
                onClick={clearRecent}
                className="text-xs text-app-muted hover:text-app-primary"
              >
                Clear
              </button>
            </div>
            <ul className="flex flex-wrap gap-2">
              {recent.map((u) => (
                <li key={u}>
                  <Link
                    to={`/u/${encodeURIComponent(u)}`}
                    className="group inline-flex items-center gap-1 rounded-full border border-app-border bg-app-surface px-3 py-1 text-xs text-app-primary hover:border-app-accent/50 hover:bg-white/5"
                  >
                    @{u}
                    <X className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <FeaturesGrid />
      </div>

      <TokenDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

function FeaturesGrid() {
  const items = [
    {
      title: 'True vector PDF',
      body: 'Selectable, searchable text. Renders identically in Chrome, Safari, and Firefox.',
    },
    {
      title: 'Three editorial themes',
      body: 'Modern Serif, Swiss Minimal, and Dev Terminal. Live-switch on screen and in the PDF.',
    },
    {
      title: 'Privacy by design',
      body: 'Your PAT lives only in your browser. We post it directly to api.github.com — nowhere else.',
    },
  ];
  return (
    <ul className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((it) => (
        <li
          key={it.title}
          className="rounded-xl border border-app-border bg-app-surface p-4 text-left"
        >
          <FileText className="h-4 w-4 text-app-accent" />
          <h3 className="mt-2 text-sm font-medium text-app-primary">{it.title}</h3>
          <p className="mt-1 text-xs text-app-muted">{it.body}</p>
        </li>
      ))}
    </ul>
  );
}
