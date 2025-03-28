
import React, { createContext, useState, useContext, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  session: Session | null;
  loginWithOTP: (email: string) => Promise<void>;
  signUp: (userData: {
    name: string;
    email: string;
    phone: string;
    country: string;
    city: string;
  }) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
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

  const getCurrentUrl = () => {
    // Get the current origin (protocol + hostname + port)
    return window.location.origin;
  };

  const signUp = async (userData: {
    name: string;
    email: string;
    phone: string;
    country: string;
    city: string;
  }): Promise<void> => {
    try {
      // First check if user already exists
      const { data: existingUsers, error: lookupError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', userData.email)
        .limit(1);
        
      if (lookupError) throw lookupError;
      
      if (existingUsers && existingUsers.length > 0) {
        throw new Error("An account with this email already exists. Please log in instead.");
      }
      
      // Generate a random password since Supabase still requires one
      // This password won't be needed by the user since they'll login via OTP
      const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
      
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: randomPassword,
        options: {
          data: {
            name: userData.name,
            phone: userData.phone,
            country: userData.country,
            city: userData.city,
          },
          emailRedirectTo: `${getCurrentUrl()}/auth/callback`,
        },
      });

      if (error) throw error;
      
      // Manually create a profile if the automatic trigger doesn't work
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user?.id,
          email: userData.email,
          name: userData.name,
          phone: userData.phone,
          country: userData.country,
          city: userData.city
        });
        
      if (profileError) {
        console.error("Error creating profile manually:", profileError);
        // Don't throw here, as the auth signup already succeeded
      }
      
      console.log("Sign up successful:", data);
      toast.success("Sign up successful! You can now login with an OTP sent to your email.");
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      toast.error(error.message || "Failed to sign up. Please try again.");
      throw error;
    }
  };

  const loginWithOTP = async (email: string): Promise<void> => {
    try {
      // First check if the user exists in auth users using email
      const { data: authUser, error: authError } = await supabase.auth.admin.listUsers({
        filter: {
          email: email
        }
      });
      
      console.log("Auth check for email:", email, authUser);
      
      // Then check profiles as backup
      const { data: existingUsers, error: lookupError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .limit(1);
      
      console.log("Profile check for email:", email, existingUsers);
        
      if (lookupError && !authUser) throw lookupError;
      
      if ((!authUser || authUser.users.length === 0) && (!existingUsers || existingUsers.length === 0)) {
        throw new Error("No account exists with this email. Please sign up first.");
      }
      
      // If user exists, send OTP
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${getCurrentUrl()}/auth/callback`,
        }
      });

      if (error) throw error;
      
      console.log("OTP sent successfully");
      toast.success("Verification code sent to your email. Please check your inbox.");
    } catch (error: any) {
      console.error("Error sending OTP:", error.message);
      toast.error(error.message || "Failed to send verification code. Please try again.");
      throw error;
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${getCurrentUrl()}/auth/callback`,
        }
      });

      if (error) throw error;
    } catch (error: any) {
      console.error("Error signing in with Google:", error.message);
      toast.error("Failed to sign in with Google. Please try again.");
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("You have been logged out successfully");
    } catch (error: any) {
      console.error("Error signing out:", error.message);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, session, loginWithOTP, signUp, loginWithGoogle, logout }}>
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
