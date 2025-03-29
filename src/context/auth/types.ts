
import { User, Session } from "@supabase/supabase-js";

export type AuthContextType = {
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
