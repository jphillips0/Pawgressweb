'use client';

import type { CSSProperties, ReactNode } from 'react';
import { COLLAR_HEX, IMG, type Collar } from './demoData';

/* ------------------------------------------------------------------ */
/*  Tokens (sampled from the iOS app)                                   */
/* ------------------------------------------------------------------ */

export const C = {
  ink: '#2B1660',
  muted: '#8C84A6',
  faint: '#B9B3CC',
  blue: '#4A8DF0',
  blueDeep: '#2F74E6',
  blueSoft: '#E8F0FE',
  line: 'rgba(43,22,96,0.08)',
  card: 'rgba(255,255,255,0.86)',
  green: '#2E9D5B',
  red: '#D64545',
};

export const FONT: CSSProperties['fontFamily'] =
  'ui-rounded, "SF Pro Rounded", var(--font-nunito), var(--font-inter), system-ui, sans-serif';

const CANVAS_W = 390;
const CANVAS_H = 844;

/* ------------------------------------------------------------------ */
/*  Phone frame: renders a 390×844 iOS canvas scaled to `width`         */
/* ------------------------------------------------------------------ */

type PhoneProps = {
  width?: number;
  children: ReactNode;
  className?: string;
  time?: string;
  bg?: 'sky' | 'white';
  statusDark?: boolean;
  label?: string;
};

/** Outer pixel size of a Phone rendered at `width`. */
export function phoneSize(width: number) {
  const bezel = Math.max(6, Math.round(width * 0.034));
  const s = (width - bezel * 2) / CANVAS_W;
  return { bezel, s, height: Math.round(CANVAS_H * s + bezel * 2) };
}

