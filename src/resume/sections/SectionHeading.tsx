import type { ThemeTokens } from '@/resume/themes';
import { formatSectionTitle } from '@/resume/themes';
import { cn } from '@/lib/format';

export function SectionHeading({
  theme,
  label,
  className,
}: {
  theme: ThemeTokens;
  label: string;
  className?: string;
}) {
  const text = formatSectionTitle(theme, label);
  return (
    <h2
      className={cn(
        'text-[11px] font-semibold uppercase',
        theme.bracketSectionTitles ? 'tracking-normal' : 'tracking-[0.18em]',
        theme.topRuleSections && 'border-t pt-2',
        className,
      )}
      style={{
        color: 'var(--theme-text-primary)',
        fontFamily: 'var(--theme-font-heading)',
        ...(theme.topRuleSections ? { borderTopColor: 'var(--theme-rule)' } : {}),
      }}
    >
      {text}
    </h2>
  );
}
