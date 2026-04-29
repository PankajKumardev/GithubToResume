import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/format';

interface Props {
  onValueChange?: (v: string) => void;
}

const VALID = /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/;

/** Brutalist Swiss input — 2px primary border, no rounding, Klein Blue compile button. */
export function UsernameInput({ onValueChange }: Props) {
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
          'flex w-full items-stretch border-2 bg-app-bg transition-colors',
          error ? 'border-app-danger' : 'border-app-primary',
        )}
      >
        <div className="flex w-12 shrink-0 items-center justify-center font-mono text-2xl text-app-muted">
          @
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
            onValueChange?.(e.target.value);
            if (error) setError(null);
          }}
          aria-label="GitHub username"
          className="h-16 flex-1 bg-transparent px-1 font-mono text-2xl text-app-primary outline-none placeholder:text-app-muted"
        />
        <button
          type="submit"
          disabled={busy}
          className={cn(
            'inline-flex h-16 shrink-0 items-center gap-2 px-6 font-mono text-base uppercase tracking-widest text-white transition-colors',
            'bg-app-accent hover:bg-app-primary disabled:opacity-90',
            'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-app-accent/40',
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
        <p
          role="alert"
          className="mt-2 font-mono text-xs uppercase tracking-widest text-app-danger"
        >
          [ ERROR ] {error}
        </p>
      )}
    </form>
  );
}
