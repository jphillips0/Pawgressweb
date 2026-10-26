'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { IMG, PETS } from './demoData';
import { fmtMinutes, savedFor } from '../astro/timeModel';
import { AstroAvatar, C, Card, CollarDot, Glass, phoneSize, IconCake, IconChatBubble, IconCheck, IconDoc, IconMedkit, IconScale, Paw, Phone, Photo, Sparkle } from './kit';
import { AstroChatBar, AstroHeader, AstroIntro, BREEDER_CHIPS, BUYER_CHIPS, Bubble, ChatComposer, ChatMsg, Composer, FamilyChatFrame, PumpkinChatHistory } from './screens';

/* ------------------------------------------------------------------ */
/*  Scene catalogue                                                     */
/* ------------------------------------------------------------------ */

export type SceneId =
  | 'draft' | 'weigh' | 'records' | 'litter' | 'reply'
  | 'b-weight' | 'b-records' | 'b-ask' | 'b-draft';

type CardState = { chars: number; pressed: boolean };

type AstroScene = {
  kind: 'astro';
  audience: 'breeder' | 'buyer';
  sub: string;
  chip: number;
  prompt: string;
  attachment?: string;
  steps: string[];
  reply: string;
  body?: string;
  card?: (s: CardState) => ReactNode;
  toast?: string;
  footnote?: string;
};

type FamilyScene = { kind: 'family'; audience: 'breeder'; suggestion: string; toast: string };

export type SceneMeta = {
  title: string;
  ask: string;
  manual: string[];
  /** Minutes saved by this exact demo (from the shared time model). */
  saved: number;
  /** How the saving grows with bigger or more litters (breeder tasks only). */
  scale?: string;
};

const r = (m: number) => Math.round(m);

export const SCENE_META: Record<SceneId, SceneMeta> = {
  draft: {
    title: 'Family updates, written for you',
    ask: '“Draft an update for the Riveras about Oakley’s week.”',
    manual: ['Dig through the camera roll for Oakley', 'Look up his latest weights', 'Write the message from scratch', 'Send it, then post it to his timeline'],
    saved: r(savedFor('update')),
    scale: `Weekly updates for a litter of 10: about ${fmtMinutes(savedFor('update', { families: 10 }))} saved. Two litters: ${fmtMinutes(savedFor('update', { families: 20 }))}.`,
  },
  weigh: {
    title: 'A whole litter weighed in one photo',
    ask: 'Snap the weigh sheet: “Weighed the litter this morning.”',
    manual: ['Open each puppy’s profile', 'Tap Log weight six times', 'Type every weight and date', 'Double-check which collar is which'],
    saved: r(savedFor('weigh', { puppies: 6 })),
    scale: `A litter of 10: about ${fmtMinutes(savedFor('weigh', { puppies: 10 }))} saved every weigh-in. Two litters of 10: ${fmtMinutes(savedFor('weigh', { puppies: 20, litters: 2 }))}.`,
  },
  records: {
    title: 'Vet paperwork, filed from a photo',
    ask: 'Snap the vaccine card: “Murphy’s vet visit today, file this.”',
    manual: ['Type each vaccine name and date', 'Work out when the next dose is due', 'Update the vet on his health profile', 'Attach the paperwork'],
    saved: r(savedFor('records', { records: 3 })),
    scale: `A vet visit for a litter of 10 (about 20 records): ${fmtMinutes(savedFor('records', { records: 20 }))} saved. Two litters: ${fmtMinutes(savedFor('records', { records: 40 }))}.`,
  },
  litter: {
    title: 'One litter post, personal for every family',
    ask: '“Post a litter update about first bath day. Use today’s photos.”',
    manual: ['Write the update', 'Rewrite it with each puppy’s name', 'Send it in four separate chats', 'Post it again to the litter feed'],
    saved: r(savedFor('litterPost', { families: 4 })),
    scale: `A litter of 10 families: about ${fmtMinutes(savedFor('litterPost', { families: 10 }))} saved per post. Two litters: ${fmtMinutes(savedFor('litterPost', { families: 20, litters: 2 }))}.`,
  },
  reply: {
    title: 'Replies that already know the answer',
    ask: 'Tap Suggest reply under the family’s chat.',
    manual: ['Look up the pickup schedule', 'Check what she’s eating', 'Type out the answer'],
    saved: Math.ceil(savedFor('reply')),
    scale: `About 3 questions a week from each of 10 families: ${fmtMinutes(savedFor('reply', { families: 30 }))} saved a week.`,
  },
  'b-weight': {
    title: 'Log a weight by saying it',
    ask: '“Oakley weighed 9.2 lbs at the vet today.”',
    manual: ['Open Oakley’s profile', 'Go to Weight, tap Log weight', 'Enter the weight, date and note'],
    saved: 2,
  },
  'b-records': {
    title: 'Shot records, filed from a photo',
    ask: 'Snap the vet paperwork: “Here’s Oakley’s shot record.”',
    manual: ['Type each vaccine and date', 'Figure out when the next one is due', 'Attach the paperwork'],
    saved: 5,
  },
  'b-ask': {
    title: 'Answers that know your puppy',
    ask: '“Is it normal that Oakley sleeps so much?”',
    manual: ['Search forums with generic answers', 'Guess what applies to your puppy’s age'],
    saved: 3,
  },
  'b-draft': {
    title: 'Updates for your breeder, drafted',
    ask: '“Draft a thank-you to Willow Creek with Oakley’s latest photos.”',
    manual: ['Pick the photos', 'Write the message', 'Send it'],
    saved: 4,
  },
};

