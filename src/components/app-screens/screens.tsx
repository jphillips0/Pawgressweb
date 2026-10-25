'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { IMG, KENNEL, LITTER, OAKLEY_WEIGHTS, PETS, pet } from './demoData';
import {
  AstroAvatar, AstroButton, C, Card, CollarDot, Glass, GlassCircle, Glyph, KennelMark, NavHeader, Paw, PawgressWordmark, Photo,
  PET_TABS, TabBar, Phone,
  IconCake, IconChatBubble, IconCheck, IconChevronRight, IconDoc, IconGallery, IconGear,
  IconImagePlus, IconLock, IconMail, IconMedkit, IconPencil, IconPin, IconPlus, IconScale,
  IconShare, IconStar, IconTrend, Sparkle, IconChevronLeft, IconCamera, IconMic, IconDraft, IconReply,
} from './kit';

type ScreenProps = { width?: number; className?: string };

/* ------------------------------------------------------------------ */
/*  Pet overview (Oakley)                                               */
/* ------------------------------------------------------------------ */

export function PetOverviewScreen({ width, className }: ScreenProps) {
  const oakley = pet('oakley');
  const tiles: { label: string; value: string; bg: string; fg: string; icon: ReactNode }[] = [
    { label: 'AGE', value: LITTER.age, bg: '#F6E7CF', fg: '#E6A33A', icon: <IconCake className="w-7 h-7" /> },
    { label: 'GENDER', value: 'Male', bg: '#CFE0FB', fg: '#3D7BE0', icon: <span style={{ fontSize: 30, fontWeight: 700 }}>♂</span> },
    { label: 'WEIGHT', value: `${oakley.weight} lbs`, bg: '#D3EBDD', fg: '#3FA66B', icon: <IconScale className="w-7 h-7" /> },
    { label: 'RECORDS', value: '3', bg: '#E3D7F3', fg: '#9B5BD6', icon: <IconMedkit className="w-7 h-7" /> },
  ];
  return (
    <Phone width={width} className={className} label="Oakley's pet profile in the Pawgress app">
      <NavHeader title="Oakley" right={<><AstroButton /><GlassCircle><IconPencil className="w-5 h-5" /></GlassCircle></>} />
      <div className="mt-2">{PET_TABS(0)}</div>
      <div className="relative flex flex-col items-center mt-6">
        <div className="rounded-full p-[5px]" style={{ background: C.blue, boxShadow: '0 14px 30px -12px rgba(74,141,240,0.7)' }}>
          <Photo src={oakley.img} className="rounded-full border-4 border-white" style={{ width: 196, height: 196 }} />
        </div>
        <GlassCircle size={44} className="absolute right-5 top-[86px]"><IconChevronRight className="w-5 h-5" /></GlassCircle>
        <div className="mt-4" style={{ fontSize: 38, fontWeight: 800, letterSpacing: -0.8 }}>Oakley</div>
        <div style={{ fontSize: 18, color: C.muted, marginTop: -2 }}>{LITTER.breed}</div>
        <div className="flex gap-2 mt-3">
          <span className="rounded-2xl px-4 py-1.5" style={{ background: '#CFE0FB', color: C.blue, fontWeight: 700, fontSize: 16 }}>Dog</span>
          <span className="rounded-2xl px-4 py-1.5" style={{ background: '#D3EBDD', color: C.green, fontWeight: 700, fontSize: 16 }}>Reserved · Riveras</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 mt-5">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-[22px] flex items-center gap-2.5 px-3.5" style={{ background: t.bg, height: 92 }}>
            <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.45)', color: t.fg }}>{t.icon}</div>
            <div className="whitespace-nowrap">
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, color: C.muted }}>{t.label}</div>
              <div style={{ fontSize: 21, fontWeight: 800 }}>{t.value}</div>
            </div>
          </div>
        ))}
        <div className="col-span-2 rounded-[22px] flex items-center gap-3 px-4" style={{ background: '#F4D2D2', height: 92 }}>
          <div className="w-[54px] h-[54px] rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.45)' }}>
            <CollarDot collar="red" size={30} ring={false} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, color: C.muted }}>COLLAR</div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>Red</div>
          </div>
        </div>
      </div>
    </Phone>
  );
}

/* ------------------------------------------------------------------ */
/*  Weight (Oakley) with a self-drawing growth chart                    */
/* ------------------------------------------------------------------ */

