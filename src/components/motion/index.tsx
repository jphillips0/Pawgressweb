'use client';

import { ReactNode, useEffect, useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Shared easing / transition presets                                  */
/* ------------------------------------------------------------------ */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const directionOffset = {
  up: { x: 0, y: 36 },
  down: { x: 0, y: -36 },
  left: { x: 36, y: 0 },
  right: { x: -36, y: 0 },
  none: { x: 0, y: 0 },
} as const;

export type RevealDirection = keyof typeof directionOffset;

/* ------------------------------------------------------------------ */
/*  Reveal — scroll-triggered fade/slide-in                             */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className,
  once = true,
  amount = 0.25,
  blur = false,
}: {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  blur?: boolean;
}) {
  const reduce = useReducedMotion();
  const offset = directionOffset[direction];

  return (
    <motion.div
      className={className}
      initial={
        reduce
          ? { opacity: 0 }
          : {
              opacity: 0,
              x: offset.x,
              y: offset.y,
              filter: blur ? 'blur(8px)' : 'blur(0px)',
            }
      }
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stagger — parent/child orchestration for lists & grids              */
/* ------------------------------------------------------------------ */

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export function Stagger({
  children,
  className,
  amount = 0.2,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  ScrollProgressBar — gradient bar pinned to top of viewport          */
/* ------------------------------------------------------------------ */

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
      style={{ scaleX }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  PageTransition — soft entrance for whole page bodies                */
/* ------------------------------------------------------------------ */

export function PageTransition({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  HoverCard — lift + shadow micro-interaction wrapper                 */
/* ------------------------------------------------------------------ */

export function HoverCard({
  children,
  className,
  lift = 6,
}: {
  children: ReactNode;
  className?: string;
  lift?: number;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -lift, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  RevealGroup — scroll-reveals every direct child via observer        */
/*  (ideal for long server-rendered content like legal pages)           */
/* ------------------------------------------------------------------ */

export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal-group ${className ?? ''}`}>
      {children}
    </div>
  );
}
