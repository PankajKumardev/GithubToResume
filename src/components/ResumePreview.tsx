import { useEffect, useState } from 'react';
import type { ResumeData } from '@/resume/types';
import type { ThemeTokens } from '@/resume/themes';
import { ResumeView, PAGE_WIDTH, PAGE_HEIGHT } from '@/resume/ResumeView';
import { useElementWidth } from '@/lib/useResize';
import { LoadingSkeleton } from './LoadingSkeleton';

interface Props {
  data: ResumeData | null;
  theme: ThemeTokens;
  loading?: boolean;
}

/**
 * Renders the on-screen "A4 illusion": the résumé is rendered at the full A4
 * pixel size (794 × 1123) inside a transform-scaled wrapper that fits the
 * available container width. The outer wrapper preserves the post-scale
 * dimensions so there is no layout shift when scaling.
 */
export function ResumePreview({ data, theme, loading = false }: Props) {
  const { ref, width } = useElementWidth<HTMLDivElement>();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (width === 0) return;
    const next = Math.min(1, width / PAGE_WIDTH);
    setScale(next);
  }, [width]);

  const scaledHeight = PAGE_HEIGHT * scale;

  return (
    <div ref={ref} className="w-full">
      <div
        className="relative mx-auto"
        style={{
          width: PAGE_WIDTH * scale,
          height: scaledHeight,
        }}
      >
        <div
          className="origin-top-left shadow-a4 ring-1 ring-white/10 print-clean"
          style={{
            width: PAGE_WIDTH,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            background: 'var(--theme-bg, #fff)',
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
