import React, { createContext, useState, useEffect, useContext } from 'react';
import supabase from '../services/supabase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Check active sessions and sets the user
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth session error:', error);
          setAuthError('Authentication configuration error. Please check Supabase setup.');
        } else if (data && data.session) {
          setUser(data.session.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Unexpected auth error:', err);
        setAuthError('Authentication system error. Please check configuration.');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    // Listen for changes on auth state
    let subscription;
    try {
      const { data } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      );
      subscription = data.subscription;
    } catch (err) {
      console.error('Auth state change subscription error:', err);
      setLoading(false);
    }

    return () => {
      if (subscription) {
        try {
          subscription.unsubscribe();
        } catch (err) {
          console.error('Error unsubscribing from auth changes:', err);
        }
      }
    };
  }, []);

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user,
    signInWithGoogle,
    signOut,
    loading,
    authError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 