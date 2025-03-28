
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: () => void;
}

const LoginSheet = ({ open, onOpenChange, onLoginSuccess }: LoginSheetProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const { loginWithOTP, loginWithGoogle, isLoggedIn } = useAuth();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  // Reset form when sheet opens/closes
  useEffect(() => {
    if (open) {
      loginForm.reset({ email: "" });
      setLoginError(null);
      setOtpSent(false);
    }
  }, [open, loginForm]);

  // Check if user is logged in and close the sheet
  useEffect(() => {
    if (isLoggedIn && open) {
      onLoginSuccess();
      onOpenChange(false);
    }
  }, [isLoggedIn, open, onLoginSuccess, onOpenChange]);

  const handleLoginSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    setLoginError(null);
    
    try {
      // Login with OTP
      await loginWithOTP(data.email);
      setOtpSent(true);
      
      // Note: The actual login success will be handled by the onAuthStateChange listener
    } catch (error: any) {
      console.error("Error logging in:", error);
      
      if (error.message?.includes("No account exists")) {
        setLoginError("No account exists with this email. Please sign up first.");
      } else if (error.message?.includes("Email not confirmed")) {
        setLoginError("Your email is not confirmed. Please check your inbox for the verification link.");
      } else {
        setLoginError(error.message || "Failed to send OTP. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="pb-4">
          <SheetTitle>Log in to your account</SheetTitle>
          <SheetDescription>
            {otpSent 
              ? "Please check your email for the verification code" 
              : "Enter your email to receive a verification code"}
          </SheetDescription>
        </SheetHeader>
        
        {loginError && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Login Error</AlertTitle>
            <AlertDescription>
              {loginError}
            </AlertDescription>
          </Alert>
        )}
        
        {otpSent && (
          <Alert className="mt-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Verification Code Sent</AlertTitle>
            <AlertDescription>
              We've sent a verification code to your email. Please check your inbox and click the link to continue.
            </AlertDescription>
          </Alert>
        )}
        
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4 pt-4">
            <FormField
              control={loginForm.control}
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
            
            <Button type="submit" className="w-full mt-6" disabled={isSubmitting || otpSent}>
              {isSubmitting ? "Sending code..." : otpSent ? "Code sent" : "Send verification code"}
            </Button>
          </form>
        </Form>

        {!otpSent && (
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
              onClick={() => loginWithGoogle()}
            >
              <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
              Continue with Google
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default LoginSheet;
