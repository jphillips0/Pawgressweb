'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { animate, stagger, createSpring } from 'animejs';
import SharedNav from './SharedNav';
import DownloadButton from './DownloadButton';
import { BreederHomeScreen, PetProfilesScreen } from './app-screens/screens';
import { CollarDot, Photo } from './app-screens/kit';
import { IMG } from './app-screens/demoData';
import { AstroArt } from './astro/AstroArt';
import MobileHero from './MobileHero';

const PROOF = [
  { icon: '📣', title: 'Post once', sub: 'Every family, chat and timeline' },
  { icon: '📈', title: 'Age-stamped', sub: 'Weights, photos and records' },
  { icon: '✨', title: 'Astro AI', sub: 'Does the busywork for you' },
];

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Subtle parallax: the phones lean toward the cursor on desktop.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const frontX = useTransform(sx, (v) => v * 14);
  const frontY = useTransform(sy, (v) => v * 10);
  const backX = useTransform(sx, (v) => v * -10);
  const backY = useTransform(sy, (v) => v * -6);
  const chipX = useTransform(sx, (v) => v * 24);

  useEffect(() => {
    // Split heading into per-word spans for a staggered reveal
    if (headingRef.current) {
      headingRef.current.querySelectorAll<HTMLElement>(':scope > span').forEach((span) => {
        if (span.dataset.split === 'true') return;
        // background-clip: text on the parent does NOT extend through inline-block children,
        // so gradient classes are re-applied to each word span.
        const isGradient = /bg-clip-text/.test(span.className);
        const gradientClasses = isGradient
          ? span.className.split(/\s+/).filter((c) => /^bg-(gradient|clip-text)/.test(c) || /^(from|via|to)-/.test(c) || c === 'text-transparent').join(' ')
          : '';
        const parts = (span.textContent ?? '').split(/(\s+)/);
        span.textContent = '';
        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            span.appendChild(document.createTextNode(part));
            return;
          }
          const w = document.createElement('span');
          w.className = 'word inline-block will-change-transform' + (gradientClasses ? ' ' + gradientClasses : '');
          w.style.opacity = '0';
          w.textContent = part;
          span.appendChild(w);
        });
        span.dataset.split = 'true';
      });

      animate(headingRef.current.querySelectorAll<HTMLElement>('.word'), {
        opacity: [0, 1],
        translateY: [40, 0],
        rotate: [-6, 0],
        filter: ['blur(8px)', 'blur(0px)'],
        ease: createSpring({ stiffness: 120, damping: 14 }),
        delay: stagger(70),
      });
    }

    if (subtitleRef.current) {
      animate(subtitleRef.current, { opacity: [0, 1], translateY: [20, 0], duration: 900, delay: 550, ease: 'out(3)' });
    }

    if (ctaRef.current) {
      animate(ctaRef.current.querySelectorAll<HTMLElement>(':scope > *'), {
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.9, 1],
        ease: createSpring({ stiffness: 150, damping: 13 }),
        delay: stagger(110, { start: 750 }),
      });
    }
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      className="relative font-baloo overflow-hidden pb-10 sm:pb-16"
      style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 35%, #f5f3ff 70%, #fdf4ff 100%)' }}
    >
      <SharedNav />

      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -top-40 -left-32 w-[48rem] h-[48rem] rounded-full opacity-60 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.6), rgba(99,102,241,0))' }}
          animate={{ x: [0, 60, -40, 0], y: [0, 40, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="absolute top-24 -right-40 w-[40rem] h-[40rem] rounded-full opacity-50 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(217,70,239,0.5), rgba(217,70,239,0))' }}
          animate={{ x: [0, -50, 30, 0], y: [0, 50, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-1/4 w-[34rem] h-[34rem] rounded-full opacity-45 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(56,189,248,0.55), rgba(56,189,248,0))' }}
          animate={{ x: [0, 40, -30, 0], y: [0, -40, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Faint dot grid for texture */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.35]"
          style={{ backgroundImage: 'radial-gradient(rgba(79,70,229,0.18) 1px, transparent 1px)', backgroundSize: '22px 22px', maskImage: 'radial-gradient(ellipse at 70% 40%, #000 20%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at 70% 40%, #000 20%, transparent 70%)' }}
        />
        <div aria-hidden className="absolute inset-x-0 top-0 h-64" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.55), transparent)' }} />
      </div>

      {/* Phones and small tablets get their own animated hero */}
      <div className="lg:hidden">
        <MobileHero />
      </div>

      <div className="hidden lg:block relative z-20 px-5 sm:px-8 lg:px-16 xl:px-24 pt-24 sm:pt-32 lg:pt-36 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-6 items-center max-w-[1320px] mx-auto">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <motion.a
              href="#astro"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -2 }}
              className="group inline-flex items-center gap-2 mb-6 rounded-full border border-blue-200/70 bg-white/75 backdrop-blur-md pl-1.5 pr-4 py-1.5 text-sm font-semibold text-blue-800 shadow-sm shadow-blue-900/5 hover:border-blue-300 hover:bg-white transition-colors"
            >
              <span className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-2.5 py-1">For breeders</span>
              <span className="sm:hidden">Now with Astro AI</span>
              <span className="hidden sm:inline">Now with Astro, your AI kennel assistant</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </motion.a>

            <h1 ref={headingRef} className="text-[2.6rem] sm:text-6xl xl:text-7xl font-bold leading-[1.02] tracking-tight mb-6 font-baloo">
              <span className="text-gray-900">Run your litter,</span>{' '}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">not your inbox.</span>
            </h1>

            <p ref={subtitleRef} style={{ opacity: 0 }} className="text-lg sm:text-xl md:text-[1.4rem] text-blue-950/75 mb-8 sm:mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Every puppy gets an age-stamped growth timeline and every family gets their own chat. Post one update and it reaches them all, while Astro logs the weigh-ins, files the vet paperwork and drafts your replies.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start max-w-md mx-auto sm:max-w-none">
              <motion.div className="w-full sm:w-auto" style={{ opacity: 0 }} whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 350, damping: 22 }}>
                <DownloadButton className="relative inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 transition-shadow text-center">
                  <svg className="w-5 h-5" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM275.9 92.1c20.6-24.4 18.8-46.7 18.2-54.7-18.3 1.1-39.5 12.5-51.6 26.5-13.3 15-21.1 33.6-19.4 54.3 19.8 1.5 37.9-8.7 52.8-26.1z" /></svg>
                  Download the App
                </DownloadButton>
              </motion.div>
              <motion.a
                href="/for-breeders"
                style={{ opacity: 0 }}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border-2 border-blue-700/25 bg-white/70 backdrop-blur-md text-blue-800 px-8 py-4 rounded-full hover:bg-white hover:border-blue-700/50 transition-colors font-semibold text-lg text-center"
              >
                See how it works
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </motion.a>
            </div>

            {/* Product facts, not vanity stats */}
            <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-3 max-w-xl mx-auto lg:mx-0">
              {PROOF.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.12, duration: 0.5 }}
                  className="rounded-2xl border border-white/80 bg-white/55 backdrop-blur-md px-3 py-3 text-left shadow-sm"
                >
                  <div className="text-lg leading-none">{p.icon}</div>
                  <div className="mt-1.5 text-sm sm:text-base font-bold text-gray-900 leading-tight">{p.title}</div>
                  <div className="text-[11px] sm:text-xs text-gray-500 leading-snug font-inter">{p.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Live app composition */}
          <div ref={stageRef} onMouseMove={onMove} onMouseLeave={onLeave} className="relative h-[600px] sm:h-[660px] lg:h-[690px]">
            {/* Halo + paw */}
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.4), rgba(99,102,241,0))' }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Back phone: the litter */}
            {/* Layers: position (CSS) → parallax (style) → entrance (animate) */}
            <div className="absolute left-1/2 top-6 hidden sm:block -translate-x-[92%]">
              <motion.div style={{ x: backX, y: backY }}>
                <motion.div
                  initial={{ opacity: 0, rotate: -14, y: 60 }}
                  animate={{ opacity: 1, rotate: -8, y: 0 }}
                  transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.35 }}
                >
                  <PetProfilesScreen width={250} />
                </motion.div>
              </motion.div>
            </div>

            {/* Front phone: breeder home */}
            <div className="absolute left-1/2 top-0 sm:top-12 z-10 -translate-x-1/2 sm:-translate-x-[28%]">
              <motion.div style={{ x: frontX, y: frontY }}>
                <motion.div
                  initial={{ opacity: 0, rotate: 8, y: 90 }}
                  animate={{ opacity: 1, rotate: 3, y: 0 }}
                  transition={{ type: 'spring', stiffness: 70, damping: 15, delay: 0.15 }}
                >
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>
                    <BreederHomeScreen width={270} />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Floating proof chips */}
            <motion.div
              style={{ x: chipX }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 220, damping: 18 }}
              className="absolute z-20 left-0 sm:-left-2 lg:-left-10 top-[58%] flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur px-3.5 py-2.5 shadow-2xl shadow-indigo-900/15 border border-white"
            >
              <div className="flex -space-x-2">
                {[IMG.oakley, IMG.pumpkin, IMG.murphy, IMG.maple].map((s) => (
                  <Photo key={s} src={s} className="w-8 h-8 rounded-full border-2 border-white" />
                ))}
              </div>
              <div className="font-inter">
                <div className="text-[10px] text-gray-400 font-medium leading-tight">Bath day update sent</div>
                <div className="text-sm font-bold text-gray-900 leading-tight">4 families · 1 post</div>
              </div>
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center">✓</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
              transition={{ opacity: { delay: 1.45 }, scale: { delay: 1.45, type: 'spring', stiffness: 220, damping: 18 }, y: { duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 2 } }}
              className="absolute z-20 right-0 sm:right-4 lg:-right-2 top-28 sm:top-40 flex items-center gap-2.5 rounded-2xl bg-white/95 backdrop-blur px-3.5 py-2.5 shadow-2xl shadow-indigo-900/15 border border-white font-inter"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="m3 17 6-6 4 4 8-8" /><path d="M15 7h6v6" /></svg>
              </div>
              <div>
                <div className="text-[10px] text-gray-400 font-medium leading-tight flex items-center gap-1"><CollarDot collar="red" size={8} ring={false} /> Oakley · 7 weeks</div>
                <div className="text-sm font-bold text-gray-900 leading-tight">6.4 lbs <span className="text-emerald-600">+0.9</span></div>
              </div>
            </motion.div>

            {/* Astro flies in and points the way to his section */}
            <motion.a
              href="#astro"
              aria-label="Meet Astro, the AI kennel assistant"
              initial={{ opacity: 0, x: 120, y: -80, rotate: 10 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              transition={{ delay: 1.7, type: 'spring', stiffness: 60, damping: 14 }}
              className="group absolute z-30 -right-1 sm:-right-6 lg:-right-14 -bottom-8 sm:-bottom-10 flex flex-col items-end"
            >
              <span className="-mb-2 mr-2 rounded-2xl rounded-br-sm bg-gray-900 text-white text-xs sm:text-sm font-semibold font-inter px-3 py-2 shadow-xl whitespace-nowrap group-hover:bg-indigo-600 transition-colors">
                I can do the weigh-ins ✨
              </span>
              <AstroArt pose="jetpack" flame className="w-24 sm:w-32" />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Wave cutoff */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-16 sm:h-20 md:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ transform: 'rotate(180deg)' }}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>
    </section>
  );
}
