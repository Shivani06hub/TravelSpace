import Link from 'next/link';
import { Star, Clock, MapPin, IndianRupee, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package } from '@/lib/types';

interface PackageCardProps {
  pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={pkg.imageURL} 
          alt={pkg.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary hover:bg-primary text-white font-semibold">
            {pkg.category}
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-sm font-medium">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
          {pkg.rating}
        </div>
      </div>
      
      <CardContent className="p-6 flex-1">
        <div className="flex items-center text-muted-foreground text-xs mb-2 font-bold uppercase tracking-wider">
          <Clock className="h-3 w-3 mr-1" />
          {pkg.duration}
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">{pkg.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {pkg.description}
        </p>
        <div className="flex items-baseline space-x-1">
          <IndianRupee className="h-4 w-4 text-primary" />
          <span className="text-2xl font-bold text-primary">{pkg.price.toLocaleString()}</span>
          <span className="text-muted-foreground text-sm">/ person</span>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white group-hover:bg-accent group-hover:text-black transition-all">
          <Link href={`/packages/${pkg.id}`} className="flex items-center justify-center gap-2">
            View Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}