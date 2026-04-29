import { motion } from 'framer-motion';
import { springHeavy } from '@/lib/motion';

/**
 * Three fanned-out A4 mockups that float behind the command bar to give an
 * immediate "this is what you'll get" visual proof. Each mockup is a static
 * primitive — no live data — but instantly readable as a résumé.
 *
 * The center card is the highlighted "Minimal" output, flanked by the
 * Editorial (left) and Engineer (right) cards.
 */
export function MockupFan() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-2 z-0 flex justify-center"
    >
      <div className="relative h-[420px] w-full max-w-3xl">
        <Card
          className="absolute left-1/2 top-12 -translate-x-[calc(50%+220px)] rotate-[-10deg]"
          delay={0.1}
        >
          <EditorialPreview />
        </Card>
        <Card
          className="absolute left-1/2 top-12 -translate-x-[calc(50%-220px)] rotate-[10deg]"
          delay={0.3}
        >
          <MonoPreview />
        </Card>
        <Card
          className="absolute left-1/2 top-0 -translate-x-1/2 rotate-0 z-10"
          delay={0.5}
          highlight
        >
          <MinimalPreview />
        </Card>
      </div>
    </div>
  );
}

function Card({
  children,
  className,
  delay,
  highlight = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...springHeavy, delay }}
      className={`h-[400px] w-[280px] overflow-hidden rounded-xl bg-white p-5 shadow-a4 ring-1 ring-black/5 ${
        highlight ? '' : 'opacity-95'
      } ${className ?? ''}`}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- mockup contents ---------------- */

function MinimalPreview() {
  return (
    <div className="flex h-full flex-col gap-3 font-sans">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200" />
        <div className="flex-1">
          <div className="h-4 w-24 rounded bg-gray-300" />
          <div className="mt-1 h-2.5 w-16 rounded bg-gray-200" />
          <div className="mt-2 flex gap-1">
            <div className="h-1.5 w-10 rounded bg-gray-200" />
            <div className="h-1.5 w-12 rounded bg-gray-200" />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 pt-2">
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="h-1 w-3/4 rounded bg-gray-200" />
              <div className="h-2.5 w-1/2 rounded bg-gray-300" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-1 h-1.5 w-12 rounded bg-gray-300" />
        <div className="flex h-1 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full w-[55%]" style={{ background: '#0066FF', opacity: 1 }} />
          <div className="h-full w-[20%]" style={{ background: '#0066FF', opacity: 0.7 }} />
          <div className="h-full w-[15%]" style={{ background: '#0066FF', opacity: 0.5 }} />
          <div className="h-full w-[10%]" style={{ background: '#0066FF', opacity: 0.35 }} />
        </div>
      </div>
      <div>
        <div className="mb-1.5 h-1.5 w-16 rounded bg-gray-300" />
        <div className="grid grid-cols-2 gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded border border-gray-100 p-1.5">
              <div className="h-1.5 w-12 rounded bg-gray-300" />
              <div className="mt-1 h-1 w-full rounded bg-gray-100" />
              <div className="mt-0.5 h-1 w-3/4 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EditorialPreview() {
  return (
    <div className="flex h-full flex-col gap-3 font-serif">
      <div>
        <div className="text-[20px] font-semibold leading-tight text-slate-900">Aa</div>
        <div className="mt-1 h-3 w-32 rounded bg-gray-300" />
        <div className="mt-1.5 h-2 w-20 rounded bg-gray-200" />
      </div>
      <div className="border-t border-slate-200 pt-2">
        <div className="font-sans text-[8px] uppercase tracking-[0.2em] text-slate-500">
          Pinned
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded border border-slate-200 p-1.5">
              <div className="h-1.5 w-14 rounded bg-slate-700" />
              <div className="mt-1 h-1 w-full rounded bg-slate-100" />
              <div className="mt-0.5 h-1 w-2/3 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-slate-200 pt-2">
        <div className="font-sans text-[8px] uppercase tracking-[0.2em] text-slate-500">
          Languages
        </div>
        <div className="mt-1.5 flex h-1 overflow-hidden rounded-full bg-slate-100">
          <div className="w-[40%] bg-slate-800" />
          <div className="w-[25%] bg-slate-600" />
          <div className="w-[20%] bg-slate-400" />
          <div className="w-[15%] bg-slate-300" />
        </div>
      </div>
    </div>
  );
}

function MonoPreview() {
  return (
    <div className="flex h-full flex-col gap-3 font-mono text-[8px] text-slate-900">
      <div className="flex items-start gap-2">
        <div className="h-9 w-9 rounded-sm bg-gray-200" />
        <div>
          <div className="h-3 w-24 rounded-sm bg-gray-300" />
          <div className="mt-1 h-1.5 w-16 rounded-sm bg-gray-200" />
        </div>
      </div>
      <div className="border-t border-gray-200 pt-1.5">
        <div className="text-[7px] tracking-tight text-slate-700">[ STATS ]</div>
        <div className="mt-1 grid grid-cols-3 gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-2 rounded-sm bg-gray-200" />
          ))}
        </div>
      </div>
      <div>
        <div className="text-[7px] tracking-tight text-slate-700">[ PROJECTS ]</div>
        <div className="mt-1.5 grid gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-1 border border-gray-200 px-1.5 py-1"
            >
              <div className="h-1 flex-1 rounded-sm bg-gray-300" />
              <div className="h-1 w-4 rounded-sm bg-blue-500" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-[7px] tracking-tight text-slate-700">[ LANGUAGES ]</div>
        <div className="mt-1 flex h-0.5 overflow-hidden bg-gray-100">
          <div className="w-[60%] bg-yellow-400" />
          <div className="w-[20%] bg-blue-500" />
          <div className="w-[12%] bg-emerald-500" />
          <div className="w-[8%] bg-slate-400" />
        </div>
      </div>
    </div>
  );
}
