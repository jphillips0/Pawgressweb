'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Instantly jumps to the top of the page on every route change,
 * before any scroll animations have a chance to trigger.
 * Uses `behavior: 'instant'` to bypass the CSS `scroll-behavior: smooth`.
 * If the URL has a #hash (e.g. /privacy#delete-account), jumps to that section instead.
 */
export default function ScrollRestorer() {
  const pathname = usePathname();

  useEffect(() => {
    const target = window.location.hash ? document.getElementById(decodeURIComponent(window.location.hash.slice(1))) : null;
    if (target) {
      // Land the section just below the fixed nav. Measured by hand because reveal
      // animations transform sections, which throws off scrollIntoView.
      const jump = () => {
        const top = target.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top, left: 0, behavior: 'instant' });
      };
      requestAnimationFrame(jump);
      // Web fonts can reflow the page after first paint; settle again once they're in.
      document.fonts?.ready.then(() => setTimeout(jump, 60));
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
