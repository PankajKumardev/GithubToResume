import type { ResumeData } from '@/resume/types';
import type { ThemeTokens } from '@/resume/themes';
import { RepoCard } from './RepoCard';
import { SectionHeading } from './SectionHeading';

export function PinnedSection({ data, theme }: { data: ResumeData; theme: ThemeTokens }) {
  if (data.pinned.length === 0) return null;
  return (
    <section>
      <SectionHeading theme={theme} label="Pinned Projects" />
      <div className="mt-2 grid grid-cols-2 gap-2">
        {data.pinned.map((repo) => (
          <RepoCard key={repo.fullName} repo={repo} />
        ))}
      </div>
    </section>
  );
}
