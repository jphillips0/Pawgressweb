'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { SceneStage, SCENE_META, type SceneId } from '@/components/app-screens/astroScenes';
import { AstroArt, Starfield } from './AstroArt';

const TASKS: { id: SceneId; label: string; icon: string }[] = [
  { id: 'draft', label: 'Family updates', icon: '💬' },
  { id: 'weigh', label: 'Litter weigh-ins', icon: '⚖️' },
  { id: 'records', label: 'Vet paperwork', icon: '🩺' },
  { id: 'litter', label: 'Litter posts', icon: '📣' },
];

const TOTAL_MIN = TASKS.reduce((n, t) => n + SCENE_META[t.id].saved, 0);

function CountUp({ to, run }: { to: number; run: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1600);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{v}</>;
}

export default function AstroHomeSection() {
  const ref = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const phoneVisible = useInView(phoneRef, { amount: 0.4 });
  const [active, setActive] = useState(0);
  const [round, setRound] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const astroY = useTransform(scrollYProgress, [0, 1], [120, -160]);
  const astroX = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const nebulaY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const next = () => {
    setActive((a) => (a + 1) % TASKS.length);
    setRound((r) => r + 1);
  };
  const pick = (i: number) => {
    setActive(i);
    setRound((r) => r + 1);
  };

  return (
    <section ref={ref} id="astro" className="relative overflow-hidden text-white mb-14 sm:mb-24 lg:mb-32" style={{ background: 'radial-gradient(120% 90% at 70% 0%, #2B2370 0%, #17134A 40%, #0B0926 100%)' }}>
      <Starfield count={90} />
      <motion.div aria-hidden style={{ y: nebulaY }} className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-40" style={{ background: 'radial-gradient(closest-side, #4F7BFF, transparent)' }} />
        <div className="absolute top-1/3 -right-48 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-35" style={{ background: 'radial-gradient(closest-side, #B05CFF, transparent)' }} />
        <div className="absolute -bottom-40 left-1/3 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(closest-side, #FF9A4D, transparent)' }} />
      </motion.div>

      {/* Waves blend the dark section into the white page */}
      <svg className="absolute top-0 left-0 w-full h-12 sm:h-20 z-10" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden>
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-full h-12 sm:h-20 z-10 rotate-180" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden>
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff" />
      </svg>

      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-10 pt-28 sm:pt-36 pb-28 sm:pb-36">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-10 items-center">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-md px-4 py-1.5 text-sm font-semibold"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-300" />
              </span>
              New · Meet Astro, your Kennel Assistant
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              className="font-baloo text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.02] tracking-tight mt-6"
            >
              One prompt.
              <br />
              <span className="bg-gradient-to-r from-sky-300 via-indigo-200 to-amber-200 bg-clip-text text-transparent">Your kennel busywork, done.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-indigo-100/85 leading-relaxed max-w-xl"
            >
              Astro is an AI agent built into Pawgress. Tell him what happened today, like a weigh-in, a vet visit or bath day. He writes the family updates, logs every weight and files the paperwork for every puppy. You read it over and tap Send.
            </motion.p>

            {/* Time saved */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex items-stretch gap-3 sm:gap-4 max-w-xl"
            >
              <div className="flex-1 rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-4 sm:p-5">
                <div className="text-xs font-bold uppercase tracking-widest text-indigo-200/70">By hand</div>
                <div className="font-baloo text-3xl sm:text-5xl font-bold mt-1 text-white/90 whitespace-nowrap"><CountUp to={TOTAL_MIN} run={inView} /> min</div>
                <div className="text-sm text-indigo-200/70">of taps, typing and copy-paste</div>
              </div>
              <div className="hidden sm:flex items-center text-2xl text-indigo-200/60" aria-hidden>→</div>
              <div className="flex-1 rounded-3xl border border-amber-200/30 bg-gradient-to-br from-amber-200/20 to-orange-300/10 backdrop-blur-md p-4 sm:p-5">
                <div className="text-xs font-bold uppercase tracking-widest text-amber-200/90">With Astro</div>
                <div className="font-baloo text-3xl sm:text-5xl font-bold mt-1 whitespace-nowrap">4 prompts</div>
                <div className="text-sm text-amber-100/80">and four taps on Send</div>
              </div>
            </motion.div>

            {/* Task list, synced with the phone */}
            <div className="mt-8 grid grid-cols-2 gap-2.5 max-w-xl" role="tablist" aria-label="Astro tasks">
              {TASKS.map((t, i) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => pick(i)}
                  className={`relative overflow-hidden text-left rounded-2xl px-4 py-3 border transition-colors ${i === active ? 'bg-white/15 border-white/30' : 'bg-white/[0.04] border-white/10 hover:bg-white/10'}`}
                >
                  <div className="flex items-center gap-2 font-semibold text-sm sm:text-base">
                    <span>{t.icon}</span> {t.label}
                  </div>
                  <div className="text-xs text-indigo-200/70 mt-0.5">~{SCENE_META[t.id].saved} min → 1 prompt</div>
                  {i === active && phoneVisible && (
                    <motion.span
                      key={round}
                      className="absolute left-0 bottom-0 h-[3px] bg-gradient-to-r from-sky-300 to-amber-200"
                      initial={{ width: '0%' }} animate={{ width: '100%' }}
                      transition={{ duration: 15, ease: 'linear' }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Buyer mention */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-4"
            >
              <AstroArt pose="wave" className="w-16 shrink-0" />
              <p className="text-sm sm:text-base text-indigo-100/85 leading-relaxed">
                <span className="font-semibold text-white">Families get Astro too.</span> Buyers can log weights, file shot records and ask questions about their puppy just by saying it. No forms to fill in.{' '}
                <Link href="/for-buyers#astro" className="font-semibold text-sky-300 hover:text-sky-200 whitespace-nowrap">For buyers →</Link>
              </p>
            </motion.div>

            <div className="mt-8 flex flex-wrap gap-3">
              <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link href="/for-breeders#astro" className="inline-flex items-center gap-2 rounded-full bg-white text-indigo-900 px-6 py-3.5 font-semibold shadow-xl shadow-indigo-950/40">
                  See how Astro works
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Phone + flying Astro */}
          <div className="relative flex justify-center lg:justify-end lg:pr-10">
            {/* Orbit rings */}
            <div aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] sm:w-[620px] sm:h-[620px]">
              <motion.div className="absolute inset-0 rounded-full border border-white/10" animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}>
                <span className="absolute left-1/2 -top-1.5 w-3 h-3 rounded-full bg-sky-300 shadow-[0_0_14px_4px_rgba(125,211,252,0.6)]" />
              </motion.div>
              <motion.div className="absolute inset-16 rounded-full border border-dashed border-white/10" animate={{ rotate: -360 }} transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}>
                <span className="absolute -left-1 top-1/2 w-2.5 h-2.5 rounded-full bg-amber-200 shadow-[0_0_12px_3px_rgba(253,230,138,0.6)]" />
              </motion.div>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl bg-sky-400/30" aria-hidden />

            <motion.div
              ref={phoneRef}
              initial={{ opacity: 0, y: 60, rotate: 4 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 80, damping: 16 }}
              className="relative"
            >
              <SceneStage id={TASKS[active].id} round={round} playing={phoneVisible} onDone={next} width={310} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={TASKS[active].id}
                  initial={{ opacity: 0, x: 20, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -10 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="hidden sm:flex absolute left-[calc(100%-28px)] bottom-40 items-center gap-2.5 rounded-2xl bg-white text-gray-900 px-4 py-2.5 shadow-2xl whitespace-nowrap z-10"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-lg">⏱</div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-medium leading-tight">Time saved</div>
                    <div className="text-sm font-bold leading-tight">~{SCENE_META[TASKS[active].id].saved} minutes</div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
                className="hidden sm:flex absolute right-[calc(100%-28px)] bottom-16 items-center gap-2.5 rounded-2xl bg-white/95 text-gray-900 px-4 py-2.5 shadow-2xl whitespace-nowrap z-10"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white">✓</div>
                <div>
                  <div className="text-[10px] text-gray-400 font-medium leading-tight">You stay in control</div>
                  <div className="text-sm font-bold leading-tight">Nothing sends without you</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div style={{ y: astroY, x: astroX }} className="absolute -top-24 -left-4 sm:-left-10 lg:left-0 w-36 sm:w-48 lg:w-56 z-30 pointer-events-none">
              <AstroArt pose="jetpack" flame alt="Astro, the Pawgress kennel assistant" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
