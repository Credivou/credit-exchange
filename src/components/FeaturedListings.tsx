
import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion, useInView } from 'framer-motion';
import { allListings } from './listings/ListingsData';
import { useNavigate } from 'react-router-dom';

const FeaturedListings = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { once: true, margin: "0px 0px -200px 0px" });
  const [isLoaded, setIsLoaded] = useState<boolean[]>([]);
  const [featuredListings, setFeaturedListings] = useState([]);

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

  useEffect(() => {
    // Use the real listings array for featured listings
    setFeaturedListings(allListings.filter(listing => listing.featured).slice(0, 4));
    setIsLoaded(Array(allListings.filter(listing => listing.featured).length).fill(false));
  }, [allListings.length]);

  const handleViewAllClick = () => {
    navigate('/listings');
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
          {featuredListings.length > 0 ? (
            featuredListings.map((listing, index) => (
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
                      <span className="text-xl font-semibold">₹{listing.price}</span>
                      <Button variant="outline" className="rounded-full hover:bg-medium-blue hover:text-white">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-4 text-center py-12">
              <p className="text-gray-500">No featured listings yet</p>
            </div>
          )}
        </motion.div>

        <div className="text-center mt-12">
          <Button 
            className="rounded-full px-8 py-6 bg-medium-blue hover:bg-medium-blue/90"
            onClick={handleViewAllClick}
          >
            View All Listings
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
