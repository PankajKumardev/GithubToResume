import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2, AtSign } from 'lucide-react';
import { cn } from '@/lib/format';

interface Props {
  initialValue?: string;
  autoFocus?: boolean;
}

const VALID = /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/;

export function UsernameInput({ initialValue = '', autoFocus = true }: Props) {
  const [value, setValue] = useState(initialValue);
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
          'group relative flex items-center gap-2 rounded-2xl border bg-app-surface px-4 py-3 transition-all',
          error
            ? 'border-app-danger/60 ring-2 ring-app-danger/20'
            : 'border-app-border focus-within:border-app-accent focus-within:ring-2 focus-within:ring-app-accent/20',
        )}
      >
        <AtSign className="h-5 w-5 shrink-0 text-app-muted" aria-hidden />
        <input
          type="text"
          inputMode="text"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          autoComplete="off"
          autoFocus={autoFocus}
          placeholder="torvalds"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          aria-label="GitHub username"
          className="flex-1 bg-transparent text-lg text-app-primary placeholder:text-app-subtle focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy}
          className={cn(
            'inline-flex h-9 items-center gap-1.5 rounded-xl bg-app-accent px-3 text-sm font-medium text-white transition-all',
            'hover:bg-app-accent-hover active:scale-[0.98] disabled:opacity-60',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg',
          )}
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Generate <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-app-danger">
          {error}
        </p>
      )}
    </form>
  );
}
