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
} from 'lucide-react';
import { useTokenStore } from '@/store/tokenStore';
import { validateToken } from '@/github/client';
import { cn } from '@/lib/format';

interface Props {
  open: boolean;
  onClose: () => void;
}

/** Strict white modal — solid backdrop (no blur), 1px border, rounded-xl. */
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
          transition={{ duration: 0.15 }}
        >
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/30"
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-border bg-white shadow-cmd"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-3.5">
              <div>
                <h2 id="token-dialog-title" className="text-base font-semibold tracking-tight text-ink">
                  Configure GitHub PAT
                </h2>
                <p className="mt-0.5 text-xs text-muted">
                  Boosts rate limit from 60/hr to 5,000/hr.
                </p>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                className="rounded-md p-1 text-muted hover:bg-surface hover:text-ink"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <label className="block font-mono text-[10.5px] uppercase tracking-widest text-muted">
                  Token
                </label>
                <div className="relative mt-1.5">
                  <input
                    type={show ? 'text' : 'password'}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="ghp_••••••••••••••••••••••••••••••••"
                    className="w-full rounded-md border border-border bg-surface px-3 py-2 pr-10 font-mono text-sm text-ink outline-none transition-colors focus:border-ink focus:bg-white"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? 'Hide token' : 'Show token'}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted hover:bg-surface hover:text-ink"
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <ul className="space-y-1 text-xs text-muted">
                <li>
                  Required scopes (classic):{' '}
                  <code className="rounded border border-border bg-surface px-1 py-0.5 font-mono text-ink">
                    public_repo
                  </code>{' '}
                  <code className="rounded border border-border bg-surface px-1 py-0.5 font-mono text-ink">
                    read:user
                  </code>
                </li>
                <li>
                  <a
                    className="inline-flex items-center gap-0.5 font-medium text-ink underline-offset-2 hover:underline"
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

              {warning && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <span>{warning}</span>
                </div>
              )}
              {info && (
                <div
                  role="status"
                  className="flex items-start gap-2 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900"
                >
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{info}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-surface/50 px-5 py-3.5">
              <button
                type="button"
                onClick={() => {
                  clearToken();
                  setDraft('');
                  setInfo('Token cleared.');
                  setWarning(null);
                }}
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-muted hover:bg-white hover:text-ink"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md border border-border bg-white px-3 py-1.5 text-sm text-ink hover:bg-surface"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={save}
                  disabled={validating}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-md bg-ink px-4 py-1.5 text-sm font-medium text-white hover:bg-black',
                    validating && 'opacity-80',
                  )}
                >
                  {validating && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
