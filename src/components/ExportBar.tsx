import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Download, Loader2, Printer } from 'lucide-react';
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

export function ExportBar({ data, theme }: Props) {
  const { paperSize, setPaperSize } = usePrefsStore();
  const [phase, setPhase] = useState<Phase>('idle');
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function onDownload() {
    if (!data) return;
    setPhase('busy');
    setErrMsg(null);
    try {
      await downloadResumePdf({ data, theme, paperSize });
      setPhase('done');
      setTimeout(() => setPhase('idle'), 1800);
    } catch (err) {
      // Surface the actual failure reason so users can self-diagnose. The
      // generic "Failed — Retry" button keeps its title attribute set to the
      // full message for hover, plus we log the error to the console.
      // eslint-disable-next-line no-console
      console.error('[GitHub Résumé] PDF download failed:', err);
      setPhase('error');
      setErrMsg(err instanceof Error ? err.message : 'Download failed');
      setTimeout(() => setPhase('idle'), 5000);
    }
  }

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
    <div className="relative flex items-center gap-1.5">
      {phase === 'error' && errMsg && (
        <div
          role="alert"
          className="absolute right-0 top-full z-50 mt-2 max-w-xs rounded-md border border-red-200 bg-red-50 px-3 py-2 font-mono text-[11px] text-red-700 shadow-cmd"
        >
          {errMsg}
        </div>
      )}
      <PaperToggle paperSize={paperSize} onChange={setPaperSize} />

      <button
        onClick={onCopy}
        className="hidden h-9 items-center gap-1.5 rounded-md border border-border bg-white px-3 text-xs text-ink hover:bg-surface md:inline-flex"
        aria-label="Copy share link"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        <span>{copied ? 'Copied' : 'Share'}</span>
      </button>

      <button
        onClick={() => window.print()}
        className="hidden h-9 items-center gap-1.5 rounded-md border border-border bg-white px-3 text-xs text-ink hover:bg-surface md:inline-flex"
        aria-label="Print"
      >
        <Printer className="h-3.5 w-3.5" />
        <span>Print</span>
      </button>

      <button
        onClick={onDownload}
        disabled={!data || phase === 'busy'}
        className={cn(
          'relative inline-flex h-9 min-w-[150px] items-center justify-center gap-2 overflow-hidden rounded-md px-4 text-sm font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-white',
          phase === 'done'
            ? 'bg-emerald-600 text-white'
            : phase === 'error'
              ? 'bg-red-600 text-white'
              : 'bg-ink text-white hover:bg-black',
          (!data || phase === 'busy') && 'opacity-95',
        )}
        title={errMsg ?? undefined}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={phase}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.12 }}
            className="inline-flex items-center gap-1.5"
          >
            {phase === 'busy' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Compiling…
              </>
            ) : phase === 'done' ? (
              <>
                <Check className="h-4 w-4" /> Downloaded
              </>
            ) : phase === 'error' ? (
              <>Failed — Retry</>
            ) : (
              <>
                <Download className="h-4 w-4" /> Download PDF
              </>
            )}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}

function PaperToggle({
  paperSize,
  onChange,
}: {
  paperSize: 'a4' | 'letter';
  onChange: (p: 'a4' | 'letter') => void;
}) {
  return (
    <div className="hidden h-9 items-center gap-0.5 rounded-md border border-border bg-surface p-0.5 lg:inline-flex">
      {(['a4', 'letter'] as const).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={cn(
            'rounded-sm px-2 py-1 font-mono text-[10px] uppercase tracking-widest',
            paperSize === p
              ? 'bg-white text-ink shadow-sm ring-1 ring-border'
              : 'text-muted hover:text-ink',
          )}
        >
          {p === 'a4' ? 'A4' : 'Letter'}
        </button>
      ))}
    </div>
  );
}
