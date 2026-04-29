import { useEffect, useRef, useState } from 'react';
import { Eye, EyeOff, ExternalLink, Trash2, X, ShieldCheck, AlertTriangle, Loader2 } from 'lucide-react';
import { useTokenStore } from '@/store/tokenStore';
import { validateToken } from '@/github/client';
import { cn } from '@/lib/format';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function TokenDialog({ open, onClose }: Props) {
  const { token, setToken, clearToken } = useTokenStore();
  const [draft, setDraft] = useState(token ?? '');
  const [show, setShow] = useState(false);
  const [validating, setValidating] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      setDraft(token ?? '');
      setWarning(null);
      setInfo(null);
      setShow(false);
      setTimeout(() => closeRef.current?.focus(), 0);
    }
  }, [open, token]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  async function save() {
    const trimmed = draft.trim();
    if (trimmed.length === 0) {
      clearToken();
      onClose();
      return;
    }
    setValidating(true);
    setWarning(null);
    setInfo(null);
    try {
      const result = await validateToken(trimmed);
      if (!result.ok) {
        setWarning('Token is invalid or expired. GitHub returned 401.');
        return;
      }
      const hasFullRepo = result.scopes.includes('repo');
      if (hasFullRepo) {
        setWarning(
          'Detected full "repo" scope. Recommend downgrading to public_repo + read:user only.',
        );
      } else {
        setInfo(`Verified as ${result.login ?? 'unknown'}. Scopes: ${result.scopes.join(', ') || 'none'}`);
      }
      setToken(trimmed);
    } finally {
      setValidating(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="token-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg animate-fade-in rounded-2xl border border-app-border bg-app-surface p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="token-dialog-title" className="text-lg font-semibold text-app-primary">
              GitHub Personal Access Token
            </h2>
            <p className="mt-1 text-sm text-app-muted">
              Optional. Boosts your rate limit from 60/hr to 5,000/hr and unlocks private metadata.
            </p>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="rounded-md p-1 text-app-muted hover:bg-white/5 hover:text-app-primary"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5">
          <label className="block text-xs font-medium uppercase tracking-wider text-app-muted">
            Token (classic or fine-grained)
          </label>
          <div className="relative mt-1.5">
            <input
              type={show ? 'text' : 'password'}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="ghp_••••••••••••••••••••••••••••••••"
              className="w-full rounded-lg border border-app-border bg-app-bg px-3 py-2 pr-10 font-mono text-sm text-app-primary outline-none focus:border-app-accent focus:ring-2 focus:ring-app-accent/20"
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? 'Hide token' : 'Show token'}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-app-muted hover:bg-white/5 hover:text-app-primary"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <ul className="mt-3 space-y-1 text-xs text-app-muted">
            <li>
              Required scopes (classic): <code className="text-app-primary">public_repo</code>,{' '}
              <code className="text-app-primary">read:user</code>
            </li>
            <li className="inline-flex items-center gap-1">
              Generate one here:{' '}
              <a
                className="inline-flex items-center gap-0.5 text-app-accent hover:underline"
                href="https://github.com/settings/tokens/new?scopes=public_repo,read:user&description=GitHub%20R%C3%A9sum%C3%A9"
                target="_blank"
                rel="noreferrer"
              >
                github.com/settings/tokens
                <ExternalLink className="h-3 w-3" />
              </a>
            </li>
            <li>The token never leaves your browser. We only POST it to api.github.com.</li>
          </ul>
        </div>

        {warning && (
          <div
            role="alert"
            className="mt-4 flex items-start gap-2 rounded-lg border border-app-warning/30 bg-app-warning/10 p-3 text-sm text-app-primary"
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-app-warning" />
            <span>{warning}</span>
          </div>
        )}
        {info && (
          <div
            role="status"
            className="mt-4 flex items-start gap-2 rounded-lg border border-app-success/30 bg-app-success/10 p-3 text-sm text-app-primary"
          >
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-app-success" />
            <span>{info}</span>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => {
              clearToken();
              setDraft('');
              setInfo('Token cleared.');
              setWarning(null);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-app-border px-3 py-1.5 text-sm text-app-muted hover:bg-white/5 hover:text-app-primary"
          >
            <Trash2 className="h-4 w-4" />
            Clear token
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-app-border bg-app-surface px-3 py-1.5 text-sm text-app-primary hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={save}
              disabled={validating}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg bg-app-accent px-4 py-1.5 text-sm font-medium text-white hover:bg-app-accent-hover',
                validating && 'opacity-70',
              )}
            >
              {validating && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Save token
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
