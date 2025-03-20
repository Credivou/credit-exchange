
import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    
    // Simulate form submission
    toast.success("Message sent successfully! We'll get back to you soon.");
    form.reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-off-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block py-1 px-3 bg-soft-blue text-medium-blue rounded-full text-xs font-medium tracking-wide mb-6">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg text-gray-600 mb-8">
              Have questions or feedback about CreditExchange? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="support">Customer Support</SelectItem>
                              <SelectItem value="business">Business Opportunity</SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message here..." 
                              className="min-h-[150px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full rounded-full bg-medium-blue hover:bg-medium-blue/90">
                      Send Message
                    </Button>
                  </form>
                </Form>
              </div>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-8">
                {/* Info Card */}
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-soft-blue flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-medium-blue">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Phone</h3>
                        <p className="text-gray-600">+1 (800) 123-4567</p>
                        <p className="text-gray-600">Mon-Fri, 9AM-6PM EST</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-soft-blue flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-medium-blue">
                          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Email</h3>
                        <p className="text-gray-600">support@creditexchange.com</p>
                        <p className="text-gray-600">We respond within 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-soft-blue flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-medium-blue">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Address</h3>
                        <p className="text-gray-600">123 Financial Avenue</p>
                        <p className="text-gray-600">New York, NY 10001</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* FAQ Section */}
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Is CreditExchange secure?</h3>
                      <p className="text-gray-600">
                        Yes, we implement industry-standard security measures to protect all personal and financial information shared on our platform.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">How do I get paid for my credit card offer?</h3>
                      <p className="text-gray-600">
                        We offer multiple secure payment methods including direct deposit, PayPal, and Venmo for sellers to receive their earnings.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">What if I have an issue with a transaction?</h3>
                      <p className="text-gray-600">
                        Our customer support team is available to help resolve any issues. Contact us through this form or at support@creditexchange.com.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button variant="link" className="text-medium-blue font-medium">
                      View All FAQs
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-12 bg-off-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-white p-4 rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400 mb-4">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <p className="text-gray-500 mb-2">Map placeholder</p>
                <p className="text-gray-600 font-medium">123 Financial Avenue, New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </motion.div>
  );
};

export default Contact;
