import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, animate } from 'framer-motion';
import { UsernameInput } from '@/components/UsernameInput';
import { TokenDialog } from '@/components/TokenDialog';
import { ResumeWireframe } from '@/components/ResumeWireframe';
import { useTokenStore } from '@/store/tokenStore';
import { usePrefsStore } from '@/store/prefsStore';
import { springSoft } from '@/lib/motion';

export default function Home() {
  const [open, setOpen] = useState(false);
  const { token } = useTokenStore();
  const { recent } = usePrefsStore();
  const energy = useMotionValue(0);

  function bumpEnergy(value: string) {
    const target = Math.min(1, value.length / 10);
    animate(energy, target, { type: 'spring', stiffness: 120, damping: 18 });
  }

  return (
    <>
      <div className="flex min-h-screen w-full flex-col overflow-hidden bg-app-bg md:h-screen md:flex-row">
        {/* LEFT — Manifesto */}
        <aside className="relative flex flex-col justify-between border-b border-app-border p-8 md:w-[40%] md:border-b-0 md:border-r md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springSoft}
            className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-app-muted"
          >
            <span>[ SYSTEM: GITHUB_TO_PDF_ENGINE ]</span>
            <span>v0.1</span>
          </motion.div>

          {/* Massive typography block */}
          <div className="my-12 md:my-0">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
              className="font-sans font-medium leading-[0.85] tracking-tighter text-app-primary"
              style={{ fontSize: 'clamp(3rem, 7vw, 8rem)' }}
            >
              <motion.span variants={lineV} className="block">
                Compile your
              </motion.span>
              <motion.span
                variants={lineV}
                className="block font-serif italic font-normal text-app-accent"
              >
                career.
              </motion.span>
              <motion.span variants={lineV} className="block">
                Instantly.
              </motion.span>
            </motion.h1>
          </div>

          {/* Bottom: 2-column tech grid */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-app-border pt-6"
          >
            <ManifestoTile label="FORMAT" value="100% Vector PDF" />
            <ManifestoTile label="INFRA" value="Zero Servers" />
            <ManifestoTile label="COMPATIBILITY" value="ATS-Optimized" />
            <ManifestoTile label="OUTPUT" value="≤ 50 KB · Searchable" />
          </motion.dl>
        </aside>

        {/* RIGHT — Engine */}
        <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-app-surface p-6 md:p-12">
          {/* Background wireframe */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <ResumeWireframe energy={energy} className="text-app-border" />
          </div>

          {/* Top-right metadata corner */}
          <div className="absolute right-6 top-6 hidden flex-col items-end gap-1 font-mono text-[10px] uppercase tracking-widest text-app-muted md:flex">
            <span>[ STATUS: AWAITING_INPUT ]</span>
            <span className="caret">RUNTIME</span>
          </div>

          <div className="absolute left-6 top-6 hidden items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-app-muted md:flex">
            <span className="inline-block h-2 w-2 bg-app-accent" />
            <span>EDITORIAL · DATA · ARCHITECTURE</span>
          </div>

          {/* Brutalist input */}
          <div className="relative z-10 w-full max-w-lg">
            <div className="mb-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-widest text-app-muted">
              <span>[ INPUT_TARGET ]</span>
              <span>github.com/_</span>
            </div>
            <UsernameInput onValueChange={bumpEnergy} />

            <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="text-app-muted hover:text-app-accent"
              >
                {token ? '[ TOKEN: STORED ]' : '[ CONFIGURE_AUTH_TOKEN ]'}
              </button>
              <span className="text-app-muted">SHIFT+ENTER · COMPILE</span>
            </div>

            {recent.length > 0 && (
              <div className="mt-8 border-t border-app-border pt-4">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-app-muted">
                  [ RECENT ]
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {recent.map((u) => (
                    <li key={u}>
                      <Link
                        to={`/u/${encodeURIComponent(u)}`}
                        className="inline-flex items-center border border-app-border bg-app-bg px-2 py-1 font-mono text-[11px] text-app-primary hover:border-app-accent hover:text-app-accent"
                      >
                        @{u}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </div>

      <TokenDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}

const lineV = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: springSoft },
};

function ManifestoTile({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[9.5px] uppercase tracking-widest text-app-muted">
        [ {label} ]
      </div>
      <div className="mt-0.5 font-sans text-sm font-medium text-app-primary">{value}</div>
    </div>
  );
}
