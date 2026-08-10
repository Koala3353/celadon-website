import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Public, anon-key client. Safe to use in server components, client
 * components, and route handlers alike — there is no user auth/session
 * in this build (see build brief Section 9), so a single client
 * shape covers every public-read use case.
 *
 * Untyped on purpose: our hand-written row types in ./types live at
 * the query-result boundary (see lib/data.ts), not on the client itself.
 */
export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}
