'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DownloadButton from './DownloadButton';
import { BreederHomeScreen } from './app-screens/screens';
import { AstroAvatar, Photo } from './app-screens/kit';
import { COLLAR_HEX, IMG, type Collar } from './app-screens/demoData';
import { AstroArt } from './astro/AstroArt';

/* ------------------------------------------------------------------ */
/*  Lock-screen style notifications that stack over the phone           */
/* ------------------------------------------------------------------ */

type Note = { id: number; from: 'pawgress' | 'astro'; title: string; body: string; thumb?: string };

// Kept short so every message fits on one line, even on a 320px-wide phone.
const NOTES: Omit<Note, 'id'>[] = [
  { from: 'pawgress', title: 'Dana · Oakley', body: 'He’s getting so big!! 😍', thumb: IMG.oakley },
  { from: 'astro', title: 'Astro', body: 'Logged 6 weigh-ins ✅', thumb: IMG.weighSheet },
  { from: 'pawgress', title: 'Update sent', body: 'Bath day reached 4 families', thumb: IMG.bath },
  { from: 'astro', title: 'Astro', body: 'Filed Murphy’s vaccine card', thumb: IMG.vetCard },
  { from: 'pawgress', title: 'Priya · Pumpkin', body: 'When is pickup again?', thumb: IMG.pumpkin },
  { from: 'astro', title: 'Astro', body: 'Drafted a reply for Priya', thumb: IMG.chatToy },
];

const NOTE_H = 62;

function useCurrentNote(intervalMs = 2600): Note {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN((c) => c + 1), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return { id: n, ...NOTES[n % NOTES.length] };
}

const glass = {
  background: 'rgba(255,255,255,0.84)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
} as const;

/**
 * Lock-screen notification stack. One fixed-height card is visible at a time; the "cards
 * behind" are two static plates, so the stack's edge never jumps when messages change length.
 */
