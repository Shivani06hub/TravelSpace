"use client"

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PackageCard } from '@/components/packages/PackageCard';
import { filterPackages } from '@/lib/db';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, MapPin, Tag } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function PackagesListing() {
  const searchParams = useSearchParams();
  
  const [dest, setDest] = useState(searchParams.get('dest') || '');
  const [budget, setBudget] = useState(searchParams.get('budget') ? parseInt(searchParams.get('budget')!) : 100000);
  const [category, setCategory] = useState(searchParams.get('category') || 'All');

  const filtered = filterPackages(dest, budget.toString(), category);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="flex flex-col space-y-2 mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Explore Destinations</h1>
        <p className="text-muted-foreground">Found {filtered.length} amazing travel packages matching your preference.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <Card className="p-6 sticky top-24 shadow-sm">
            <div className="flex items-center space-x-2 mb-6 text-primary">
              <SlidersHorizontal className="h-5 w-5" />
              <h2 className="text-lg font-bold">Filters</h2>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <Label className="text-sm font-bold flex items-center">
                  <MapPin className="h-4 w-4 mr-2" /> Destination
                </Label>
                <Input 
                  placeholder="e.g. Goa, Paris..." 
                  value={dest}
                  onChange={(e) => setDest(e.target.value)}
                  className="bg-secondary/30"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-bold flex items-center">
                  <Tag className="h-4 w-4 mr-2" /> Category
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-secondary/30">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Beach">Beach</SelectItem>
                    <SelectItem value="Mountain">Mountain</SelectItem>
                    <SelectItem value="Historical">Historical</SelectItem>
                    <SelectItem value="Adventure">Adventure</SelectItem>
                    <SelectItem value="City">City</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label className="text-sm font-bold">Price Range</Label>
                  <span className="text-sm font-medium text-primary">Under ₹{budget.toLocaleString()}</span>
                </div>
                <Slider 
                  value={[budget]} 
                  onValueChange={(vals) => setBudget(vals[0])} 
                  max={100000} 
                  step={1000}
                  className="py-4"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-bold uppercase">
                  <span>₹0</span>
                  <span>₹100,000+</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full border-primary text-primary"
                onClick={() => {
                  setDest('');
                  setBudget(100000);
                  setCategory('All');
                }}
              >
                Clear All Filters
              </Button>
            </div>
          </Card>
        </aside>

        {/* Results Grid */}
        <div className="lg:col-span-3">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
              <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                <Search className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold">No packages found</h2>
              <p className="text-muted-foreground">Try adjusting your filters or destination keywords.</p>
              <Button onClick={() => { setDest(''); setCategory('All'); setBudget(100000); }}>Reset Search</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}