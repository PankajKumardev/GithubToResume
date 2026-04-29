import type { ResumeData } from '@/resume/types';
import type { ThemeTokens } from '@/resume/themes';
import { SectionHeading } from './SectionHeading';

export function LanguagesSection({
  data,
  theme,
}: {
  data: ResumeData;
  theme: ThemeTokens;
}) {
  if (data.languages.length === 0) return null;

  const useAccent = theme.variant.languageBarStyle === 'accent';
  const opacityFor = (i: number, total: number) => 1 - (i / Math.max(1, total)) * 0.55;

  return (
    <section>
      <SectionHeading theme={theme} label="Languages" />
      <div
        className="mt-3 flex h-2 w-full overflow-hidden rounded-full"
        style={{ background: 'var(--theme-chip-bg)' }}
      >
        {data.languages.map((l, i) => (
          <div
            key={l.name}
            title={`${l.name} ${l.percent}%`}
            style={{
              width: `${l.percent}%`,
              backgroundColor: useAccent ? theme.colors.accent : l.color,
              opacity: useAccent ? opacityFor(i, data.languages.length) : 1,
            }}
          />
        ))}
      </div>
      <ul
        className="mt-2.5 flex flex-wrap gap-x-3.5 gap-y-1 text-[12px]"
        style={{ color: 'var(--theme-text-primary)' }}
      >
        {data.languages.map((l) => (
          <li key={l.name} className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: l.color }}
            />
            <span className="font-medium">{l.name}</span>
            <span style={{ color: 'var(--theme-text-muted)' }}>{l.percent}%</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
