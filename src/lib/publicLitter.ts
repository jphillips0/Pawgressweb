import { cache } from 'react';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Read-only data for the public /litter/<id> share page. Uses the anon key
// only — row-level security decides what anonymous visitors can see.

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iholadmgukfztcjylayc.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const REVALIDATE_SECONDS = 60;

export type PublicLitter = {
  id: string;
  name: string | null;
  breed: string | null;
  birth_date: string | null;
  cover_photo_url: string | null;
  owner_profile_id: string | null;
  parentage_profile_id: string | null;
};

export type PublicPuppy = {
  id: string;
  name: string | null;
  sex: string | null;
  collar_color: string | null;
  profile_photo_url: string | null;
  adoption_status: string | null;
};

export type PublicParents = {
  breed: string | null;
  generation_type: string | null;
  dam_name: string | null;
  dam_photo: string | null;
  sire_name: string | null;
  sire_photo: string | null;
};

export type PublicPost = {
  id: string;
  content: string | null;
  media_urls: string[] | null;
  media_types: string[] | null;
  pet_ids: string[] | null;
  litter_id: string;
  created_at: string;
};

export type PublicBreeder = {
  displayName: string | null;
  photoUrl: string | null;
  isShelter: boolean;
};

export type LitterPageData = {
  litter: PublicLitter;
  puppies: PublicPuppy[];
  parents: PublicParents | null;
  post: PublicPost | null;
  breeder: PublicBreeder | null;
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: string | undefined | null): value is string {
  return !!value && UUID_RE.test(value);
}

let _client: SupabaseClient | null = null;

function getServerSupabase(): SupabaseClient | null {
  if (_client) return _client;
  if (!SUPABASE_ANON_KEY) {
    console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set; /litter pages cannot load data.');
    return null;
  }
  _client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: {
      // Cache Supabase responses in Next's data cache so the page refreshes
      // roughly once a minute instead of hitting the database on every view.
      fetch: (input, init) =>
        fetch(input, { ...init, next: { revalidate: REVALIDATE_SECONDS } }),
    },
  });
  return _client;
}

/**
 * Loads everything the litter page needs. Returns null when the litter
 * doesn't exist or isn't public. A missing or mismatched post is dropped
 * silently so the litter still renders.
 */
export const getLitterPageData = cache(
  async (litterId: string, postId: string | null): Promise<LitterPageData | null> => {
    if (!isUuid(litterId)) return null;
    const supabase = getServerSupabase();
    if (!supabase) return null;

    const [litterRes, postRes] = await Promise.all([
      supabase.rpc('get_public_litter', { p_litter_id: litterId }),
      isUuid(postId)
        ? supabase
            .from('updates')
            .select('id, content, media_urls, media_types, pet_ids, litter_id, created_at')
            .eq('id', postId)
            .eq('litter_id', litterId)
            .maybeSingle()
        : Promise.resolve({ data: null, error: null }),
    ]);

    if (litterRes.error) {
      console.error('get_public_litter failed', litterRes.error);
      return null;
    }
    const payload = litterRes.data as {
      litter: PublicLitter | null;
      puppies: PublicPuppy[] | null;
      parents: PublicParents | null;
    } | null;
    if (!payload?.litter) return null;

    if (postRes.error) console.error('Loading litter post failed', postRes.error);
    const post = (postRes.data as PublicPost | null) ?? null;

    let breeder: PublicBreeder | null = null;
    if (payload.litter.owner_profile_id) {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('kennel_name, first_name, last_name, profile_photo_url, user_type')
        .eq('id', payload.litter.owner_profile_id)
        .maybeSingle();
      if (error) console.error('Loading breeder profile failed', error);
      if (profile) {
        const fullName = [profile.first_name, profile.last_name]
          .map((s: string | null) => s?.trim())
          .filter(Boolean)
          .join(' ');
        breeder = {
          displayName: profile.kennel_name?.trim() || fullName || null,
          photoUrl: profile.profile_photo_url || null,
          isShelter: profile.user_type === 'shelter',
        };
      }
    }

    return {
      litter: payload.litter,
      puppies: payload.puppies ?? [],
      parents: payload.parents,
      post,
      breeder,
    };
  }
);

/**
 * Uploaded photos are full-size camera originals, so route them through
 * Supabase's image transformer. resize=contain keeps the whole frame.
 * Existing query params (e.g. the app's ?_cb= cache-buster) are kept.
 */
export function resizedImage(url: string | null | undefined, width: number): string | null {
  if (!url) return null;
  const marker = '/storage/v1/object/public/';
  if (!url.includes(marker)) return url;
  try {
    const u = new URL(url.replace(marker, '/storage/v1/render/image/public/'));
    u.searchParams.set('width', String(width));
    u.searchParams.set('resize', 'contain');
    u.searchParams.set('quality', '80');
    return u.toString();
  } catch {
    return null;
  }
}
