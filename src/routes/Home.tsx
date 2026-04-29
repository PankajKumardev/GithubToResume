import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound, ShieldCheck, X } from 'lucide-react';
import { UsernameInput } from '@/components/UsernameInput';
import { TokenDialog } from '@/components/TokenDialog';
import { MockupFan } from '@/components/MockupFan';
import { useTokenStore } from '@/store/tokenStore';
import { usePrefsStore } from '@/store/prefsStore';
import { springSoft } from '@/lib/motion';

export default function Home() {
  const [open, setOpen] = useState(false);
  const { token } = useTokenStore();
  const { recent, clearRecent } = usePrefsStore();

  return (
    <div className="relative flex min-h-screen flex-1 flex-col bg-app-bg">
      {/* Subtle ambient cobalt glow at the very top — opacity dialled way down */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-20%] h-[480px] opacity-[0.05]"
        style={{
          background:
            'radial-gradient(closest-side, #0066FF 0%, rgba(0,102,255,0) 70%)',
        }}
      />

      <main className="relative z-10 flex flex-1 flex-col items-center px-4 pb-32 pt-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="flex flex-col items-center gap-3"
        >
          <motion.span
            variants={fadeUpVariant}
            className="inline-flex items-center gap-2 rounded-full border border-app-border bg-white px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-app-muted shadow-soft"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-app-accent" />
            Vector PDF · 100% client-side
          </motion.span>

          <motion.h1
            variants={fadeUpVariant}
            className="mt-4 max-w-3xl text-balance text-center text-5xl font-semibold tracking-crisp text-app-primary md:text-6xl"
          >
            Your GitHub.
            <br />
            <span className="text-app-muted">Compiled into a perfect résumé.</span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariant}
            className="mt-3 max-w-xl text-center text-lg text-app-muted"
          >
            Vector-sharp. ATS-friendly. Zero servers. Just pure client-side PDF generation.
          </motion.p>
        </motion.div>

        {/* Command bar over the fanned mockups */}
        <div className="relative mt-12 w-full max-w-2xl">
          <MockupFan />
          <div className="relative z-20">
            <UsernameInput />
          </div>
        </div>

        <div className="relative z-20 mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-app-muted">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 hover:bg-app-surface hover:text-app-primary"
          >
            <KeyRound className="h-3.5 w-3.5" />
            {token ? 'Manage token' : 'Add GitHub token (optional, recommended)'}
          </button>
          {token && (
            <span className="inline-flex items-center gap-1 text-emerald-600">
              <ShieldCheck className="h-3.5 w-3.5" />
              Token saved · stored only in this browser
            </span>
          )}
        </div>

        {recent.length > 0 && (
          <div className="relative z-20 mt-12 w-full max-w-2xl">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-app-muted">
                Recent
              </span>
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
                <motion.li key={u} whileHover={{ y: -2 }} transition={springSoft}>
                  <Link
                    to={`/u/${encodeURIComponent(u)}`}
                    className="group inline-flex items-center gap-1 rounded-full border border-app-border bg-white px-3 py-1 font-mono text-xs text-app-primary shadow-soft hover:border-app-accent/40"
                  >
                    @{u}
                    <X className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Single line of mono "proof" tags */}
        <div className="relative z-20 mt-20 flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-app-muted">
          <span>vector</span>
          <span aria-hidden>·</span>
          <span>ATS-friendly</span>
          <span aria-hidden>·</span>
          <span>~42 KB</span>
          <span aria-hidden>·</span>
          <span>100% client-side</span>
        </div>
      </main>

      <TokenDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

const fadeUpVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: springSoft },
};
