import type { ResumeData } from '@/resume/types';
import type { ThemeTokens } from '@/resume/themes';
import { SectionHeading } from './SectionHeading';

export function OrgsSection({ data, theme }: { data: ResumeData; theme: ThemeTokens }) {
  if (data.organizations.length === 0) return null;
  return (
    <section>
      <SectionHeading theme={theme} label="Organizations" />
      <ul className="mt-2.5 flex flex-wrap gap-2">
        {data.organizations.map((org) => (
          <li key={org.login}>
            <a
              href={org.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 hover:opacity-90"
              style={{
                background: 'var(--theme-chip-bg)',
                color: 'var(--theme-chip-text)',
              }}
              title={org.name ?? org.login}
            >
              <img
                src={org.avatarUrl}
                alt=""
                className="h-4 w-4 rounded-full"
                crossOrigin="anonymous"
              />
              <span className="text-[11.5px] font-medium">{org.name ?? org.login}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
