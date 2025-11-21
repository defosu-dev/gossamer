'use client';

import { useEffect, useState, useCallback } from 'react';
import type { User } from '@supabase/supabase-js';

import { supabaseBrowser } from '@/utils/supabase/supabaseBrowser';
import { signUp, signIn, signInWithGoogle, signOut } from '@/utils/supabase/client/auth';

interface UseAuthReturn {
  /** Currently authenticated user or null if not signed in */
  user: User | null;

  /** Loading state for initial auth check and auth actions */
  loading: boolean;

  /** Sign up with email, password and full name */
  signUp: (email: string, password: string, fullName: string) => Promise<void>;

  /** Sign in with email and password */
  signIn: (email: string, password: string) => Promise<void>;

  /** Sign in with Google OAuth */
  signInWithGoogle: () => Promise<void>;

  /** Sign out current user */
  signOut: () => Promise<void>;
}

/**
 * Custom hook for Supabase authentication.
 *
 * @remarks
 * Client-side only hook that manages user session, loading state,
 * and provides wrapped auth actions with consistent loading handling.
 * Subscribes to Supabase auth state changes for real-time updates.
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabaseBrowser.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabaseBrowser.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignUp = useCallback(
    async (email: string, password: string, fullName: string): Promise<void> => {
      setLoading(true);
      try {
        await signUp(email, password, fullName);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleSignIn = useCallback(async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      await signIn(email, password);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleGoogleSignIn = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSignOut = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      await signOut();
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signInWithGoogle: handleGoogleSignIn,
    signOut: handleSignOut,
  } as const;
}
