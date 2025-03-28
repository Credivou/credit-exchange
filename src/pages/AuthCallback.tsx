
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Process the OAuth or OTP callback
    const processAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        // Log for debugging
        console.log("Auth callback processing:", { data, error });
        
        if (error) {
          toast.error("Authentication failed: " + error.message);
          navigate("/");
          return;
        } 
        
        if (data?.session) {
          // Check if profile exists
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.session.user.id)
            .single();
            
          if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is 'not found'
            console.error("Error fetching profile:", profileError);
            // Don't abort the login if profile query fails
          }
          
          // If profile doesn't exist, create it from user metadata
          if (!profileData) {
            console.log("Profile not found, creating from user metadata");
            const metadata = data.session.user.user_metadata;
            const userEmail = data.session.user.email;
            
            try {
              await supabase.from('profiles').insert({
                id: data.session.user.id,
                email: userEmail || '',
                name: metadata?.name || metadata?.full_name || '',
                phone: metadata?.phone || '',
                country: metadata?.country || '',
                city: metadata?.city || ''
              });
              console.log("Created new profile for user");
            } catch (insertError) {
              console.error("Error creating profile:", insertError);
              // Don't abort the login if profile creation fails
            }
          }
          
          toast.success("Successfully logged in!");
          navigate("/");
        } else {
          // No session but no error - this shouldn't happen, but handle it gracefully
          toast.warning("Authentication completed, but no session was created. Please try again.");
          navigate("/");
        }
      } catch (err) {
        console.error("Error in auth callback:", err);
        toast.error("Something went wrong during authentication");
        navigate("/");
      }
    };

    processAuthCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Logging you in...</h2>
        <p className="text-muted-foreground">Please wait while we complete the authentication process.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
