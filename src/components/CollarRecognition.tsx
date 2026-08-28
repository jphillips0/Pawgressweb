'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { animate, createSpring } from 'animejs';
import { useInView } from '@/hooks/useInView';

export default function CollarRecognition() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { threshold: 0.2 });

  useEffect(() => {
    if (!inView) return;
    if (headingRef.current) {
      animate(headingRef.current.querySelectorAll(':scope > *'), {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        ease: 'out(3)',
      });
    }
    if (textRef.current) {
      animate(textRef.current, { opacity: [0, 1], translateY: [20, 0], duration: 800, delay: 200, ease: 'out(3)' });
    }
    if (imageRef.current) {
      animate(imageRef.current, {
        opacity: [0, 1],
        scale: [0.85, 1],
        duration: 1100,
        delay: 300,
        ease: createSpring({ stiffness: 90, damping: 12 }),
      });
    }
  }, [inView]);

  return (
    <section ref={sectionRef} className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1800px] mx-auto mb-20 sm:mb-24 lg:mb-32">
      <div
        className="relative rounded-3xl lg:rounded-[2.5rem] border border-white/80 overflow-hidden shadow-2xl shadow-blue-900/15"
        style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #e0f2fe 35%, #eef2ff 70%, #f5f3ff 100%)' }}
      >
        {/* Aurora glow accents */}
        <div aria-hidden className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-55 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(56,189,248,0.5), transparent)' }} />
        <div aria-hidden className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-55 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.5), transparent)' }} />
        <div aria-hidden className="absolute inset-x-0 top-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)' }} />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center p-4 sm:p-12 lg:p-16">
          {/* Left: copy */}
          <div>
            <div ref={headingRef}>
              <div style={{ opacity: 0 }} className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-5 shadow-sm">
                <span>🎥</span> Not Just Another Gallery App
              </div>
              <h2 style={{ opacity: 0 }} className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 font-baloo tracking-tight leading-[1.1]">
                One video.{' '}
                <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">Every puppy, matched automatically.</span>
              </h2>
            </div>
            <div ref={textRef} style={{ opacity: 0 }} className="max-w-xl">
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4">
                Each puppy in a litter wears a different colored collar. Post one video of the whole group, and Pawgress's AI reads the collars, works out which puppy is which, and routes that footage straight into the right buyer's chat — automatically.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed sm:mb-8">
                No manual sorting. No "is this the one with the blue collar?" text back. It's the clearest answer to "why not just use Instagram" — this is what a group photo can't do.
              </p>

              <div className="hidden sm:flex flex-wrap gap-2.5">
                {[
                  { i: '🎨', t: 'Matched by collar color' },
                  { i: '📹', t: 'One upload, whole litter' },
                  { i: '💬', t: 'Auto-routed to the right chat' },
                ].map((p) => (
                  <motion.span
                    key={p.t}
                    whileHover={{ y: -2, scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-700 shadow-sm hover:border-blue-300 hover:shadow-md transition-shadow"
                  >
                    <span>{p.i}</span> {p.t}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: screenshot with floating chips */}
          <div className="relative">
            <div ref={imageRef} style={{ opacity: 0 }} className="relative">
              <img
                src="/Bulk Updates.PNG"
                alt="Posting one video and choosing which collar-tagged puppies it routes to"
                className="relative w-full max-w-[230px] sm:max-w-[260px] mx-auto rounded-3xl border-4 border-white shadow-2xl shadow-blue-900/20"
              />
            </div>

            <motion.div
              className="hidden sm:flex bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-2.5 items-center gap-2.5 absolute -top-4 -left-4 lg:-left-10 z-20"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              animate={{ y: [0, -6, 0] }}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-lg shadow-md flex-shrink-0">🔵</div>
              <div>
                <div className="text-[10px] text-gray-400 font-medium leading-tight">Detected</div>
                <div className="text-sm font-bold text-gray-900 leading-tight">Blue collar · Benny</div>
              </div>
            </motion.div>

            <motion.div
              className="hidden sm:flex bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-2.5 items-center gap-2.5 absolute -bottom-4 -right-4 lg:-right-10 z-20"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              animate={{ y: [0, 6, 0] }}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-lg shadow-md flex-shrink-0">✓</div>
              <div>
                <div className="text-[10px] text-gray-400 font-medium leading-tight">Sent to</div>
                <div className="text-sm font-bold text-gray-900 leading-tight">3 buyer chats</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
