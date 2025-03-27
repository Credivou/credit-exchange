
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countriesData } from "@/utils/countriesData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  countryCode: z.string().min(1, "Country code is required"),
  phone: z.string().min(4, "Please enter a valid phone number"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
});

type SignUpValues = z.infer<typeof signUpSchema>;

interface SignUpSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const SignUpSheet = ({ open, onOpenChange, onSuccess }: SignUpSheetProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const { signUp, loginWithGoogle } = useAuth();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      countryCode: "+1",
      phone: "",
      country: "",
      city: "",
    },
  });

  // Watch the country field to update cities
  const selectedCountry = form.watch("country");

  // Update cities when country changes
  useEffect(() => {
    if (selectedCountry) {
      const country = countriesData.find(c => c.name === selectedCountry);
      if (country) {
        setAvailableCities(country.cities);
        
        // Also update the country code
        form.setValue("countryCode", country.code);
        
        // Reset city when country changes
        form.setValue("city", "");
      }
    }
  }, [selectedCountry, form]);

  const onSubmit = async (data: SignUpValues) => {
    setIsSubmitting(true);
    
    try {
      // Combine country code and phone number
      const fullPhone = `${data.countryCode}${data.phone}`;
      
      // Pass user data to auth context
      await signUp({
        name: data.name,
        email: data.email,
        phone: fullPhone,
        country: data.country,
        city: data.city
      });
      
      toast.success("Account created successfully! You can now log in with a verification code.");
      form.reset();
      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      console.error("Error creating account:", error);
      
      if (error.message?.includes("already registered")) {
        toast.error("This email is already registered. Please log in instead.");
      } else {
        toast.error("Failed to create account. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await loginWithGoogle();
      // No need for toast here as the page will redirect
    } catch (error) {
      // Error is handled in the loginWithGoogle function
    }
  };

  // Function to get flag emoji for a country
  const getCountryFlag = (countryName: string) => {
    // Map of country names to ISO 3166-1 alpha-2 codes
    const countryCodes: Record<string, string> = {
      "United States": "US", "United Kingdom": "GB", "Canada": "CA", "Australia": "AU",
      "Germany": "DE", "France": "FR", "India": "IN", "China": "CN", "Japan": "JP",
      "Brazil": "BR", "Italy": "IT", "Spain": "ES", "Mexico": "MX", "South Korea": "KR",
      "Netherlands": "NL", "South Africa": "ZA", "Turkey": "TR", "Malaysia": "MY",
      "Indonesia": "ID", "Singapore": "SG", "Russia": "RU", "Israel": "IL", "Greece": "GR",
      "Portugal": "PT", "Sweden": "SE", "Norway": "NO", "Denmark": "DK", "Finland": "FI",
      "Poland": "PL", "Switzerland": "CH", "Austria": "AT", "Belgium": "BE", "Ireland": "IE",
      "New Zealand": "NZ", "Thailand": "TH", "Vietnam": "VN", "Philippines": "PH",
      "Egypt": "EG", "Argentina": "AR", "Chile": "CL", "Colombia": "CO", "Peru": "PE",
      "Nigeria": "NG", "Kenya": "KE", "Ghana": "GH", "Morocco": "MA", "Saudi Arabia": "SA",
      "United Arab Emirates": "AE", "Qatar": "QA", "Kuwait": "KW", "Bahrain": "BH",
      "Pakistan": "PK", "Bangladesh": "BD", "Sri Lanka": "LK", "Nepal": "NP"
    };
    
    const code = countryCodes[countryName] || "";
    if (!code) return "";
    
    // Convert country code to regional indicator symbols (flag emoji)
    return code
      .toUpperCase()
      .split('')
      .map(char => String.fromCodePoint(char.charCodeAt(0) + 127397))
      .join('');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle>Create an account</SheetTitle>
          <SheetDescription>
            Join Credivou to share exclusive credit card offers and more.
          </SheetDescription>
        </SheetHeader>
        
        <div className="pt-4 pb-2">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleGoogleSignUp}
          >
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            Sign up with Google
          </Button>
        </div>
        
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or with email</span>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex gap-2 items-start">
              <FormField
                control={form.control}
                name="countryCode"
                render={({ field }) => (
                  <FormItem className="w-1/4">
                    <FormLabel>Code</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Code" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <ScrollArea className="h-[200px]">
                          {countriesData.map(country => (
                            <SelectItem 
                              key={country.code} 
                              value={country.code}
                            >
                              <span className="mr-2">{getCountryFlag(country.name)}</span>
                              {country.code}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className="h-[200px]">
                        {countriesData.map(country => (
                          <SelectItem key={country.name} value={country.name}>
                            <span className="mr-2">{getCountryFlag(country.name)}</span>
                            {country.name}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!selectedCountry || availableCities.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your city" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className="h-[200px]">
                        {availableCities.map(city => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default SignUpSheet;
