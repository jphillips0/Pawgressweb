'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Instantly jumps to the top of the page on every route change,
 * before any scroll animations have a chance to trigger.
 * Uses `behavior: 'instant'` to bypass the CSS `scroll-behavior: smooth`.
 */
export default function ScrollRestorer() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
