'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { SceneStage, SCENE_META, type SceneId } from '@/components/app-screens/astroScenes';
import { AstroArt, Starfield, type AstroPose } from './AstroArt';

type Step = { id: SceneId; pose: AstroPose; blurb: string };

const BREEDER_STEPS: Step[] = [
  { id: 'draft', pose: 'letter', blurb: 'Astro reads the pet’s timeline and weigh-ins, picks the best photos from the week and writes the update in your voice. It lands in the family’s chat and the pet’s timeline together.' },
  { id: 'weigh', pose: 'scale', blurb: 'Photograph your weigh sheet. Astro reads every collar colour, matches each one to a puppy and fills in six weigh-ins at once. You check the numbers and confirm.' },
  { id: 'records', pose: 'paperwork', blurb: 'Snap a vaccine card or a vet invoice. Astro pulls out each vaccine, date and due date, updates the health profile and keeps the photo with the records.' },
  { id: 'litter', pose: 'clipboard', blurb: 'Ask once for the whole litter. Astro writes the post, fills in each family’s name and puppy, and sends it to every reserved family and the litter feed.' },
  { id: 'reply', pose: 'wave', blurb: 'Under every family’s chat, Suggest reply drafts an answer from the facts on file, like pickup dates, diet and vaccines. It goes into the message box, and you send it.' },
];

const BUYER_STEPS: Step[] = [
  { id: 'b-weight', pose: 'scale', blurb: 'Just say the number. Astro fills in the weigh-in card with the date and a note, and the growth chart updates when you confirm.' },
  { id: 'b-records', pose: 'paperwork', blurb: 'Take a photo of the vet paperwork. Astro files each vaccine and works out when the next one is due, so the vet-ready PDF is always current.' },
  { id: 'b-ask', pose: 'desk', blurb: 'Ask anything about your puppy. Astro answers using their real breed, age, weights and records, and always reminds you he isn’t a vet.' },
  { id: 'b-draft', pose: 'letter', blurb: 'Want to send your breeder an update? Astro drafts it with your newest photos. You read it over and tap Send.' },
];

const COPY = {
  breeder: {
    eyebrow: 'Astro · Kennel Assistant',
    title: <>Your busiest kennel tasks, <span className="bg-gradient-to-r from-sky-300 via-indigo-200 to-amber-200 bg-clip-text text-transparent">each done from one prompt.</span></>,
    sub: 'Astro is an AI agent that knows every puppy’s breed, age, weights and health records. Tell him what happened and he does the typing and tapping across your whole litter. Nothing goes out until you read it and tap Send.',
    pose: 'desk' as AstroPose,
  },
  buyer: {
    eyebrow: 'Astro · Your pet’s assistant',
    title: <>Skip the forms. <span className="bg-gradient-to-r from-sky-300 via-indigo-200 to-amber-200 bg-clip-text text-transparent">Just tell Astro.</span></>,
    sub: 'Astro knows your puppy’s profile, weights and records. Say a weight, snap the vet paperwork or ask a question, and he fills it in for you, the same way he helps your breeder.',
    pose: 'wave' as AstroPose,
  },
};

const TRUST = {
  breeder: [
    { icon: '✋', t: 'You approve everything', d: 'Astro drafts and fills in. He never sends a message or saves a record until you tap.' },
    { icon: '🔒', t: 'Only your pets', d: 'Astro can only change pets you own. Every family’s chat and timeline stays exactly as you approve it.' },
    { icon: '🩺', t: 'Pet care, not vet care', d: 'He sticks to pet topics and always says he isn’t a vet. Anything urgent goes to your veterinarian.' },
  ],
  buyer: [
    { icon: '✋', t: 'You approve everything', d: 'Every weigh-in, record and message waits for your tap.' },
    { icon: '🏡', t: 'Yours after pickup', d: 'Until pickup day your breeder keeps the records. After that, Astro works on your puppy like any pet you own.' },
    { icon: '🩺', t: 'Pet care, not vet care', d: 'Astro always says he isn’t a vet. For anything urgent, call your veterinarian.' },
  ],
};