export function WeightScreen({ width, className }: ScreenProps) {
  const W = 320, H = 190, max = 8;
  const pts = OAKLEY_WEIGHTS.map((w, i) => [16 + (i * (W - 32)) / (OAKLEY_WEIGHTS.length - 1), H - 10 - (w / max) * (H - 30)] as const);
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const area = `${line} L${pts[pts.length - 1][0]},${H - 10} L${pts[0][0]},${H - 10} Z`;
  return (
    <Phone width={width} className={className} label="Oakley's weight tracker with a growth chart">
      <NavHeader title="Oakley" right={<><AstroButton /><GlassCircle><IconPencil className="w-5 h-5" /></GlassCircle></>} />
      <div className="mt-2">{PET_TABS(1)}</div>
      <Card className="mx-4 mt-4 p-5">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: C.blueSoft, color: C.blue }}><IconScale className="w-7 h-7" /></div>
          <div className="flex-1">
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, color: C.blue }}>WEIGHT</div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>Oakley</div>
          </div>
          <div className="rounded-full px-4 py-2.5 flex items-center gap-1.5" style={{ background: C.blue, color: '#fff', fontWeight: 700, fontSize: 17 }}>
            <IconPlus className="w-4 h-4" /> Log weight
          </div>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span style={{ fontSize: 76, fontWeight: 900, letterSpacing: -3 }}>6.4</span>
          <span style={{ fontSize: 26, fontWeight: 700, color: C.muted }}>lbs</span>
        </div>
        <div className="flex items-center gap-2.5 whitespace-nowrap">
          <span className="rounded-full px-3 py-1 flex items-center gap-1.5" style={{ background: C.blueSoft, color: C.blue, fontWeight: 800, fontSize: 16 }}>
            <IconTrend className="w-4 h-4" /> +0.9 lbs
          </span>
          <span style={{ fontSize: 15, color: C.muted }}>Weighed Oct 24 · 7 wks old</span>
        </div>
      </Card>
      <Card className="mx-4 mt-3 p-5">
        <div style={{ fontSize: 22, fontWeight: 800 }}>Growth</div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full mt-2" style={{ height: 190 }}>
          <defs>
            <linearGradient id="wfill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#4A8DF0" stopOpacity=".28" />
              <stop offset="1" stopColor="#4A8DF0" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 2, 4, 6, 8].map((v) => {
            const y = H - 10 - (v / max) * (H - 30);
            return <line key={v} x1="0" x2={W} y1={y} y2={y} stroke="rgba(43,22,96,0.07)" />;
          })}
          <motion.path d={area} fill="url(#wfill)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.9, duration: 0.8 }} />
          <motion.path
            d={line} fill="none" stroke="#4A8DF0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
          {pts.map(([x, y], i) => (
            <motion.circle
              key={i} cx={x} cy={y} r={i === pts.length - 1 ? 8 : 6} fill="#fff" stroke="#7FB2F5" strokeWidth="3.5"
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.18, type: 'spring', stiffness: 300, damping: 15 }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            />
          ))}
        </svg>
        <div className="text-center" style={{ fontSize: 14, color: C.muted }}>Drag along the curve to read each weigh-in · lbs</div>
      </Card>
      <div className="grid grid-cols-3 gap-2.5 mx-4 mt-3">
        {[
          { v: '+5.5', u: 'lbs', l: 'Total gain', i: <IconTrend className="w-5 h-5" /> },
          { v: '+0.8', u: 'lbs', l: 'Per week', i: <IconCake className="w-5 h-5" /> },
          { v: '8', u: '', l: 'Weigh-ins', i: <IconScale className="w-5 h-5" /> },
        ].map((s) => (
          <Card key={s.l} className="p-4">
            <div style={{ color: C.blue }}>{s.i}</div>
            <div className="mt-2" style={{ fontSize: 24, fontWeight: 900 }}>{s.v} <span style={{ fontSize: 15, color: C.muted, fontWeight: 700 }}>{s.u}</span></div>
            <div style={{ fontSize: 14, color: C.muted, fontWeight: 600 }}>{s.l}</div>
          </Card>
        ))}
      </div>
    </Phone>
  );
}

/* ------------------------------------------------------------------ */
/*  Medical (Murphy)                                                    */
/* ------------------------------------------------------------------ */

export function MedicalScreen({ width, className }: ScreenProps) {
  const glance = [
    ['SPAY / NEUTER', 'Intact', ''],
    ['MICROCHIP', 'AKC Reunite', '956 000 0143 2217'],
    ['VET', 'Loudoun Animal Hosp.', '(703) 555-0142'],
    ['INSURANCE', 'Trupanion', 'Trial · 30 days'],
    ['BLOOD TYPE', 'DEA 1.1 −', ''],
    ['DIET', 'Pro Plan Puppy', '3 meals a day'],
  ];
  return (
    <Phone width={width} className={className} label="Murphy's health records with vaccines and a health-at-a-glance card">
      <NavHeader title="Murphy" right={<><AstroButton /><GlassCircle><IconPencil className="w-5 h-5" /></GlassCircle></>} />
      <div className="mt-2">{PET_TABS(2)}</div>
      <div className="flex items-center gap-2 px-5 mt-5">
        <div className="flex-1 whitespace-nowrap">
          <div style={{ fontSize: 23, fontWeight: 800, letterSpacing: -0.4 }}>Health records</div>
          <div style={{ fontSize: 15, color: C.muted }}>4 records</div>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: C.blueSoft, color: C.blue }}><IconShare className="w-5 h-5" /></div>
        <div className="rounded-full px-3 py-2 flex items-center gap-1" style={{ background: C.blueSoft, color: C.blue, fontWeight: 700, fontSize: 15 }}><IconDoc className="w-4 h-4" />Scan</div>
        <div className="rounded-full px-3.5 py-2 flex items-center gap-1" style={{ background: C.blue, color: '#fff', fontWeight: 700, fontSize: 15 }}><IconPlus className="w-4 h-4" />Add</div>
      </div>
      <Card className="mx-4 mt-4 p-5">
        <div className="flex items-center justify-between">
          <div style={{ fontSize: 20, fontWeight: 800 }}>Health at a glance</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.blue }}>Edit</div>
        </div>
        <div className="flex items-center gap-2 mt-1.5 pb-3 border-b" style={{ borderColor: C.line, fontSize: 16, fontWeight: 600 }}>
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#E8A23A' }} /> 1 vaccine due soon
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-3">
          {glance.map(([k, v, sub]) => (
            <div key={k}>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.2, color: C.muted }}>{k}</div>
              <div style={{ fontSize: 17, fontWeight: 600 }}>{v}</div>
              {sub && <div style={{ fontSize: 13, color: k === 'VET' ? C.blue : C.muted }}>{sub}</div>}
            </div>
          ))}
        </div>
      </Card>
      <Card className="mx-4 mt-3 p-5">
        <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.5, color: C.muted }}>COMING UP</div>
        {[
          ['DHPP #3', 'Due in 9 days'],
          ['Deworming (Pyrantel)', 'Due in 12 days'],
        ].map(([n, d]) => (
          <div key={n} className="flex items-center justify-between mt-3" style={{ fontSize: 18 }}>
            <span className="flex items-center gap-2.5 font-semibold"><span className="w-2.5 h-2.5 rounded-full" style={{ background: '#E8A23A' }} />{n}</span>
            <span style={{ color: '#C7811F', fontWeight: 700, fontSize: 16 }}>{d}</span>
          </div>
        ))}
      </Card>
      <div className="flex gap-2 px-4 mt-4">
        {['All 4', 'Vaccination 2', 'Vet Visit 1', 'Deworming 1'].map((t, i) => (
          <span key={t} className="rounded-full px-4 py-2 whitespace-nowrap" style={{ background: i ? '#fff' : C.blue, color: i ? C.ink : '#fff', fontWeight: 700, fontSize: 15 }}>{t}</span>
        ))}
      </div>
      <div className="px-5 mt-4" style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.5, color: C.muted }}>OCTOBER 2026</div>
      <Card className="mx-4 mt-2 p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: C.blueSoft, color: C.blue }}><IconMedkit className="w-6 h-6" /></div>
        <div className="flex-1">
          <div style={{ fontSize: 19, fontWeight: 800 }}>DHPP #2 · Vaccination</div>
          <div className="flex items-center gap-1.5" style={{ fontSize: 14, color: C.muted }}>
            <AstroAvatar size={18} className="border-0" /> Filed by Astro from a vet card
          </div>
        </div>
      </Card>
    </Phone>
  );
}