const LITTER_FAMILIES = PETS.filter((p) => p.status === 'Reserved');

const BODY = {
  draft: 'Hi Dana! Big week for Oakley 🐾 He’s up to 6.4 lbs (+0.9 since last week), had his first bath and fell asleep in the towel, and he’s started coming when we call. Pickup is Saturday, Oct 31. Six more sleeps!',
  buyerDraft: 'Hi! Oakley has settled in so well. He’s 9.2 lbs now, sleeps through the night and already knows sit. Thank you for raising such a sweet boy 🧡',
};

const LITTER_TEXT = (name: string, puppy: string) =>
  `Hi ${name}! First bath day 🛁 ${puppy} was so brave, and the whole gang napped in a towel pile afterwards. Car rides start this weekend!`;

const SCENES: Record<SceneId, AstroScene | FamilyScene> = {
  draft: {
    kind: 'astro', audience: 'breeder', sub: 'Talking about Oakley', chip: 1,
    prompt: 'Draft an update for the Riveras about Oakley’s week',
    steps: ['Reading Oakley’s timeline', 'Checking 3 new weigh-ins', 'Picking this week’s best photos'],
    reply: 'Here’s a draft for Dana. Change anything you like, then send it.',
    body: BODY.draft,
    card: (s) => (
      <ActionCard icon={<IconChatBubble className="w-6 h-6" />} title="Message for the Rivera family" sub="Update · about Oakley" primary="Send to Dana" done="Sent" pressed={s.pressed}>
        <StreamBox text={BODY.draft} chars={s.chars} />
        <PhotoRow srcs={[IMG.bath, IMG.oakley]} show={s.chars > 40} />
      </ActionCard>
    ),
    toast: 'Sent to Dana · added to Oakley’s timeline',
  },
  weigh: {
    kind: 'astro', audience: 'breeder', sub: 'Your kennel assistant', chip: 0,
    prompt: 'Weighed the litter this morning',
    attachment: IMG.weighSheet,
    steps: ['Reading your weigh sheet', 'Matching 6 collar colours to puppies', 'Comparing with Monday’s weights'],
    reply: 'Got all six, and everyone’s gaining. Murphy’s leading the pack.',
    card: (s) => (
      <ActionCard icon={<IconScale className="w-6 h-6" />} title="Log 6 weigh-ins" sub="Summer 2026 Litter · Today" primary="Confirm all" done="Logged" pressed={s.pressed}>
        <div className="space-y-1">
          {PETS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 * i }}
              className="flex items-center gap-2.5 rounded-xl px-2.5 py-1.5" style={{ background: i % 2 ? 'transparent' : 'rgba(74,141,240,0.06)' }}
            >
              <CollarDot collar={p.collar} size={13} ring={false} />
              <span className="flex-1" style={{ fontSize: 16, fontWeight: 700 }}>{p.name}</span>
              <span style={{ fontSize: 16, fontWeight: 800 }}>{p.weight.toFixed(1)} lbs</span>
              <span className="w-14 text-right" style={{ fontSize: 14, fontWeight: 700, color: C.green }}>+{(p.weight - p.lastWeight).toFixed(1)}</span>
            </motion.div>
          ))}
        </div>
      </ActionCard>
    ),
    toast: '6 weigh-ins logged · charts updated',
  },
  records: {
    kind: 'astro', audience: 'breeder', sub: 'Talking about Murphy', chip: 3,
    prompt: 'Murphy’s vet visit today, file this',
    attachment: IMG.vetCard,
    steps: ['Reading the vaccine card', 'Finding vaccines, dates and lot numbers', 'Checking Murphy’s health profile'],
    reply: 'I found two vaccines and a new vet. Here’s what I’ll file:',
    card: (s) => (
      <ActionCard icon={<IconMedkit className="w-6 h-6" />} title="File 3 updates for Murphy" sub="From your photo · kept with the records" primary="Save records" done="Filed" pressed={s.pressed}>
        <RecordRows rows={[
          ['DHPP #2', 'Vaccination · Oct 24', 'Next due Nov 14'],
          ['Bordetella', 'Vaccination · Oct 24', 'Lot 4471B'],
          ['Vet', 'Loudoun Animal Hospital', 'Added to health profile'],
        ]} />
      </ActionCard>
    ),
    toast: 'Filed to Murphy’s medical tab',
  },
  litter: {
    kind: 'astro', audience: 'breeder', sub: 'Your kennel assistant', chip: 0,
    prompt: 'Post a litter update about first bath day. Use today’s photos',
    steps: ['Finding today’s photos of 4 reserved puppies', 'Matching photos by collar colour', 'Personalising it for 4 families'],
    reply: 'Here’s the litter post. Each family’s copy uses their puppy’s name.',
    body: LITTER_TEXT('Dana', 'Oakley'),
    card: (s) => (
      <ActionCard icon={<Paw className="w-6 h-6" />} title="Litter update" sub="4 family chats · litter feed · 4 timelines" primary="Post to 4 families" done="Posted" pressed={s.pressed}>
        <LitterBody chars={s.chars} />
        <PhotoRow srcs={[IMG.bath, IMG.yard, IMG.litter]} show={s.chars > 30} />
      </ActionCard>
    ),
    toast: 'Posted to 4 chats, the litter feed and 4 timelines',
  },
  reply: {
    kind: 'family', audience: 'breeder',
    suggestion: 'Pickup is Saturday, Oct 31, any time 10–2! Pumpkin eats Purina Pro Plan Puppy, three meals a day. I’ll send a starter bag home with her 🧡',
    toast: 'Sent to Priya',
  },
  'b-weight': {
    kind: 'astro', audience: 'buyer', sub: 'Talking about Oakley', chip: 1,
    prompt: 'Oakley weighed 9.2 lbs at the vet today',
    steps: ['Checking Oakley’s last weigh-in'],
    reply: 'Nice gain! That’s +2.8 lbs in three weeks.',
    card: (s) => (
      <ActionCard icon={<IconScale className="w-6 h-6" />} title="Log a weigh-in" sub="For Oakley" primary="Confirm" done="Logged" pressed={s.pressed}>
        <KeyVals rows={[['Weight', '9.2 lbs'], ['Date', 'Today'], ['Note', 'Weighed at the vet']]} />
      </ActionCard>
    ),
    toast: 'Logged · Oakley’s chart updated',
  },
  'b-records': {
    kind: 'astro', audience: 'buyer', sub: 'Talking about Oakley', chip: 1,
    prompt: 'Here’s Oakley’s shot record from today',
    attachment: IMG.vetCard,
    steps: ['Reading the vaccine card', 'Finding vaccines and due dates'],
    reply: 'Got it. I also noted when his next shot is due.',
    card: (s) => (
      <ActionCard icon={<IconMedkit className="w-6 h-6" />} title="File 2 records for Oakley" sub="From your photo" primary="Save records" done="Filed" pressed={s.pressed}>
        <RecordRows rows={[
          ['DHPP #3', 'Vaccination · Nov 14', 'Next due Dec 5'],
          ['Deworming', 'Pyrantel · Nov 14', 'Next due Dec 12'],
        ]} />
      </ActionCard>
    ),
    toast: 'Filed to Oakley’s medical tab',
  },
  'b-ask': {
    kind: 'astro', audience: 'buyer', sub: 'Talking about Oakley', chip: 1,
    prompt: 'Is it normal that Oakley sleeps so much?',
    steps: ['Looking at Oakley’s age and weight trend'],
    reply: 'Totally normal. At 10 weeks, puppies like Oakley sleep 18–20 hours a day. He’s gaining about 0.9 lbs a week, and sleep fuels that growth. Give him a quiet crate spot and short play sessions. If he suddenly seems lethargic or stops eating, call your vet.',
    footnote: 'Astro is an AI, not a vet. For anything urgent, call your veterinarian.',
  },
  'b-draft': {
    kind: 'astro', audience: 'buyer', sub: 'Talking about Oakley', chip: 1,
    prompt: 'Draft a thank-you to Willow Creek with Oakley’s latest photos',
    steps: ['Reading Oakley’s timeline', 'Picking the 2 newest photos'],
    reply: 'Here’s a draft. Change anything you like, then send it.',
    body: BODY.buyerDraft,
    card: (s) => (
      <ActionCard icon={<IconChatBubble className="w-6 h-6" />} title="Message for Willow Creek" sub="Update · about Oakley" primary="Send to Willow Creek" done="Sent" pressed={s.pressed}>
        <StreamBox text={BODY.buyerDraft} chars={s.chars} />
        <PhotoRow srcs={[IMG.homeBuyer, IMG.oakley]} show={s.chars > 40} />
      </ActionCard>
    ),
    toast: 'Sent to Willow Creek',
  },
};

