
import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion, useInView } from 'framer-motion';

// Mock data for credit card listings
const mockListings = [
  {
    id: 1,
    title: "Platinum Card Referral",
    issuer: "American Express",
    price: 75,
    benefits: ["60,000 Points Bonus", "Lounge Access", "$200 Travel Credit"],
    image: "https://images.unsplash.com/photo-1580508174046-170816f65662?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    featured: true,
    new: false
  },
  {
    id: 2,
    title: "Sapphire Reserve Invitation",
    issuer: "Chase",
    price: 65,
    benefits: ["50,000 Points Bonus", "Priority Pass", "$300 Travel Credit"],
    image: "https://images.unsplash.com/photo-1566613769130-c232c300b4bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    featured: true,
    new: true
  },
  {
    id: 3,
    title: "Venture X Invitation",
    issuer: "Capital One",
    price: 55,
    benefits: ["75,000 Miles Bonus", "Airport Lounges", "$300 Travel Credit"],
    image: "https://images.unsplash.com/photo-1567761790966-29293bbe0f9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    featured: false,
    new: true
  },
  {
    id: 4,
    title: "Gold Card Referral",
    issuer: "American Express",
    price: 45,
    benefits: ["40,000 Points Bonus", "4x on Dining", "$120 Dining Credit"],
    image: "https://images.unsplash.com/photo-1568913941351-8cfbf180eec8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    featured: false,
    new: false
  }
];

const FeaturedListings = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -200px 0px" });
  const [isLoaded, setIsLoaded] = useState<boolean[]>(Array(mockListings.length).fill(false));

  const handleImageLoad = (index: number) => {
    const newLoadedState = [...isLoaded];
    newLoadedState[index] = true;
    setIsLoaded(newLoadedState);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 bg-off-white relative" id="featured-listings">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Listings</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our most popular credit card offers currently available from other members
          </p>
        </div>

        <motion.div 
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {mockListings.map((listing, index) => (
            <motion.div key={listing.id} variants={item} className="h-full">
              <Card className="h-full overflow-hidden hover:shadow-md transition-all duration-300 border-0 shadow-sm">
                <div className="relative h-48 bg-gray-100">
                  {!isLoaded[index] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="w-8 h-8 border-2 border-medium-blue border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => handleImageLoad(index)}
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {listing.featured && (
                      <Badge variant="secondary" className="bg-medium-blue text-white hover:bg-medium-blue">
                        Featured
                      </Badge>
                    )}
                    {listing.new && (
                      <Badge variant="secondary" className="bg-black text-white hover:bg-black/90">
                        New
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-1">{listing.issuer}</div>
                    <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {listing.benefits.map((benefit, i) => (
                        <Badge key={i} variant="outline" className="font-normal text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-semibold">${listing.price}</span>
                    <Button variant="outline" className="rounded-full hover:bg-medium-blue hover:text-white">
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Button className="rounded-full px-8 py-6 bg-medium-blue hover:bg-medium-blue/90">
            View All Listings
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
