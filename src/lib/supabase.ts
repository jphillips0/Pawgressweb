import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;
let _attempted = false;

/**
 * Lazily create the Supabase client. Returns null if env vars are missing
 * (e.g. during Vercel's static prerender pass, or if the production env
 * isn't configured) so callers can render a friendly error instead of
 * crashing the React tree.
 */
export function getSupabase(): SupabaseClient | null {
  if (_client) return _client;
  if (_attempted) return null;
  _attempted = true;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console
      console.error(
        'Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in the hosting dashboard and redeploy.'
      );
    }
    return null;
  }

  _client = createClient(url, anon, {
    auth: {
      // Critical: parses the #access_token / #refresh_token hash from
      // Supabase password-recovery emails when the page loads.
      detectSessionInUrl: true,
      flowType: 'implicit',
      persistSession: true,
      autoRefreshToken: true,
    },
  });
  return _client;
}

/**
 * @deprecated Prefer `getSupabase()` which returns null when env vars are
 * missing. Kept for backwards compatibility — accessing any property will
 * throw if the client could not be initialized.
 */
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabase();
    if (!client) {
      throw new Error(
        'Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
      );
    }
    // @ts-expect-error - dynamic property forwarding
    const value = client[prop];
    return typeof value === 'function' ? value.bind(client) : value;
  },
});