/** Medical and Weight screens overlapped, for health sections. */
export function HealthPair() {
  return (
    <div className="flex justify-center pt-2 pb-6">
      <div className="flex items-start scale-[0.82] sm:scale-100 origin-top -mb-24 sm:mb-0">
        <motion.div initial={{ rotate: -4 }} whileHover={{ rotate: 0, y: -6 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }}>
          <MedicalScreen width={240} />
        </motion.div>
        <motion.div className="-ml-16 mt-16 relative z-10" initial={{ rotate: 3 }} whileHover={{ rotate: 0, y: -6 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }}>
          <WeightScreen width={240} />
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Breeder home                                                        */
/* ------------------------------------------------------------------ */

const CONVERSATIONS = [
  { id: 'oakley', last: 'Dana: He’s getting so big!! 😍', time: '2m' },
  { id: 'pumpkin', last: 'Priya: When is pickup again?', time: '1h' },
  { id: 'murphy', last: 'You: Vet visit went great today', time: '3h' },
  { id: 'maple', last: 'You: Here’s her first bath 🛁', time: '1d' },
];

/** White circle header button with a hairline border, as on the app's home screens. */
function HomeButton({ children }: { children: ReactNode }) {
  return (
    <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center border" style={{ borderColor: 'rgba(0,0,0,0.12)', boxShadow: '0 4px 12px -6px rgba(0,0,0,0.18)' }}>
      {children}
    </div>
  );
}

export function BreederHomeScreen({ width, className }: ScreenProps) {
  const waiting = PETS.filter((p) => p.status === 'Available');
  return (
    <Phone width={width} className={className} bg="white" label="Breeder home screen with family conversations and a weigh-in reminder">
      <div className="flex items-center justify-between px-6 pt-3">
        <PawgressWordmark height={46} />
        <div className="flex gap-2">
          <HomeButton><Glyph name="search" size={24} /></HomeButton>
          <AstroButton size={50} />
          <HomeButton><Glyph name="chats" size={26} /></HomeButton>
        </div>
      </div>
      <div className="flex items-center gap-4 px-6 mt-4">
        <KennelMark size={64} />
        <div>
          <div style={{ fontSize: 19, color: C.muted, fontWeight: 600 }}>Good morning</div>
          <div style={{ fontSize: 31, fontWeight: 900, letterSpacing: -0.6, lineHeight: 1.05 }}>Willow Creek</div>
        </div>
      </div>
      <div className="relative mx-5 mt-4 rounded-[26px] p-3.5 flex items-center gap-3" style={{ background: '#E8F3EC' }}>
        <Photo src={IMG.litter} className="w-[58px] h-[58px] rounded-2xl" />
        <div className="flex-1">
          <div style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.2 }}>Weigh the Summer 2026 Litter</div>
          <div style={{ fontSize: 14, color: C.green, fontWeight: 600, lineHeight: 1.3 }}>6 puppies, last weighed 3 days ago</div>
        </div>
        <div className="rounded-full px-5 py-2.5" style={{ background: C.blue, color: '#fff', fontWeight: 800, fontSize: 17 }}>Weigh</div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)', color: C.muted, fontSize: 18 }}>×</div>
      </div>
      <div className="flex items-center justify-between px-6 mt-5">
        <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: -0.5 }}>Conversations</div>
        <div className="rounded-full p-1 flex whitespace-nowrap" style={{ background: '#F0F0F6', fontSize: 15, fontWeight: 700 }}>
          <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">Current 4</span>
          <span className="px-3 py-1.5" style={{ color: C.muted }}>Adopted 12</span>
        </div>
      </div>
      <div className="px-5 mt-3 space-y-2.5">
        {CONVERSATIONS.slice(0, 2).map((c) => {
          const p = pet(c.id);
          return (
            <div key={c.id} className="rounded-[24px] flex items-center gap-3.5 p-3.5" style={{ background: '#F2F2F7' }}>
              <div className="relative shrink-0">
                <Photo src={p.img} className="w-[64px] h-[64px] rounded-full" />
                <Photo src={p.buyerImg!} className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: 20, fontWeight: 800 }}>{p.name}</span>
                  <span style={{ fontSize: 15, color: C.muted }}>{c.time}</span>
                </div>
                <div style={{ fontSize: 15, color: C.muted }}>Reserved by {p.buyer}</div>
                <div className="truncate" style={{ fontSize: 15, color: C.muted }}>{c.last}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mx-5 mt-2.5 rounded-[24px] p-4" style={{ background: '#F2F2F7' }}>
        <div className="flex items-center gap-2" style={{ fontSize: 19, fontWeight: 800 }}>
          <IconMail className="w-5 h-5" style={{ color: C.blue }} /> Waiting for a buyer · {waiting.length}
        </div>
        <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.35, marginTop: 2 }}>Tap one to share its invite code. Their chat appears above once they join.</div>
        <div className="flex gap-5 mt-3">
          {waiting.map((p) => (
            <div key={p.id} className="flex flex-col items-center">
              <div className="relative rounded-full p-[3px] border-2 border-dashed" style={{ borderColor: '#A9C9FA' }}>
                <Photo src={p.img} className="w-[56px] h-[56px] rounded-full" />
                <span className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white" style={{ background: C.blue }}>
                  <IconShare className="w-3.5 h-3.5 text-white" />
                </span>
              </div>
              <span className="mt-1" style={{ fontSize: 15, fontWeight: 800 }}>{p.name}</span>
            </div>
          ))}
        </div>
      </div>
      <TabBar active={0} />
    </Phone>
  );
}

