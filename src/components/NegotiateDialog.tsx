
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";

const negotiateSchema = z.object({
  offerPrice: z.string()
    .refine(val => !isNaN(Number(val)), {
      message: "Price must be a number",
    })
    .refine(val => Number(val) > 0, {
      message: "Price must be greater than 0",
    }),
  message: z.string().min(5, "Message must be at least 5 characters").max(500, "Message is too long")
});

type NegotiateFormValues = z.infer<typeof negotiateSchema>;

interface NegotiateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: {
    id: number;
    title: string;
    price: number;
    issuer: string;
  };
}

const NegotiateDialog = ({ open, onOpenChange, listing }: NegotiateDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isLoggedIn } = useAuth();

  const form = useForm<NegotiateFormValues>({
    resolver: zodResolver(negotiateSchema),
    defaultValues: {
      offerPrice: listing.price.toString(),
      message: `Hi, I'm interested in your "${listing.title}" listing. Would you consider this offer?`
    },
  });

  const handleLoginPrompt = () => {
    onOpenChange(false);
    // This function would trigger the login sheet to open
    toast.error("Please log in to negotiate offers");
  };

  const onSubmit = async (data: NegotiateFormValues) => {
    if (!isLoggedIn) {
      handleLoginPrompt();
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Validate offer
      const offerPrice = Number(data.offerPrice);
      if (offerPrice >= listing.price) {
        toast.error("Your offer should be lower than the listing price");
        setIsSubmitting(false);
        return;
      }
      
      // In a real app, this would send the negotiation to the backend
      console.log("Sending negotiation:", {
        listingId: listing.id,
        originalPrice: listing.price,
        offerPrice,
        message: data.message
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Your negotiation has been sent to the seller!");
      onOpenChange(false);
      form.reset({
        offerPrice: listing.price.toString(),
        message: `Hi, I'm interested in your "${listing.title}" listing. Would you consider this offer?`
      });
    } catch (error) {
      console.error("Error sending negotiation:", error);
      toast.error("Failed to send your negotiation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Negotiate Price</DialogTitle>
          <DialogDescription>
            Make an offer for "{listing.title}" from {listing.issuer}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-muted/50 p-4 rounded-md mb-2">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Listing Price:</span>
                <span className="font-semibold">₹{listing.price}</span>
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="offerPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Offer (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter an amount lower than the listing price
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message to Seller</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell the seller why they should accept your offer..." 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Offer"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NegotiateDialog;
