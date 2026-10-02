import localFont from 'next/font/local';

/**
 * Trap is the primary face and the only one preloaded.
 *
 * Every page used to preload 20 faces — Trap ×4, Inter ×8 and InterDisplay ×8 —
 * for 2.31 MB of render-blocking font traffic competing with the LCP image.
 * InterDisplay was never referenced (the `font-display` utility appears nowhere)
 * and no italic face was ever used, so both are gone. What remains is subset to
 * the characters this site actually renders.
 */
export const trap = localFont({
  src: [
    { path: '../../public/fonts/trap/Trap-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/trap/Trap-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/trap/Trap-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/trap/Trap-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-trap',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
});

/**
 * Trap carries only 97 glyphs — basic Latin and a little punctuation. Inter used
 * to sit behind it in the stack to draw ₹, em dashes, curly quotes and "·", but
 * that cost every visitor a 33 KB download for a handful of punctuation marks
 * (the hero uses two). Those glyphs now come from the system UI font, which is
 * visually indistinguishable at punctuation size.
 */
