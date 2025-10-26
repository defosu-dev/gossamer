import { supabaseBrowser } from "./supabaseBrowser"

/**
 * updateSessionBrowser
 *
 * Refreshes Supabase session on the client side.
 * Useful after login, logout, or when user revisits the site
 * without a full page reload.
 */

export async function updateSessionBrowser() {
  const supabase = supabaseBrowser()
  await supabase.auth.getUser()
}
