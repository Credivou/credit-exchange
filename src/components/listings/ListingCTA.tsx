
import React from 'react';
import { Button } from "@/components/ui/button";

const ListingCTA = () => {
  return (
    <section className="py-20 bg-off-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-medium-blue rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Have a credit card offer to share?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              List your exclusive credit card invitation and start earning today
            </p>
            <Button size="lg" className="bg-white text-medium-blue hover:bg-white/90 rounded-full">
              Post Your Offer
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingCTA;
