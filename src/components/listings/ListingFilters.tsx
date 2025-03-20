
import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface ListingFiltersProps {
  categories: string[];
  issuers: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedIssuer: string;
  setSelectedIssuer: (issuer: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  showFeaturedOnly: boolean;
  setShowFeaturedOnly: (featured: boolean) => void;
  showNewOnly: boolean;
  setShowNewOnly: (newOnly: boolean) => void;
  resetFilters: () => void;
}

const ListingFilters = ({
  categories,
  issuers,
  selectedCategory,
  setSelectedCategory,
  selectedIssuer,
  setSelectedIssuer,
  priceRange,
  setPriceRange,
  showFeaturedOnly,
  setShowFeaturedOnly,
  showNewOnly,
  setShowNewOnly,
  resetFilters
}: ListingFiltersProps) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
        <h3 className="text-lg font-semibold mb-6">Filters</h3>
        
        <div className="space-y-6">
          {/* Category Filter */}
          <div>
            <Label htmlFor="category" className="block mb-2 text-sm font-medium">Card Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
            <Select value={selectedIssuer} onValueChange={setSelectedIssuer}>
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
            <Label htmlFor="price-range" className="block mb-4 text-sm font-medium">Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</Label>
            <Slider
              id="price-range"
              value={priceRange}
              min={1000}
              max={2000}
              step={50}
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
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListingFilters;
