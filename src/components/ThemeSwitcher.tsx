import { motion } from 'framer-motion';
import { LayoutTemplate, BookOpen, TerminalSquare } from 'lucide-react';
import { themeList, type ThemeId } from '@/resume/themes';
import { usePrefsStore } from '@/store/prefsStore';
import { cn } from '@/lib/format';
import { springSnap } from '@/lib/motion';

const ICONS: Record<ThemeId, React.ComponentType<{ className?: string }>> = {
  minimal: LayoutTemplate,
  editorial: BookOpen,
  mono: TerminalSquare,
};

export function ThemeSwitcher() {
  const { theme, setTheme } = usePrefsStore();
  return (
    <div
      role="tablist"
      aria-label="Theme"
      className="relative inline-flex items-center gap-0.5 rounded-lg border border-app-border bg-app-surface p-0.5"
    >
      {themeList.map((t) => {
        const Icon = ICONS[t.id];
        const active = theme === t.id;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={active}
            onClick={() => setTheme(t.id)}
            title={`${t.label} — ${t.description}`}
            className={cn(
              'relative inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs transition-colors',
              active ? 'text-app-primary' : 'text-app-muted hover:text-app-primary',
            )}
          >
            {active && (
              <motion.div
                layoutId="active-theme-tab"
                transition={springSnap}
                className="absolute inset-0 rounded-md bg-white shadow-soft ring-1 ring-app-border-strong"
              />
            )}
            <Icon className="relative h-3.5 w-3.5" />
            <span className="relative hidden md:inline">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
