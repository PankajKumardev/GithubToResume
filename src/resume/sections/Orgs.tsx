import type { ResumeData } from '@/resume/types';
import type { ThemeTokens } from '@/resume/themes';
import { SectionHeading } from './SectionHeading';

export function OrgsSection({ data, theme }: { data: ResumeData; theme: ThemeTokens }) {
  if (data.organizations.length === 0) return null;
  return (
    <section>
      <SectionHeading theme={theme} label="Organizations" />
      <ul className="mt-2 flex flex-wrap gap-2">
        {data.organizations.map((org) => (
          <li key={org.login}>
            <a
              href={org.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-1.5 py-1 hover:opacity-90"
              style={{
                background: 'var(--theme-chip-bg)',
                color: 'var(--theme-chip-text)',
                borderRadius: theme.id === 'mono' ? 0 : 6,
              }}
              title={org.name ?? org.login}
            >
              <img
                src={org.avatarUrl}
                alt=""
                className="h-5 w-5 rounded"
                crossOrigin="anonymous"
              />
              <span className="text-[11px] font-medium">{org.name ?? org.login}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