/* ------------------------------------------------------------------ */
/*  Pet profiles (litter grouping)                                      */
/* ------------------------------------------------------------------ */

export function PetProfilesScreen({ width, className }: ScreenProps) {
  const reserved = PETS.filter((p) => p.status === 'Reserved');
  return (
    <Phone width={width} className={className} bg="white" label="Pet profiles grouped under the Summer 2026 Litter">
      <div className="flex items-start justify-between px-5 pt-4">
        <div className="flex items-start gap-3">
          <Glyph name="paw" size={34} color="#3B82F6" className="mt-1.5" />
          <div>
            <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: -0.7, lineHeight: 1.1 }}>Pet Profiles</div>
            <div style={{ fontSize: 16, color: C.muted }}>6 profiles · 1 litter</div>
          </div>
        </div>
        <div className="flex gap-2">
          <HomeButton><IconPlus className="w-6 h-6" /></HomeButton>
          <HomeButton><Glyph name="search" size={22} /></HomeButton>
        </div>
      </div>
      <div className="mx-4 mt-4 rounded-[26px] p-1.5 flex" style={{ background: '#F0F0F6' }}>
        {[['4', 'Reserved'], ['2', 'Available'], ['12', 'Adopted']].map(([n, l], i) => (
          <div key={l} className="flex-1 rounded-[22px] py-2 text-center" style={{ background: i ? 'transparent' : '#fff', boxShadow: i ? undefined : '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: i ? C.muted : C.blue }}>{n}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: i ? C.muted : C.ink }}>{l}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 px-5 mt-5">
        <Photo src={IMG.litter} className="w-[52px] h-[52px] rounded-2xl" />
        <div className="flex-1 whitespace-nowrap">
          <div style={{ fontSize: 19, fontWeight: 800 }}>{LITTER.name}</div>
          <div style={{ fontSize: 15, color: C.muted }}>Pickup from {LITTER.pickup}</div>
        </div>
        <div className="w-[96px] whitespace-nowrap">
          <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ background: C.blue }} initial={{ width: 0 }} whileInView={{ width: '66%' }} viewport={{ once: true }} transition={{ duration: 1.1, ease: 'easeOut' }} />
          </div>
          <div className="text-right mt-1" style={{ fontSize: 14, fontWeight: 700, color: C.muted }}>4 of 6 reserved</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 mt-4">
        {reserved.map((p) => (
          <div key={p.id} className="relative rounded-[24px] overflow-hidden" style={{ height: 228 }}>
            <Photo src={p.img} className="absolute inset-0" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,0.65))' }} />
            <span className="absolute top-3 right-3"><CollarDot collar={p.collar} size={18} /></span>
            <div className="absolute left-4 bottom-12 text-white">
              <div style={{ fontSize: 22, fontWeight: 800 }}>{p.name}</div>
              <div style={{ fontSize: 14, opacity: 0.9 }}>{LITTER.age} old</div>
            </div>
            <div className="absolute inset-x-5 bottom-3.5 flex justify-between items-center">
              <Glyph name="card-scale" size={22} color="#fff" />
              <Glyph name="card-heart" size={24} color="#fff" />
              <Glyph name="card-chats" size={25} color="#fff" />
            </div>
          </div>
        ))}
      </div>
      <TabBar active={1} />
    </Phone>
  );
}

/* ------------------------------------------------------------------ */
/*  Post update                                                         */
/* ------------------------------------------------------------------ */

export function PostUpdateScreen({ width, className }: ScreenProps) {
  const reserved = PETS.filter((p) => p.status === 'Reserved');
  return (
    <Phone width={width} className={className} bg="white" label="Posting one update to every family in a litter">
      <div className="flex items-center justify-between px-5 pt-3 pb-3 border-b" style={{ borderColor: C.line }}>
        <GlassCircle size={46}><IconChevronLeft className="w-5 h-5" /></GlassCircle>
        <div style={{ fontSize: 22, fontWeight: 800 }}>Post Update</div>
        <div className="rounded-full px-5 py-2.5" style={{ background: C.blue, color: '#fff', fontWeight: 800, fontSize: 18 }}>Post</div>
      </div>
      <div className="mx-4 mt-3 rounded-[24px] border p-4" style={{ borderColor: C.line, background: '#FAFAFC' }}>
        <div style={{ fontSize: 17, lineHeight: 1.45 }}>
          First bath day! 🛁 Everyone was so brave. Oakley fell asleep in the towel and Pumpkin tried to drink the bathwater. Car rides start this weekend!
        </div>
        <div className="flex gap-2.5 mt-3">
          <Photo src={IMG.bath} className="w-[104px] h-[104px] rounded-2xl" />
          <div className="relative">
            <Photo src={IMG.yard} className="w-[104px] h-[104px] rounded-2xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center"><svg viewBox="0 0 24 24" className="w-5 h-5 ml-0.5" fill="#111"><path d="M7 4.5v15l12-7.5-12-7.5Z" /></svg></div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 pt-3 border-t" style={{ borderColor: C.line, color: C.blue, fontWeight: 700, fontSize: 17 }}>
          <IconImagePlus className="w-6 h-6" /> Add Media
        </div>
      </div>
      <div className="px-5 mt-4">
        <div style={{ fontSize: 20, fontWeight: 800 }}>Litters</div>
        <div style={{ fontSize: 15, color: C.muted }}>Tap one to pick all its pets</div>
        <span className="inline-block mt-2 rounded-full px-4 py-2" style={{ background: C.blue, color: '#fff', fontWeight: 800, fontSize: 17 }}>{LITTER.name}</span>
      </div>
      <div className="px-5 mt-4 flex items-end justify-between">
        <div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>Select Pets</div>
          <div style={{ fontSize: 15, color: C.muted }}>Choose who gets this update</div>
        </div>
        <span className="rounded-full border px-3.5 py-1.5" style={{ borderColor: C.line, color: C.blue, fontWeight: 700, fontSize: 15 }}>Select All</span>
      </div>
      <div className="flex items-center gap-1.5 px-5 mt-3" style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.6, color: C.muted }}>
        <IconLock className="w-3.5 h-3.5" /> RESERVED
      </div>
      <div className="flex justify-between px-4 mt-2">
        {reserved.map((p, i) => (
          <motion.div key={p.id} className="flex flex-col items-center" initial={{ scale: 0.6, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 * i, type: 'spring', stiffness: 260, damping: 16 }}>
            <div className="relative rounded-full p-[3px]" style={{ background: C.blue }}>
              <Photo src={p.img} className="w-[70px] h-[70px] rounded-full border-2 border-white" />
              <span className="absolute -top-0.5 -right-0.5"><CollarDot collar={p.collar} size={18} /></span>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white" style={{ background: C.blue }}>
                <IconCheck className="w-3.5 h-3.5 text-white" />
              </span>
            </div>
            <span className="mt-2 rounded-full px-3 py-0.5" style={{ background: C.blue, color: '#fff', fontWeight: 700, fontSize: 14 }}>{p.name}</span>
          </motion.div>
        ))}
      </div>
      <Glass className="absolute left-4 right-4 bottom-8 rounded-[24px] p-4 flex items-center gap-3" style={{ boxShadow: '0 16px 40px -14px rgba(43,22,96,0.35)' }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: C.blue, color: '#fff' }}><Paw className="w-6 h-6" /></div>
        <div>
          <div style={{ fontSize: 19, fontWeight: 800 }}>4 pets selected</div>
          <div style={{ fontSize: 14.5, color: C.muted, lineHeight: 1.35 }}>Send to 4 buyer chats, the litter feed and 4 pet timelines.</div>
        </div>
      </Glass>
    </Phone>
  );
}

