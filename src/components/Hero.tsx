
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import PostOfferDialog from './PostOfferDialog';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [postOfferDialogOpen, setPostOfferDialogOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-soft-blue/20 to-transparent opacity-50"></div>
        <div className="absolute -top-[30%] -right-[20%] w-[70%] h-[70%] rounded-full bg-soft-blue blur-3xl opacity-20"></div>
        <div className="absolute -bottom-[30%] -left-[20%] w-[70%] h-[70%] rounded-full bg-soft-blue blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={staggerChildren}
        >
          <motion.div variants={fadeIn} className="mb-3">
            <span className="inline-block py-1 px-3 bg-soft-blue text-medium-blue rounded-full text-xs font-medium tracking-wide mb-6">
              Exclusive Credit Card Offers
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeIn}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight"
          >
            Share Your Premium Credit Card Offers
            <span className="block text-medium-blue">With Interested Buyers</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeIn}
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Connect with people looking for high-value credit card offers and earn from your unused invitations.
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="rounded-full h-12 px-8 bg-medium-blue hover:bg-medium-blue/90 text-white"
              onClick={() => setPostOfferDialogOpen(true)}
            >
              Post an Offer
            </Button>
            <Button variant="outline" className="rounded-full h-12 px-8 hover:bg-medium-blue hover:text-white transition-all">
              Browse Listings
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 mt-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="glass-card p-8 md:p-10 max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-medium-blue">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">List Your Offers</h3>
              <p className="text-gray-600 text-sm">Share your exclusive credit card invitations for others to use.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-medium-blue">
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Connect with Buyers</h3>
              <p className="text-gray-600 text-sm">Match with interested parties looking for premium credit card access.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-medium-blue">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" x2="9.01" y1="9" y2="9"></line>
                  <line x1="15" x2="15.01" y1="9" y2="9"></line>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Earn Rewards</h3>
              <p className="text-gray-600 text-sm">Get paid for sharing your exclusive credit card invitations.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <PostOfferDialog 
        open={postOfferDialogOpen} 
        onOpenChange={setPostOfferDialogOpen} 
      />
    </section>
  );
};

export default Hero;
