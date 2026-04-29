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
      <ul className="mt-2 divide-y" style={{ borderColor: 'var(--theme-rule)' }}>
        {data.topRepos.map((repo) => (
          <li
            key={repo.fullName}
            className="grid grid-cols-[1fr_auto] items-baseline gap-x-3 py-1.5"
            style={{ borderColor: 'var(--theme-rule)' }}
          >
            <div className="min-w-0">
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="text-[12px] font-semibold hover:underline"
                style={{ color: 'var(--theme-accent)' }}
              >
                {repo.name}
              </a>
              {repo.description && (
                <span
                  className="ml-2 text-[11.5px]"
                  style={{ color: 'var(--theme-text-muted)' }}
                >
                  — {repo.description}
                </span>
              )}
            </div>
            <div
              className="flex shrink-0 items-center gap-3 text-[11px] tabular-nums"
              style={{ color: 'var(--theme-text-muted)' }}
            >
              {repo.primaryLanguage && (
                <span className="inline-flex items-center gap-1">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: repo.primaryLanguage.color }}
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
