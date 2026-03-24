import Link from 'next/link';
import { Hero } from '@/components/home/Hero';
import { PackageCard } from '@/components/packages/PackageCard';
import { PACKAGES } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Compass, ShieldCheck, Headphones, Map, Sparkles, IndianRupee } from 'lucide-react';

export default function Home() {
  const featured = PACKAGES.slice(0, 3);
  const budgetDeals = PACKAGES.filter(p => p.price < 10000);

  return (
    <div className="flex flex-col gap-16 pb-20">
      <Hero />

      {/* Featured Destinations */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold bg-accent/20 text-accent-foreground">
              <Sparkles className="h-4 w-4 mr-2" />
              Handpicked for you
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Destinations</h2>
            <p className="text-muted-foreground">Our most popular travel packages this season.</p>
          </div>
          <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary hover:text-white">
            <Link href="/packages">View All Destinations</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Budget-Friendly Deals</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Explore incredible destinations without breaking the bank. Exclusive offers under ₹10,000.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {budgetDeals.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-border">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Map className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-xl">Best Destinations</h3>
            <p className="text-sm text-muted-foreground">We carefully select destinations based on safety, beauty, and experience.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-border">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-xl">Trust & Safety</h3>
            <p className="text-sm text-muted-foreground">Verified operators and secured payment gateways for a worry-free booking.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-border">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <IndianRupee className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-xl">Price Guarantee</h3>
            <p className="text-sm text-muted-foreground">No hidden charges. We offer competitive pricing for all luxury experiences.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-border">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Headphones className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-xl">24/7 Support</h3>
            <p className="text-sm text-muted-foreground">Our dedicated concierge team is available around the clock to assist you.</p>
          </div>
        </div>
      </section>

      {/* App Promo / Call to action */}
      <section className="container mx-auto px-4 md:px-6 mb-10">
        <div className="bg-primary rounded-3xl p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 space-y-6 md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">Ready for your <br /> next journey?</h2>
            <p className="text-primary-foreground/80 text-lg">Join 50,000+ travelers who found their dream vacation with TravelSphere.</p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-black font-bold h-14 px-8 text-lg rounded-full">
              Get Started Now
            </Button>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            <Compass className="w-48 h-48 md:w-64 md:h-64 text-white/10 absolute -right-10 -bottom-10 rotate-12" />
            <img 
              src="https://picsum.photos/seed/promo/600/400" 
              alt="Promo" 
              className="rounded-2xl shadow-2xl relative z-10 w-full max-w-sm"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
