import type { ResumeData } from '@/resume/types';
import type { ThemeTokens } from '@/resume/themes';
import { SectionHeading } from './SectionHeading';

export function OrgsSection({ data, theme }: { data: ResumeData; theme: ThemeTokens }) {
  if (data.organizations.length === 0) return null;
  return (
    <section>
      <SectionHeading theme={theme} label="Organizations" />
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {data.organizations.map((org) => (
          <li key={org.login}>
            <a
              href={org.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 hover:opacity-90"
              style={{
                background: 'var(--theme-chip-bg)',
                color: 'var(--theme-chip-text)',
                border: '1px solid var(--theme-rule)',
              }}
              title={org.name ?? org.login}
            >
              <span className="text-[11.5px] font-medium">{org.name ?? org.login}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
