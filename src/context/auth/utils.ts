
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
    const { data, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error("Error checking auth users:", authError);
      // If we can't check auth users, rely only on profiles check
      return (existingUsers && existingUsers.length > 0);
    }
    
    // Safely check if any users have the matching email
    let hasMatchingUser = false;
    
    // Properly type-check and filter the users array
    if (data?.users && Array.isArray(data.users)) {
      hasMatchingUser = data.users.some(user => {
        // Safely check if user has an email property and if it matches
        return (
          user && 
          typeof user === 'object' && 
          'email' in user && 
          typeof user.email === 'string' && 
          user.email === email
        );
      });
    }
    
    return (
      (existingUsers && existingUsers.length > 0) || 
      hasMatchingUser
    );
  } catch (error) {
    console.error("Error checking if user exists:", error);
    return false;
  }
};
