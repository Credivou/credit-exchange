
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from '@/components/listings/SearchBar';
import ListingFilters from './components/listings/ListingFilters';
import ListingsGrid from './components/listings/ListingsGrid';
import ListingCTA from '@/components/listings/ListingCTA';
import { allListings, categories, issuers } from '@/components/listings/ListingsData';

const Listings = () => {
  const [listings, setListings] = useState(allListings);
  const [isLoaded, setIsLoaded] = useState(Array(allListings.length).fill(false));
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIssuer, setSelectedIssuer] = useState("All");
  const [priceRange, setPriceRange] = useState([1000, 2000]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);

  const handleImageLoad = (index: number) => {
    const newLoadedState = [...isLoaded];
    newLoadedState[index] = true;
    setIsLoaded(newLoadedState);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedIssuer("All");
    setPriceRange([1000, 2000]);
    setShowFeaturedOnly(false);
    setShowNewOnly(false);
  };

  useEffect(() => {
    // Filter listings based on selected filters
    let filteredListings = allListings;

    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredListings = filteredListings.filter(
        listing => listing.title.toLowerCase().includes(term) || 
                   listing.issuer.toLowerCase().includes(term)
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filteredListings = filteredListings.filter(
        listing => listing.category === selectedCategory
      );
    }

    // Issuer filter
    if (selectedIssuer !== "All") {
      filteredListings = filteredListings.filter(
        listing => listing.issuer === selectedIssuer
      );
    }

    // Price range filter
    filteredListings = filteredListings.filter(
      listing => listing.price >= priceRange[0] && listing.price <= priceRange[1]
    );

    // Featured only filter
    if (showFeaturedOnly) {
      filteredListings = filteredListings.filter(listing => listing.featured);
    }

    // New only filter
    if (showNewOnly) {
      filteredListings = filteredListings.filter(listing => listing.new);
    }

    setListings(filteredListings);
    setIsLoaded(Array(filteredListings.length).fill(false));
  }, [searchTerm, selectedCategory, selectedIssuer, priceRange, showFeaturedOnly, showNewOnly]);

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
              Browse Listings
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Credit Card Offer</h1>
            <p className="text-lg text-gray-600 mb-8">
              Browse our marketplace of exclusive credit card offers from other members
            </p>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <ListingFilters
              categories={categories}
              issuers={issuers}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedIssuer={selectedIssuer}
              setSelectedIssuer={setSelectedIssuer}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              showFeaturedOnly={showFeaturedOnly}
              setShowFeaturedOnly={setShowFeaturedOnly}
              showNewOnly={showNewOnly}
              setShowNewOnly={setShowNewOnly}
              resetFilters={resetFilters}
            />
            
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Available Offers</h2>
                <p className="text-gray-600">{listings.length} listings found</p>
              </div>
              
              <ListingsGrid
                listings={listings}
                isLoaded={isLoaded}
                handleImageLoad={handleImageLoad}
              />
            </div>
          </div>
        </div>
      </section>
      
      <ListingCTA />
      <Footer />
    </motion.div>
  );
};

export default Listings;
