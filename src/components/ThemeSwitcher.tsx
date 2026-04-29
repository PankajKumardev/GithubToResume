import { motion } from 'framer-motion';
import { themeList, type ThemeId } from '@/resume/themes';
import { usePrefsStore } from '@/store/prefsStore';
import { cn } from '@/lib/format';
import { springSnap } from '@/lib/motion';

export function ThemeSwitcher() {
  const { theme, setTheme } = usePrefsStore();
  return (
    <div
      role="tablist"
      aria-label="Theme"
      className="relative inline-flex items-center gap-0.5 rounded-md border border-border bg-surface p-0.5"
    >
      {themeList.map((t) => {
        const active = theme === (t.id as ThemeId);
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={active}
            onClick={() => setTheme(t.id)}
            title={`${t.label} — ${t.description}`}
            className={cn(
              'relative inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
              active ? 'text-ink' : 'text-muted hover:text-ink',
            )}
          >
            {active && (
              <motion.span
                layoutId="active-theme-tab"
                transition={springSnap}
                className="absolute inset-0 rounded-md bg-white shadow-sm ring-1 ring-border"
              />
            )}
            <span className="relative">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