function NotificationStack() {
  const note = useCurrentNote();
  return (
    <div className="relative" data-note-stack style={{ height: NOTE_H + 14 }}>
      {/* Static plates suggesting older notifications */}
      <div aria-hidden className="absolute inset-x-6 rounded-[20px] border border-white/60" style={{ ...glass, top: 14, height: NOTE_H, opacity: 0.45 }} />
      <div aria-hidden className="absolute inset-x-3 rounded-[21px] border border-white/70" style={{ ...glass, top: 7, height: NOTE_H, opacity: 0.7 }} />

      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={note.id}
          initial={{ opacity: 0, y: -28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 7, scale: 0.95, transition: { duration: 0.18, ease: 'easeIn' } }}
          transition={{ type: 'spring', stiffness: 340, damping: 30, delay: 0.08 }}
          className="absolute inset-x-0 top-0 flex items-center gap-2.5 rounded-[22px] px-3 border border-white/80"
          style={{ ...glass, background: 'rgba(255,255,255,0.96)', height: NOTE_H, boxShadow: '0 14px 34px -14px rgba(30,27,75,0.45)', transformOrigin: 'top center' }}
        >
          {note.from === 'astro' ? (
            <AstroAvatar size={38} className="border-0" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/app-icon.png" alt="" className="w-[38px] h-[38px] rounded-[10px] shrink-0" />
          )}
          <div className="flex-1 min-w-0 font-inter leading-tight">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[13px] font-semibold text-gray-900 truncate">{note.title}</span>
              <span className="text-[11px] text-gray-500 shrink-0">now</span>
            </div>
            <div className="text-[13px] text-gray-700 truncate mt-0.5">{note.body}</div>
          </div>
          {note.thumb && <Photo src={note.thumb} className="hidden min-[360px]:block w-10 h-10 rounded-lg shrink-0" />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating puppy bubbles                                              */
/* ------------------------------------------------------------------ */

const BUBBLES: { img: string; collar: Collar; className: string; size: number; delay: number }[] = [
  { img: IMG.oakley, collar: 'red', className: 'left-1 top-[150px]', size: 58, delay: 0.5 },
  { img: IMG.murphy, collar: 'green', className: 'left-4 top-[290px]', size: 46, delay: 0.7 },
  { img: IMG.pumpkin, collar: 'blue', className: 'right-1 top-[180px]', size: 54, delay: 0.6 },
  { img: IMG.maple, collar: 'yellow', className: 'right-5 top-[320px]', size: 44, delay: 0.8 },
];

/* ------------------------------------------------------------------ */
/*  Growth-story reel                                                   */
/* ------------------------------------------------------------------ */

const REEL_A = [
  { img: IMG.oakley, title: 'Oakley', tag: 'Week 7', stat: '6.4 lbs' },
  { img: IMG.bath, title: 'Bath day', tag: 'Week 7', stat: '4 families' },
  { img: IMG.murphy, title: 'Murphy', tag: 'Week 7', stat: '6.9 lbs' },
  { img: IMG.litter, title: 'Nap pile', tag: 'Week 5', stat: '6 puppies' },
  { img: IMG.pumpkin, title: 'Pumpkin', tag: 'Week 6', stat: '5.8 lbs' },
];
const REEL_B = [
  { img: IMG.yard, title: 'Yard time', tag: 'Week 6', stat: 'Video' },
  { img: IMG.maple, title: 'Maple', tag: 'Week 7', stat: '5.6 lbs' },
  { img: IMG.chatCrate, title: 'First crate nap', tag: 'Week 7', stat: 'Pumpkin' },
  { img: IMG.juniper, title: 'Juniper', tag: 'Week 7', stat: '5.2 lbs' },
  { img: IMG.chatToy, title: 'Toy test', tag: 'Week 6', stat: 'Pumpkin' },
];

function Reel({ items, reverse = false }: { items: typeof REEL_A; reverse?: boolean }) {
  // Two copies side by side; the track slides by half its width for a seamless loop.
  return (
    <div className="overflow-hidden">
      <div className={`flex gap-3 w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {[...items, ...items].map((it, i) => (
          <div key={i} className="relative w-[132px] h-[168px] rounded-[22px] overflow-hidden shrink-0 shadow-lg shadow-indigo-900/15 border-2 border-white">
            <Photo src={it.img} className="absolute inset-0" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0) 45%,rgba(0,0,0,0.65))' }} />
            <span className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-bold text-indigo-700 font-inter">{it.tag}</span>
            <div className="absolute left-2.5 bottom-2 text-white font-inter">
              <div className="text-[13px] font-bold leading-tight">{it.title}</div>
              <div className="text-[11px] opacity-90">{it.stat}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile hero                                                         */
/* ------------------------------------------------------------------ */

export default function MobileHero() {
  return (
    <div className="relative z-20 pt-24 [@media(max-height:780px)]:pt-[88px] pb-14 font-baloo">
      {/* Headline */}
      <div className="px-5 text-center">
        <motion.a
          href="#astro"
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/75 backdrop-blur-md pl-1.5 pr-3 py-1 text-[13px] font-semibold text-blue-800 shadow-sm"
        >
          <span className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] px-2 py-0.5">For breeders</span>
          Now with Astro AI ›
        </motion.a>
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-4 text-[2.65rem] leading-[1.02] font-bold tracking-tight text-gray-900"
        >
          Run your litter,
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">not your inbox.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-3 text-[17px] leading-relaxed text-blue-950/70 max-w-sm mx-auto"
        >
          One post reaches every family. Astro handles the weigh-ins, vet paperwork and replies.
        </motion.p>
      </div>

      {/* Animated stage */}
      <div className="relative mt-5 h-[clamp(270px,calc(100svh-385px),440px)] overflow-hidden max-w-xl mx-auto" style={{ maskImage: 'linear-gradient(180deg,#000 78%,transparent)', WebkitMaskImage: 'linear-gradient(180deg,#000 78%,transparent)' }}>
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-24 -translate-x-1/2 w-[22rem] h-[22rem] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.45), rgba(99,102,241,0))' }}
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Phone rising in */}
        <div className="absolute left-1/2 top-[78px] -translate-x-1/2">
          <motion.div
            initial={{ y: 260, rotate: 6, opacity: 0 }}
            animate={{ y: 0, rotate: -4, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 60, damping: 14, delay: 0.25 }}
          >
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>
              <BreederHomeScreen width={248} />
            </motion.div>
          </motion.div>
        </div>

        {/* Puppy bubbles */}
        {BUBBLES.map((b, i) => (
          <motion.div
            key={b.img}
            className={`absolute z-20 ${b.className}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, i % 2 ? 8 : -8, 0] }}
            transition={{ scale: { delay: b.delay, type: 'spring', stiffness: 260, damping: 14 }, opacity: { delay: b.delay }, y: { duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
          >
            <div className="rounded-full p-[3px] bg-white shadow-xl shadow-indigo-900/20" style={{ boxShadow: `0 0 0 3px ${COLLAR_HEX[b.collar]}, 0 10px 24px -8px rgba(30,27,75,0.35)` }}>
              <Photo src={b.img} className="rounded-full" style={{ width: b.size, height: b.size }} />
            </div>
          </motion.div>
        ))}

        {/* Notifications */}
        <div className="absolute inset-x-4 top-1 z-30 max-w-md mx-auto">
          <NotificationStack />
        </div>

        {/* Astro flies through */}
        <motion.div
          className="absolute z-40 w-24 pointer-events-none"
          style={{ top: 250 }}
          initial={{ x: -140, y: 40, rotate: -6 }}
          animate={{ x: [-140, 420], y: [40, -30], rotate: [-6, 4] }}
          transition={{ duration: 6.5, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut', delay: 1.2 }}
        >
          <AstroArt pose="jetpack" flame float={false} />
        </motion.div>
      </div>

      {/* Calls to action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
        className="relative z-20 -mt-6 px-5 flex flex-col gap-2.5 max-w-md mx-auto"
      >
        <motion.div whileTap={{ scale: 0.97 }}>
          <DownloadButton className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-lg font-semibold text-white shadow-xl shadow-blue-600/30">
            <span aria-hidden className="absolute inset-0 animate-shimmer" />
            <svg className="relative w-5 h-5" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM275.9 92.1c20.6-24.4 18.8-46.7 18.2-54.7-18.3 1.1-39.5 12.5-51.6 26.5-13.3 15-21.1 33.6-19.4 54.3 19.8 1.5 37.9-8.7 52.8-26.1z" /></svg>
            <span className="relative">Download Pawgress</span>
          </DownloadButton>
        </motion.div>
        <a href="#astro" className="flex items-center justify-center gap-1.5 py-2 text-base font-semibold text-blue-800">
          Watch Astro work
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M19 9l-7 7-7-7" /></svg>
        </a>
      </motion.div>

      {/* Growth-story reel */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }} className="mt-6">
        <div className="px-5 text-center mb-3">
          <div className="text-[11px] font-bold tracking-[0.18em] text-indigo-500 font-inter">THE PAWGRESS TIMELINE</div>
          <div className="text-2xl font-bold text-gray-900 leading-tight mt-1">Every puppy gets a growth story</div>
        </div>
        <div className="space-y-3">
          <Reel items={REEL_A} />
          <Reel items={REEL_B} reverse />
        </div>
      </motion.div>
    </div>
  );
}
