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
  // Strict grayscale: stepped opacity of the ink accent.
  const opacityFor = (i: number, total: number) =>
    Math.max(0.25, 1 - (i / Math.max(1, total)) * 0.7);

  return (
    <section>
      <SectionHeading theme={theme} label="Languages" />
      <div
        className="mt-3 flex h-1.5 w-full overflow-hidden rounded-sm"
        style={{ background: 'var(--theme-rule)' }}
      >
        {data.languages.map((l, i) => (
          <div
            key={l.name}
            title={`${l.name} ${l.percent}%`}
            style={{
              width: `${l.percent}%`,
              backgroundColor: theme.colors.accent,
              opacity: opacityFor(i, data.languages.length),
            }}
          />
        ))}
      </div>
      <ul
        className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px]"
        style={{ color: 'var(--theme-text-primary)' }}
      >
        {data.languages.map((l, i) => (
          <li key={l.name} className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-1.5 w-1.5 rounded-sm"
              style={{
                backgroundColor: theme.colors.accent,
                opacity: opacityFor(i, data.languages.length),
              }}
            />
            <span className="font-medium">{l.name}</span>
            <span style={{ color: 'var(--theme-text-muted)' }}>{l.percent}%</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
