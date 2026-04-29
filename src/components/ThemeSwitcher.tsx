import { themeList, type ThemeId } from '@/resume/themes';
import { usePrefsStore } from '@/store/prefsStore';
import { cn } from '@/lib/format';

export function ThemeSwitcher() {
  const { theme, setTheme } = usePrefsStore();
  return (
    <div
      role="tablist"
      aria-label="Theme"
      className="hidden items-center gap-2 border border-app-border bg-app-bg px-1 py-0.5 font-mono text-[10px] uppercase tracking-widest sm:inline-flex"
    >
      {themeList.map((t, i) => {
        const active = theme === (t.id as ThemeId);
        return (
          <span key={t.id} className="contents">
            <button
              role="tab"
              aria-selected={active}
              onClick={() => setTheme(t.id)}
              title={`${t.label} — ${t.description}`}
              className={cn(
                'px-1.5 py-1 transition-colors',
                active
                  ? 'text-app-accent'
                  : 'text-app-muted hover:text-app-primary',
              )}
            >
              [ {t.label} ]
            </button>
            {i < themeList.length - 1 && <span className="text-app-border">|</span>}
          </span>
        );
      })}
    </div>
  );
}
