import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound, ShieldCheck, Sparkles, X } from 'lucide-react';
import { UsernameInput } from '@/components/UsernameInput';
import { TokenDialog } from '@/components/TokenDialog';
import { ShowcaseCards } from '@/components/ShowcaseCards';
import { useTokenStore } from '@/store/tokenStore';
import { usePrefsStore } from '@/store/prefsStore';
import { springSoft } from '@/lib/motion';

export default function Home() {
  const [open, setOpen] = useState(false);
  const { token } = useTokenStore();
  const { recent, clearRecent } = usePrefsStore();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-app-bg px-6 pb-20 pt-32">
      {/* Soft mesh-gradient blobs for ambient depth */}
      <div
        aria-hidden
        className="glow-blob"
        style={{
          top: '-15%',
          left: '-10%',
          width: 520,
          height: 520,
          background: '#3B82F6',
          opacity: 0.18,
        }}
      />
      <div
        aria-hidden
        className="glow-blob"
        style={{
          top: '12%',
          right: '-12%',
          width: 620,
          height: 620,
          background: '#8B5CF6',
          opacity: 0.18,
        }}
      />
      <div
        aria-hidden
        className="glow-blob"
        style={{
          bottom: '-25%',
          left: '20%',
          width: 720,
          height: 480,
          background: '#06B6D4',
          opacity: 0.1,
        }}
      />

      <main className="relative z-10 flex w-full max-w-3xl flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springSoft, delay: 0.05 }}
          className="inline-flex items-center gap-1.5 rounded-full border border-app-border bg-app-surface/70 px-3.5 py-1 text-xs font-medium text-app-muted shadow-sm backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-app-accent" />
          100% Client-Side Vector PDF
        </motion.span>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
          className="mt-8 max-w-3xl text-balance text-center text-5xl font-bold leading-[1.05] tracking-tighter text-app-primary md:text-7xl"
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: springSoft } }}
            className="block"
          >
            Your GitHub.
          </motion.span>
          <motion.span
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: springSoft } }}
            className="block bg-gradient-to-r from-app-accent via-violet-500 to-fuchsia-500 bg-clip-text text-transparent"
          >
            Beautifully compiled.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springSoft, delay: 0.4 }}
          className="mt-5 max-w-xl text-center text-lg leading-relaxed text-app-muted"
        >
          Generate a pristine, ATS-friendly résumé from your public profile in seconds.
          Zero servers, zero tracking.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springSoft, delay: 0.5 }}
          className="relative z-20 mt-10 w-full max-w-2xl"
        >
          <UsernameInput />

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-app-muted">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 hover:bg-app-surface hover:text-app-primary"
            >
              <KeyRound className="h-3.5 w-3.5" />
              {token ? 'Manage token' : 'Add GitHub token (optional)'}
            </button>
            {token && (
              <span className="inline-flex items-center gap-1 text-emerald-600">
                <ShieldCheck className="h-3.5 w-3.5" />
                Saved · stored only in this browser
              </span>
            )}
          </div>

          {recent.length > 0 && (
            <div className="mt-8">
              <div className="mb-2 flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-app-subtle">
                <span>Recent</span>
                <button
                  type="button"
                  onClick={clearRecent}
                  className="text-app-muted hover:text-app-primary"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
              <ul className="flex flex-wrap items-center justify-center gap-2">
                {recent.map((u) => (
                  <motion.li key={u} whileHover={{ y: -2 }} transition={springSoft}>
                    <Link
                      to={`/u/${encodeURIComponent(u)}`}
                      className="inline-flex items-center gap-1 rounded-full border border-app-border bg-white/80 px-3 py-1 font-mono text-xs text-app-primary shadow-sm backdrop-blur-md hover:border-app-accent/30 hover:shadow"
                    >
                      @{u}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        <ShowcaseCards />
      </main>

      <TokenDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
