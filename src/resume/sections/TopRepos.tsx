import { Star } from 'lucide-react';
import type { ResumeData } from '@/resume/types';
import type { ThemeTokens } from '@/resume/themes';
import { relativeTime } from '@/lib/format';
import { SectionHeading } from './SectionHeading';

export function TopReposSection({ data, theme }: { data: ResumeData; theme: ThemeTokens }) {
  if (data.topRepos.length === 0) return null;
  return (
    <section>
      <SectionHeading theme={theme} label="Top Repositories" />
      <ul className="mt-3 divide-y" style={{ borderColor: 'var(--theme-rule)' }}>
        {data.topRepos.map((repo) => (
          <li
            key={repo.fullName}
            className="grid grid-cols-[1fr_auto] items-baseline gap-x-3 py-2"
            style={{ borderColor: 'var(--theme-rule)' }}
          >
            <div className="min-w-0">
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="text-[12.5px] font-semibold underline-offset-2 hover:underline"
                style={{
                  color: 'var(--theme-text-primary)',
                  fontFamily: theme.variant.allMono
                    ? 'var(--theme-font-mono)'
                    : 'var(--theme-font-heading)',
                }}
              >
                {repo.name}
              </a>
              {repo.description && (
                <span
                  className="ml-2 text-[12px]"
                  style={{ color: 'var(--theme-text-muted)' }}
                >
                  — {repo.description}
                </span>
              )}
            </div>
            <div
              className="flex shrink-0 items-center gap-3 text-[11px] tabular-nums"
              style={{ color: 'var(--theme-text-muted)', fontFamily: 'var(--theme-font-mono)' }}
            >
              {repo.primaryLanguage && (
                <span className="inline-flex items-center gap-1">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-sm"
                    style={{ backgroundColor: 'var(--theme-text-muted)' }}
                  />
                  {repo.primaryLanguage.name}
                </span>
              )}
              <span className="inline-flex items-center gap-0.5">
                <Star className="h-3 w-3" /> {repo.stars}
              </span>
              {repo.pushedAt && <span>{relativeTime(repo.pushedAt)}</span>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
