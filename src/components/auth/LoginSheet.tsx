
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormValues = z.infer<typeof emailSchema>;

interface LoginSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: () => void;
}

const LoginSheet = ({ open, onOpenChange, onLoginSuccess }: LoginSheetProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { login, loginWithGoogle } = useAuth();

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  // Reset form when sheet opens/closes
  useEffect(() => {
    if (open) {
      emailForm.reset({ email: "" });
      setEmailSent(false);
    }
  }, [open, emailForm]);

  const handleEmailSubmit = async (data: EmailFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Send magic link via Supabase
      await login(data.email);
      
      setEmailSent(true);
      toast.success("Magic link sent to your email. Please check your inbox and spam folders.");
    } catch (error: any) {
      console.error("Error sending login link:", error);
      
      if (error.message?.includes("Email not confirmed")) {
        toast.error("Email not confirmed. Please check your inbox for the verification link or sign up again.");
      } else if (error.message?.includes("User not found")) {
        toast.error("No account found with this email. Please sign up first.");
      } else {
        toast.error("Failed to send login link. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      // No need for toast here as the page will redirect
    } catch (error) {
      // Error is handled in the loginWithGoogle function
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="pb-4">
          <SheetTitle>Log in to your account</SheetTitle>
          <SheetDescription>
            {emailSent 
              ? "Check your email for the magic link" 
              : "Enter your email to receive a login link or use Google"}
          </SheetDescription>
        </SheetHeader>
        
        {emailSent ? (
          <div className="mt-6 space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Check your email</AlertTitle>
              <AlertDescription>
                We've sent a magic link to your email. Click on it to log in automatically.
                If you don't see it, check your spam folder.
              </AlertDescription>
            </Alert>
            
            <Button 
              onClick={() => setEmailSent(false)} 
              variant="outline" 
              className="w-full mt-4"
            >
              Back to login
            </Button>
          </div>
        ) : (
          <>
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="your.email@example.com" 
                          autoComplete="email"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Magic Link"}
                </Button>
              </form>
            </Form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-4" 
                onClick={handleGoogleLogin}
              >
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
                Continue with Google
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default LoginSheet;
