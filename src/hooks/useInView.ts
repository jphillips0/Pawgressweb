'use client';

import { RefObject, useEffect, useState } from 'react';

/**
 * Returns true when `ref` enters the viewport.
 * `once` keeps it true after first intersection.
 */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  options: IntersectionObserverInit = { threshold: 0.15 },
  once = true,
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) observer.disconnect();
      } else if (!once) {
        setInView(false);
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, once]);

  return inView;
}
