
import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits"),
});

type EmailFormValues = z.infer<typeof emailSchema>;
type OTPFormValues = z.infer<typeof otpSchema>;

interface LoginSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: () => void;
}

const LoginSheet = ({ open, onOpenChange, onLoginSuccess }: LoginSheetProps) => {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const otpForm = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleEmailSubmit = async (data: EmailFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would call an API to send OTP email
      console.log("Sending OTP to email:", data.email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUserEmail(data.email);
      setStep("otp");
      toast.success("OTP sent to your email address");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOTPSubmit = async (data: OTPFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would verify the OTP with your backend
      console.log("Verifying OTP:", data.otp, "for email:", userEmail);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Login successful!");
      onOpenChange(false);
      onLoginSuccess();
      
      // Reset forms for next time
      emailForm.reset();
      otpForm.reset();
      setStep("email");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      // In a real app, this would resend the OTP
      console.log("Resending OTP to:", userEmail);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success("New OTP sent to your email");
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  const handleBack = () => {
    setStep("email");
    otpForm.reset();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="pb-4">
          <SheetTitle>Log in to your account</SheetTitle>
          <SheetDescription>
            {step === "email" 
              ? "Enter your email to receive a one-time password" 
              : `Enter the 6-digit code sent to ${userEmail}`}
          </SheetDescription>
        </SheetHeader>
        
        {step === "email" ? (
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
                {isSubmitting ? "Sending..." : "Send OTP"}
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...otpForm}>
            <form onSubmit={otpForm.handleSubmit(handleOTPSubmit)} className="space-y-4 pt-4">
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="mx-auto text-center">
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="text-center mt-2">
                <Button 
                  type="button" 
                  variant="link" 
                  className="text-sm"
                  onClick={handleResendOTP}
                >
                  Didn't receive the code? Resend
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="sm:flex-1"
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className="sm:flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Verifying..." : "Verify & Login"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default LoginSheet;
