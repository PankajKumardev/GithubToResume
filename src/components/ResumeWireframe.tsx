import { motion, useTransform, useMotionValue, type MotionValue } from 'framer-motion';

interface Props {
  /** Optional motion value 0..1 controlling reactivity. */
  energy?: MotionValue<number>;
  className?: string;
}

/**
 * Geometric wireframe of a résumé. Used as the rotating background "Engine"
 * shape on the home page and as the structure of the loading skeleton on the
 * resume route. Pure 1px lines on paper — never filled.
 */
export function ResumeWireframe({ energy, className }: Props) {
  const fallback = useMotionValue(0);
  const driver = energy ?? fallback;
  const rotate = useTransform(driver, [0, 1], [6, 1.5]);
  const scale = useTransform(driver, [0, 1], [1, 1.04]);
  const opacity = useTransform(driver, [0, 1], [0.5, 0.85]);

  return (
    <motion.div
      style={{ rotate, scale, opacity }}
      className={`pointer-events-none ${className ?? ''}`}
      aria-hidden
    >
      <Frame />
    </motion.div>
  );
}

function Frame() {
  return (
    <div className="relative h-[640px] w-[460px] border border-app-border bg-app-bg p-6">
      {/* Header */}
      <div className="flex items-start gap-3 border-b border-app-border pb-3">
        <div className="h-10 w-10 border border-app-border" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3 w-2/3 border border-app-border" />
          <div className="h-2 w-1/3 border border-app-border" />
        </div>
      </div>
      {/* Stats */}
      <div className="mt-3 grid grid-cols-7 gap-2 border-b border-app-border pb-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="space-y-1">
            <div className="h-1 border border-app-border" />
            <div className="h-3 border border-app-border" />
          </div>
        ))}
      </div>
      {/* Languages */}
      <div className="mt-3 border-b border-app-border pb-3">
        <div className="mb-1.5 h-2 w-1/4 border border-app-border" />
        <div className="h-1 border border-app-border" />
      </div>
      {/* Pinned */}
      <div className="mt-3 border-b border-app-border pb-3">
        <div className="mb-1.5 h-2 w-1/3 border border-app-border" />
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 border border-app-border" />
          ))}
        </div>
      </div>
      {/* Top repos */}
      <div className="mt-3">
        <div className="mb-1.5 h-2 w-1/3 border border-app-border" />
        <div className="space-y-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-2 border border-app-border" />
          ))}
        </div>
      </div>
    </div>
  );
}