function streamLength(scene: AstroScene) {
  return scene.body?.length ?? 60;
}

/* ------------------------------------------------------------------ */
/*  Card building blocks                                                */
/* ------------------------------------------------------------------ */

function ActionCard({ icon, title, sub, children, primary, done, pressed }: { icon: ReactNode; title: string; sub: string; children: ReactNode; primary: string; done: string; pressed: boolean }) {
  return (
    <Card className="p-4" style={{ border: '1.5px solid #CFE0FB', background: 'rgba(255,255,255,0.95)' }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: C.blueSoft, color: C.blue }}>{icon}</div>
        <div className="min-w-0">
          <div className="truncate" style={{ fontSize: 19, fontWeight: 800 }}>{title}</div>
          <div className="truncate" style={{ fontSize: 14.5, color: C.muted }}>{sub}</div>
        </div>
      </div>
      {children}
      <div className="flex gap-2.5 mt-3.5">
        <div className="rounded-full border px-5 flex items-center justify-center" style={{ height: 50, borderColor: C.line, color: C.muted, fontWeight: 700, fontSize: 17 }}>Cancel</div>
        <motion.div
          className="relative flex-1 rounded-full flex items-center justify-center gap-2 overflow-hidden"
          animate={{ background: pressed ? '#2E9D5B' : C.blue, scale: pressed ? [1, 0.94, 1] : 1 }}
          transition={{ duration: 0.4 }}
          style={{ height: 50, color: '#fff', fontWeight: 800, fontSize: 17 }}
        >
          {pressed && (
            <motion.span className="absolute rounded-full bg-white/50" initial={{ width: 0, height: 0, opacity: 0.8 }} animate={{ width: 340, height: 340, opacity: 0 }} transition={{ duration: 0.7 }} />
          )}
          {pressed ? <><IconCheck className="w-5 h-5" />{done}</> : <><SendGlyph />{primary}</>}
        </motion.div>
      </div>
    </Card>
  );
}

