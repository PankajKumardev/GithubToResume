import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useTokenStore } from '@/store/tokenStore';
import { validateToken } from '@/github/client';

interface Props {
  open: boolean;
  onClose: () => void;
}

/**
 * Raw, unstyled-by-design Swiss modal. Just a 1px border on paper, no shadow,
 * no rounding, no animation. Functional minimum.
 */
export function TokenDialog({ open, onClose }: Props) {
  const { token, setToken, clearToken } = useTokenStore();
  const [draft, setDraft] = useState(token ?? '');
  const [show, setShow] = useState(false);
  const [validating, setValidating] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      setDraft(token ?? '');
      setShow(false);
      setStatus(null);
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
      setStatus({ ok: true, msg: 'TOKEN CLEARED' });
      return;
    }
    setValidating(true);
    setStatus(null);
    try {
      const result = await validateToken(trimmed);
      if (!result.ok) {
        setStatus({ ok: false, msg: 'INVALID OR EXPIRED · 401' });
        return;
      }
      const hasFullRepo = result.scopes.includes('repo');
      if (hasFullRepo) {
        setStatus({
          ok: false,
          msg: 'WARN · DROP "repo" SCOPE — NOT NEEDED',
        });
      } else {
        setStatus({
          ok: true,
          msg: `OK · ${result.login ?? '?'} · ${result.scopes.join(',') || 'no scopes'}`,
        });
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-app-primary/30" aria-hidden />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg border border-app-primary bg-app-bg"
      >
        <div className="flex items-center justify-between border-b border-app-primary px-4 py-2 font-mono text-[11px] uppercase tracking-widest">
          <h2 id="token-dialog-title">[ CONFIGURE_AUTH_TOKEN ]</h2>
          <button
            ref={closeRef}
            onClick={onClose}
            className="hover:text-app-accent"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 p-4 font-mono">
          <div>
            <div className="mb-1 text-[10px] uppercase tracking-widest text-app-muted">
              GITHUB PAT · public_repo + read:user
            </div>
            <input
              type={show ? 'text' : 'password'}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="ghp_••••••••••••"
              className="w-full border border-app-primary bg-app-bg px-3 py-2 font-mono text-sm text-app-primary outline-none placeholder:text-app-muted focus:border-app-accent"
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <label className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-app-muted">
            <input
              type="checkbox"
              checked={show}
              onChange={(e) => setShow(e.target.checked)}
              className="h-3.5 w-3.5 accent-app-accent"
            />
            REVEAL
          </label>

          {status && (
            <div
              role="status"
              className={`border px-3 py-2 text-[11px] uppercase tracking-widest ${
                status.ok
                  ? 'border-app-accent text-app-accent'
                  : 'border-app-danger text-app-danger'
              }`}
            >
              {status.msg}
            </div>
          )}

          <div className="flex items-center justify-between gap-2">
            <a
              href="https://github.com/settings/tokens/new?scopes=public_repo,read:user&description=GitHub%20R%C3%A9sum%C3%A9"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] uppercase tracking-widest text-app-accent hover:underline"
            >
              [ GENERATE NEW ]
            </a>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  clearToken();
                  setDraft('');
                  setStatus({ ok: true, msg: 'TOKEN CLEARED' });
                }}
                className="border border-app-primary bg-app-bg px-3 py-1.5 text-[11px] uppercase tracking-widest hover:bg-app-surface"
              >
                CLEAR
              </button>
              <button
                type="button"
                onClick={save}
                disabled={validating}
                className="inline-flex items-center gap-1.5 border border-app-primary bg-app-primary px-3 py-1.5 text-[11px] uppercase tracking-widest text-app-bg hover:bg-app-accent hover:border-app-accent disabled:opacity-70"
              >
                {validating && <Loader2 className="h-3 w-3 animate-spin" />}
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
