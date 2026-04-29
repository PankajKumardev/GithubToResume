import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Eye,
  EyeOff,
  ExternalLink,
  Trash2,
  X,
  ShieldCheck,
  AlertTriangle,
  Loader2,
  KeyRound,
} from 'lucide-react';
import { useTokenStore } from '@/store/tokenStore';
import { validateToken } from '@/github/client';
import { cn } from '@/lib/format';
import { springSnap } from '@/lib/motion';

interface Props {
  open: boolean;
  onClose: () => void;
}

/** Glassmorphic token modal — bg-white/85 + backdrop-blur, rounded-2xl. */
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
        setInfo(
          `Verified as ${result.login ?? 'unknown'}. Scopes: ${
            result.scopes.join(', ') || 'none'
          }`,
        );
      }
      setToken(trimmed);
    } finally {
      setValidating(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="token-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            onClick={onClose}
            className="absolute inset-0 bg-app-primary/15 backdrop-blur-md"
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 4 }}
            transition={springSnap}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/40 bg-white/90 p-6 shadow-glass backdrop-blur-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-app-accent/10 text-app-accent ring-1 ring-app-accent/20">
                  <KeyRound className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h2
                    id="token-dialog-title"
                    className="text-lg font-semibold tracking-crisp text-app-primary"
                  >
                    GitHub Personal Access Token
                  </h2>
                  <p className="mt-0.5 text-sm text-app-muted">
                    Optional — boosts your rate limit from 60/hr to 5,000/hr.
                  </p>
                </div>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                className="rounded-full p-1.5 text-app-muted hover:bg-app-surface hover:text-app-primary"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5">
              <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-app-muted">
                Token
              </label>
              <div className="relative mt-1.5">
                <input
                  type={show ? 'text' : 'password'}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="ghp_••••••••••••••••••••••••••••••••"
                  className="w-full rounded-xl border border-app-border bg-app-surface px-3.5 py-2.5 pr-10 font-mono text-sm text-app-primary outline-none transition-all focus:border-app-accent focus:bg-white focus:ring-2 focus:ring-app-accent/20"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? 'Hide token' : 'Show token'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-app-muted hover:bg-app-surface hover:text-app-primary"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <ul className="mt-3 space-y-1 text-xs leading-relaxed text-app-muted">
                <li>
                  Required scopes (classic):{' '}
                  <code className="rounded bg-app-surface px-1 py-0.5 font-mono text-app-primary">
                    public_repo
                  </code>
                  ,{' '}
                  <code className="rounded bg-app-surface px-1 py-0.5 font-mono text-app-primary">
                    read:user
                  </code>
                </li>
                <li>
                  <a
                    className="inline-flex items-center gap-0.5 font-medium text-app-accent hover:underline"
                    href="https://github.com/settings/tokens/new?scopes=public_repo,read:user&description=GitHub%20R%C3%A9sum%C3%A9"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Generate one on github.com
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>Stored only in your browser. Posted only to api.github.com.</li>
              </ul>
            </div>

            {warning && (
              <div
                role="alert"
                className="mt-4 flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50 p-3 text-sm text-amber-900"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <span>{warning}</span>
              </div>
            )}
            {info && (
              <div
                role="status"
                className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-900"
              >
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
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
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm text-app-muted hover:bg-app-surface hover:text-app-primary"
              >
                <Trash2 className="h-4 w-4" />
                Clear token
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-app-border bg-white px-4 py-2 text-sm text-app-primary hover:bg-app-surface"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={save}
                  disabled={validating}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full bg-app-primary px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-app-accent hover:shadow-md',
                    validating && 'opacity-80',
                  )}
                >
                  {validating && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  Save token
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
