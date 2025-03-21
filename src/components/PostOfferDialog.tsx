
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  Leaf
} from "lucide-react";

type PostOfferFormValues = {
  category: string;
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
    },
  });

  const onSubmit = (data: PostOfferFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Selected category:", data.category);
      toast.success("Category selected successfully! You'll be redirected to the next step.");
      setIsSubmitting(false);
      onOpenChange(false);
      // Here you would typically redirect to a more detailed form
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Choose a Category</DialogTitle>
          <DialogDescription>
            Select the category that best matches your credit card offer.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Continue"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PostOfferDialog;
