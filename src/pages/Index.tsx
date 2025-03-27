
import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedListings from "@/components/FeaturedListings";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import SignUpSheet from "@/components/auth/SignUpSheet";
import LoginSheet from "@/components/auth/LoginSheet";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleLoginSuccess = () => {
    console.log("Login successful");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Navbar />
      <Hero />
      <FeaturedListings />
      
      {/* Call to Action Section */}
      <section className="py-24 bg-medium-blue relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-[150px] -right-[100px] w-[600px] h-[600px] rounded-full bg-blue-400 opacity-10"></div>
          <div className="absolute -bottom-[150px] -left-[100px] w-[600px] h-[600px] rounded-full bg-blue-300 opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Share Your Exclusive Credit Card Offers?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Join our marketplace today and start earning from your unused credit card invitations
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {isLoggedIn ? (
                <Button size="lg" className="bg-white text-medium-blue hover:bg-white/90 rounded-full">
                  Browse Listings
                </Button>
              ) : (
                <>
                  <Button 
                    size="lg" 
                    className="bg-white text-medium-blue hover:bg-white/90 rounded-full"
                    onClick={() => setIsSignUpOpen(true)}
                  >
                    Sign Up Now
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-white border-white hover:bg-white/10 rounded-full"
                    onClick={() => setIsLoginOpen(true)}
                  >
                    Log In
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      
      {/* Auth Modals */}
      <SignUpSheet 
        open={isSignUpOpen} 
        onOpenChange={setIsSignUpOpen}
        onSuccess={() => setIsLoginOpen(true)}
      />
      
      <LoginSheet 
        open={isLoginOpen} 
        onOpenChange={setIsLoginOpen}
        onLoginSuccess={handleLoginSuccess}
      />
    </motion.div>
  );
};

export default Index;
