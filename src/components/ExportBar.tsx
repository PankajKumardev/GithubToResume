import { useState } from 'react';
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
    <div className="flex items-center gap-2">
      <PaperToggle paperSize={paperSize} onChange={setPaperSize} />

      <button
        onClick={onCopy}
        className="inline-flex items-center gap-1.5 rounded-lg border border-app-border bg-app-surface px-3 py-1.5 text-xs text-app-primary hover:bg-white/5"
        aria-label="Copy share link"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-app-success" /> : <Copy className="h-3.5 w-3.5" />}
        <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
      </button>

      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-1.5 rounded-lg border border-app-border bg-app-surface px-3 py-1.5 text-xs text-app-primary hover:bg-white/5"
        aria-label="Print"
      >
        <Printer className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Print</span>
      </button>

      <button
        onClick={onDownload}
        disabled={!data || phase === 'busy'}
        className={cn(
          'inline-flex min-w-[160px] items-center justify-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg',
          phase === 'done'
            ? 'bg-app-success text-white'
            : phase === 'error'
              ? 'bg-app-danger text-white'
              : 'bg-app-accent text-white hover:bg-app-accent-hover',
          (!data || phase === 'busy') && 'opacity-90',
          'active:scale-[0.98]',
        )}
        title={errMsg ?? undefined}
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
            <Download className="h-4 w-4" /> Download PDF
          </>
        )}
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
    <div className="hidden items-center gap-0.5 rounded-lg border border-app-border bg-app-surface p-0.5 lg:inline-flex">
      {(['a4', 'letter'] as const).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={cn(
            'rounded-md px-2 py-1 text-[11px] uppercase tracking-wider',
            paperSize === p
              ? 'bg-app-bg text-app-primary ring-1 ring-app-border-strong'
              : 'text-app-muted hover:text-app-primary',
          )}
        >
          {p === 'a4' ? 'A4' : 'Letter'}
        </button>
      ))}
    </div>
  );
}