/* ------------------------------------------------------------------ */
/*  Buyer home                                                          */
/* ------------------------------------------------------------------ */

export function BuyerHomeScreen({ width, className }: ScreenProps) {
  return (
    <Phone width={width} className={className} bg="white" label="A buyer's home screen following Oakley with a pickup countdown">
      <div className="flex items-center justify-between px-6 pt-4">
        <PawgressWordmark height={46} />
        <div className="flex gap-2.5">
          <AstroButton size={50} />
          <HomeButton><Glyph name="bell" size={24} /></HomeButton>
        </div>
      </div>
      <div className="flex items-start gap-4 px-5 mt-4">
        <div className="flex flex-col items-center">
          <div className="rounded-full p-[3px]" style={{ background: C.blue }}><Photo src={IMG.oakley} className="w-[70px] h-[70px] rounded-full border-2 border-white" /></div>
          <span className="mt-1" style={{ fontSize: 15, fontWeight: 800 }}>Oakley</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-[76px] h-[76px] rounded-full border-2 border-dashed flex items-center justify-center" style={{ borderColor: C.faint, color: C.muted }}><IconPlus className="w-6 h-6" /></div>
          <span className="mt-1" style={{ fontSize: 15, color: C.muted }}>Add pet</span>
        </div>
      </div>
      <div className="relative mx-4 mt-4 rounded-[30px] overflow-hidden" style={{ height: 290 }}>
        <Photo src={IMG.oakley} className="absolute inset-0" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0) 45%,rgba(0,0,0,0.6))' }} />
        <div className="absolute top-4 right-4 rounded-2xl bg-white/85 backdrop-blur px-3.5 py-2 text-center">
          <div style={{ fontSize: 26, fontWeight: 900, lineHeight: 1, color: C.blue }}>6</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: C.muted, letterSpacing: 0.5 }}>DAYS TO GO</div>
        </div>
        <div className="absolute left-5 bottom-5 text-white">
          <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: -0.8, lineHeight: 1 }}>Oakley</div>
          <div style={{ fontSize: 17, opacity: 0.9 }}>7 weeks old · {KENNEL.name}</div>
          <span className="inline-flex items-center gap-1.5 mt-2 rounded-xl px-3 py-1 bg-white/25 backdrop-blur" style={{ fontSize: 15, fontWeight: 700 }}>📅 Pickup Sat, Oct 31</span>
        </div>
      </div>
      <div className="mx-4 mt-3 rounded-[24px] p-3.5 flex items-center gap-3" style={{ background: '#F4F4F9' }}>
        <KennelMark size={52} />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between"><span style={{ fontSize: 18, fontWeight: 800 }}>{KENNEL.short}</span><span style={{ fontSize: 14, color: C.muted }}>2h</span></div>
          <div className="truncate" style={{ fontSize: 15, color: C.muted }}>First bath day! 🛁 Oakley fell asleep in the towel</div>
        </div>
      </div>
      <div className="flex justify-around mt-4">
        {[
          { l: 'Timeline', i: <IconGallery className="w-7 h-7" /> },
          { l: 'Weight', i: <IconScale className="w-7 h-7" /> },
          { l: 'Ask Astro', i: <Sparkle className="w-7 h-7" /> },
        ].map((s) => (
          <div key={s.l} className="flex flex-col items-center gap-1.5">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: '#F0F0F6', color: C.blue }}>{s.i}</div>
            <span style={{ fontSize: 16, fontWeight: 700 }}>{s.l}</span>
          </div>
        ))}
      </div>
      <TabBar active={0} variant="buyer" avatar={IMG.homeBuyer} />
    </Phone>
  );
}

/* ------------------------------------------------------------------ */
/*  Breeder public profile                                              */
/* ------------------------------------------------------------------ */

