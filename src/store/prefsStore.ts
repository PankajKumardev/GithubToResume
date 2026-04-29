import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ThemeId } from '@/resume/themes';

export type PaperSize = 'a4' | 'letter';

interface PrefsState {
  theme: ThemeId;
  paperSize: PaperSize;
  recent: string[];
  setTheme: (t: ThemeId) => void;
  setPaperSize: (p: PaperSize) => void;
  pushRecent: (login: string) => void;
  clearRecent: () => void;
}

const MAX_RECENT = 6;

export const usePrefsStore = create<PrefsState>()(
  persist(
    (set, get) => ({
      theme: 'modern-serif',
      paperSize: 'a4',
      recent: [],
      setTheme: (t) => set({ theme: t }),
      setPaperSize: (p) => set({ paperSize: p }),
      pushRecent: (login) => {
        const trimmed = login.trim();
        if (!trimmed) return;
        const lower = trimmed.toLowerCase();
        const next = [trimmed, ...get().recent.filter((r) => r.toLowerCase() !== lower)].slice(
          0,
          MAX_RECENT,
        );
        set({ recent: next });
      },
      clearRecent: () => set({ recent: [] }),
    }),
    {
      name: 'gh_prefs_v1',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
