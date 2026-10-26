/* eslint-disable @next/next/no-img-element -- images are pre-resized by Supabase */
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import {
  getLitterPageData,
  resizedImage,
  type LitterPageData,
  type PublicPost,
  type PublicPuppy,
} from '@/lib/publicLitter';
import { previewImage } from '@/lib/linkPreviews';

export const revalidate = 60;

const SITE_URL = 'https://www.pawgressapp.com';
const APP_STORE_URL = 'https://apps.apple.com/app/id6752368171';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.timelinesllc.pawgress';

type PageProps = {
  params: Promise<{ litterId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function resolveIds({ params, searchParams }: PageProps) {
  const [{ litterId }, query] = await Promise.all([params, searchParams]);
  const rawPost = query.post;
  const postId = (Array.isArray(rawPost) ? rawPost[0] : rawPost) || null;
  return { litterId, postId };
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function canonicalPath(litterId: string, postId: string | null) {
  return `/litter/${encodeURIComponent(litterId)}${postId ? `?post=${encodeURIComponent(postId)}` : ''}`;
}

function appLink(litterId: string, postId: string | null) {
  return `pawgress:/${canonicalPath(litterId, postId)}`;
}

function truncate(text: string, max = 150) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

function postMedia(post: PublicPost) {
  const urls = post.media_urls ?? [];
  const types = post.media_types ?? [];
  return urls.map((url, i) => ({ url, isVideo: types[i] === 'video' }));
}

function firstPostPhoto(post: PublicPost | null) {
  return post ? postMedia(post).find((m) => !m.isVideo)?.url ?? null : null;
}

function relativeDate(iso: string) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const seconds = Math.round((then - Date.now()) / 1000);
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return 'just now';
}

function ageFrom(birthDate: string | null) {
  if (!birthDate) return null;
  const born = new Date(`${birthDate}T00:00:00Z`).getTime();
  if (Number.isNaN(born)) return null;
  const days = Math.floor((Date.now() - born) / 86400000);
  if (days < 0) return null;
  if (days < 14) return `${days} day${days === 1 ? '' : 's'} old`;
  const weeks = Math.floor(days / 7);
  if (weeks < 16) return `${weeks} weeks old`;
  const months = Math.floor(days / 30.44);
  if (months < 24) return `${months} months old`;
  const years = Math.floor(days / 365.25);
  return `${years} years old`;
}

function withPuppies(post: PublicPost, puppies: PublicPuppy[]) {
  const ids = new Set(post.pet_ids ?? []);
  const names = puppies.filter((p) => ids.has(p.id) && p.name).map((p) => p.name as string);
  if (names.length === 0) return null;
  const shown = names.length > 4 ? [...names.slice(0, 3), `${names.length - 3} more`] : names;
  return `With ${new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(shown)}`;
}

const COLLAR_COLORS: Record<string, string> = {
  RED: '#ef4444',
  DARK_RED: '#991b1b',
  ORANGE: '#f97316',
  YELLOW: '#facc15',
  GREEN: '#22c55e',
  DARK_GREEN: '#166534',
  LIGHT_GREEN: '#86efac',
  TEAL: '#14b8a6',
  BLUE: '#3b82f6',
  DARK_BLUE: '#1e3a8a',
  NAVY: '#1e3a8a',
  LIGHT_BLUE: '#7dd3fc',
  PURPLE: '#a855f7',
  LAVENDER: '#c4b5fd',
  PINK: '#f472b6',
  HOT_PINK: '#ec4899',
  BROWN: '#92400e',
  GRAY: '#9ca3af',
  GREY: '#9ca3af',
  BLACK: '#111827',
  WHITE: '#f9fafb',
};

function collarColor(value: string | null) {
  return (value && COLLAR_COLORS[value.toUpperCase()]) || '#ffffff';
}

function detectPlatform(userAgent: string): 'ios' | 'android' | 'desktop' {
  if (/iPhone|iPad|iPod/i.test(userAgent)) return 'ios';
  if (/Android/i.test(userAgent)) return 'android';
  return 'desktop';
}

/* ------------------------------------------------------------------ */
/* Metadata (link previews)                                            */
/* ------------------------------------------------------------------ */

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { litterId, postId } = await resolveIds(props);
  const data = await getLitterPageData(litterId, postId);

  if (!data) {
    return {
      title: 'Pawgress',
      description: 'Follow puppies and pets as they grow on Pawgress.',
      robots: { index: false },
      other: { 'apple-itunes-app': 'app-id=6752368171' },
    };
  }

  const { litter, post, breeder } = data;
  const litterName = litter.name?.trim() || 'A litter';
  const effectivePostId = post ? post.id : null;
  const url = `${SITE_URL}${canonicalPath(litter.id, effectivePostId)}`;

  const title = post
    ? `${breeder?.displayName || 'Someone'} posted in ${litterName}`
    : `${litterName} on Pawgress`;
  const description = truncate(
    post?.content?.trim() || `Follow ${litterName}'s puppies as they grow on Pawgress`
  );
  // Stored _sized/1200 copy, not the billed-per-image render endpoint.
  const image = previewImage(firstPostPhoto(post) ?? litter.cover_photo_url);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: 'Pawgress',
      title,
      description,
      url,
      images: [{ url: image, alt: litterName }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
    other: { 'apple-itunes-app': `app-id=6752368171, app-argument=${url}` },
  };
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default async function LitterPage(props: PageProps) {
  const [{ litterId, postId }, headerList] = await Promise.all([resolveIds(props), headers()]);
  const platform = detectPlatform(headerList.get('user-agent') ?? '');
  const data = await getLitterPageData(litterId, postId);

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-fuchsia-50 text-gray-900">
      <Aurora />
      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col gap-5 px-4 pb-16 pt-8">
        <a href="/" className="flex items-center gap-2 self-center">
          <img src="/app-icon.png" alt="" className="h-9 w-9 rounded-xl shadow-md" />
          <span className="font-baloo text-xl font-extrabold text-gray-900">Pawgress</span>
        </a>

        {data ? (
          <LitterContent data={data} platform={platform} />
        ) : (
          <Unavailable platform={platform} />
        )}
      </div>
    </div>
  );
}

function LitterContent({ data, platform }: { data: LitterPageData; platform: Platform }) {
  const { litter, post } = data;
  const deepLink = appLink(litter.id, post ? post.id : null);

  return (
    <>
      {post && <PostCard data={data} post={post} deepLink={deepLink} />}
      <AppCta
        deepLink={deepLink}
        platform={platform}
        message={
          post
            ? `See the whole feed and follow ${litter.name?.trim() || 'this litter'} in the Pawgress app.`
            : 'Get updates, photos and milestones as these puppies grow.'
        }
      />
      <LitterCard data={data} deepLink={deepLink} />
    </>
  );
}

type Platform = ReturnType<typeof detectPlatform>;

function PostCard({ data, post, deepLink }: { data: LitterPageData; post: PublicPost; deepLink: string }) {
  const { litter, puppies, breeder } = data;
  const media = postMedia(post);
  const shown = media.slice(0, 4);
  const extra = media.length - shown.length;
  const videoPoster = resizedImage(litter.cover_photo_url ?? firstPostPhoto(post), 800);
  const tagged = withPuppies(post, puppies);
  const avatar = resizedImage(breeder?.photoUrl, 160);

  return (
    <article className="overflow-hidden rounded-3xl border border-white/70 bg-white/85 shadow-xl shadow-indigo-200/40 backdrop-blur">
      <header className="flex items-center gap-3 px-4 pt-4">
        {avatar ? (
          <img src={avatar} alt="" className="h-11 w-11 rounded-full object-cover ring-2 ring-white" />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-lg">🐾</div>
        )}
        <div className="min-w-0 leading-tight">
          <p className="truncate font-semibold text-gray-900">
            {breeder?.displayName || (breeder?.isShelter ? 'A shelter' : 'A breeder')}
          </p>
          <p className="truncate text-sm text-gray-500">
            in {litter.name?.trim() || 'their litter'} · {relativeDate(post.created_at)}
          </p>
        </div>
      </header>

      {post.content?.trim() && (
        <p className="whitespace-pre-line px-4 pt-3 text-[15px] leading-relaxed text-gray-800">
          {post.content.trim()}
        </p>
      )}
      {tagged && <p className="px-4 pt-2 text-sm font-medium text-indigo-700">{tagged}</p>}

      {shown.length > 0 && (
        <div className={`mt-3 grid gap-0.5 ${shown.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {shown.map((item, i) => {
            const isLastWithExtra = i === shown.length - 1 && extra > 0;
            const tileClass =
              shown.length === 1
                ? 'max-h-[520px] w-full object-cover'
                : shown.length === 3 && i === 0
                  ? 'col-span-2 aspect-[16/10] w-full object-cover'
                  : 'aspect-square w-full object-cover';
            const wrapperClass = `relative block bg-gray-100 ${shown.length === 3 && i === 0 ? 'col-span-2' : ''}`;

            if (item.isVideo) {
              return (
                <a key={i} href={deepLink} className={wrapperClass} aria-label="Watch this video in Pawgress">
                  {videoPoster ? (
                    <img src={videoPoster} alt="" className={tileClass} />
                  ) : (
                    <div className={`${tileClass} min-h-48 bg-gradient-to-br from-indigo-200 to-blue-200`} />
                  )}
                  <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
                      <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-indigo-600" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </a>
              );
            }

            const src = resizedImage(item.url, 800);
            if (!src) return null;
            return (
              <div key={i} className={wrapperClass}>
                <img src={src} alt="" loading={i === 0 ? 'eager' : 'lazy'} className={tileClass} />
                {isLastWithExtra && (
                  <a
                    href={deepLink}
                    className="absolute inset-0 flex items-center justify-center bg-black/45 font-baloo text-3xl font-extrabold text-white"
                  >
                    +{extra}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}
      {shown.length === 0 && <div className="h-4" />}
    </article>
  );
}

function LitterCard({ data, deepLink }: { data: LitterPageData; deepLink: string }) {
  const { litter, puppies, parents, breeder } = data;
  const cover = resizedImage(litter.cover_photo_url, 800);
  const age = ageFrom(litter.birth_date);
  const available = puppies.filter((p) => p.adoption_status === 'available').length;
  const breed = litter.breed?.trim() || parents?.breed?.trim() || null;
  const stats = [
    puppies.length > 0 ? `${puppies.length} ${puppies.length === 1 ? 'puppy' : 'puppies'}` : null,
    age,
  ].filter(Boolean);
  const shownPuppies = puppies.slice(0, 8);
  const morePuppies = puppies.length - shownPuppies.length;
  const hasParents = parents && (parents.dam_name || parents.sire_name);

  return (
    <section className="overflow-hidden rounded-3xl border border-white/70 bg-white/85 shadow-xl shadow-indigo-200/40 backdrop-blur">
      {cover ? (
        <img src={cover} alt={litter.name ?? 'Litter cover'} className="aspect-[4/3] w-full object-cover" />
      ) : (
        <div className="flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-100 to-fuchsia-100 text-6xl">
          🐶
        </div>
      )}

      <div className="px-5 pb-5 pt-4">
        <h1 className="font-baloo text-3xl font-extrabold leading-tight tracking-tight text-gray-900">
          {litter.name?.trim() || 'Litter'}
        </h1>
        {breed && <p className="mt-0.5 font-medium text-indigo-700">{breed}</p>}
        {stats.length > 0 && <p className="mt-1 text-sm text-gray-600">{stats.join(' · ')}</p>}
        {breeder?.displayName && (
          <p className="mt-1 text-sm text-gray-500">
            {breeder.isShelter ? 'Shelter' : 'Breeder'}: <span className="font-medium text-gray-700">{breeder.displayName}</span>
          </p>
        )}
        {available > 0 && (
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {available} available
          </span>
        )}

        {shownPuppies.length > 0 && (
          <div className="mt-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">The puppies</h2>
            <ul className="mt-2 flex gap-3 overflow-x-auto pb-1">
              {shownPuppies.map((puppy) => {
                const photo = resizedImage(puppy.profile_photo_url, 160);
                return (
                  <li key={puppy.id} className="flex w-14 shrink-0 flex-col items-center gap-1">
                    <span
                      className="block rounded-full p-[3px]"
                      style={{ background: collarColor(puppy.collar_color) }}
                      title={puppy.collar_color ? `${puppy.collar_color.replace(/_/g, ' ').toLowerCase()} collar` : undefined}
                    >
                      {photo ? (
                        <img src={photo} alt="" loading="lazy" className="h-12 w-12 rounded-full object-cover ring-2 ring-white" />
                      ) : (
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 ring-2 ring-white">🐾</span>
                      )}
                    </span>
                    <span className="w-full truncate text-center text-xs font-medium text-gray-700">
                      {puppy.name || 'Puppy'}
                    </span>
                  </li>
                );
              })}
              {morePuppies > 0 && (
                <li className="flex w-14 shrink-0 flex-col items-center gap-1">
                  <a
                    href={deepLink}
                    className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700"
                  >
                    +{morePuppies}
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}

        {hasParents && (
          <div className="mt-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Parents{parents.generation_type ? ` · ${parents.generation_type}` : ''}
            </h2>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <Parent label="Dam" name={parents.dam_name} photo={parents.dam_photo} />
              <Parent label="Sire" name={parents.sire_name} photo={parents.sire_photo} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Parent({ label, name, photo }: { label: string; name: string | null; photo: string | null }) {
  if (!name && !photo) return <div />;
  const src = resizedImage(photo, 160);
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-indigo-50/70 p-2.5">
      {src ? (
        <img src={src} alt="" loading="lazy" className="h-11 w-11 rounded-full object-cover" />
      ) : (
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">🐕</span>
      )}
      <div className="min-w-0 leading-tight">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-500">{label}</p>
        <p className="truncate text-sm font-semibold text-gray-900">{name || 'Unnamed'}</p>
      </div>
    </div>
  );
}

function AppCta({ deepLink, platform, message }: { deepLink: string; platform: Platform; message: string }) {
  return (
    <section className="rounded-3xl border border-white/70 bg-white/70 p-5 text-center shadow-lg shadow-indigo-200/30 backdrop-blur">
      <p className="text-[15px] leading-snug text-blue-900/80">{message}</p>
      <a
        href={deepLink}
        className="mx-auto mt-4 flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/40 transition active:scale-[0.97]"
      >
        Open in Pawgress
      </a>
      <p className="mt-4 text-xs text-gray-500">Don&apos;t have the app yet?</p>
      <StoreBadges platform={platform} />
    </section>
  );
}

function StoreBadges({ platform }: { platform: Platform }) {
  return (
    <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
      {platform !== 'android' && (
        <a
          href={APP_STORE_URL}
          className="flex h-12 items-center gap-2 rounded-xl bg-black px-4 text-left text-white transition active:scale-[0.97]"
        >
          <svg viewBox="0 0 384 512" className="h-6 w-6 fill-white" aria-hidden="true">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
          </svg>
          <span className="leading-none">
            <span className="block text-[10px]">Download on the</span>
            <span className="block text-lg font-semibold tracking-tight">App Store</span>
          </span>
        </a>
      )}
      {platform !== 'ios' && (
        <a
          href={PLAY_STORE_URL}
          className="flex h-12 items-center gap-2 rounded-xl bg-black px-4 text-left text-white transition active:scale-[0.97]"
        >
          <svg viewBox="0 0 512 512" className="h-5 w-5" aria-hidden="true">
            <path fill="#34A853" d="M48 59.5v393c0 9.6 5.6 17.9 13.7 21.9L270 256 61.7 37.6C53.6 41.6 48 49.9 48 59.5z" />
            <path fill="#FBBC04" d="M347.3 333.3 270 256l77.3-77.3 93.4 53.9c18.4 10.6 18.4 37.2 0 47.8z" />
            <path fill="#4285F4" d="M61.7 474.4c7.3 3.6 16.2 3.6 23.8-.8l261.8-140.3L270 256z" />
            <path fill="#EA4335" d="M85.5 38.4c-7.6-4.4-16.5-4.4-23.8-.8L270 256l77.3-77.3z" />
          </svg>
          <span className="leading-none">
            <span className="block text-[10px] uppercase">Get it on</span>
            <span className="block text-lg font-semibold tracking-tight">Google Play</span>
          </span>
        </a>
      )}
    </div>
  );
}

function Unavailable({ platform }: { platform: Platform }) {
  return (
    <section className="rounded-3xl border border-white/70 bg-white/80 px-6 py-10 text-center shadow-xl shadow-indigo-200/40 backdrop-blur">
      <div className="text-5xl">🐾</div>
      <h1 className="mt-3 font-baloo text-2xl font-extrabold text-gray-900">This litter isn&apos;t available</h1>
      <p className="mt-2 text-[15px] leading-relaxed text-blue-900/75">
        It may have been removed or made private. Download Pawgress to follow puppies and pets as they grow.
      </p>
      <div className="mt-5">
        <StoreBadges platform={platform} />
      </div>
    </section>
  );
}

function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-32 -top-56 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.45),transparent)] blur-3xl" />
      <div className="absolute -right-40 top-16 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.4),transparent)] blur-3xl" />
      <div className="absolute bottom-0 left-[10%] h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(217,70,239,0.25),transparent)] blur-3xl" />
    </div>
  );
}
