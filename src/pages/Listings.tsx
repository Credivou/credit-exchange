import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

// Mock data for credit card listings
const allListings = [
  {
    id: 1,
    title: "Platinum Card Referral",
    issuer: "American Express",
    price: 75,
    benefits: ["60,000 Points Bonus", "Lounge Access", "$200 Travel Credit"],
    image: "https://images.unsplash.com/photo-1580508174046-170816f65662?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    featured: true,
    new: false,
    category: "Travel"
  },
  {
    id: 2,
    title: "Sapphire Reserve Invitation",
    issuer: "Chase",
    price: 65,
    benefits: ["50,000 Points Bonus", "Priority Pass", "$300 Travel Credit"],
    image: "https://images.unsplash.com/photo-1566613769130-c232c300b4bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    featured: true,
    new: true,
    category: "Travel"
  },
  {
    id: 3,
    title: "Venture X Invitation",
    issuer: "Capital One",
    price: 55,
    benefits: ["75,000 Miles Bonus", "Airport Lounges", "$300 Travel Credit"],
    image: "https://images.unsplash.com/photo-1567761790966-29293bbe0f9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    featured: false,
    new: true,
    category: "Travel"
  },
  {
    id: 4,
    title: "Gold Card Referral",
    issuer: "American Express",
    price: 45,
    benefits: ["40,000 Points Bonus", "4x on Dining", "$120 Dining Credit"],
    image: "https://images.unsplash.com/photo-1568913941351-8cfbf180eec8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    featured: false,
    new: false,
    category: "Dining"
  },
  {
    id: 5,
    title: "Freedom Unlimited Referral",
    issuer: "Chase",
    price: 35,
    benefits: ["20,000 Points Bonus", "1.5% Cash Back", "0% APR for 15 months"],
    image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    featured: false,
    new: false,
    category: "Cash Back"
  },
  {
    id: 6,
    title: "Delta SkyMiles Gold Invitation",
    issuer: "American Express",
    price: 60,
    benefits: ["70,000 Miles Bonus", "Free Checked Bag", "Priority Boarding"],
    image: "https://images.unsplash.com/photo-1574302050929-040f740d3cdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    featured: true,
    new: false,
    category: "Airline"
  },
  {
    id: 7,
    title: "Cash Rewards Referral",
    issuer: "Bank of America",
    price: 30,
    benefits: ["$200 Cash Bonus", "3% Category Choice", "0% APR for 15 months"],
    image: "https://images.unsplash.com/photo-1559762717-99c81ac85459?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    featured: false,
    new: true,
    category: "Cash Back"
  },
  {
    id: 8,
    title: "Marriott Bonvoy Brilliant Offer",
    issuer: "American Express",
    price: 70,
    benefits: ["95,000 Points Bonus", "$300 Hotel Credit", "Free Night Award"],
    image: "https://images.unsplash.com/photo-1571956603139-91c2ee25a6d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    featured: true,
    new: false,
    category: "Hotel"
  }
];

// Categories and issuers for filters
const categories = ["All", "Travel", "Dining", "Cash Back", "Airline", "Hotel"];
const issuers = ["All", "American Express", "Chase", "Capital One", "Bank of America"];

const Listings = () => {
  const [listings, setListings] = useState(allListings);
  const [isLoaded, setIsLoaded] = useState<boolean[]>(Array(allListings.length).fill(false));
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIssuer, setSelectedIssuer] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);

  const handleImageLoad = (index: number) => {
    const newLoadedState = [...isLoaded];
    newLoadedState[index] = true;
    setIsLoaded(newLoadedState);
  };

  useEffect(() => {
    // Filter listings based on selected filters
    let filteredListings = allListings;

    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredListings = filteredListings.filter(
        listing => 
          listing.title.toLowerCase().includes(term) || 
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
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Search for credit card offers..." 
                  className="pr-10 h-12 rounded-full shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Listings Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
                <h3 className="text-lg font-semibold mb-6">Filters</h3>
                
                <div className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <Label htmlFor="category" className="block mb-2 text-sm font-medium">Card Category</Label>
                    <Select onValueChange={setSelectedCategory} defaultValue={selectedCategory}>
                      <SelectTrigger id="category" className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Issuer Filter */}
                  <div>
                    <Label htmlFor="issuer" className="block mb-2 text-sm font-medium">Card Issuer</Label>
                    <Select onValueChange={setSelectedIssuer} defaultValue={selectedIssuer}>
                      <SelectTrigger id="issuer" className="w-full">
                        <SelectValue placeholder="Select issuer" />
                      </SelectTrigger>
                      <SelectContent>
                        {issuers.map(issuer => (
                          <SelectItem key={issuer} value={issuer}>{issuer}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Price Range Filter */}
                  <div>
                    <Label htmlFor="price-range" className="block mb-4 text-sm font-medium">Price Range: ${priceRange[0]} - ${priceRange[1]}</Label>
                    <Slider
                      id="price-range"
                      defaultValue={[0, 100]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(value) => setPriceRange(value as number[])}
                      className="my-6"
                    />
                  </div>
                  
                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="featured" 
                        checked={showFeaturedOnly}
                        onCheckedChange={(checked) => setShowFeaturedOnly(checked as boolean)}
                      />
                      <Label htmlFor="featured" className="text-sm font-medium">Featured Offers Only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="new" 
                        checked={showNewOnly}
                        onCheckedChange={(checked) => setShowNewOnly(checked as boolean)}
                      />
                      <Label htmlFor="new" className="text-sm font-medium">New Offers Only</Label>
                    </div>
                  </div>
                  
                  {/* Reset Button */}
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                      setSelectedIssuer("All");
                      setPriceRange([0, 100]);
                      setShowFeaturedOnly(false);
                      setShowNewOnly(false);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Listings Grid */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Available Offers</h2>
                <p className="text-gray-600">{listings.length} listings found</p>
              </div>
              
              {listings.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                  <h3 className="text-xl font-semibold mb-2">No Listings Found</h3>
                  <p className="text-gray-600">Try adjusting your filters to find more results.</p>
                </div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.05
                      }
                    }
                  }}
                >
                  {listings.map((listing, index) => (
                    <motion.div 
                      key={listing.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                      }}
                    >
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
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
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
      
      <Footer />
    </motion.div>
  );
};

export default Listings;
