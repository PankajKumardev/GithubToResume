import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Loader2, Printer } from 'lucide-react';
import type { ResumeData } from '@/resume/types';
import type { ThemeTokens } from '@/resume/themes';
import { usePrefsStore } from '@/store/prefsStore';
import { downloadResumePdf } from '@/lib/pdfDownload';
import { cn } from '@/lib/format';

interface Props {
  data: ResumeData | null;
  theme: ThemeTokens;
}

type Phase = 'idle' | 'busy' | 'done' | 'error';

/**
 * The big Klein-Blue compile bar. Sits as Row 2 of the picture-frame top
 * area. Three states cross-fade in place: COMPILE → COMPILING → DOWNLOADED.
 */
export function ExportBar({ data, theme }: Props) {
  const { paperSize } = usePrefsStore();
  const [phase, setPhase] = useState<Phase>('idle');
  const [errMsg, setErrMsg] = useState<string | null>(null);

  async function onDownload() {
    if (!data) return;
    setPhase('busy');
    setErrMsg(null);
    try {
      await downloadResumePdf({ data, theme, paperSize });
      setPhase('done');
      setTimeout(() => setPhase('idle'), 1800);
    } catch (err) {
      setPhase('error');
      setErrMsg(err instanceof Error ? err.message : 'Download failed');
      setTimeout(() => setPhase('idle'), 3000);
    }
  }

  return (
    <button
      onClick={onDownload}
      disabled={!data || phase === 'busy'}
      className={cn(
        'relative flex w-full items-center justify-center gap-3 py-4 font-sans text-base font-medium uppercase tracking-widest transition-colors',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-app-accent/40',
        phase === 'done'
          ? 'bg-app-success text-white'
          : phase === 'error'
            ? 'bg-app-danger text-white'
            : 'bg-app-accent text-white hover:bg-app-primary',
        (!data || phase === 'busy') && 'opacity-95',
      )}
      title={errMsg ?? undefined}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={phase}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
          className="inline-flex items-center gap-3"
        >
          {phase === 'busy' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Compiling Vector PDF…
            </>
          ) : phase === 'done' ? (
            <>
              <Check className="h-4 w-4" /> Downloaded · {paperSize.toUpperCase()}
            </>
          ) : phase === 'error' ? (
            <>Failed · Retry</>
          ) : (
            <>Download Vector PDF</>
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/** Thin row of secondary actions (copy link, print, paper toggle). */
export function SecondaryActions() {
  const { paperSize, setPaperSize } = usePrefsStore();
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-app-muted">
      <button
        onClick={onCopy}
        className="inline-flex items-center gap-1 hover:text-app-accent"
        aria-label="Copy share link"
      >
        {copied ? <Check className="h-3 w-3 text-app-success" /> : <Copy className="h-3 w-3" />}
        <span>{copied ? 'COPIED' : 'COPY URL'}</span>
      </button>
      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-1 hover:text-app-accent"
      >
        <Printer className="h-3 w-3" />
        <span>PRINT</span>
      </button>
      <div className="ml-auto flex items-center gap-2">
        <span className="text-app-subtle">PAPER</span>
        {(['a4', 'letter'] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPaperSize(p)}
            className={cn(
              'hover:text-app-accent',
              paperSize === p ? 'text-app-primary' : 'text-app-muted',
            )}
          >
            {p === 'a4' ? 'A4' : 'LETTER'}
          </button>
        ))}
      </div>
    </div>
  );
}
