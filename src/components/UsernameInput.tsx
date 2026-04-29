import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Github, Loader2 } from 'lucide-react';
import { cn } from '@/lib/format';

const VALID = /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/;

/** Glass pill command bar — bg-white/70 + backdrop-blur-xl, rounded-full. */
export function UsernameInput() {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = value.trim().replace(/^@/, '');
    if (v.length === 0) {
      setError('Enter a GitHub username.');
      return;
    }
    if (!VALID.test(v)) {
      setError('Invalid GitHub username.');
      return;
    }
    setError(null);
    setBusy(true);
    navigate(`/u/${encodeURIComponent(v)}`);
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div
        className={cn(
          'flex items-center gap-1.5 rounded-full border border-white/40 bg-white/70 p-1.5 shadow-glass backdrop-blur-xl transition-shadow hover:shadow-soft',
          error && 'ring-2 ring-red-200',
        )}
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-app-surface text-app-muted">
          <Github className="h-4 w-4" />
        </div>
        <input
          type="text"
          inputMode="text"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          autoComplete="off"
          autoFocus
          placeholder="torvalds"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          aria-label="GitHub username"
          className="h-12 flex-1 bg-transparent px-2 text-lg font-medium text-app-primary outline-none placeholder:text-app-subtle"
        />
        <button
          type="submit"
          disabled={busy}
          className={cn(
            'inline-flex h-12 shrink-0 items-center gap-1.5 rounded-full bg-app-accent px-6 text-sm font-semibold text-white shadow-md transition-all',
            'hover:scale-[0.98] hover:bg-app-accent-hover hover:shadow-lg active:scale-[0.96] disabled:opacity-90',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white',
          )}
        >
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Compiling
            </>
          ) : (
            <>
              Compile <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-center text-sm text-app-danger">
          {error}
        </p>
      )}
    </form>
  );
}
