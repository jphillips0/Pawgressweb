import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

/**
 * Lazily create the Supabase client. We don't instantiate at module load
 * because that would throw during Vercel's static prerender pass when env
 * vars aren't injected into the build container.
 */
function getClient(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    throw new Error(
      'Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
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

// Proxy so callers can keep using `supabase.auth...` while creation is deferred
// until the first property access (which happens in the browser, not at build).
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getClient();
    // @ts-expect-error - dynamic property forwarding
    const value = client[prop];
    return typeof value === 'function' ? value.bind(client) : value;
  },
});

