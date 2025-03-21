
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Utensils, 
  ShoppingBag, 
  Tv, 
  Plane, 
  Film, 
  Shirt, 
  Home, 
  Gem, 
  Gamepad, 
  Star, 
  Leaf,
} from "lucide-react";
import { allListings } from './listings/ListingsData';

type PostOfferFormValues = {
  category: string;
  description: string;
  cost: string;
};

type CategoryOption = {
  value: string;
  label: string;
  icon: React.ReactNode;
};

type PostOfferDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const PostOfferDialog = ({ open, onOpenChange }: PostOfferDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const categories: CategoryOption[] = [
    { value: "Dining", label: "Dining", icon: <Utensils className="w-5 h-5" /> },
    { value: "E-Commerce", label: "E-Commerce", icon: <ShoppingBag className="w-5 h-5" /> },
    { value: "Electronics", label: "Electronics", icon: <Tv className="w-5 h-5" /> },
    { value: "Travel", label: "Travel", icon: <Plane className="w-5 h-5" /> },
    { value: "Entertainment", label: "Entertainment", icon: <Film className="w-5 h-5" /> },
    { value: "Fashion", label: "Fashion", icon: <Shirt className="w-5 h-5" /> },
    { value: "Footwear", label: "Footwear", icon: <ShoppingBag className="w-5 h-5" /> },
    { value: "Home Needs", label: "Home Needs", icon: <Home className="w-5 h-5" /> },
    { value: "Jewellery", label: "Jewellery", icon: <Gem className="w-5 h-5" /> },
    { value: "PC & Gaming", label: "PC & Gaming", icon: <Gamepad className="w-5 h-5" /> },
    { value: "Popular", label: "Popular", icon: <Star className="w-5 h-5" /> },
    { value: "Wellness", label: "Wellness", icon: <Leaf className="w-5 h-5" /> },
  ];

  const form = useForm<PostOfferFormValues>({
    defaultValues: {
      category: "",
      description: "",
      cost: "",
    },
  });

  const handleNext = () => {
    if (step === 1 && !form.getValues().category) {
      toast.error("Please select a category");
      return;
    }
    
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const onSubmit = (data: PostOfferFormValues) => {
    // Validate required fields
    if (!data.description.trim()) {
      toast.error("Please enter a description");
      return;
    }

    if (!data.cost || Number(data.cost) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    setIsSubmitting(true);
    
    // Create a mock listing
    const newListing = {
      id: Date.now(), // Use timestamp for unique ID
      title: `New ${data.category} Offer`,
      issuer: "User Added",
      price: Number(data.cost),
      benefits: [data.description.slice(0, 50) + "..."],
      image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      featured: false,
      new: true,
      category: data.category,
    };
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form data:", data);
      // In a real app, we would call an API to add this listing
      allListings.unshift(newListing);
      toast.success("Your offer has been posted successfully!");
      setIsSubmitting(false);
      onOpenChange(false);
      // Reset form and step
      form.reset();
      setStep(1);
    }, 1000);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 md:grid-cols-3 gap-4"
                  >
                    {categories.map((category) => (
                      <FormItem key={category.value} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={category.value} />
                        </FormControl>
                        <div className="flex items-center space-x-2">
                          {category.icon}
                          <FormLabel className="font-normal cursor-pointer">
                            {category.label}
                          </FormLabel>
                        </div>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        );
      case 2:
        return (
          <>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Offer Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your credit card offer in detail..." 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Include details like benefits, eligibility criteria, and any special conditions.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Offer Price (₹)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Set the price you want to charge for this offer.
                  </FormDescription>
                </FormItem>
              )}
            />
          </>
        );
      default:
        return null;
    }
  };

  const getDialogTitle = () => {
    switch (step) {
      case 1:
        return "Choose a Category";
      case 2:
        return "Offer Details";
      default:
        return "Post an Offer";
    }
  };

  const getDialogDescription = () => {
    switch (step) {
      case 1:
        return "Select the category that best matches your credit card offer.";
      case 2:
        return "Provide details about your credit card offer.";
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription>
            {getDialogDescription()}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {renderStepContent()}

            <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
              {step > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleBack}
                  className="sm:order-1"
                >
                  Back
                </Button>
              )}
              
              {step < 2 ? (
                <Button 
                  type="button" 
                  onClick={handleNext}
                  className="sm:order-2"
                >
                  Continue
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="sm:order-2"
                >
                  {isSubmitting ? "Posting..." : "Post Offer"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PostOfferDialog;
