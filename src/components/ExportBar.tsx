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
      setTimeout(() => setPhase('idle'), 1600);
    } catch (err) {
      setPhase('error');
      setErrMsg(err instanceof Error ? err.message : 'Download failed');
      setTimeout(() => setPhase('idle'), 3000);
    }
  }

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <PaperToggle paperSize={paperSize} onChange={setPaperSize} />

      <button
        onClick={onCopy}
        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-app-border bg-white px-2.5 text-xs text-app-primary hover:bg-app-surface"
        aria-label="Copy share link"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-app-success" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
        <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
      </button>

      <button
        onClick={() => window.print()}
        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-app-border bg-white px-2.5 text-xs text-app-primary hover:bg-app-surface"
        aria-label="Print"
      >
        <Printer className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Print</span>
      </button>

      <button
        onClick={onDownload}
        disabled={!data || phase === 'busy'}
        className={cn(
          'relative inline-flex h-9 min-w-[180px] items-center justify-center gap-2 overflow-hidden rounded-lg px-4 text-sm font-medium transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white',
          phase === 'done'
            ? 'bg-emerald-600 text-white'
            : phase === 'error'
              ? 'bg-app-danger text-white'
              : 'bg-app-primary text-white hover:bg-black',
          (!data || phase === 'busy') && 'opacity-95',
          'active:scale-[0.98]',
        )}
        title={errMsg ?? undefined}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={phase}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1.5"
          >
            {phase === 'busy' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Compiling Vector PDF…
              </>
            ) : phase === 'done' ? (
              <>
                <Check className="h-4 w-4" /> Downloaded
              </>
            ) : phase === 'error' ? (
              <>Failed — retry</>
            ) : (
              <>
                <Download className="h-4 w-4" /> Download Vector PDF
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
    <div className="hidden h-8 items-center gap-0.5 rounded-lg border border-app-border bg-app-surface p-0.5 lg:inline-flex">
      {(['a4', 'letter'] as const).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={cn(
            'rounded-md px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em]',
            paperSize === p
              ? 'bg-white text-app-primary shadow-soft ring-1 ring-app-border-strong'
              : 'text-app-muted hover:text-app-primary',
          )}
        >
          {p === 'a4' ? 'A4' : 'Letter'}
        </button>
      ))}
    </div>
  );
}
