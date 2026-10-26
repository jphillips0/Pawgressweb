'use client';

import { useEffect } from 'react';

/**
 * Port of the script from the old static link pages: try the custom scheme, and if
 * the page is still here shortly after, send Android visitors to Google Play.
 * On iOS, Universal Links handle it; the custom scheme is a fallback.
 */
export default function OpenInApp({ kind, id, playStoreId }: { kind: 'pet' | 'invite' | 'kennel'; id: string; playStoreId: string }) {
  useEffect(() => {
    if (!id) return;
    const start = Date.now();
    window.location.href = `pawgress://${kind}/${id}`;
    const timer = window.setTimeout(() => {
      if (Date.now() - start < 2500 && /android/i.test(navigator.userAgent)) {
        document.getElementById(playStoreId)?.click();
      }
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [kind, id, playStoreId]);

  return null;
}