export function BreederProfileScreen({ width, className }: ScreenProps) {
  const available = PETS.filter((p) => p.status === 'Available');
  return (
    <Phone width={width} className={className} label="Willow Creek Doodles public breeder profile">
      <div className="flex items-center justify-between px-5 pt-3">
        <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: -1 }}>Profile</div>
        <div className="flex gap-2">
          <GlassCircle size={46}><IconPlus className="w-5 h-5" /></GlassCircle>
          <GlassCircle size={46}><IconShare className="w-5 h-5" /></GlassCircle>
          <GlassCircle size={46}><IconGear className="w-5 h-5" /></GlassCircle>
        </div>
      </div>
      <div className="flex items-center gap-4 px-5 mt-4">
        <div className="rounded-full p-1 bg-white shadow-md"><KennelMark size={104} /></div>
        <div>
          <div style={{ fontSize: 25, fontWeight: 900, letterSpacing: -0.4, lineHeight: 1.1 }}>{KENNEL.name}</div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="rounded-full px-2.5 py-1 flex items-center gap-1" style={{ background: C.blueSoft, color: C.blueDeep, fontWeight: 800, fontSize: 14 }}><Paw className="w-3.5 h-3.5" />Breeder</span>
            <span className="flex items-center gap-1" style={{ color: C.muted, fontSize: 15 }}><IconPin className="w-4 h-4" />{KENNEL.location}</span>
          </div>
          <div style={{ color: C.muted, fontSize: 15, marginTop: 4 }}>{KENNEL.tagline}</div>
        </div>
      </div>
      <div className="px-5 mt-3" style={{ fontSize: 16.5, lineHeight: 1.45 }}>{KENNEL.bio}</div>
      <Card className="mx-4 mt-4 py-3 flex">
        {[['2', 'Available'], ['48', 'Favorited'], ['4.9', 'Rating']].map(([n, l], i) => (
          <div key={l} className={`flex-1 text-center ${i ? 'border-l' : ''}`} style={{ borderColor: C.line }}>
            <span style={{ fontSize: 22, fontWeight: 900 }}>{n}</span>{' '}
            {i === 2 && <IconStar className="inline w-4 h-4 -mt-1" style={{ color: '#F5A524' }} />}{' '}
            <span style={{ fontSize: 15, color: C.muted }}>{l}</span>
          </div>
        ))}
      </Card>
      <div className="mx-4 mt-3 rounded-full py-3.5 text-center flex items-center justify-center gap-2" style={{ background: C.blue, color: '#fff', fontWeight: 800, fontSize: 18 }}>
        <IconMail className="w-5 h-5" /> Message breeder
      </div>
      <div className="flex border-b mt-5 px-5" style={{ borderColor: C.line }}>
        {['Available Pets', 'Feed', 'Litters'].map((t, i) => (
          <div key={t} className="flex-1 pb-3 text-center relative" style={{ fontSize: 18, fontWeight: 700, color: i ? C.muted : C.blue }}>
            {t}
            {i === 0 && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full" style={{ background: C.blue }} />}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 mt-4">
        {available.map((p) => (
          <div key={p.id}>
            <div className="relative">
              <Photo src={p.img} className="w-full rounded-[22px]" style={{ height: 200 }} />
              <span className="absolute top-3 right-3"><CollarDot collar={p.collar} size={16} /></span>
            </div>
            <div className="text-center mt-1.5" style={{ fontSize: 17, fontWeight: 700 }}>{p.name} · {p.sex}</div>
          </div>
        ))}
      </div>
    </Phone>
  );
}

/* ------------------------------------------------------------------ */
/*  Family chat (breeder side) with Astro's chat buttons                */
/* ------------------------------------------------------------------ */

/** Pet chat as it looks in the app: floating name pill, Astro bar, messages scrolling under the header. */
export function FamilyChatFrame({ children, composer, astroBar, petId = 'pumpkin' }: { children: ReactNode; composer: ReactNode; astroBar?: ReactNode; petId?: string }) {
  const p = pet(petId);
  return (
    <>
      {/* Messages scroll underneath the floating header */}
      <div className="absolute inset-x-0 top-0 flex flex-col" style={{ bottom: 0 }}>
        <div
          className="flex-1 min-h-0 flex flex-col justify-end gap-2 px-4 pb-3 overflow-hidden"
          style={{ maskImage: 'linear-gradient(180deg,transparent 0,transparent 110px,#000 190px)', WebkitMaskImage: 'linear-gradient(180deg,transparent 0,transparent 110px,#000 190px)' }}
        >
          {children}
        </div>
        <div className="px-4 pt-1" style={{ paddingBottom: 30 }}>{composer}</div>
      </div>

      <div className="relative z-20 flex items-center justify-between px-5 pt-3">
        <GlassCircle size={52}><IconChevronLeft className="w-6 h-6" /></GlassCircle>
        <Glass className="rounded-full flex items-center gap-2.5 pl-2 pr-6 py-1.5">
          <Photo src={p.img} className="w-11 h-11 rounded-full" />
          <div className="leading-tight">
            <div style={{ fontSize: 23, fontWeight: 900, letterSpacing: -0.3 }}>{p.name}</div>
            <div style={{ fontSize: 15, color: C.muted, fontWeight: 600 }}>{p.contact} {FAMILY_SURNAME[p.id]}</div>
          </div>
        </Glass>
        <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center border border-white/80" style={{ background: 'linear-gradient(180deg,#A9C9FA,#7FAEF5)', boxShadow: '0 6px 16px -8px rgba(74,141,240,0.7)' }}>
          <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: 1.5, color: '#111', marginTop: -6 }}>···</span>
        </div>
      </div>
      <div className="relative z-20 flex justify-center mt-3 px-4">{astroBar ?? <AstroChatBar />}</div>
    </>
  );
}

const FAMILY_SURNAME: Record<string, string> = { oakley: 'Rivera', pumpkin: 'Patel', murphy: 'Okafor', maple: 'Lee' };

