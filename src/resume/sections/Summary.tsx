import type { ResumeData } from '@/resume/types';

export function SummarySection({ data }: { data: ResumeData }) {
  if (!data.profile.bio) return null;
  return (
    <p
      className="text-[13.5px] leading-relaxed"
      style={{
        color: 'var(--theme-text-primary)',
        fontFamily: 'var(--theme-font-body)',
      }}
    >
      {data.profile.bio}
    </p>
  );
}