function SendGlyph() {
  return <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M3.4 3.2 21 12 3.4 20.8a.6.6 0 0 1-.8-.8L5.6 12 2.6 4a.6.6 0 0 1 .8-.8Z" /></svg>;
}

function StreamBox({ text, chars }: { text: string; chars: number }) {
  return (
    <div className="rounded-2xl border px-3.5 py-3" style={{ borderColor: C.line, fontSize: 16, lineHeight: 1.45, minHeight: 120 }}>
      {text.slice(0, chars)}
      {chars < text.length && <span className="inline-block w-[2px] h-[17px] align-middle ml-0.5" style={{ background: C.blue }} />}
    </div>
  );
}

function PhotoRow({ srcs, show }: { srcs: string[]; show: boolean }) {
  return (
    <div className="flex gap-2 mt-2.5" style={{ height: 78 }}>
      {srcs.map((s, i) => (
        <motion.div key={s} initial={{ opacity: 0, scale: 0.6, y: 10 }} animate={show ? { opacity: 1, scale: 1, y: 0 } : {}} transition={{ delay: i * 0.12, type: 'spring', stiffness: 300, damping: 18 }}>
          <Photo src={s} className="w-[78px] h-[78px] rounded-2xl" />
        </motion.div>
      ))}
    </div>
  );
}

