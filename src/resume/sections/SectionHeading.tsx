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
  return (
    <h2
      className={cn(
        'text-[10.5px] font-semibold uppercase tracking-[0.18em]',
        theme.variant.sectionDividers && 'border-t pt-2.5',
        theme.variant.monoSectionLabels && 'font-mono tracking-[0.12em]',
        className,
      )}
      style={{
        color: 'var(--theme-text-primary)',
        fontFamily: theme.variant.monoSectionLabels
          ? 'var(--theme-font-mono)'
          : 'var(--theme-font-heading)',
        ...(theme.variant.sectionDividers ? { borderTopColor: 'var(--theme-rule)' } : {}),
      }}
    >
      {formatSectionTitle(theme, label)}
    </h2>
  );
}
