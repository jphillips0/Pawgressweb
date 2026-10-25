'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export type AstroPose = 'jetpack' | 'wave' | 'clipboard' | 'scale' | 'paperwork' | 'letter' | 'desk';

const SRC: Record<AstroPose, string> = {
  jetpack: '/astro/astro-jetpack.webp',
  wave: '/astro/astro-wave.webp',
  clipboard: '/astro/astro-clipboard.webp',
  scale: '/astro/astro-scale.webp',
  paperwork: '/astro/astro-paperwork.webp',
  letter: '/astro/astro-letter.webp',
  desk: '/astro/astro-desk.webp',
};

/** Astro illustration that bobs gently. Falls back to the jetpack pose if a pose image is missing. */
export function AstroArt({ pose = 'jetpack', className = '', float = true, flame = false, alt = '' }: { pose?: AstroPose; className?: string; float?: boolean; flame?: boolean; alt?: string }) {
  const [src, setSrc] = useState(SRC[pose]);
  const imgRef = useRef<HTMLImageElement>(null);

  // The load error can fire before hydration attaches onError, so check once mounted too.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setSrc(SRC.jetpack);
  }, []);
  return (
    <motion.div
      className={`${/\babsolute\b/.test(className) ? '' : 'relative '}${className}`}
      animate={float ? { y: [0, -14, 0], rotate: [-2, 2, -2] } : undefined}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ containerType: 'inline-size' }}
    >
      {flame && src === SRC.jetpack && JETPACK_NOZZLES.map((n, i) => <Thruster key={i} {...n} delay={i * 0.12} />)}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={false}
        onError={() => setSrc(SRC.jetpack)}
        className="relative w-full h-auto select-none"
        style={{ filter: 'drop-shadow(0 24px 30px rgba(30,27,75,0.28))' }}
      />
    </motion.div>
  );
}

// Nozzle mouths on astro-jetpack.png (720×771), as % of the image, plus the
// direction the tanks point (degrees clockwise from straight down).
const JETPACK_NOZZLES = [
  { x: 25.9, y: 43.8, angle: 70, size: 4.6 },
  { x: 23.4, y: 51.9, angle: 70, size: 5.2 },
];

/** A flame anchored at a nozzle, drawn behind the art so it emerges from the nozzle mouth. */
function Thruster({ x, y, angle, size, delay }: { x: number; y: number; angle: number; size: number; delay: number }) {
  return (
    <div aria-hidden className="absolute pointer-events-none" style={{ left: `${x}%`, top: `${y}%`, width: 0, height: 0, transform: `rotate(${angle}deg)` }}>
      {/* Soft glow */}
      <div
        className="absolute rounded-full animate-flame"
        style={{ width: `${size * 1.9}cqw`, left: `${-size * 0.95}cqw`, top: `${-size * 0.3}cqw`, aspectRatio: '1 / 2.6', background: 'radial-gradient(closest-side, rgba(255,170,60,0.55), rgba(255,120,40,0))', filter: 'blur(4px)', animationDelay: `${delay}s` }}
      />
      {/* Flame core */}
      <div
        className="absolute animate-flame"
        style={{
          width: `${size}cqw`,
          left: `${-size / 2}cqw`,
          top: `${-size * 0.15}cqw`,
          aspectRatio: '1 / 3.6',
          borderRadius: '45% 45% 50% 50% / 25% 25% 75% 75%',
          background: 'linear-gradient(180deg,#FFFFFF 0%,#FFF3B0 18%,#FFC44D 45%,#FF7A2F 75%,rgba(255,90,40,0) 100%)',
          filter: 'blur(0.6px)',
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  );
}

// Deterministic pseudo-random so server and client render the same stars.
// Rounded so server and client serialize identical style strings.
function seeded(n: number) {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return Math.round((x - Math.floor(x)) * 1000) / 1000;
}

export function Starfield({ count = 70, className = '' }: { count?: number; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: count }, (_, i) => {
        const size = Math.round((1 + seeded(i * 3) * 2.4) * 10) / 10;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${(seeded(i) * 100).toFixed(1)}%`,
              top: `${(seeded(i * 7 + 1) * 100).toFixed(1)}%`,
              width: size,
              height: size,
              animationDelay: `${(seeded(i * 11) * 3).toFixed(2)}s`,
              animationDuration: `${(2 + seeded(i * 13) * 3).toFixed(2)}s`,
              boxShadow: size > 2.6 ? '0 0 6px rgba(255,255,255,0.9)' : undefined,
            }}
          />
        );
      })}
    </div>
  );
}
