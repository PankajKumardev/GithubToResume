import type { ResumeData } from '@/resume/types';
import { RepoCard } from './RepoCard';

export function PinnedSection({ data }: { data: ResumeData }) {
  if (data.pinned.length === 0) return null;
  return (
    <section>
      <h2
        className="text-[11px] font-semibold uppercase tracking-[0.18em]"
        style={{
          color: 'var(--theme-text-primary)',
          fontFamily: 'var(--theme-font-heading)',
        }}
      >
        Pinned Projects
      </h2>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {data.pinned.map((repo) => (
          <RepoCard key={repo.fullName} repo={repo} />
        ))}
      </div>
    </section>
  );
}
