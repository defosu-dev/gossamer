'use client';

import { supabaseBrowser } from '../supabaseBrowser';

/**
 * Server action (client-side): forces Supabase auth session refresh.
 *
 * @remarks
 * Calls `getUser()` which triggers a silent token refresh if the session is still valid.
 * Useful after client-side sign-in/out to immediately update `supabase.auth.getSession()`
 * and trigger `onAuthStateChange` listeners without page reload.
 *
 * Typically used:
 * - After OAuth redirect (Google, etc.)
 * - After password/email login
 * - When you need to ensure the latest user data is available
 */
export async function updateSessionBrowser() {
  const supabase = supabaseBrowser;
  await supabase.auth.getUser();
}
