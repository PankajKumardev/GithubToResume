import type { ResumeData } from '@/resume/types';
import { compactNumber } from '@/lib/format';

const ITEMS = [
  { key: 'followers', label: 'Followers' },
  { key: 'following', label: 'Following' },
  { key: 'publicReposCount', label: 'Public repos' },
  { key: 'totalContributionsLastYear', label: 'Contribs (1y)' },
  { key: 'totalCommits', label: 'Commits (1y)' },
  { key: 'totalPRs', label: 'PRs (1y)' },
  { key: 'totalIssues', label: 'Issues (1y)' },
] as const;

export function StatsSection({ data }: { data: ResumeData }) {
  const values: Record<(typeof ITEMS)[number]['key'], number> = {
    followers: data.profile.followers,
    following: data.profile.following,
    publicReposCount: data.stats.publicReposCount,
    totalContributionsLastYear: data.stats.totalContributionsLastYear,
    totalCommits: data.stats.totalCommits,
    totalPRs: data.stats.totalPRs,
    totalIssues: data.stats.totalIssues,
  };
  return (
    <ul
      className="grid grid-cols-7 gap-2 pt-3"
      style={{ borderTop: '1px solid var(--theme-rule)' }}
    >
      {ITEMS.map((item) => (
        <li key={item.key} className="min-w-0">
          <div
            className="truncate text-[10px] font-medium uppercase tracking-wider"
            style={{ color: 'var(--theme-text-muted)' }}
          >
            {item.label}
          </div>
          <div
            className="mt-0.5 text-[17px] font-semibold tabular-nums"
            style={{
              color: 'var(--theme-text-primary)',
              fontFamily: 'var(--theme-font-heading)',
              letterSpacing: '-0.01em',
            }}
          >
            {compactNumber(values[item.key])}
          </div>
        </li>
      ))}
    </ul>
  );
}
