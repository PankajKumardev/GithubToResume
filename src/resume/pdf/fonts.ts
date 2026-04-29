import { Font } from '@react-pdf/renderer';

let registered = false;

/**
 * Registers the three OFL-licensed font families with @react-pdf/renderer.
 * Must run before any PDF generation. Idempotent.
 *
 * Fonts are served from `/fonts/*.ttf` (placed in `public/fonts/` by
 * `scripts/fetch-fonts.sh`). We use absolute origin URLs so react-pdf's
 * built-in fetch can read them in the browser.
 */
export function registerFonts(): void {
  if (registered) return;
  registered = true;

  const base = `${window.location.origin}/fonts/`;

  Font.register({
    family: 'Inter',
    fonts: [
      { src: base + 'Inter-Regular.ttf', fontWeight: 400 },
      { src: base + 'Inter-Medium.ttf', fontWeight: 500 },
      { src: base + 'Inter-SemiBold.ttf', fontWeight: 600 },
      { src: base + 'Inter-Bold.ttf', fontWeight: 700 },
    ],
  });

  Font.register({
    family: 'IBM Plex Serif',
    fonts: [
      { src: base + 'IBMPlexSerif-Regular.ttf', fontWeight: 400 },
      { src: base + 'IBMPlexSerif-SemiBold.ttf', fontWeight: 600 },
    ],
  });

  Font.register({
    family: 'JetBrains Mono',
    fonts: [
      { src: base + 'JetBrainsMono-Regular.ttf', fontWeight: 400 },
      { src: base + 'JetBrainsMono-Medium.ttf', fontWeight: 500 },
    ],
  });

  // Disable react-pdf's built-in hyphenator — we want clean line breaks.
  Font.registerHyphenationCallback((word) => [word]);
}
