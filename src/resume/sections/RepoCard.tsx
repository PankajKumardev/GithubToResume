import { GitFork, Star } from 'lucide-react';
import type { Repo } from '@/resume/types';
import type { ThemeTokens } from '@/resume/themes';

export function RepoCard({ repo, theme }: { repo: Repo; theme: ThemeTokens }) {
  return (
    <div
      className="flex h-full flex-col gap-2 rounded-xl p-3.5"
      style={{ border: '1px solid var(--theme-rule)' }}
    >
      <div className="flex items-start justify-between gap-2">
        <a
          href={repo.url}
          target="_blank"
          rel="noreferrer"
          className="truncate text-[13px] font-semibold hover:underline"
          style={{
            color: 'var(--theme-accent)',
            fontFamily: theme.variant.monoRepoNames
              ? 'var(--theme-font-mono)'
              : 'var(--theme-font-heading)',
          }}
        >
          {repo.name}
        </a>
        <div
          className="flex shrink-0 items-center gap-2 text-[11px] tabular-nums"
          style={{ color: 'var(--theme-text-muted)' }}
        >
          <span className="inline-flex items-center gap-0.5">
            <Star className="h-3 w-3" /> {repo.stars}
          </span>
          <span className="inline-flex items-center gap-0.5">
            <GitFork className="h-3 w-3" /> {repo.forks}
          </span>
        </div>
      </div>
      {repo.description && (
        <p
          className="line-clamp-3 text-[12px] leading-relaxed"
          style={{ color: 'var(--theme-text-primary)' }}
        >
          {repo.description}
        </p>
      )}
      {repo.primaryLanguage && (
        <div
          className="mt-auto inline-flex items-center gap-1.5 text-[11.5px]"
          style={{ color: 'var(--theme-text-muted)' }}
        >
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: repo.primaryLanguage.color }}
          />
          <span>{repo.primaryLanguage.name}</span>
        </div>
      )}
    </div>
  );
}
