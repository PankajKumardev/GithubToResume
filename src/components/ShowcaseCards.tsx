import { motion } from 'framer-motion';
import { springHeavy } from '@/lib/motion';

/**
 * Three subtly-fanned résumé mockup cards floating below the command bar to
 * give the user an immediate visual taste of the output. Built from primitive
 * blocks — no live data — so the page is instant.
 */
export function ShowcaseCards() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative mt-16 hidden h-[420px] w-full max-w-4xl md:block"
    >
      <div className="absolute inset-x-0 top-0 flex justify-center">
        <Card
          className="absolute left-1/2 top-6 -translate-x-[calc(50%+260px)] -rotate-[8deg]"
          delay={0.1}
          variant="executive"
        />
        <Card
          className="absolute left-1/2 top-6 -translate-x-[calc(50%-260px)] rotate-[8deg]"
          delay={0.3}
          variant="developer"
        />
        <Card
          className="absolute left-1/2 top-0 z-10 -translate-x-1/2"
          delay={0.5}
          variant="minimal"
          highlight
        />
      </div>
    </div>
  );
}

function Card({
  className,
  delay,
  variant,
  highlight = false,
}: {
  className?: string;
  delay: number;
  variant: 'minimal' | 'executive' | 'developer';
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...springHeavy, delay }}
      className={`h-[400px] w-[280px] overflow-hidden rounded-xl border border-app-border bg-white p-5 shadow-a4 ${highlight ? '' : 'opacity-95'} ${className ?? ''}`}
    >
      <Mock variant={variant} />
    </motion.div>
  );
}

function Mock({ variant }: { variant: 'minimal' | 'executive' | 'developer' }) {
  const accent = variant === 'minimal' ? '#3B82F6' : variant === 'executive' ? '#0F172A' : '#3B82F6';
  const isMono = variant === 'developer';
  return (
    <div className="flex h-full flex-col gap-3 font-sans text-slate-900">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-slate-200" />
        <div className="flex-1">
          <div className="h-3.5 w-2/3 rounded bg-slate-300" />
          <div className="mt-1 h-2 w-1/3 rounded bg-slate-200" />
          <div className="mt-2 flex gap-1">
            <div className="h-1.5 w-10 rounded bg-slate-200" />
            <div className="h-1.5 w-12 rounded bg-slate-200" />
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 pt-2">
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="h-1 rounded bg-slate-200" />
              <div className="h-2.5 rounded bg-slate-300" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div
          className={`mb-1.5 h-1.5 w-12 rounded ${isMono ? 'bg-slate-700' : 'bg-slate-300'}`}
        />
        <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          {variant === 'minimal' ? (
            <>
              <div style={{ width: '50%', background: accent, opacity: 1 }} />
              <div style={{ width: '20%', background: accent, opacity: 0.7 }} />
              <div style={{ width: '15%', background: accent, opacity: 0.5 }} />
              <div style={{ width: '15%', background: accent, opacity: 0.35 }} />
            </>
          ) : (
            <>
              <div style={{ width: '40%', background: '#F4D35E' }} />
              <div style={{ width: '25%', background: '#3B82F6' }} />
              <div style={{ width: '20%', background: '#10B981' }} />
              <div style={{ width: '15%', background: '#94A3B8' }} />
            </>
          )}
        </div>
      </div>
      <div>
        <div className="mb-1.5 h-1.5 w-16 rounded bg-slate-300" />
        <div className="grid grid-cols-2 gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-md border border-slate-100 p-1.5"
            >
              <div
                className={`h-1.5 w-12 rounded ${isMono ? 'font-mono' : ''}`}
                style={{ background: accent, opacity: 0.85 }}
              />
              <div className="mt-1 h-1 w-full rounded bg-slate-100" />
              <div className="mt-0.5 h-1 w-3/4 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-1.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-1.5 rounded bg-slate-100" />
        ))}
      </div>
    </div>
  );
}