/** The Astro pill under a family chat header. `pressed` highlights Suggest reply; `busy` shows Astro writing. */
export function AstroChatBar({ pressed = false, busy = false }: { pressed?: boolean; busy?: boolean }) {
  return (
    <Glass className="rounded-full flex items-center pl-1.5 pr-1.5 py-1.5 gap-0.5 whitespace-nowrap" style={{ boxShadow: '0 10px 30px -14px rgba(43,22,96,0.35)' }}>
      <AstroAvatar size={38} />
      <div className="flex items-center gap-1.5 px-2.5 py-1.5" style={{ fontSize: 16.5, fontWeight: 700, color: '#111' }}>
        <IconDraft className="w-6 h-6" style={{ color: C.blue }} /> Draft update
      </div>
      <span className="w-px h-6" style={{ background: C.line }} />
      <motion.div
        className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full overflow-hidden"
        animate={{ backgroundColor: pressed || busy ? 'rgba(74,141,240,0.16)' : 'rgba(74,141,240,0)', scale: pressed ? [1, 0.92, 1] : 1 }}
        transition={{ duration: 0.35 }}
        style={{ fontSize: 16.5, fontWeight: 700, color: '#111' }}
      >
        {busy && (
          <motion.span
            className="absolute inset-y-0 w-16"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.9),transparent)' }}
            initial={{ x: -80 }} animate={{ x: 200 }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        <IconReply className="w-6 h-6 relative" style={{ color: C.blue }} />
        <span className="relative">{busy ? 'Writing…' : 'Suggest reply'}</span>
      </motion.div>
    </Glass>
  );
}

export function DatePill({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center my-1.5">
      <span className="rounded-full px-4 py-1" style={{ background: '#F1F1F5', color: C.muted, fontSize: 15, fontWeight: 600 }}>{children}</span>
    </div>
  );
}

function Ticks() {
  return (
    <div className="flex justify-end pr-1 -mt-0.5">
      <svg viewBox="0 0 24 14" className="w-6 h-[14px]" fill="none" stroke={C.blue} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="m1.5 7.5 4 4L13 3" /><path d="m9 11.5 1 0L19.5 2" />
      </svg>
    </div>
  );
}

/** A chat message. Breeder (`me`) messages are blue on the right; family messages are grey on the left. */
export function ChatMsg({ from, children, read = false }: { from: 'me' | 'them'; children: ReactNode; read?: boolean }) {
  const me = from === 'me';
  return (
    <div>
      <div className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
        <div className="max-w-[78%] px-5 py-3 rounded-[28px]" style={{ background: me ? C.blue : '#F1F1F5', color: me ? '#fff' : '#111', fontSize: 18, lineHeight: 1.35 }}>
          {children}
        </div>
      </div>
      {me && read && <Ticks />}
    </div>
  );
}

export function ChatMedia({ src, video = false, read = true, height = 200 }: { src: string; video?: boolean; read?: boolean; height?: number }) {
  return (
    <div>
      <div className="flex justify-end">
        <div className="relative rounded-[28px] overflow-hidden" style={{ width: 252, height }}>
          <Photo src={src} className="absolute inset-0" />
          {video && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" className="w-6 h-6 ml-1" fill="#111"><path d="M6 4v16l14-8L6 4Z" /></svg>
              </div>
            </div>
          )}
        </div>
      </div>
      {read && <Ticks />}
    </div>
  );
}

