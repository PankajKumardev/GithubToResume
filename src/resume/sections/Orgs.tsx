import type { ResumeData } from '@/resume/types';

export function OrgsSection({ data }: { data: ResumeData }) {
  if (data.organizations.length === 0) return null;
  return (
    <section>
      <h2
        className="text-[11px] font-semibold uppercase tracking-[0.18em]"
        style={{
          color: 'var(--theme-text-primary)',
          fontFamily: 'var(--theme-font-heading)',
        }}
      >
        Organizations
      </h2>
      <ul className="mt-2 flex flex-wrap gap-2">
        {data.organizations.map((org) => (
          <li key={org.login}>
            <a
              href={org.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 hover:opacity-90"
              style={{ background: 'var(--theme-chip-bg)', color: 'var(--theme-chip-text)' }}
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
