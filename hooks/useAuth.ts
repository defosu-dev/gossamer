import { supabaseBrowser } from "@/utils/supabase/supabaseBrowser";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import {
  signUp,
  signIn,
  signInWithGoogle,
  signOut,
} from "@/utils/supabase/client/auth";

/**
 * Custom hook for Supabase authentication.
 * Provides user state, loading, and auth actions.
 */
export const useAuth = () => {
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

  const handleSignUp = async (
    email: string,
    password: string,
    fullName: string
  ): Promise<void> => {
    setLoading(true);
    try {
      await signUp(email, password, fullName);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (
    email: string,
    password: string
  ): Promise<void> => {
    setLoading(true);
    try {
      await signIn(email, password);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async (): Promise<void> => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async (): Promise<void> => {
    setLoading(true);
    try {
      await signOut();
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signInWithGoogle: handleGoogleSignIn,
    signOut: handleSignOut,
  } as const;
};
