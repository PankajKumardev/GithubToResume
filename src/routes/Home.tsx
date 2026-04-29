import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound } from 'lucide-react';
import { UsernameInput } from '@/components/UsernameInput';
import { TokenDialog } from '@/components/TokenDialog';
import { useTokenStore } from '@/store/tokenStore';
import { usePrefsStore } from '@/store/prefsStore';

export default function Home() {
  const [open, setOpen] = useState(false);
  const { token } = useTokenStore();
  const { recent, clearRecent } = usePrefsStore();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-4 py-12">
      <main className="flex w-full max-w-xl flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-3 py-1 font-mono text-[10.5px] uppercase tracking-widest text-muted"
        >
          OUTPUT: VECTOR_PDF
          <span aria-hidden className="text-border">|</span>
          100% CLIENT-SIDE
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.05 }}
          className="mt-8 max-w-2xl text-balance text-center text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl"
          style={{ letterSpacing: '-0.02em' }}
        >
          Compile your GitHub
          <br />
          into a perfect résumé.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="mt-5 max-w-lg text-center text-base leading-relaxed text-muted"
        >
          Zero servers. Zero tracking. Just a flawlessly structured, ATS-friendly vector PDF
          generated entirely in your browser.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="relative z-10 mt-10 w-full"
        >
          <UsernameInput />
        </motion.div>

        {/* Telemetry footer */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-widest text-muted">
          <span>REACT-PDF ENGINE</span>
          <span aria-hidden>·</span>
          <span>GRAPHQL API</span>
          <span aria-hidden>·</span>
          <span>A4 FORMAT</span>
          <span aria-hidden>·</span>
          <span>{'<'} 50KB</span>
        </div>

        <div className="mt-6 flex items-center gap-4 text-xs text-muted">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted hover:border-ink/30 hover:text-ink"
          >
            <KeyRound className="h-3 w-3" />
            {token ? 'TOKEN: STORED' : 'CONFIGURE_AUTH_TOKEN'}
          </button>
        </div>

        {recent.length > 0 && (
          <div className="mt-10 w-full">
            <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted">
              <span>Recent</span>
              <button
                type="button"
                onClick={clearRecent}
                className="hover:text-ink"
              >
                Clear
              </button>
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {recent.map((u) => (
                <li key={u}>
                  <Link
                    to={`/u/${encodeURIComponent(u)}`}
                    className="inline-flex items-center rounded-md border border-border bg-white px-2.5 py-1 font-mono text-xs text-ink hover:border-ink/30"
                  >
                    @{u}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <TokenDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