function StepCard({ step, index, active, onActive }: { step: Step; index: number; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const centered = useInView(ref, { margin: '-45% 0px -45% 0px' });
  const visible = useInView(ref, { amount: 0.5 });
  const meta = SCENE_META[step.id];

  useEffect(() => {
    if (centered) onActive(index);
  }, [centered, index, onActive]);

  const lit = active || visible;
  return (
    <div ref={ref} className="lg:min-h-[86vh] flex items-center py-6 lg:py-0">
      <motion.article
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }}
        className={`relative w-full rounded-[2rem] border p-6 sm:p-8 backdrop-blur-md transition-colors duration-500 ${active ? 'border-white/25 bg-white/[0.09]' : 'border-white/10 bg-white/[0.04]'}`}
      >
        <AstroArt pose={step.pose} className="absolute -top-10 right-2 sm:right-6 w-24 sm:w-32" />
        <div className="font-baloo text-sm font-bold tracking-[0.2em] text-sky-300">0{index + 1}</div>
        <h3 className="font-baloo text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mt-1 pr-24 sm:pr-32">{meta.title}</h3>

        <div className="mt-5 flex items-start gap-3">
          <span className="mt-0.5 shrink-0 rounded-full bg-sky-400/20 border border-sky-300/30 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-sky-200">You say</span>
          <p className="text-lg sm:text-xl font-semibold text-white leading-snug">{meta.ask}</p>
        </div>

        <p className="mt-4 text-base sm:text-lg text-indigo-100/80 leading-relaxed">{step.blurb}</p>

        <div className="mt-6 grid sm:grid-cols-[1fr_auto] gap-4 items-end">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-indigo-200/60 mb-2">What you used to do</div>
            <ul className="space-y-1.5">
              {meta.manual.map((m, i) => (
                <li key={m} className="relative flex items-center gap-2.5 text-sm sm:text-base text-indigo-100/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-300/50 shrink-0" />
                  <span className="relative">
                    {m}
                    <motion.span
                      aria-hidden
                      className="absolute left-0 top-1/2 h-[2px] bg-amber-300/90 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: lit ? '100%' : 0 }}
                      transition={{ duration: 0.45, delay: lit ? 0.6 + i * 0.25 : 0, ease: 'easeOut' }}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <motion.div
            animate={{ scale: lit ? 1 : 0.92, opacity: lit ? 1 : 0.6 }}
            transition={{ type: 'spring', stiffness: 200, damping: 16 }}
            className="justify-self-start sm:justify-self-end rounded-2xl bg-gradient-to-br from-amber-200 to-orange-300 text-indigo-950 px-4 py-3 shadow-lg shadow-orange-500/20"
          >
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">Saves about</div>
            <div className="font-baloo text-3xl font-bold leading-none">{meta.saved} min</div>
          </motion.div>
        </div>

        {/* Mobile: each step carries its own phone */}
        <div className="lg:hidden mt-8 flex justify-center">
          <MobilePhone id={step.id} />
        </div>
      </motion.article>
    </div>
  );
}

function MobilePhone({ id }: { id: SceneId }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.5 });
  const [round, setRound] = useState(0);
  return (
    <div ref={ref}>
      <SceneStage id={id} round={round} playing={visible} onDone={() => setRound((r) => r + 1)} width={272} />
    </div>
  );
}

