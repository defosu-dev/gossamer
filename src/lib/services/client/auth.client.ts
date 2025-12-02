import { supabaseBrowser } from '@/lib/utils/supabase/supabaseBrowser';

/**
 * Signs up a new user with email and password.
 * Stores full name in user metadata.
 */
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabaseBrowser.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    if (error.message.includes('Email not confirmed')) {
      throw new Error('Please confirm your email. Check your inbox.');
    }
    throw error;
  }

  return data;
};

/**
 * Signs in user with email and password.
 */
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabaseBrowser.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes('Email not confirmed')) {
      throw new Error('Please confirm your email before signing in. Check your inbox.');
    }
    throw error;
  }

  return data;
};

/**
 * Signs in with Google OAuth.
 */
export const signInWithGoogle = async () => {
  const { error } = await supabaseBrowser.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw error;
};

/**
 * Signs out the current user.
 */
export const signOut = async () => {
  const { error } = await supabaseBrowser.auth.signOut();
  if (error) throw error;
};

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