function RecordRows({ rows }: { rows: string[][] }) {
  return (
    <div className="space-y-2">
      {rows.map(([a, b, c], i) => (
        <motion.div key={a} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 * i }} className="flex items-center gap-3 rounded-2xl px-3 py-2.5" style={{ background: 'rgba(74,141,240,0.07)' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white" style={{ color: C.blue }}>{a === 'Vet' ? <IconDoc className="w-5 h-5" /> : <IconMedkit className="w-5 h-5" />}</div>
          <div className="flex-1 min-w-0">
            <div style={{ fontSize: 16.5, fontWeight: 800 }}>{a}</div>
            <div className="truncate" style={{ fontSize: 14, color: C.muted }}>{b}</div>
          </div>
          <div className="text-right" style={{ fontSize: 13, fontWeight: 700, color: C.blueDeep, maxWidth: 110 }}>{c}</div>
        </motion.div>
      ))}
    </div>
  );
}

function KeyVals({ rows }: { rows: [string, string][] }) {
  return (
    <div className="border-t pt-2" style={{ borderColor: C.line }}>
      {rows.map(([k, v]) => (
        <div key={k} className="flex py-1.5" style={{ fontSize: 17 }}>
          <span className="w-24" style={{ color: C.muted }}>{k}</span>
          <span style={{ fontWeight: 800 }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

function LitterBody({ chars }: { chars: number }) {
  const [i, setI] = useState(0);
  const full = LITTER_TEXT('Dana', 'Oakley').length;
  const finished = chars >= full;
  useEffect(() => {
    if (!finished) return;
    const t = setInterval(() => setI((n) => (n + 1) % LITTER_FAMILIES.length), 1100);
    return () => clearInterval(t);
  }, [finished]);
  const p = LITTER_FAMILIES[finished ? i : 0];
  const text = LITTER_TEXT(p.contact!, p.name);
  const nameEnd = 3 + p.contact!.length;
  return (
    <div>
      <div className="flex gap-1.5 mb-2">
        {LITTER_FAMILIES.map((f, n) => (
          <span key={f.id} className="rounded-full pl-1 pr-2.5 py-0.5 flex items-center gap-1.5 transition-colors" style={{ background: n === (finished ? i : 0) ? C.blue : C.blueSoft, color: n === (finished ? i : 0) ? '#fff' : C.blueDeep, fontSize: 13, fontWeight: 800 }}>
            <Photo src={f.img} className="w-5 h-5 rounded-full" />{f.contact}
          </span>
        ))}
      </div>
      <div className="rounded-2xl border px-3.5 py-3" style={{ borderColor: C.line, fontSize: 16, lineHeight: 1.45, minHeight: 100 }}>
        {finished ? (
          <AnimatePresence mode="wait">
            <motion.span key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              {text.slice(0, 3)}<b style={{ color: C.blueDeep }}>{p.contact}</b>{text.slice(nameEnd, text.indexOf(p.name, nameEnd))}<b style={{ color: C.blueDeep }}>{p.name}</b>{text.slice(text.indexOf(p.name, nameEnd) + p.name.length)}
            </motion.span>
          </AnimatePresence>
        ) : (
          <>{text.slice(0, chars)}<span className="inline-block w-[2px] h-[17px] align-middle ml-0.5" style={{ background: C.blue }} /></>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sequencer                                                           */
/* ------------------------------------------------------------------ */

type Phase = 'intro' | 'typing' | 'sent' | 'working' | 'reply' | 'card' | 'pressed' | 'done';
const ORDER: Phase[] = ['intro', 'typing', 'sent', 'working', 'reply', 'card', 'pressed', 'done'];
const at = (p: Phase, q: Phase) => ORDER.indexOf(p) >= ORDER.indexOf(q);

function useSequence(playing: boolean, key: string, run: (wait: (ms: number) => Promise<void>) => Promise<void>) {
  useEffect(() => {
    if (!playing) return;
    let alive = true;
    const wait = (ms: number) => new Promise<void>((res, rej) => setTimeout(() => (alive ? res() : rej(new Error('stopped'))), ms));
    run(wait).catch(() => {});
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, key]);
}

type PlayerProps = { id: SceneId; playing: boolean; onDone?: () => void; width?: number; className?: string; skipIntro?: boolean };

/**
 * Cross-fades between scenes instead of snapping. `round` bumps replay the same scene.
 * Both phones share an identical frame, so only the screen content appears to dissolve.
 */
export function SceneStage({ id, round = 0, playing, onDone, width = 300, className = '' }: { id: SceneId; round?: number; playing: boolean; onDone?: () => void; width?: number; className?: string }) {
  const key = `${id}-${round}`;
  const current = useRef(key);
  useEffect(() => {
    current.current = key;
  }, [key]);
  return (
    <div className={`relative ${className}`} style={{ width, height: phoneSize(width).height }}>
      <AnimatePresence initial={false}>
        <motion.div
          key={key}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* An exiting scene keeps playing briefly; only the current one may advance the stage. */}
          <AstroScenePhone id={id} playing={playing} width={width} onDone={() => { if (current.current === key) onDone?.(); }} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** A phone that acts out one Astro task. Plays while `playing` is true and calls `onDone` when finished. */
export function AstroScenePhone(props: PlayerProps) {
  const scene = SCENES[props.id];
  return scene.kind === 'family' ? <FamilyReplyPlayer {...props} scene={scene} /> : <AstroChatPlayer {...props} scene={scene} />;
}

function AstroChatPlayer({ id, scene, playing, onDone, width, className, skipIntro }: PlayerProps & { scene: AstroScene }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('intro');
  const [typed, setTyped] = useState(0);
  const [step, setStep] = useState(0);
  const [chars, setChars] = useState(0);
  const total = streamLength(scene);

  useSequence(playing, id, async (wait) => {
    if (reduce) {
      setPhase('card'); setTyped(scene.prompt.length); setStep(scene.steps.length); setChars(total);
      await wait(7000);
      onDone?.();
      return;
    }
    setPhase('intro'); setTyped(0); setStep(0); setChars(0);
    await wait(skipIntro ? 300 : 1400);
    setPhase('typing');
    for (let i = 1; i <= scene.prompt.length; i++) {
      setTyped(i);
      await wait(scene.prompt[i - 1] === ' ' ? 45 : 28);
    }
    await wait(350);
    setPhase('sent');
    await wait(500);
    setPhase('working');
    for (let i = 1; i <= scene.steps.length; i++) {
      await wait(750);
      setStep(i);
    }
    await wait(450);
    setPhase('reply');
    await wait(scene.card ? 700 : 600);
    if (scene.card) {
      setPhase('card');
      for (let i = 0; i <= total; i += 3) {
        setChars(i);
        await wait(22);
      }
      setChars(total);
      await wait(1900);
      setPhase('pressed');
      await wait(900);
    }
    setPhase('done');
    await wait(scene.card ? 2600 : 5200);
    onDone?.();
  });

  const showIntro = phase === 'intro' || phase === 'typing';
  return (
    <Phone width={width} className={className} label={`Astro demo: ${SCENE_META[id].title}`}>
      <AstroHeader sub={scene.sub} chips={scene.audience === 'breeder' ? BREEDER_CHIPS : BUYER_CHIPS} active={scene.chip} />

      <div
        className="absolute inset-x-0 px-4 flex flex-col justify-end gap-2.5 overflow-hidden"
        style={{ top: 196, bottom: 112, maskImage: 'linear-gradient(180deg,transparent 0,#000 28px)', WebkitMaskImage: 'linear-gradient(180deg,transparent 0,#000 28px)' }}
      >
        <AnimatePresence mode="popLayout">
          {showIntro && (
            <motion.div key="intro" className="absolute inset-x-0 top-0" exit={{ opacity: 0, y: -40, scale: 0.95 }} transition={{ duration: 0.4 }}>
              <IntroFor audience={scene.audience} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {at(phase, 'sent') && (
            <motion.div key="me" layout initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 380, damping: 26 }} className="flex flex-col items-end gap-1.5" style={{ transformOrigin: 'bottom right' }}>
              {scene.attachment && <Photo src={scene.attachment} className="w-[150px] h-[150px] rounded-[20px] border-4 border-white shadow-md" />}
              <Bubble from="me">{scene.prompt}</Bubble>
            </motion.div>
          )}

          {at(phase, 'working') && (
            <motion.div key="work" layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-end gap-2">
              <AstroSlot show={!at(phase, 'reply')} />
              <Glass className="rounded-[20px] rounded-bl-md px-3.5 py-2.5" style={{ maxWidth: 300 }}>
                {at(phase, 'card') || (at(phase, 'reply') && !scene.card) ? (
                  <div className="flex items-center gap-2" style={{ fontSize: 14, color: C.muted, fontWeight: 700 }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#D3EBDD', color: C.green }}><IconCheck className="w-3 h-3" /></span>
                    {scene.steps.length} steps done
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {scene.steps.map((s, i) => (
                      <motion.div key={s} initial={{ opacity: 0, x: -6 }} animate={{ opacity: i <= step ? 1 : 0.35, x: 0 }} className="flex items-center gap-2" style={{ fontSize: 14.5, fontWeight: 600 }}>
                        {i < step ? (
                          <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: '#D3EBDD', color: C.green }}><IconCheck className="w-3 h-3" /></span>
                        ) : (
                          <span className="w-5 h-5 rounded-full border-[2.5px] border-t-transparent animate-spin shrink-0" style={{ borderColor: `${C.blue} ${C.blue} ${C.blue} transparent` }} />
                        )}
                        {s}
                      </motion.div>
                    ))}
                  </div>
                )}
              </Glass>
            </motion.div>
          )}

          {at(phase, 'reply') && (
            <motion.div key="reply" layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-end gap-2">
                <AstroSlot show={!(scene.card && at(phase, 'card'))} />
                <div className="rounded-[20px] rounded-bl-md bg-white px-4 py-2.5 max-w-[86%]" style={{ fontSize: 16.5, lineHeight: 1.4, boxShadow: '0 4px 14px -8px rgba(43,22,96,0.25)' }}>{scene.reply}</div>
              </div>
              {scene.footnote && <div className="text-center mt-3 px-2" style={{ fontSize: 13, color: C.muted }}>{scene.footnote}</div>}
            </motion.div>
          )}

          {scene.card && at(phase, 'card') && (
            <motion.div key="card" layout initial={{ opacity: 0, y: 60, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 22 }} className="flex items-end gap-2">
              <AstroSlot show />
              <div className="flex-1 min-w-0">{scene.card({ chars, pressed: at(phase, 'pressed') })}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-x-0 bottom-0 px-4" style={{ paddingBottom: 30 }}>
        {phase === 'typing' && scene.attachment && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="ml-[58px] mb-2">
            <Photo src={scene.attachment} className="w-16 h-16 rounded-xl border-2 border-white shadow" />
          </motion.div>
        )}
        <Composer
          text={phase === 'typing' ? scene.prompt.slice(0, typed) : undefined}
          placeholder={scene.audience === 'breeder' ? 'Ask Astro anything…' : 'Ask about Oakley…'}
          caret={phase === 'typing'}
          highlight={phase === 'typing'}
        />
      </div>

      <Toast show={phase === 'done' && !!scene.toast} text={scene.toast ?? ''} />
    </Phone>
  );
}

/** Avatar column for Astro's messages. Only the newest message in a run shows his face, like iMessage. */
function AstroSlot({ show }: { show: boolean }) {
  return (
    <div className="w-[34px] shrink-0">
      <AnimatePresence>
        {show && (
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
            <AstroAvatar size={34} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function IntroFor({ audience }: { audience: 'breeder' | 'buyer' }) {
  return audience === 'breeder' ? (
    <AstroIntro
      title="What can I take off your plate?"
      body="I know every pet, weight and record in your kennel. You review everything and tap Send."
      stats={[{ v: '6', l: 'Puppies', i: <Paw className="w-5 h-5" /> }, { v: '4', l: 'Families', i: <IconChatBubble className="w-5 h-5" /> }, { v: '19', l: 'Records', i: <IconMedkit className="w-5 h-5" /> }]}
    />
  ) : (
    <AstroIntro
      title="What would you like to know about Oakley?"
      body="I know Oakley’s profile, weights and health records, so my answers fit."
      stats={[{ v: '10w', l: 'Age', i: <IconCake className="w-5 h-5" /> }, { v: '9.2 lb', l: '11 weigh-ins', i: <IconScale className="w-5 h-5" /> }, { v: '5', l: 'Records', i: <IconMedkit className="w-5 h-5" /> }]}
    />
  );
}

function Toast({ show, text }: { show: boolean; text: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute left-1/2 z-40 flex items-center gap-2.5 rounded-full px-4 py-2.5 whitespace-nowrap"
          style={{ top: 62, x: '-50%', background: 'rgba(20,20,30,0.86)', color: '#fff', fontSize: 15, fontWeight: 700, backdropFilter: 'blur(12px)', boxShadow: '0 12px 30px -10px rgba(0,0,0,0.5)' }}
          initial={{ y: -50, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -40, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        >
          <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#34C759' }}><IconCheck className="w-3.5 h-3.5" /></span>
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Suggest reply inside a family chat                                  */
/* ------------------------------------------------------------------ */

type ReplyPhase = 'idle' | 'tap' | 'writing' | 'ready' | 'send' | 'sent';

function FamilyReplyPlayer({ id, scene, playing, onDone, width, className }: PlayerProps & { scene: FamilyScene }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<ReplyPhase>('idle');
  const [chars, setChars] = useState(0);
  const text = scene.suggestion;

  useSequence(playing, id, async (wait) => {
    if (reduce) {
      setPhase('ready'); setChars(text.length);
      await wait(7000);
      onDone?.();
      return;
    }
    setPhase('idle'); setChars(0);
    await wait(1600);
    setPhase('tap');
    await wait(700);
    setPhase('writing');
    await wait(900);
    for (let i = 0; i <= text.length; i += 2) {
      setChars(i);
      await wait(20);
    }
    setChars(text.length);
    setPhase('ready');
    await wait(1600);
    setPhase('send');
    await wait(450);
    setPhase('sent');
    await wait(3000);
    onDone?.();
  });

  const composerText = phase === 'sent' ? undefined : text.slice(0, chars) || undefined;
  return (
    <Phone width={width} className={className} bg="white" label={`Astro demo: ${SCENE_META[id].title}`}>
      <FamilyChatFrame
        astroBar={<AstroChatBar pressed={phase === 'tap'} busy={phase === 'writing'} />}
        composer={<ChatComposer text={composerText} caret={phase === 'writing'} glow={phase === 'writing' || phase === 'ready'} sendPressed={phase === 'send'} />}
      >
        <PumpkinChatHistory />
        <AnimatePresence>
          {phase === 'sent' && (
            <motion.div key="sent" layout initial={{ opacity: 0, y: 40, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 360, damping: 26 }} style={{ transformOrigin: 'bottom right' }}>
              <ChatMsg from="me" read>{text}</ChatMsg>
            </motion.div>
          )}
        </AnimatePresence>
      </FamilyChatFrame>

      {/* Fingertip tap on Suggest reply */}
      <AnimatePresence>
        {phase === 'tap' && (
          <motion.span
            className="absolute rounded-full z-40 pointer-events-none"
            style={{ left: 268, top: 136, width: 46, height: 46, background: 'rgba(74,141,240,0.3)', border: '2px solid rgba(74,141,240,0.8)' }}
            initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: [0.4, 1.1, 0.9], opacity: 1 }} exit={{ scale: 1.8, opacity: 0 }} transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {phase === 'writing' && (
          <motion.div
            className="absolute left-1/2 z-30 flex items-center gap-2 rounded-full px-3.5 py-2 whitespace-nowrap"
            style={{ top: 210, x: '-50%', background: C.blueSoft, color: C.blueDeep, fontSize: 14, fontWeight: 800 }}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          >
            <Sparkle className="w-4 h-4 animate-spin" style={{ animationDuration: '2.4s' }} /> Checking pickup date and Pumpkin’s diet
          </motion.div>
        )}
      </AnimatePresence>
      <Toast show={phase === 'sent'} text={scene.toast} />
    </Phone>
  );
}
