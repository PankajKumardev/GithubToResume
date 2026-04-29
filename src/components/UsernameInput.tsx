import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, AtSign, Loader2 } from 'lucide-react';
import { cn } from '@/lib/format';
import { springSnap } from '@/lib/motion';

interface Props {
  initialValue?: string;
  autoFocus?: boolean;
}

const VALID = /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/;

/**
 * Floating "Command Bar" — a single rounded-2xl surface that contains the @
 * affordance, a borderless mono input, and a sharp slate primary action.
 */
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
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springSnap, delay: 0.25 }}
        className={cn(
          'relative z-10 flex items-center gap-1.5 rounded-2xl bg-white p-2 transition-shadow',
          'shadow-cmd hover:shadow-[0_12px_40px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.06)]',
          error && 'ring-2 ring-red-200',
        )}
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-app-surface text-app-muted">
          <AtSign className="h-4 w-4" />
        </div>
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
          className="h-12 flex-1 bg-transparent px-1 font-mono text-lg text-app-primary outline-none placeholder:text-app-subtle"
        />
        <button
          type="submit"
          disabled={busy}
          className={cn(
            'inline-flex h-12 items-center gap-1.5 rounded-xl bg-app-primary px-5 text-sm font-medium text-white transition-transform',
            'hover:bg-black hover:scale-[0.98] active:scale-[0.96] disabled:opacity-80',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white',
          )}
        >
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Compiling…
            </>
          ) : (
            <>
              Compile PDF <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </motion.div>
      {error && (
        <p role="alert" className="mt-2 text-center text-sm text-app-danger">
          {error}
        </p>
      )}
    </form>
  );
}
