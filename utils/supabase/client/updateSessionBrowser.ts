
/**
 * updateSessionBrowser
 *
 * Refreshes Supabase session on the client side.
 * Useful after login, logout, or when user revisits the site
 * without a full page reload.
 */

import { supabaseBrowser } from "../supabaseBrowser"

export async function updateSessionBrowser() {
  const supabase = supabaseBrowser
  await supabase.auth.getUser()
}
