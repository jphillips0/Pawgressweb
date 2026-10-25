import type { ReactNode } from 'react';

// Markup helpers for the Privacy Policy and Terms of Service pages. They reproduce the
// pages' existing section format (numbered heading with an icon, indented body) so the
// copy can be edited without repeating the class lists on every paragraph.

export type Accent = 'privacy' | 'terms';

const HEADING_GRADIENT: Record<Accent, string> = {
  privacy: 'from-purple-600 to-blue-600',
  terms: 'from-blue-600 to-purple-600',
};

const MARKER = {
  dot: { privacy: 'text-purple-600', terms: 'text-blue-600', char: '•' },
  check: { privacy: 'text-blue-600', terms: 'text-blue-600', char: '✓' },
  cross: { privacy: 'text-red-500', terms: 'text-red-500', char: '✗' },
  muted: { privacy: 'text-gray-400', terms: 'text-gray-400', char: '•' },
} as const;

export function Section({ id, icon, title, accent, last = false, children }: { id?: string; icon: string; title: string; accent: Accent; last?: boolean; children: ReactNode }) {
  return (
    <section id={id} className={last ? 'mb-0 scroll-mt-32' : 'mb-8 sm:mb-10 group scroll-mt-32'}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl sm:text-3xl">{icon}</span>
        <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r ${HEADING_GRADIENT[accent]} bg-clip-text text-transparent`}>
          {title}
        </h2>
      </div>
      <div className="pl-11">{children}</div>
    </section>
  );
}

export function P({ children, strong = false, className = '' }: { children: ReactNode; strong?: boolean; className?: string }) {
  return <p className={`text-base sm:text-lg text-gray-700 leading-relaxed mb-4 ${strong ? 'font-semibold' : ''} ${className}`}>{children}</p>;
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">{children}</h3>;
}

export function List({ items, accent, marker = 'dot' }: { items: ReactNode[]; accent: Accent; marker?: keyof typeof MARKER }) {
  const m = MARKER[marker];
  return (
    <ul className="space-y-2 text-base sm:text-lg text-gray-700 mb-6">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className={`${m[accent]} mt-1 shrink-0`}>{m.char}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Conspicuous text for disclaimers and liability limits (rendered in capitals). */
export function Caps({ children }: { children: ReactNode }) {
  return <p className="text-base sm:text-lg text-gray-800 leading-relaxed mb-4 font-semibold uppercase tracking-wide">{children}</p>;
}

/** A highlighted note box, e.g. for the arbitration notice. */
export function Callout({ children }: { children: ReactNode }) {
  return <div className="mb-6 p-5 sm:p-6 rounded-2xl border border-amber-200 bg-amber-50 text-base sm:text-lg text-gray-800 leading-relaxed">{children}</div>;
}

/** An unfilled fact, highlighted so it's easy to find and replace before publishing. */
export function Ph({ children }: { children: ReactNode }) {
  return <mark className="bg-amber-200/80 text-amber-950 rounded px-1 font-semibold">{children}</mark>;
}

export function Mail({ accent }: { accent: Accent }) {
  const color = accent === 'privacy' ? 'text-purple-600 hover:text-purple-700' : 'text-blue-600 hover:text-blue-700';
  return (
    <a href="mailto:dev@pawgressapp.com" className={`${color} font-semibold`}>
      dev@pawgressapp.com
    </a>
  );
}
