
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import PaymentDialog from "@/components/PaymentDialog";

interface Listing {
  id: number;
  title: string;
  issuer: string;
  price: number;
  benefits: string[];
  image: string;
  featured: boolean;
  new: boolean;
  category: string;
}

interface ListingsGridProps {
  listings: Listing[];
  isLoaded: boolean[];
  handleImageLoad: (index: number) => void;
}

const ListingsGrid = ({ listings, isLoaded, handleImageLoad }: ListingsGridProps) => {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const handlePurchase = (listing: Listing) => {
    setSelectedListing(listing);
    setPaymentDialogOpen(true);
  };

  return (
    <>
      {listings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing, index) => (
            <Card key={listing.id} className="overflow-hidden border border-gray-100 h-full transition-all hover:shadow-md">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 bg-gray-50">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className={`object-cover w-full h-full transition-opacity duration-500 ${isLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => handleImageLoad(index)}
                  />
                  {!isLoaded[index] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="w-8 h-8 border-4 border-t-medium-blue border-b-medium-blue rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  {listing.featured && (
                    <Badge className="bg-medium-blue hover:bg-medium-blue">Featured</Badge>
                  )}
                  {listing.new && (
                    <Badge className="bg-emerald-500 hover:bg-emerald-600">New</Badge>
                  )}
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">{listing.issuer}</div>
                <h3 className="text-lg font-semibold mb-3">{listing.title}</h3>
                <div className="space-y-2">
                  {listing.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start text-sm">
                      <span className="text-emerald-500 mr-2">✓</span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex justify-between items-center border-t border-gray-100 mt-4">
                <div className="text-xl font-semibold text-medium-blue">₹{listing.price}</div>
                <button 
                  className="px-4 py-2 bg-medium-blue text-white rounded-full text-sm font-medium hover:bg-medium-blue/90 transition-colors"
                  onClick={() => handlePurchase(listing)}
                >
                  Purchase Offer
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500 mb-4">No listings available yet</p>
          <p className="text-gray-400 text-sm">Be the first to post an offer!</p>
        </div>
      )}

      {selectedListing && (
        <PaymentDialog 
          open={paymentDialogOpen} 
          onOpenChange={setPaymentDialogOpen} 
          listing={selectedListing} 
        />
      )}
    </>
  );
};

export default ListingsGrid;
