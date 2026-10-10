import localFont from 'next/font/local';
import { Instrument_Serif } from 'next/font/google';

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

/**
 * The italic accent in the hero headline ("that grow your business."). One weight, one
 * style, Latin only, applied by className on that single span instead of a
 * site-wide variable — so only the homepage requests the file, and Next's
 * generated fallback is size-matched to it, which keeps the swap from moving
 * the line.
 */
export const heroSerif = Instrument_Serif({
  weight: '400',
  style: 'italic',
  subsets: ['latin'],
  display: 'swap',
  // Next preloads every font a layout-reachable module imports, on every
  // route — 15 KB for a font only the homepage draws. Without the preload the
  // file is fetched when a page's CSS first uses it, i.e. only on the homepage.
  preload: false,
});