export function Phone({ width = 280, children, className = '', time = '9:41', bg = 'sky', label }: PhoneProps) {
  const { bezel, s, height } = phoneSize(width);
  const radius = Math.round(width * 0.155);

  return (
    <div
      role="img"
      aria-label={label}
      className={`relative select-none ${className}`}
      style={{
        width,
        height,
        borderRadius: radius,
        padding: bezel,
        background: 'linear-gradient(145deg,#3a3d46 0%,#16171b 35%,#0b0b0d 65%,#2c2e35 100%)',
        boxShadow:
          '0 0 0 1px rgba(255,255,255,0.08) inset, 0 30px 60px -20px rgba(30,27,75,0.45), 0 18px 36px -18px rgba(30,27,75,0.35)',
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{ width: CANVAS_W * s, height: CANVAS_H * s, borderRadius: radius - bezel }}
      >
        <div
          style={{
            width: CANVAS_W,
            height: CANVAS_H,
            transform: `scale(${s})`,
            transformOrigin: 'top left',
            fontFamily: FONT,
            color: C.ink,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {bg === 'sky' ? <SkyBackground /> : <div className="absolute inset-0 bg-white" />}
          <StatusBar time={time} />
          <div className="absolute inset-0" style={{ paddingTop: 54 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkyBackground() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#D7E3FB 0%,#E6ECFB 38%,#EEF0FA 100%)' }} />
      <div className="absolute -top-10 -left-16 w-72 h-40 rounded-full bg-white/50 blur-2xl" />
      <div className="absolute top-64 -right-20 w-72 h-40 rounded-full bg-white/45 blur-2xl" />
      <div className="absolute bottom-24 -left-24 w-80 h-44 rounded-full bg-white/40 blur-2xl" />
      <Paw className="absolute top-24 left-20 w-14 h-14 opacity-[0.07] -rotate-12" />
      <Paw className="absolute top-[420px] right-6 w-12 h-12 opacity-[0.06] rotate-12" />
      <Sparkle className="absolute top-36 right-16 w-4 h-4 text-white" />
      <Sparkle className="absolute top-[520px] left-8 w-3 h-3 text-white" />
      <Sparkle className="absolute bottom-40 right-10 w-4 h-4 text-white" />
    </div>
  );
}

function StatusBar({ time }: { time: string }) {
  return (
    <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between" style={{ height: 54, padding: '0 34px 0 46px' }}>
      <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2, fontFamily: '-apple-system, system-ui, sans-serif', color: '#111' }}>{time}</span>
      <div className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black" style={{ top: 11, width: 124, height: 36 }} />
      <div className="flex items-center gap-[6px]">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="#111"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" opacity=".35" /></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="#111"><path d="M8 2.3c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .5C5.2.5 2.7 1.6.8 3.4L2 4.7a8.6 8.6 0 0 1 6-2.4Zm0 3.5c1.3 0 2.5.5 3.5 1.3l1.2-1.3A7 7 0 0 0 8 4c-1.8 0-3.4.7-4.7 1.8l1.2 1.3c1-.8 2.2-1.3 3.5-1.3Zm0 3.4c-.6 0-1.1.2-1.5.6L8 11.5l1.5-1.7c-.4-.4-.9-.6-1.5-.6Z" /></svg>
        <div className="relative flex items-center" style={{ width: 27, height: 13 }}>
          <div className="absolute inset-0 rounded-[4px] border border-black/40" />
          <div className="absolute rounded-[2px] bg-black" style={{ left: 2, top: 2, bottom: 2, width: 17 }} />
          <div className="absolute rounded-r-sm bg-black/40" style={{ right: -3, top: 4, width: 1.5, height: 5 }} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Primitives                                                          */
/* ------------------------------------------------------------------ */

export function Glass({ children, className = '', style }: { children?: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`border border-white/90 ${className}`}
      style={{
        background: 'linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.72))',
        boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 6px 18px -8px rgba(43,22,96,0.18)',
        backdropFilter: 'blur(14px)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function GlassCircle({ children, size = 50, className = '' }: { children: ReactNode; size?: number; className?: string }) {
  return (
    <Glass className={`rounded-full flex items-center justify-center shrink-0 ${className}`} style={{ width: size, height: size }}>
      {children}
    </Glass>
  );
}

export function Card({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`rounded-[26px] border border-white ${className}`}
      style={{ background: C.card, boxShadow: '0 8px 24px -14px rgba(43,22,96,0.22)', ...style }}
    >
      {children}
    </div>
  );
}

export function Photo({ src, className = '', style, alt = '' }: { src: string; className?: string; style?: CSSProperties; alt?: string }) {
  // Gradient underlay keeps the layout readable if an image is missing.
  return (
    <div className={`${/\babsolute\b/.test(className) ? '' : 'relative '}overflow-hidden bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 ${className}`} style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src} alt={alt} draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
        ref={(img) => {
          // The load error can fire before hydration attaches onError.
          if (img && img.complete && img.naturalWidth === 0) img.style.visibility = 'hidden';
        }}
        onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
      />
    </div>
  );
}

export function CollarDot({ collar, size = 14, ring = true }: { collar: Collar; size?: number; ring?: boolean }) {
  return (
    <span
      className="inline-block rounded-full shrink-0"
      style={{ width: size, height: size, background: COLLAR_HEX[collar], boxShadow: ring ? '0 0 0 2px #fff' : undefined }}
    />
  );
}

export function AstroAvatar({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      className={`rounded-full overflow-hidden shrink-0 border-2 border-white ${className}`}
      style={{ width: size, height: size, background: 'linear-gradient(160deg,#CFE3FF,#EAF2FF)', boxShadow: '0 4px 10px -4px rgba(43,22,96,0.3)' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMG.astroIcon} alt="" className="w-full h-full object-cover" draggable={false} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  App glyphs, extracted from real app screenshots into alpha masks    */
/*  (public/astro/ui) so they match the app exactly in any colour.      */
/* ------------------------------------------------------------------ */

export type GlyphName =
  | 'search' | 'astro' | 'chats' | 'home' | 'paw' | 'tools'
  | 'compass' | 'gallery' | 'chats-fill' | 'bell'
  | 'card-scale' | 'card-heart' | 'card-chats';

export function Glyph({ name, size = 28, color = '#111', className = '', style }: { name: GlyphName; size?: number; color?: string; className?: string; style?: CSSProperties }) {
  const url = `url(/astro/ui/${name}.png)`;
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 ${className}`}
      style={{
        width: size, height: size, background: color,
        WebkitMaskImage: url, maskImage: url,
        WebkitMaskSize: 'contain', maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center', maskPosition: 'center',
        ...style,
      }}
    />
  );
}

/** The Astro launcher button: a round Astro headshot. */
export function AstroButton({ size = 50 }: { size?: number }) {
  return (
    <div
      className="rounded-full overflow-hidden shrink-0 border-2 border-white"
      style={{ width: size, height: size, background: 'linear-gradient(160deg,#CFE3FF,#EAF2FF)', boxShadow: '0 4px 12px -5px rgba(43,22,96,0.35)' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMG.astroIcon} alt="Astro" className="w-full h-full object-cover" draggable={false} />
    </div>
  );
}

export function NavHeader({ title, right, sub, paw = true }: { title: string; right?: ReactNode; sub?: string; paw?: boolean }) {
  return (
    <div className="relative flex items-center justify-between px-5 pt-3" style={{ height: 76 }}>
      <GlassCircle>
        <IconChevronLeft className="w-[22px] h-[22px]" />
      </GlassCircle>
      <div className="absolute left-1/2 -translate-x-1/2 text-center" style={{ top: 10 }}>
        {paw && <PawTitleMark />}
        <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: -0.8, lineHeight: 1.05 }}>{title}</div>
        {sub && <div style={{ fontSize: 13, color: C.muted }}>{sub}</div>}
      </div>
      <div className="flex gap-2">{right}</div>
    </div>
  );
}

function PawTitleMark() {
  return (
    <div className="flex items-center justify-center gap-1 mb-0.5" style={{ color: C.blue }}>
      <span className="block w-2 h-[2px] rounded-full bg-current -rotate-[30deg]" />
      <Paw className="w-[14px] h-[14px]" />
      <span className="block w-2 h-[2px] rounded-full bg-current rotate-[30deg]" />
    </div>
  );
}

export function Segmented({ items, active }: { items: { label: string; icon: ReactNode }[]; active: number }) {
  return (
    <Glass className="mx-4 rounded-full flex items-center p-[6px]" style={{ height: 66 }}>
      {items.map((it, i) => (
        <div
          key={it.label}
          className="flex-1 h-full rounded-full flex items-center justify-center gap-2"
          style={{
            background: i === active ? C.blue : 'transparent',
            color: i === active ? '#fff' : C.muted,
            fontSize: 19,
            fontWeight: 700,
            boxShadow: i === active ? '0 6px 14px -6px rgba(74,141,240,0.8)' : undefined,
          }}
        >
          {it.icon}
          {it.label}
        </div>
      ))}
    </Glass>
  );
}

export const PET_TABS = (active: number) => (
  <Segmented
    active={active}
    items={[
      { label: 'Overview', icon: <Glyph name="paw" size={20} color="currentColor" /> },
      { label: 'Weight', icon: <Glyph name="card-scale" size={20} color="currentColor" /> },
      { label: 'Medical', icon: <Glyph name="card-heart" size={20} color="currentColor" /> },
    ]}
  />
);

const TAB_GLYPHS: Record<'breeder' | 'buyer', [GlyphName, number][]> = {
  breeder: [['home', 34], ['paw', 30], ['tools', 32], ['search', 29]],
  buyer: [['home', 32], ['compass', 28], ['gallery', 28], ['chats-fill', 32]],
};

/** Floating Liquid Glass tab bar, matching the app: active tab sits in a grey pill with a blue glyph. */
export function TabBar({ active, variant = 'breeder', avatar }: { active: number; variant?: 'breeder' | 'buyer'; avatar?: string }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 px-5" style={{ paddingBottom: 24 }}>
      <div
        className="rounded-full flex items-center px-1.5 border"
        style={{ height: 76, borderColor: 'rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.86)', backdropFilter: 'blur(16px)', boxShadow: '0 10px 30px -12px rgba(0,0,0,0.25)' }}
      >
        {[...TAB_GLYPHS[variant], null].map((g, i) => (
          <div
            key={i}
            className="flex-1 flex items-center justify-center rounded-full"
            style={{ height: 62, background: i === active ? 'rgba(0,0,0,0.075)' : undefined }}
          >
            {g ? (
              <Glyph name={g[0]} size={g[1]} color={i === active ? '#3B82F6' : '#111'} />
            ) : avatar ? (
              <Photo src={avatar} className="w-[38px] h-[38px] rounded-full" />
            ) : (
              <KennelMark size={38} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Willow Creek's profile picture. */
export function KennelMark({ size = 48 }: { size?: number }) {
  return <Photo src={IMG.kennel} className="rounded-full shrink-0 scale-[1.04]" style={{ width: size, height: size }} alt="Willow Creek Doodles" />;
}

/** The real Pawgress wordmark (from public/lightmode logo.jpg, background removed). */
export function PawgressWordmark({ height = 44 }: { height?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/astro/ui/wordmark.png" alt="Pawgress" draggable={false} style={{ height, width: 'auto' }} />;
}

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string; style?: CSSProperties };

export function Paw({ className = '', style }: IconProps) {
  return (
    <svg viewBox="0 0 512 512" className={className} style={style} fill="currentColor" aria-hidden>
      <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z" />
    </svg>
  );
}

export function Sparkle({ className = '', style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden>
      <path d="M12 0c.6 5.6 3.4 9.4 12 12-8.6 2.6-11.4 6.4-12 12-.6-5.6-3.4-9.4-12-12C8.6 9.4 11.4 5.6 12 0Z" />
    </svg>
  );
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export const IconChevronLeft = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} {...stroke} strokeWidth={2.4}><path d="m15 5-7 7 7 7" /></svg>
);
export const IconChevronRight = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} {...stroke} strokeWidth={2.4}><path d="m9 5 7 7-7 7" /></svg>
);
export const IconPencil = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} {...stroke}><path d="M4 20h4L19 9l-4-4L4 16v4Z" /><path d="m13.5 6.5 4 4" /></svg>
);
export const IconPlus = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} {...stroke} strokeWidth={2.4}><path d="M12 5v14M5 12h14" /></svg>
);
export const IconSearch = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} {...stroke} strokeWidth={2.3}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.6-3.6" /></svg>
);
export const IconHome = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor"><path d="M11.3 2.7a1 1 0 0 1 1.4 0l9 8.3c.6.6.2 1.7-.7 1.7H19v8a1.3 1.3 0 0 1-1.3 1.3h-3.4V16a2.3 2.3 0 0 0-4.6 0v6H6.3A1.3 1.3 0 0 1 5 20.7v-8H3c-.9 0-1.3-1.1-.7-1.7l9-8.3Z" /></svg>
);
export const IconTools = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} {...stroke} strokeWidth={1.9}><path d="m3 21 7.5-7.5M14.7 3.3a4 4 0 0 0-1.1 4.9L8.5 13.3l2.2 2.2 5.1-5.1a4 4 0 0 0 4.9-1.1l-2.4-.6-.6-2.4 1.6-1.6a4 4 0 0 0-4.6-1.4Z" /><path d="m4 4 3 1 9.5 9.5-2 2L5 7 4 4ZM17 17l3.5 3.5" /></svg>
);
export const IconCompass = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor"><path fillRule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm3.8 6.2-2 5.6-5.6 2 2-5.6 5.6-2Z" /></svg>
);
export const IconGallery = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} {...stroke}><rect x="3" y="6" width="18" height="15" rx="3" /><path d="M6 3h12" /><path d="m3 17 5-5 4 4 3-3 6 6" /><circle cx="15.5" cy="10.5" r="1.4" /></svg>
);
export const IconChats = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor"><path d="M3 5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H8l-4 3v-3.3A3 3 0 0 1 3 10V5Z" /><path d="M19 8.5a3 3 0 0 1 2 2.8V16a3 3 0 0 1-1 2.2V21l-3.4-2.4H11a3 3 0 0 1-2.6-1.6H14a5 5 0 0 0 5-5V8.5Z" /></svg>
);
export const IconScale = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor"><path fillRule="evenodd" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm4 3.5a1.5 1.5 0 0 0 0 3h6a1.5 1.5 0 0 0 0-3H9Z" /></svg>
);
export const IconHeart = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor"><path d="M12 21s-8.5-5.1-8.5-11.2A4.8 4.8 0 0 1 12 6.6a4.8 4.8 0 0 1 8.5 3.2C20.5 15.9 12 21 12 21Z" /></svg>
);
export const IconCamera = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} {...stroke}><path d="M4 8h3l1.6-2.4h6.8L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" /><circle cx="12" cy="13" r="3.5" /></svg>
);
export const IconMic = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} {...stroke}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" /></svg>
);
export const IconSend = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor"><path d="M3.4 3.2 21 12 3.4 20.8a.6.6 0 0 1-.8-.8L5.6 12 2.6 4a.6.6 0 0 1 .8-.8Zm2.9 9.8h6.2v-2H6.3" /></svg>
);
export const IconCheck = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} {...stroke} strokeWidth={2.8}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);
export const IconBell = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} {...stroke}><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16ZM10 20.5a2 2 0 0 0 4 0" /></svg>
);
export const IconShare = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} {...stroke}><path d="M12 3v12M8 7l4-4 4 4" /><path d="M7 11H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1" /></svg>
);
export const IconGear = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} {...stroke}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" /></svg>
);
export const IconDots = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor"><circle cx="5" cy="12" r="1.9" /><circle cx="12" cy="12" r="1.9" /><circle cx="19" cy="12" r="1.9" /></svg>
);
export const IconMedkit = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor"><path fillRule="evenodd" d="M9 3h6a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2V5a2 2 0 0 1 2-2Zm0 3h6V5H9v1Zm2 4v2.5H8.5v2H11V17h2v-2.5h2.5v-2H13V10h-2Z" /></svg>
);
export const IconCake = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor"><path d="M12 2c1 1.3 1.4 2.4 0 3.8C10.6 4.4 11 3.3 12 2Zm-1 5h2v3h5a2 2 0 0 1 2 2v2.2c-1 .9-2 .9-3 0s-2-.9-3 0-2 .9-3 0-2-.9-3 0-2 .9-3 0V12a2 2 0 0 1 2-2h4V7ZM4 16.5c1.3.7 2.7.7 4-.1 1.3.8 2.7.8 4 0 1.3.8 2.7.8 4 0 1.3.8 2.7.8 4 .1V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3.5Z" /></svg>
);
export const IconTrend = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} {...stroke} strokeWidth={2.4}><path d="m3 17 6-6 4 4 8-8" /><path d="M15 7h6v6" /></svg>
);
export const IconDoc = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} {...stroke}><path d="M6 3h8l4 4v14H6V3Z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></svg>
);
export const IconChatBubble = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} {...stroke}><path d="M4 5h16v11H9l-5 4V5Z" /><path d="M8 9.5h8M8 12.5h5" /></svg>
);
export const IconMail = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} {...stroke}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6 8.5-6" /></svg>
);
export const IconImagePlus = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor"><path d="M4 7a2 2 0 0 1 2-2h9v2H6v11.6l4.3-4.3 3 3 2.2-2.2L19 16.6V12h2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Zm15-6h1.5v2.5H23V5h-2.5v2.5H19V5h-2.5V3.5H19V1Z" /></svg>
);
export const IconPin = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7Zm0 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" /></svg>
);
export const IconLock = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor"><path fillRule="evenodd" d="M7 10V7a5 5 0 0 1 10 0v3h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h1Zm2 0h6V7a3 3 0 0 0-6 0v3Z" /></svg>
);
export const IconStar = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor"><path d="m12 2.5 2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.2 1.3-6.6L2.5 9.3l6.6-.8 2.9-6Z" /></svg>
);

export const IconDraft = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} {...stroke}><path d="M20 10V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" /><path d="m3.5 6.5 8 5.5 8-5.5" /><path d="m19.5 13.5 2 2-5 5H14.5v-2l5-5Z" /></svg>
);
export const IconReply = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} style={style} {...stroke} strokeWidth={2.3}><path d="M9 6 3.5 11.5 9 17" /><path d="M4 11.5h10a6 6 0 0 1 6 6V19" /></svg>
);

/** Line-art astronaut-dog helmet used for the Astro launcher. */
export const IconAstroHelmet = ({ className, style }: IconProps) => (
  <svg viewBox="0 0 32 32" className={className} style={style} {...stroke} strokeWidth={1.7}>
    <circle cx="15" cy="15" r="11" />
    <path d="M22.5 6.5 25 4" />
    <circle cx="25.8" cy="3.4" r="1.3" fill="currentColor" stroke="none" />
    <path d="M10 13c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5v3c0 2.6-2.2 4.5-5 4.5s-5-1.9-5-4.5v-3Z" />
    <path d="M10 13.5c-1.5.3-2.2 1.8-1.6 3.6M20 13.5c1.5.3 2.2 1.8 1.6 3.6" />
    <circle cx="13.2" cy="14" r=".7" fill="currentColor" stroke="none" />
    <circle cx="16.8" cy="14" r=".7" fill="currentColor" stroke="none" />
    <path d="M14.2 17.3c.5.4 1.1.4 1.6 0" />
    <path d="M7.5 23.5c2.4 1.6 4.8 2.4 7.5 2.4s5.1-.8 7.5-2.4" />
  </svg>
);
