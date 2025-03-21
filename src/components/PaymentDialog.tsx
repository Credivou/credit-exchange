
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CreditCard, Landmark, Smartphone } from "lucide-react";

type PaymentFormValues = {
  paymentMethod: string;
};

type PaymentOption = {
  value: string;
  label: string;
  icon: React.ReactNode;
};

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: {
    id: number;
    title: string;
    price: number;
  };
}

const PaymentDialog = ({ open, onOpenChange, listing }: PaymentDialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentOptions: PaymentOption[] = [
    { value: "Credit/Debit Card", label: "Credit/Debit Card", icon: <CreditCard className="w-5 h-5" /> },
    { value: "Net Banking", label: "Net Banking", icon: <Landmark className="w-5 h-5" /> },
    { value: "UPI", label: "UPI", icon: <Smartphone className="w-5 h-5" /> },
  ];

  const form = useForm<PaymentFormValues>({
    defaultValues: {
      paymentMethod: "",
    },
  });

  const onSubmit = (data: PaymentFormValues) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      console.log("Payment data:", data);
      toast.success(`Payment of ₹${listing.price} completed successfully!`);
      setIsProcessing(false);
      onOpenChange(false);
      form.reset();
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
          <DialogDescription>
            Select a payment method to purchase "{listing.title}"
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 my-2 border-y">
          <div className="flex justify-between">
            <span className="text-gray-600">Offer Price:</span>
            <span className="font-semibold">₹{listing.price}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-600">Platform Fee:</span>
            <span className="font-semibold">₹{Math.round(listing.price * 0.05)}</span>
          </div>
          <div className="flex justify-between mt-4 pt-2 border-t">
            <span className="font-bold">Total:</span>
            <span className="font-bold text-medium-blue">₹{listing.price + Math.round(listing.price * 0.05)}</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-3"
                    >
                      {paymentOptions.map((option) => (
                        <FormItem key={option.value} className="flex items-center space-x-3 space-y-0 p-3 border rounded-md hover:bg-slate-50">
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <div className="flex items-center space-x-2">
                            {option.icon}
                            <FormLabel className="font-normal cursor-pointer">
                              {option.label}
                            </FormLabel>
                          </div>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button 
                type="submit"
                disabled={isProcessing || !form.getValues().paymentMethod}
                className="w-full"
              >
                {isProcessing ? "Processing..." : "Complete Payment"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
