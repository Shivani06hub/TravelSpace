"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const router = useRouter();
  const [dest, setDest] = useState('');
  const [budget, setBudget] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (dest) params.set('dest', dest);
    if (budget) params.set('budget', budget);
    router.push(`/packages?${params.toString()}`);
  };

  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg')?.imageUrl || '';

  return (
    <div className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Explore the World, <br />
          <span className="text-accent">Create Memories.</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow">
          Find exclusive travel packages curated just for you. From serene beaches to majestic mountains, your next adventure starts here.
        </p>

        <Card className="max-w-4xl mx-auto p-4 md:p-6 shadow-2xl bg-background/95 backdrop-blur">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block text-left px-1">Destination</label>
              <div className="flex items-center border rounded-md px-3 bg-white">
                <MapPin className="h-5 w-5 text-primary mr-2" />
                <Input 
                  placeholder="Where to?" 
                  className="border-0 shadow-none focus-visible:ring-0 p-2"
                  value={dest}
                  onChange={(e) => setDest(e.target.value)}
                />
              </div>
            </div>
            <div className="relative">
              <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block text-left px-1">Budget (Under ₹)</label>
              <div className="flex items-center border rounded-md px-3 bg-white">
                <IndianRupee className="h-5 w-5 text-primary mr-2" />
                <Input 
                  type="number"
                  placeholder="Max Price" 
                  className="border-0 shadow-none focus-visible:ring-0 p-2"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleSearch}
                className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-bold gap-2 text-lg"
              >
                <Search className="h-5 w-5" />
                Search Packages
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}