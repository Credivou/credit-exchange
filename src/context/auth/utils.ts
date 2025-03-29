
import { supabase } from "@/integrations/supabase/client";

export const getCurrentUrl = (): string => {
  // Get the current origin (protocol + hostname + port)
  return window.location.origin;
};

export const checkUserExists = async (email: string): Promise<boolean> => {
  try {
    // Check if the user exists in the profiles table
    const { data: existingUsers, error: lookupError } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', email)
      .limit(1);
    
    if (lookupError) {
      console.error("Error checking existing user:", lookupError);
    }
    
    // Check directly in auth users
    const { data: authUsersList, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error("Error checking auth users:", authError);
    }
    
    // Safely typecast and filter the users array
    const authUsers = [];
    if (authUsersList?.users && Array.isArray(authUsersList.users)) {
      authUsersList.users.forEach(user => {
        if (user && typeof user === 'object' && 'email' in user && user.email === email) {
          authUsers.push(user);
        }
      });
    }
    
    return (
      (existingUsers && existingUsers.length > 0) || 
      (authUsers && authUsers.length > 0)
    );
  } catch (error) {
    console.error("Error checking if user exists:", error);
    return false;
  }
};
