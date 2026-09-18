'use client';

import { ReactNode } from 'react';
import { Reveal } from '../motion';

/* Shared chrome for the interior pages, so every one of them inherits the same
   type scale, rhythm, radius, and single accent as the homepage. */

export function PageHero({
  title,
  lede,
  image,
  imageAlt,
  children,
}: {
  title: ReactNode;
  lede?: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero pt-[calc(var(--nav-h)+3rem)] pb-14 sm:pb-20">
      <div className="shell">
        <div className={image ? 'grid items-center gap-10 lg:grid-cols-12 lg:gap-16' : ''}>
          <div className={image ? 'lg:col-span-7' : ''}>
            <Reveal>
              <h1 className="max-w-[22ch] text-[2.25rem] leading-[1.07] sm:text-[2.75rem] lg:text-[3.25rem]">
                {title}
              </h1>
            </Reveal>
            {lede && (
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-ink-2">{lede}</p>
              </Reveal>
            )}
            {children && (
              <Reveal delay={0.18}>
                <div className="mt-8">{children}</div>
              </Reveal>
            )}
          </div>

          {image && (
            <Reveal direction="up" delay={0.15} className="lg:col-span-5">
              <img
                src={image}
                alt={imageAlt ?? ''}
                className="lift aspect-[5/4] w-full rounded-card object-cover"
              />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

export function Section({
  children,
  tinted = false,
  id,
  className = '',
}: {
  children: ReactNode;
  tinted?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-24 ${tinted ? 'border-y border-line bg-surface' : ''} ${className}`}
    >
      <div className="shell">{children}</div>
    </section>
  );
}

export function SectionTitle({ children, sub }: { children: ReactNode; sub?: string }) {
  return (
    <>
      <Reveal>
        <h2 className="max-w-[20ch] text-[2rem] leading-[1.1] sm:text-[2.5rem]">{children}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-ink-2">{sub}</p>
        </Reveal>
      )}
    </>
  );
}

/* Long-form legal and policy pages. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className="
        max-w-[68ch]
        [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2
        [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:leading-snug
        [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:leading-snug
        [&_li]:leading-relaxed [&_li]:text-ink-2
        [&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-ink-2
        [&_strong]:font-semibold [&_strong]:text-ink
        [&_ul]:mt-4 [&_ul]:grid [&_ul]:gap-2 [&_ul]:pl-5 [&_ul]:[list-style:disc]
      "
    >
      {children}
    </div>
  );
}
