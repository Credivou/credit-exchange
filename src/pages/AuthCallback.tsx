
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
        } else if (data?.session) {
          toast.success("Successfully logged in!");
        }
        
        // Redirect to home page after processing
        navigate("/");
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