export default function AstroWorkflow({ variant }: { variant: 'breeder' | 'buyer' }) {
  const steps = variant === 'breeder' ? BREEDER_STEPS : BUYER_STEPS;
  const copy = COPY[variant];
  const [active, setActive] = useState(0);
  const [round, setRound] = useState(0);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stickyVisible = useInView(stickyRef, { amount: 0.4 });
  const totalRef = useRef<HTMLDivElement>(null);
  const totalVisible = useInView(totalRef, { once: true, amount: 0.5 });
  const totalManual = steps.reduce((n, s) => n + SCENE_META[s.id].saved, 0);

  return (
    // overflow-clip (not hidden) so the phone column can stay sticky while the steps scroll.
    <section id="astro" className="relative overflow-clip text-white" style={{ background: 'radial-gradient(120% 70% at 50% 0%, #2B2370 0%, #17134A 45%, #0B0926 100%)' }}>
      <Starfield count={110} />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-35" style={{ background: 'radial-gradient(closest-side, #4F7BFF, transparent)' }} />
        <div className="absolute top-1/2 -right-40 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(closest-side, #B05CFF, transparent)' }} />
      </div>
      <svg className="absolute top-0 left-0 w-full h-12 sm:h-20 z-10" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden>
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff" />
      </svg>

      <div className="relative z-20 max-w-6xl mx-auto px-5 sm:px-8 pt-28 sm:pt-36 pb-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <AstroArt pose={copy.pose} className="w-40 sm:w-52 mx-auto" alt="Astro" />
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-semibold"
          >
            <span className="text-amber-200">✦</span> {copy.eyebrow}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-baloo text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mt-5"
          >
            {copy.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 text-lg sm:text-xl text-indigo-100/85 leading-relaxed"
          >
            {copy.sub}
          </motion.p>
        </div>

        {/* Steps + sticky phone */}
        <div className="mt-16 lg:mt-8 grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-16">
          <div>
            {steps.map((s, i) => (
              <StepCard key={s.id} step={s} index={i} active={i === active} onActive={setActive} />
            ))}
          </div>
          <div className="hidden lg:block">
            <div ref={stickyRef} className="sticky top-[max(88px,calc(50vh-380px))]">
              <div className="relative">
                <div aria-hidden className="absolute inset-0 -m-10 rounded-full blur-3xl bg-sky-400/25" />
                <SceneStage
                  id={steps[active].id}
                  round={round}
                  playing={stickyVisible}
                  onDone={() => setRound((r) => r + 1)}
                  width={300}
                  className="relative"
                />
              </div>
              <div className="flex justify-center mt-4 h-[52px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={steps[active].id}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="flex items-center gap-2.5 rounded-2xl bg-white text-gray-900 px-4 py-2 shadow-2xl whitespace-nowrap"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-white text-lg">⏱</div>
                    <div>
                      <div className="text-[10px] text-gray-400 font-medium leading-tight">Step 0{active + 1} · {SCENE_META[steps[active].id].title}</div>
                      <div className="text-sm font-bold leading-tight">Saves ~{SCENE_META[steps[active].id].saved} minutes</div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex justify-center gap-2 mt-5" aria-hidden>
                {steps.map((s, i) => (
                  <span key={s.id} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-sky-300' : 'w-1.5 bg-white/25'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Total */}
        <div ref={totalRef} className="mt-16 rounded-[2rem] border border-white/15 bg-white/[0.06] backdrop-blur-md p-6 sm:p-10">
          <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-indigo-200/70">Add it up</div>
              <div className="font-baloo text-4xl sm:text-5xl font-bold leading-tight mt-1">
                {steps.length} prompts.
                <br />
                <span className="text-amber-200">~{totalManual} minutes back.</span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-indigo-100/80 mb-1.5"><span>By hand</span><span>~{totalManual} min</span></div>
                <div className="h-4 rounded-full bg-white/10 overflow-hidden">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-indigo-300/60 to-indigo-200/60" initial={{ width: 0 }} animate={{ width: totalVisible ? '100%' : 0 }} transition={{ duration: 1.4, ease: 'easeOut' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-indigo-100/80 mb-1.5"><span>With Astro</span><span>a prompt and a tap each</span></div>
                <div className="h-4 rounded-full bg-white/10 overflow-hidden">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-amber-200 to-orange-300" initial={{ width: 0 }} animate={{ width: totalVisible ? '7%' : 0 }} transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {TRUST[variant].map((t, i) => (
            <motion.div
              key={t.t}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-white/10 bg-white/[0.05] p-6"
            >
              <div className="text-2xl">{t.icon}</div>
              <div className="font-baloo text-xl font-bold mt-2">{t.t}</div>
              <p className="text-indigo-100/75 mt-1 leading-relaxed">{t.d}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <svg className="absolute bottom-0 left-0 w-full h-12 sm:h-20 z-10 rotate-180" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden>
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff" />
      </svg>
    </section>
  );
}
