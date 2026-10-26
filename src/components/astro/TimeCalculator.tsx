'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { TASKS, fmtMinutes, weeklyMinutes } from './timeModel';

const LITTER_SIZES = [6, 8, 10, 12];
const LITTER_COUNTS = [1, 2, 3];

function Picker<T extends number>({ label, value, options, onChange, suffix }: { label: string; value: T; options: T[]; onChange: (v: T) => void; suffix: (v: T) => string }) {
  return (
    <div>
      <div className="text-[11px] font-bold uppercase tracking-widest text-indigo-200/70 mb-1.5">{label}</div>
      <div className="inline-flex rounded-full bg-white/10 p-1 border border-white/10" role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button
            key={o}
            role="radio"
            aria-checked={o === value}
            onClick={() => onChange(o)}
            className={`relative rounded-full px-3.5 sm:px-4 py-1.5 text-sm font-semibold transition-colors ${o === value ? 'text-indigo-950' : 'text-indigo-100/80 hover:text-white'}`}
          >
            {o === value && <motion.span layoutId={`pick-${label}`} className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-200 to-orange-300" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
            <span className="relative">{suffix(o)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/** Animates between values whenever `value` changes. */
function Tween({ value, format }: { value: number; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const controls = animate(prev.current, value, {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { el.textContent = format(v); },
    });
    prev.current = value;
    return () => controls.stop();
  }, [value, format]);
  return <span ref={ref}>{format(value)}</span>;
}

/**
 * Weekly time a breeder spends on updates, weigh-ins, records, litter posts and replies,
 * by hand vs. with Astro, for the litter size they pick. `compact` is the home page version.
 */
export default function TimeCalculator({ compact = false, initialPuppies = 8 }: { compact?: boolean; initialPuppies?: number }) {
  const [puppies, setPuppies] = useState(initialPuppies);
  const [litters, setLitters] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.4 });
  const w = weeklyMinutes(litters, puppies);
  const maxRow = Math.max(...w.rows.map((r) => r.manual));

  return (
    <div ref={ref}>
      <div className="flex flex-wrap gap-4">
        <Picker label="Puppies per litter" value={puppies} options={LITTER_SIZES} onChange={setPuppies} suffix={(v) => String(v)} />
        <Picker label="Litters at once" value={litters} options={LITTER_COUNTS} onChange={setLitters} suffix={(v) => String(v)} />
      </div>

      <div className={`mt-5 flex items-stretch gap-3 sm:gap-4 ${compact ? 'max-w-xl' : ''}`}>
        <div className="flex-1 rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-4 sm:p-5">
          <div className="text-xs font-bold uppercase tracking-widest text-indigo-200/70">By hand</div>
          <div className="font-baloo text-3xl sm:text-5xl font-bold mt-1 text-white/90 whitespace-nowrap"><Tween value={w.manual} format={fmtMinutes} /></div>
          <div className="text-sm text-indigo-200/70">every week</div>
        </div>
        <div className="hidden sm:flex items-center text-2xl text-indigo-200/60" aria-hidden>→</div>
        <div className="flex-1 rounded-3xl border border-amber-200/30 bg-gradient-to-br from-amber-200/20 to-orange-300/10 backdrop-blur-md p-4 sm:p-5">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-200/90">With Astro</div>
          <div className="font-baloo text-3xl sm:text-5xl font-bold mt-1 whitespace-nowrap"><Tween value={w.astro} format={fmtMinutes} /></div>
          <div className="text-sm text-amber-100/80">every week</div>
        </div>
      </div>

      <p className={`mt-4 text-indigo-100/85 ${compact ? 'text-base' : 'text-lg'}`}>
        That’s about <strong className="text-amber-200"><Tween value={w.saved} format={fmtMinutes} /> back every week</strong>, or{' '}
        <strong className="text-amber-200"><Tween value={w.saved * 8} format={fmtMinutes} /></strong> over an 8-week litter.
      </p>

      {!compact && (
        <div className="mt-6 space-y-3">
          {w.rows.map((row, i) => (
            <div key={row.key}>
              <div className="flex justify-between text-sm text-indigo-100/80 mb-1">
                <span className="font-semibold text-white/90">{TASKS[row.key].label}</span>
                <span>{fmtMinutes(row.manual)} → <span className="text-amber-200 font-semibold">{fmtMinutes(row.astro)}</span></span>
              </div>
              <div className="relative h-3 rounded-full bg-white/10 overflow-hidden">
                <motion.div className="absolute inset-y-0 left-0 rounded-full bg-indigo-300/50" initial={{ width: 0 }} animate={{ width: seen ? `${(row.manual / maxRow) * 100}%` : 0 }} transition={{ duration: 0.9, delay: i * 0.08, ease: 'easeOut' }} />
                <motion.div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-200 to-orange-300" initial={{ width: 0 }} animate={{ width: seen ? `${Math.max(1.5, (row.astro / maxRow) * 100)}%` : 0 }} transition={{ duration: 0.7, delay: 0.5 + i * 0.08, ease: 'easeOut' }} />
              </div>
            </div>
          ))}
        </div>
      )}

      <details className="mt-5 group">
        <summary className="cursor-pointer text-sm font-semibold text-sky-300 hover:text-sky-200 list-none inline-flex items-center gap-1.5">
          <span className="transition-transform group-open:rotate-90">›</span> How we estimate this
        </summary>
        <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-indigo-100/80 leading-relaxed">
          <p className="mb-2">Estimates assume every puppy is reserved by a family, and include the time to review and confirm what Astro drafts.</p>
          <ul className="space-y-1">
            {Object.values(TASKS).map((t) => (
              <li key={t.label}>
                <span className="font-semibold text-white/90">{t.label}:</span> {t.manual} by hand, {t.astro} with Astro, {t.often}.
              </li>
            ))}
          </ul>
        </div>
      </details>
    </div>
  );
}
