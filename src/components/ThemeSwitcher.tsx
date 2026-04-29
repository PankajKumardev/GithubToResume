import { Newspaper, Square, Terminal } from 'lucide-react';
import { themeList, type ThemeId } from '@/resume/themes';
import { usePrefsStore } from '@/store/prefsStore';
import { cn } from '@/lib/format';

const ICONS: Record<ThemeId, React.ComponentType<{ className?: string }>> = {
  'modern-serif': Newspaper,
  'swiss-minimal': Square,
  'dev-terminal': Terminal,
};

export function ThemeSwitcher() {
  const { theme, setTheme } = usePrefsStore();
  return (
    <div
      role="tablist"
      aria-label="Theme"
      className="inline-flex items-center gap-0.5 rounded-lg border border-app-border bg-app-surface p-0.5"
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
              'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs transition-colors',
              active
                ? 'bg-app-bg text-app-primary ring-1 ring-app-border-strong'
                : 'text-app-muted hover:bg-white/5 hover:text-app-primary',
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden md:inline">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