/** The pet chat composer: add button, message field, send arrow (blue once there's text). */
export function ChatComposer({ text, caret = false, glow = false, sendPressed = false }: { text?: string; caret?: boolean; glow?: boolean; sendPressed?: boolean }) {
  const ready = !!text;
  return (
    <div className="flex items-end gap-2.5">
      <GlassCircle size={52}><IconPlus className="w-6 h-6" /></GlassCircle>
      <div
        className="flex-1 rounded-[26px] border px-5 py-3 bg-white transition-shadow"
        style={{ minHeight: 52, borderColor: glow ? 'rgba(74,141,240,0.6)' : '#E4E4EC', color: '#111', fontSize: 18, lineHeight: 1.35, boxShadow: glow ? '0 0 0 3px rgba(74,141,240,0.18), 0 10px 26px -12px rgba(74,141,240,0.6)' : undefined }}
      >
        {text ? (
          <span>{text}{caret && <span className="inline-block w-[2px] h-[19px] align-middle ml-0.5 animate-pulse" style={{ background: C.blue }} />}</span>
        ) : (
          <span style={{ color: '#9A96AA' }}>Send a message</span>
        )}
      </div>
      <motion.div
        className="w-[52px] h-[52px] rounded-full flex items-center justify-center border shrink-0"
        animate={{ backgroundColor: ready ? C.blue : '#FFFFFF', borderColor: ready ? C.blue : '#E4E4EC', scale: sendPressed ? [1, 0.85, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={ready ? '#fff' : '#9A96AA'} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" /></svg>
      </motion.div>
    </div>
  );
}

/** Messages shared by the static chat screen and the Suggest reply demo. */
export function PumpkinChatHistory() {
  return (
    <>
      <DatePill>October 22</DatePill>
      <ChatMsg from="me" read>Hi Priya! Pumpkin had her first vet visit today and got a perfect report. She’s up to 5.8 lbs 🎉</ChatMsg>
      <ChatMedia src={IMG.chatToy} />
      <DatePill>Yesterday</DatePill>
      <ChatMedia src={IMG.chatVideo} video height={180} />
      <DatePill>Today</DatePill>
      <ChatMsg from="them">She’s getting so big!! 🥹</ChatMsg>
      <ChatMsg from="them">When is pickup again, and what food should we have ready?</ChatMsg>
    </>
  );
}

export function Bubble({ from, children, time }: { from: 'me' | 'them'; children: ReactNode; time?: string }) {
  const me = from === 'me';
  return (
    <div className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] px-4 py-2.5 ${me ? 'rounded-[22px] rounded-br-md' : 'rounded-[22px] rounded-bl-md'}`}
        style={{ background: me ? C.blue : '#fff', color: me ? '#fff' : C.ink, fontSize: 16.5, lineHeight: 1.4, boxShadow: me ? undefined : '0 4px 14px -8px rgba(43,22,96,0.25)' }}
      >
        {children}
        {time && <div className="text-right mt-0.5" style={{ fontSize: 11.5, opacity: 0.6 }}>{time}</div>}
      </div>
    </div>
  );
}

export function Composer({ text, placeholder = 'Message', caret = false, highlight = false }: { text?: string; placeholder?: string; caret?: boolean; highlight?: boolean }) {
  return (
    <div className="flex items-end gap-2">
      <GlassCircle size={50}><IconCamera className="w-6 h-6" /></GlassCircle>
      <Glass
        className="flex-1 rounded-[26px] px-4 py-3 transition-shadow"
        style={{ minHeight: 50, fontSize: 16.5, lineHeight: 1.4, boxShadow: highlight ? '0 0 0 3px rgba(74,141,240,0.45), 0 10px 26px -10px rgba(74,141,240,0.6)' : undefined }}
      >
        {text ? (
          <span>{text}{caret && <span className="inline-block w-[2px] h-[18px] align-middle ml-0.5 animate-pulse" style={{ background: C.blue }} />}</span>
        ) : (
          <span style={{ color: C.faint }}>{placeholder}{caret && <span className="inline-block w-[2px] h-[18px] align-middle ml-0.5 animate-pulse" style={{ background: C.blue }} />}</span>
        )}
      </Glass>
      <GlassCircle size={50}><IconMic className="w-6 h-6" /></GlassCircle>
    </div>
  );
}

export function FamilyChatScreen({ width, className }: ScreenProps) {
  return (
    <Phone width={width} className={className} bg="white" label="A breeder's chat with a family about their reserved puppy">
      <FamilyChatFrame composer={<ChatComposer />}>
        <PumpkinChatHistory />
      </FamilyChatFrame>
    </Phone>
  );
}

/* ------------------------------------------------------------------ */
/*  Astro intro (empty state)                                           */
/* ------------------------------------------------------------------ */

export function AstroHeader({ sub, chips, active = 0 }: { sub: string; chips: { label: string; img?: string }[]; active?: number }) {
  return (
    <>
      <div className="flex items-center justify-between px-5 pt-3">
        <GlassCircle size={50}><IconChevronLeft className="w-5 h-5" /></GlassCircle>
        <Glass className="rounded-[26px] px-6 py-1.5 text-center" style={{ minWidth: 220 }}>
          <div className="flex items-center justify-center gap-2" style={{ fontSize: 24, fontWeight: 900 }}>
            <AstroAvatar size={30} className="border-0" /> Astro
          </div>
          <div style={{ fontSize: 14, color: C.muted, marginTop: -2 }}>{sub}</div>
        </Glass>
        <GlassCircle size={50}><span style={{ fontSize: 20, fontWeight: 900, letterSpacing: 1 }}>···</span></GlassCircle>
      </div>
      <div className="flex gap-2 px-4 mt-3 overflow-hidden">
        {chips.map((c, i) => (
          <div
            key={c.label}
            className="rounded-full flex items-center gap-2 pr-4 shrink-0"
            style={{
              paddingLeft: c.img ? 5 : 14, height: 48,
              background: i === active ? C.blue : '#fff',
              color: i === active ? '#fff' : C.ink,
              fontWeight: 800, fontSize: 17,
              boxShadow: '0 4px 12px -6px rgba(43,22,96,0.25)',
            }}
          >
            {c.img ? <Photo src={c.img} className="w-[38px] h-[38px] rounded-full" /> : <Sparkle className="w-4 h-4" />}
            {c.label}
          </div>
        ))}
      </div>
    </>
  );
}

export const BREEDER_CHIPS = [{ label: 'Kennel' }, { label: 'Oakley', img: IMG.oakley }, { label: 'Pumpkin', img: IMG.pumpkin }, { label: 'Murphy', img: IMG.murphy }];
export const BUYER_CHIPS = [{ label: 'General' }, { label: 'Oakley', img: IMG.oakley }];

export function AstroIntro({ title, body, stats }: { title: string; body: string; stats: { v: string; l: string; i: ReactNode }[] }) {
  return (
    <div className="flex flex-col items-center px-4">
      <motion.img
        src={IMG.astroJetpack} alt="" draggable={false}
        className="w-[220px] mt-2 drop-shadow-xl"
        animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Card className="w-full p-5 text-center mt-1">
        <div style={{ fontSize: 23, fontWeight: 900, lineHeight: 1.2 }}>{title}</div>
        <div className="mt-2" style={{ fontSize: 15.5, color: C.muted, lineHeight: 1.4 }}>{body}</div>
      </Card>
      <Card className="w-full p-4 mt-3">
        <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.4, color: C.muted }}>WHAT ASTRO KNOWS</div>
        <div className="grid grid-cols-3 gap-2 mt-2.5">
          {stats.map((s) => (
            <div key={s.l} className="rounded-2xl p-3" style={{ background: C.blueSoft }}>
              <div style={{ color: C.blue }}>{s.i}</div>
              <div style={{ fontSize: 20, fontWeight: 900 }}>{s.v}</div>
              <div style={{ fontSize: 13, color: C.muted }}>{s.l}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function AstroIntroScreen({ width, className, variant = 'breeder' }: ScreenProps & { variant?: 'breeder' | 'buyer' }) {
  const breeder = variant === 'breeder';
  return (
    <Phone width={width} className={className} label="Astro, the Pawgress AI kennel assistant">
      <AstroHeader sub={breeder ? 'Your kennel assistant' : 'Talking about Oakley'} chips={breeder ? BREEDER_CHIPS : BUYER_CHIPS} active={breeder ? 0 : 1} />
      <AstroIntro
        title={breeder ? 'What can I take off your plate?' : 'What would you like to know about Oakley?'}
        body={breeder
          ? 'I know every pet, weight and record in your kennel. I draft updates, log weights and file vet paperwork. You review and tap Send.'
          : "I know Oakley's profile, weights and health records, so my answers fit. I can also file vet paperwork and log weights."}
        stats={breeder
          ? [{ v: '6', l: 'Puppies', i: <Paw className="w-5 h-5" /> }, { v: '4', l: 'Families', i: <IconChatBubble className="w-5 h-5" /> }, { v: '19', l: 'Records', i: <IconMedkit className="w-5 h-5" /> }]
          : [{ v: '7w', l: 'Age', i: <IconCake className="w-5 h-5" /> }, { v: '6.4 lb', l: '8 weigh-ins', i: <IconScale className="w-5 h-5" /> }, { v: '3', l: 'Records', i: <IconMedkit className="w-5 h-5" /> }]}
      />
      <div className="absolute inset-x-0 bottom-0 px-4" style={{ paddingBottom: 30 }}>
        <Composer placeholder={breeder ? 'Ask Astro anything…' : 'Ask about Oakley…'} />
      </div>
    </Phone>
  );
}
