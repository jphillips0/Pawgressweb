// One model behind every "time saved" number on the site, so the home page, the step cards
// and the calculator always agree. Minutes are estimates for a breeder doing each job in the
// app by hand vs. asking Astro (including the time to review and confirm what Astro drafts).

export type TaskKey = 'weigh' | 'update' | 'records' | 'litterPost' | 'reply';

export const TASKS: Record<TaskKey, { label: string; manual: string; astro: string; often: string }> = {
  weigh: { label: 'Weigh-ins', manual: '1.5 min per puppy', astro: '1 min per session', often: 'every 2 days until 2 weeks old, then weekly' },
  update: { label: 'Family updates', manual: '8 min per family', astro: '1 min per family', often: 'once a week per family' },
  records: { label: 'Vet records', manual: '3 min per record', astro: '30 sec per record', often: 'about 3 per puppy over 8 weeks' },
  litterPost: { label: 'Litter posts', manual: '5 min + 2.5 min per family', astro: '2 min', often: 'once a week per litter' },
  reply: { label: 'Answering families', manual: '3 min per question', astro: '30 sec per question', often: 'about 3 questions a week per family' },
};

// Per-unit minutes.
const MIN = {
  weighPerPuppy: 1.5,
  weighAstroPerSession: 1,
  update: 8,
  updateAstro: 1,
  record: 3,
  recordAstro: 0.5,
  litterPostBase: 5,
  litterPostPerFamily: 2.5,
  litterPostAstro: 2,
  reply: 3,
  replyAstro: 0.5,
};

// Weekly frequencies, averaged over an 8-week litter.
const PER_WEEK = {
  weighSessions: 1.6, // ~7 sessions in weeks 0–2 plus 6 weekly ones, over 8 weeks
  recordsPerPuppy: 0.4, // ~3 records per puppy over 8 weeks
  repliesPerFamily: 3,
};

export type Breakdown = { key: TaskKey; manual: number; astro: number };

/** Weekly minutes by hand vs. with Astro, assuming every puppy is reserved by a family. */
export function weeklyMinutes(litters: number, puppiesPerLitter: number) {
  const pups = litters * puppiesPerLitter;
  const families = pups;
  const rows: Breakdown[] = [
    { key: 'weigh', manual: PER_WEEK.weighSessions * pups * MIN.weighPerPuppy, astro: PER_WEEK.weighSessions * litters * MIN.weighAstroPerSession },
    { key: 'update', manual: families * MIN.update, astro: families * MIN.updateAstro },
    { key: 'records', manual: pups * PER_WEEK.recordsPerPuppy * MIN.record, astro: pups * PER_WEEK.recordsPerPuppy * MIN.recordAstro },
    { key: 'litterPost', manual: litters * (MIN.litterPostBase + MIN.litterPostPerFamily * puppiesPerLitter), astro: litters * MIN.litterPostAstro },
    { key: 'reply', manual: families * PER_WEEK.repliesPerFamily * MIN.reply, astro: families * PER_WEEK.repliesPerFamily * MIN.replyAstro },
  ];
  const manual = rows.reduce((n, r) => n + r.manual, 0);
  const astro = rows.reduce((n, r) => n + r.astro, 0);
  return { rows, manual, astro, saved: manual - astro };
}

/** Minutes saved for one occurrence of a task, for a litter or vet visit of a given size. */
export function savedFor(task: TaskKey, opts: { puppies?: number; families?: number; records?: number; litters?: number } = {}) {
  const { puppies = 1, families = 1, records = 1, litters = 1 } = opts;
  switch (task) {
    case 'weigh':
      return puppies * MIN.weighPerPuppy - litters * MIN.weighAstroPerSession;
    case 'update':
      return families * (MIN.update - MIN.updateAstro);
    case 'records':
      return records * (MIN.record - MIN.recordAstro);
    case 'litterPost':
      return litters * (MIN.litterPostBase + MIN.litterPostPerFamily * (families / litters) - MIN.litterPostAstro);
    case 'reply':
      return families * (MIN.reply - MIN.replyAstro);
  }
}

/** "3.4 hrs" for an hour or more, otherwise "45 min". */
export function fmtMinutes(m: number) {
  if (m >= 60) {
    const h = m / 60;
    const n = h >= 10 ? String(Math.round(h)) : h.toFixed(1).replace(/\.0$/, '');
    return `${n} ${n === '1' ? 'hr' : 'hrs'}`;
  }
  return `${Math.max(1, Math.round(m))} min`;
}
