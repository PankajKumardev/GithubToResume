import { useEffect, useRef, useState } from 'react';
import type { ResumeData } from '@/resume/types';
import type { ThemeTokens } from '@/resume/themes';
import { ResumeView, PAGE_WIDTH, PAGE_HEIGHT } from '@/resume/ResumeView';
import { LoadingSkeleton } from './LoadingSkeleton';

interface Props {
  data: ResumeData | null;
  theme: ThemeTokens;
  loading?: boolean;
}

/**
 * A4-aspect canvas. Paper-tinted with an offset shadow for the Swiss frame.
 */
export function ResumePreview({ data, theme, loading = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = entry.contentRect.width;
      setScale(Math.min(1, w / PAGE_WIDTH));
    });
    ro.observe(el);
    setScale(Math.min(1, el.getBoundingClientRect().width / PAGE_WIDTH));
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full">
      <div
        className="relative mx-auto"
        style={{
          width: PAGE_WIDTH * scale,
          height: PAGE_HEIGHT * scale,
        }}
      >
        <div
          className="origin-top-left border border-app-border shadow-offset print-clean"
          style={{
            width: PAGE_WIDTH,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            background: theme.colors.bg,
          }}
        >
          {loading || !data ? (
            <LoadingSkeleton theme={theme} />
          ) : (
            <ResumeView data={data} theme={theme} />
          )}
        </div>
      </div>
    </div>
  );
}
