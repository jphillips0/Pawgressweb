'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BuyerHomeScreen, FamilyChatScreen, PostUpdateScreen, WeightScreen } from './app-screens/screens';
import { AstroAvatar, Photo } from './app-screens/kit';
import { IMG } from './app-screens/demoData';
import { AstroArt } from './astro/AstroArt';

type Variant = 'breeder' | 'buyer';
type Event = { icon: ReactNode; label: string; value: string; tint: string };

const pupIcon = (src: string) => <Photo src={src} className="w-9 h-9 rounded-xl" />;

// Rotating "live" events shown in the floating chip, so the hero feels like the app is in use.
const EVENTS: Record<Variant, Event[]> = {
  breeder: [
    { icon: '📣', label: 'Bath day update', value: 'Sent to 4 families', tint: 'from-blue-500 to-indigo-500' },
    { icon: pupIcon(IMG.oakley), label: 'Oakley · 7 weeks', value: '6.4 lbs  +0.9', tint: 'from-emerald-400 to-teal-500' },
    { icon: <AstroAvatar size={36} className="border-0" />, label: 'Astro', value: 'Filed Murphy’s vaccines', tint: 'from-sky-400 to-blue-500' },
    { icon: pupIcon(IMG.pumpkin), label: 'Pumpkin · Reserved', value: 'Priya joined the chat', tint: 'from-fuchsia-500 to-pink-500' },
  ],
  buyer: [
    { icon: '📅', label: 'Pickup Sat, Oct 31', value: '6 days to go', tint: 'from-blue-500 to-indigo-500' },
    { icon: pupIcon(IMG.bath), label: 'Willow Creek', value: 'New photo of Oakley', tint: 'from-amber-400 to-orange-500' },
    { icon: pupIcon(IMG.oakley), label: 'Oakley this week', value: '+0.9 lbs', tint: 'from-emerald-400 to-teal-500' },
    { icon: <AstroAvatar size={36} className="border-0" />, label: 'Astro', value: 'Shot record filed', tint: 'from-sky-400 to-blue-500' },
  ],
};

const STATIC_CHIP: Record<Variant, Event> = {
  breeder: { icon: '⏱', label: 'Astro saved you', value: '2.7 hrs this week', tint: 'from-amber-300 to-orange-400' },
  buyer: { icon: '❤', label: 'Following', value: 'Oakley’s timeline', tint: 'from-pink-400 to-rose-500' },
};

function Chip({ e, className = '' }: { e: Event; className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 rounded-2xl bg-white/95 backdrop-blur border border-white px-3 py-2 shadow-xl shadow-indigo-900/15 whitespace-nowrap ${className}`}>
      {typeof e.icon === 'string' ? (
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${e.tint} flex items-center justify-center text-white text-base shadow-md`}>{e.icon}</div>
      ) : (
        e.icon
      )}
      <div className="font-inter">
        <div className="text-[10px] text-gray-400 font-medium leading-tight">{e.label}</div>
        <div className="text-[13px] sm:text-sm font-bold text-gray-900 leading-tight">{e.value}</div>
      </div>
    </div>
  );
}

function LiveChip({ variant }: { variant: Variant }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => n + 1), 2800);
    return () => clearInterval(t);
  }, []);
  const events = EVENTS[variant];
  const e = events[i % events.length];
  return (
    <div className="relative h-[54px]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={i}
          initial={{ opacity: 0, y: -18, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        >
          <Chip e={e} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Two app screens fanned out with live chips and Astro, for the For Breeders / For Buyers heroes. */
export default function PageHeroVisual({ variant }: { variant: Variant }) {
  const front = variant === 'breeder' ? <PostUpdateScreen width={260} /> : <BuyerHomeScreen width={260} />;
  const back = variant === 'breeder' ? <FamilyChatScreen width={240} /> : <WeightScreen width={240} />;

  return (
    <div data-hero-visual className="relative mx-auto w-full max-w-[520px] h-[624px] sm:h-[740px]">
      {/* Glow */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[26rem] h-[26rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.45), rgba(99,102,241,0))' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Phones: scaled down as a group on small screens */}
      <div className="absolute left-1/2 top-[86px] sm:top-[70px] -translate-x-1/2 w-[440px] h-[600px] origin-top scale-[0.78] sm:scale-100">
        <motion.div
          className="absolute left-0 top-12"
          initial={{ opacity: 0, x: 40, y: 80, rotate: 0 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: -9 }}
          transition={{ type: 'spring', stiffness: 60, damping: 15, delay: 0.35 }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}>
            {back}
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute right-0 top-0 z-10"
          initial={{ opacity: 0, y: 140, rotate: 10 }}
          animate={{ opacity: 1, y: 0, rotate: 4 }}
          transition={{ type: 'spring', stiffness: 60, damping: 14, delay: 0.15 }}
        >
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}>
            {front}
          </motion.div>
        </motion.div>
      </div>

      {/* Live chip: its own row above the phones */}
      <motion.div
        className="absolute z-20 left-1/2 -translate-x-1/2 top-0"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 200, damping: 18 }}
      >
        <LiveChip variant={variant} />
      </motion.div>

      {/* Static chip: its own row below the phones, right side */}
      <motion.div
        className="absolute z-20 right-2 sm:right-6 bottom-0"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
        transition={{ opacity: { delay: 1.2 }, x: { delay: 1.2, type: 'spring', stiffness: 200, damping: 18 }, y: { duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 2 } }}
      >
        <Chip e={STATIC_CHIP[variant]} />
      </motion.div>

      {/* Astro: bottom row, left side, clear of the phones */}
      <motion.div
        className="absolute z-30 left-4 sm:left-8 -bottom-3 w-16 sm:w-20 pointer-events-none"
        initial={{ opacity: 0, x: -80, y: 40, rotate: -12 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 50, damping: 12 }}
      >
        <AstroArt pose="jetpack" flame />
      </motion.div>
    </div>
  );
}
