import { cache } from 'react';
import type { Metadata } from 'next';
import { getServerSupabase, isUuid } from './publicLitter';

// Rich link previews (og: tags) for the /pet, /invite and /kennel share links.
// Data comes from SECURITY DEFINER functions that return only preview fields and
// null for anything missing or hidden; see the *_link_previews.sql migration.

export const SITE_URL = 'https://www.pawgressapp.com';
const APP_ICON = `${SITE_URL}/app-icon.png`;
const APP_STORE_META = 'app-id=6752368171';

const GENERIC = {
  title: 'Pawgress',
  description: 'Follow your puppy’s journey from reservation to pickup day.',
};

export type PetPreview = {
  name: string | null;
  breed: string | null;
  birth_date: string | null;
  photo: string | null;
  kennel_name: string | null;
  kennel_photo: string | null;
};

export type KennelPreview = {
  kennel_name: string | null;
  photo: string | null;
  bio: string | null;
  user_type: string | null;
};

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

async function rpc<T>(fn: string, args: Record<string, string>): Promise<T | null> {
  const supabase = getServerSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase.rpc(fn, args);
  if (error) {
    // Never surface an error in a preview; fall back to the generic card.
    console.error(`${fn} failed`, error);
    return null;
  }
  return (data as T | null) ?? null;
}

export const getPetPreview = cache((petId: string) =>
  isUuid(petId) ? rpc<PetPreview>('get_pet_link_preview', { p_pet_id: petId }) : Promise.resolve(null),
);

// Invite codes are short tokens, not UUIDs; the function matches them exactly.
export const getInvitePreview = cache((code: string) =>
  code && code.length <= 64 ? rpc<PetPreview>('get_invite_preview', { p_code: code }) : Promise.resolve(null),
);

export const getKennelPreview = cache((profileId: string) =>
  isUuid(profileId) ? rpc<KennelPreview>('get_kennel_preview', { p_profile_id: profileId }) : Promise.resolve(null),
);

/* ------------------------------------------------------------------ */
/* Formatting                                                          */
/* ------------------------------------------------------------------ */

const SIZED_BUCKETS = ['chat-media', 'app-banners'];

/**
 * Absolute https URL for og:image. Photos in the public chat-media and app-banners
 * buckets have a stored 1200px copy under _sized/1200/; use that rather than
 * /storage/v1/render/image, which Supabase bills per distinct resized image.
 */
export function previewImage(url: string | null | undefined): string {
  const raw = url?.trim();
  if (!raw) return APP_ICON;
  let u: URL;
  try {
    u = new URL(raw, SITE_URL);
  } catch {
    return APP_ICON;
  }
  if (u.protocol !== 'https:') return APP_ICON;
  const marker = '/storage/v1/object/public/';
  const at = u.pathname.indexOf(marker);
  if (at !== -1) {
    const rest = u.pathname.slice(at + marker.length);
    const bucket = rest.split('/')[0];
    if (SIZED_BUCKETS.includes(bucket) && !rest.startsWith(`${bucket}/_sized/`)) {
      return `${u.origin}${u.pathname.slice(0, at)}${marker}${bucket}/_sized/1200/${rest.slice(bucket.length + 1)}`;
    }
  }
  return u.toString();
}

/** "3 days", "9 weeks", "5 months", "2 years"; null when there's no usable birth date. */
export function ageLabel(birthDate: string | null | undefined): string | null {
  if (!birthDate) return null;
  const born = new Date(`${birthDate.slice(0, 10)}T00:00:00Z`).getTime();
  if (Number.isNaN(born)) return null;
  const days = Math.floor((Date.now() - born) / 86400000);
  if (days < 0) return null;
  const plural = (n: number, unit: string) => `${n} ${unit}${n === 1 ? '' : 's'}`;
  if (days < 14) return plural(Math.max(days, 1), 'day');
  const weeks = Math.floor(days / 7);
  if (weeks < 16) return plural(weeks, 'week');
  const months = Math.floor(days / 30.44);
  if (months < 24) return plural(months, 'month');
  return plural(Math.floor(days / 365.25), 'year');
}

function truncate(text: string, max = 150) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

const clean = (s: string | null | undefined) => s?.trim() || null;

/** "{breed} · {age}", dropping whichever part is missing. */
function breedAndAge(p: PetPreview) {
  return [clean(p.breed), ageLabel(p.birth_date)].filter(Boolean).join(' · ');
}

const lead = (s: string) => (s ? `${s}. ` : '');

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

function card({ title, description, image, alt, path }: { title: string; description: string; image: string; alt: string; path: string }): Metadata {
  const url = `${SITE_URL}${path}`;
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
      images: [{ url: image, alt }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [{ url: image, alt }] },
    other: { 'apple-itunes-app': APP_STORE_META },
  };
}

export function genericCard(path: string): Metadata {
  return { ...card({ ...GENERIC, image: APP_ICON, alt: 'Pawgress', path }), robots: { index: false } };
}

export function petCard(p: PetPreview | null, path: string): Metadata {
  const name = clean(p?.name);
  if (!p || !name) return genericCard(path);
  const kennel = clean(p.kennel_name);
  return card({
    title: kennel ? `Meet ${name} from ${kennel}` : `Meet ${name}`,
    description: `${lead(breedAndAge(p))}Follow ${name}'s journey on Pawgress.`,
    image: previewImage(p.photo),
    alt: name,
    path,
  });
}

export function inviteCard(p: PetPreview | null, path: string): Metadata {
  const name = clean(p?.name);
  if (!p || !name) {
    return {
      ...card({
        title: 'This reservation link has already been used',
        description: 'Ask the breeder for a new link, or find puppies on Pawgress.',
        image: APP_ICON,
        alt: 'Pawgress',
        path,
      }),
      robots: { index: false },
    };
  }
  const kennel = clean(p.kennel_name);
  return {
    ...card({
      title: kennel ? `${name} is available at ${kennel}` : `${name} is available`,
      description: `${lead(breedAndAge(p))}Open this link in the Pawgress app to reserve ${name} and follow every week until pickup day.`,
      image: previewImage(p.photo),
      alt: name,
      path,
    }),
    // A reservation link is private to whoever it was sent to.
    robots: { index: false },
  };
}

export function kennelCard(k: KennelPreview | null, path: string): Metadata {
  const name = clean(k?.kennel_name);
  if (!k || !name) return genericCard(path);
  const bio = clean(k.bio);
  return card({
    title: `${name} on Pawgress`,
    description: bio ? truncate(bio) : 'Meet their puppies and follow their litters on Pawgress.',
    image: previewImage(k.photo),
    alt: name,
    path,
  });
}
