"use client"

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { getPackageById } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { generatePreTravelTips } from '@/ai/flows/ai-pre-travel-tip-generator';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Star, 
  IndianRupee, 
  ShieldCheck, 
  Info, 
  Sparkles,
  Loader2,
  CalendarDays,
  Utensils,
  Hotel,
  Bus,
  Compass
} from 'lucide-react';

export default function PackageDetails() {
  const { id } = useParams();
  const router = useRouter();
  const pkg = getPackageById(id as string);
  
  const [aiTips, setAiTips] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!pkg) return <div className="p-20 text-center">Package not found</div>;

  const handleGenerateTips = async () => {
    setIsGenerating(true);
    try {
      const result = await generatePreTravelTips({
        destination: pkg.title,
        packageType: pkg.category
      });
      setAiTips(result.tips);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      {/* Breadcrumb / Back button */}
      <Button variant="ghost" onClick={() => router.back()} className="mb-6 -ml-4">
        ← Back to Destinations
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="relative h-[400px] rounded-3xl overflow-hidden group">
            <img src={pkg.imageURL} alt={pkg.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white space-y-2">
              <div className="flex items-center space-x-2">
                <Badge className="bg-primary hover:bg-primary border-0">{pkg.category}</Badge>
                <div className="flex items-center text-sm font-semibold">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                  {pkg.rating} (120+ reviews)
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{pkg.title}</h1>
              <div className="flex items-center space-x-4 text-white/90">
                <span className="flex items-center text-sm"><Clock className="h-4 w-4 mr-1" /> {pkg.duration}</span>
                <span className="flex items-center text-sm"><MapPin className="h-4 w-4 mr-1" /> Multiple Sites</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-14 bg-transparent space-x-8">
              <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none text-lg">Overview</TabsTrigger>
              <TabsTrigger value="itinerary" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none text-lg">Itinerary</TabsTrigger>
              <TabsTrigger value="included" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none text-lg">What's Included</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-6 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">About this trip</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {pkg.description} Experience the best of what {pkg.category} travel has to offer with our expertly crafted route. 
                  This package is designed for travelers who want a balance of popular highlights and hidden gems.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
                <div className="p-4 rounded-xl border bg-secondary/20 flex flex-col items-center text-center">
                  <Hotel className="h-6 w-6 text-primary mb-2" />
                  <span className="text-xs font-bold uppercase">Stay</span>
                  <span className="text-sm font-medium">4 Star Hotels</span>
                </div>
                <div className="p-4 rounded-xl border bg-secondary/20 flex flex-col items-center text-center">
                  <Utensils className="h-6 w-6 text-primary mb-2" />
                  <span className="text-xs font-bold uppercase">Meals</span>
                  <span className="text-sm font-medium">B & D included</span>
                </div>
                <div className="p-4 rounded-xl border bg-secondary/20 flex flex-col items-center text-center">
                  <Bus className="h-6 w-6 text-primary mb-2" />
                  <span className="text-xs font-bold uppercase">Transport</span>
                  <span className="text-sm font-medium">Private AC Van</span>
                </div>
                <div className="p-4 rounded-xl border bg-secondary/20 flex flex-col items-center text-center">
                  <CalendarDays className="h-6 w-6 text-primary mb-2" />
                  <span className="text-xs font-bold uppercase">Duration</span>
                  <span className="text-sm font-medium">{pkg.duration.split('/')[0]}</span>
                </div>
              </div>

              {/* AI Suggestion Tool section */}
              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">TravelSphere AI Planner</h3>
                    <p className="text-sm text-muted-foreground">Generate personalized travel tips for this destination.</p>
                  </div>
                </div>
                
                {aiTips.length > 0 ? (
                  <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {aiTips.map((tip, idx) => (
                      <div key={idx} className="flex items-start space-x-2 bg-white p-3 rounded-lg border shadow-sm">
                        <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm">{tip}</p>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={handleGenerateTips} disabled={isGenerating}>
                      {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh Tips"}
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handleGenerateTips} disabled={isGenerating} className="w-full sm:w-auto">
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Tips...
                      </>
                    ) : (
                      "Get AI Travel Tips"
                    )}
                  </Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="itinerary" className="pt-6">
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/20 before:to-transparent">
                {pkg.itinerary.map((day, index) => (
                  <div key={index} className="relative flex items-start group">
                    <div className="absolute left-0 mt-1.5 h-10 w-10 rounded-full border-4 border-background bg-primary flex items-center justify-center text-white text-xs font-bold z-10">
                      {index + 1}
                    </div>
                    <div className="ml-16 bg-white p-6 rounded-2xl border shadow-sm group-hover:shadow-md transition-shadow flex-1">
                      <h4 className="font-bold text-lg mb-2">{day.split(':')[0]}</h4>
                      <p className="text-muted-foreground">{day.split(':')[1] || 'Free time for leisure and personal exploration.'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="included" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center text-primary">
                    <CheckCircle2 className="h-6 w-6 mr-2" /> What's Included
                  </h3>
                  <ul className="space-y-4">
                    {pkg.services.map((service, idx) => (
                      <li key={idx} className="flex items-center text-muted-foreground">
                        <div className="h-2 w-2 rounded-full bg-accent mr-3" />
                        {service}
                      </li>
                    ))}
                    <li className="flex items-center text-muted-foreground">
                      <div className="h-2 w-2 rounded-full bg-accent mr-3" />
                      All Entrance Fees to Monuments
                    </li>
                  </ul>
                </Card>
                <Card className="p-6 bg-secondary/10">
                  <h3 className="font-bold text-xl mb-4">Good to Know</h3>
                  <ul className="space-y-4 text-sm text-muted-foreground">
                    <li>• Free cancellation up to 48 hours before travel.</li>
                    <li>• Please carry a valid Photo ID for entry to sites.</li>
                    <li>• Insurance coverage is included for accidental injuries.</li>
                    <li>• Professional photographers can be arranged at extra cost.</li>
                  </ul>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Persistent Booking Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24 shadow-xl border-primary/20 bg-background/95 backdrop-blur overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Compass className="h-24 w-24 text-primary" />
            </div>
            
            <div className="relative space-y-6">
              <div>
                <p className="text-sm font-bold uppercase text-muted-foreground mb-1">Total Price</p>
                <div className="flex items-baseline space-x-1">
                  <IndianRupee className="h-6 w-6 text-primary" />
                  <span className="text-4xl font-black text-primary">{pkg.price.toLocaleString()}</span>
                  <span className="text-muted-foreground font-medium">/ person</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">*Taxes & fees included</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm font-bold">
                  <span>Travel Date</span>
                  <span className="text-primary cursor-pointer hover:underline">Choose Date</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold">
                  <span>Travelers</span>
                  <div className="flex items-center space-x-3 bg-secondary/50 rounded-lg px-2 py-1">
                    <button className="h-6 w-6 rounded border flex items-center justify-center">-</button>
                    <span>2</span>
                    <button className="h-6 w-6 rounded border flex items-center justify-center">+</button>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button 
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/20"
                  asChild
                >
                  <a href="/checkout">Book Now</a>
                </Button>
                <p className="text-center text-xs text-muted-foreground font-medium flex items-center justify-center">
                  <ShieldCheck className="h-3 w-3 mr-1" /> Secure & Encrypted Payment
                </p>
              </div>

              <div className="bg-secondary/30 p-4 rounded-xl space-y-2">
                <h4 className="text-sm font-bold">Need Help Booking?</h4>
                <p className="text-xs text-muted-foreground">Call us at <span className="text-primary font-bold">+1 (234) 567-890</span> or chat with our experts.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
