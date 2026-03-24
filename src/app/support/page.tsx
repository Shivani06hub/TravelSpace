"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, ShieldQuestion, HelpCircle, LifeBuoy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Support() {
  const { toast } = useToast();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Our support team will get back to you within 24 hours.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-16 md:px-6 space-y-20">
      {/* About Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold bg-primary/10 text-primary">
            Our Story
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Redefining the <br /> <span className="text-primary">Travel Experience.</span></h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Founded in 2010, TravelSphere began with a simple mission: to make luxury travel accessible to everyone. We believe that seeing the world shouldn't be a hassle, it should be an inspiration.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div>
              <p className="text-3xl font-bold text-primary">50k+</p>
              <p className="text-sm font-medium text-muted-foreground">Happy Travelers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">120+</p>
              <p className="text-sm font-medium text-muted-foreground">Destinations</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://picsum.photos/seed/about/800/600" 
            alt="Team" 
            className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
          />
          <div className="absolute -bottom-6 -left-6 bg-accent p-6 rounded-2xl shadow-xl hidden md:block">
            <p className="font-bold text-lg">Top Travel Agency 2023</p>
            <p className="text-sm opacity-80">Global Tourism Awards</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Find quick answers to common questions about bookings, refunds, and more.</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left font-bold py-6 hover:text-primary">How do I cancel my booking?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              You can cancel your booking directly from your profile dashboard. Go to 'My Bookings', select the trip you wish to cancel, and click 'Cancel Booking'. Please note that cancellation fees may apply based on how close you are to the travel date.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left font-bold py-6 hover:text-primary">What is your refund policy?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              We offer full refunds for cancellations made at least 48 hours before the trip start time. For cancellations made within 24-48 hours, a 50% refund is issued. Cancellations within 24 hours are non-refundable.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left font-bold py-6 hover:text-primary">Are flights included in the packages?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Standard packages usually include land-only services (hotel, transfers, sightseeing). However, we do offer "Flight-Inclusive" variants for most destinations. Check the 'What's Included' section of the package details.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left font-bold py-6 hover:text-primary">Can I customize an itinerary?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Absolutely! Our AI-Powered travel tool can suggest enhancements, and our human experts can further customize the package to fit your specific needs and interests.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Contact Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="text-muted-foreground">Have a specific question or need help with a custom booking? Send us a message and our experts will help you out.</p>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-xl"><Mail className="text-primary h-6 w-6" /></div>
              <div>
                <p className="font-bold">Email Support</p>
                <p className="text-sm text-muted-foreground">support@travelsphere.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-xl"><Phone className="text-primary h-6 w-6" /></div>
              <div>
                <p className="font-bold">Call Us</p>
                <p className="text-sm text-muted-foreground">+1 (234) 567-890</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-xl"><MapPin className="text-primary h-6 w-6" /></div>
              <div>
                <p className="font-bold">Office Headquarters</p>
                <p className="text-sm text-muted-foreground">123 Travel Way, Adventure City, NY 10001</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="shadow-2xl border-primary/10">
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
            <CardDescription>We'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your Name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@example.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What is this regarding?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Tell us how we can help..." className="min-h-[120px]" required />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}