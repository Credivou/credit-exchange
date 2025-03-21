
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import PostOfferDialog from "@/components/PostOfferDialog";

const ListingCTA = () => {
  const [postOfferDialogOpen, setPostOfferDialogOpen] = useState(false);

  return (
    <>
      <section className="py-20 bg-off-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-medium-blue rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Share Your Exclusive Credit Card Offers?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Join our marketplace today and start earning from your unused credit card invitations
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-medium-blue hover:bg-white/90 rounded-full"
                  onClick={() => setPostOfferDialogOpen(true)}
                >
                  Post an Offer
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-full">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <PostOfferDialog
        open={postOfferDialogOpen}
        onOpenChange={setPostOfferDialogOpen}
      />
    </>
  );
};

export default ListingCTA;
