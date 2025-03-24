
import React, { createContext, useState, useContext, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  session: Session | null;
  login: (email: string, otp: string) => Promise<void>;
  signUp: (userData: {
    name: string;
    email: string;
    phone: string;
    country: string;
    city: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state change event:", event);
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoggedIn(!!session);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (userData: {
    name: string;
    email: string;
    phone: string;
    country: string;
    city: string;
  }): Promise<void> => {
    try {
      // Generate a random password (this will not be used as we'll use OTP for login)
      const password = Math.random().toString(36).slice(-12);
      
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password,
        options: {
          data: {
            name: userData.name,
            phone: userData.phone,
            country: userData.country,
            city: userData.city,
          },
        },
      });

      if (error) throw error;
      
      console.log("Sign up successful:", data);
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      throw error;
    }
  };

  const login = async (email: string, otp: string): Promise<void> => {
    try {
      // For now, we're not actually using OTP with Supabase
      // Instead, we're using the Supabase Auth magic link feature
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        }
      });

      if (error) throw error;
      
      console.log("Login request sent successfully");
    } catch (error: any) {
      console.error("Error logging in:", error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.error("Error signing out:", error.message);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, session, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
