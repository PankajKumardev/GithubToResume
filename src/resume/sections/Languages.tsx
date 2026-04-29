import type { ResumeData } from '@/resume/types';

export function LanguagesSection({ data }: { data: ResumeData }) {
  if (data.languages.length === 0) return null;
  return (
    <section>
      <SectionTitle>Languages</SectionTitle>
      <div className="mt-2 flex h-2 w-full overflow-hidden rounded-full">
        {data.languages.map((l) => (
          <div
            key={l.name}
            title={`${l.name} ${l.percent}%`}
            style={{ width: `${l.percent}%`, backgroundColor: l.color }}
          />
        ))}
      </div>
      <ul
        className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11.5px]"
        style={{ color: 'var(--theme-text-primary)' }}
      >
        {data.languages.map((l) => (
          <li key={l.name} className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: l.color }}
            />
            <span>{l.name}</span>
            <span style={{ color: 'var(--theme-text-muted)' }}>{l.percent}%</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[11px] font-semibold uppercase tracking-[0.18em]"
      style={{
        color: 'var(--theme-text-primary)',
        fontFamily: 'var(--theme-font-heading)',
      }}
    >
      {children}
    </h2>
  );
}
