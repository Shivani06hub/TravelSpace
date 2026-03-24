"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, CreditCard, Landmark, Smartphone, ArrowRight, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Checkout() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleCompleteBooking = () => {
    toast({
      title: "Booking Successful!",
      description: "Your trip has been confirmed. Redirecting to profile...",
    });
    setTimeout(() => router.push('/profile'), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-10 px-4 md:px-0">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className={`flex items-center justify-center h-10 w-10 rounded-full font-bold transition-colors ${step >= s ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'}`}>
              {step > s ? <CheckCircle2 className="h-6 w-6" /> : s}
            </div>
            {s < 3 && (
              <div className={`h-1 flex-1 mx-4 rounded-full transition-colors ${step > s ? 'bg-primary' : 'bg-secondary'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Forms */}
        <div className="md:col-span-2 space-y-6">
          {step === 1 && (
            <Card className="animate-in fade-in duration-500">
              <CardHeader>
                <CardTitle>Traveler Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+91 9876543210" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleNext} className="gap-2">
                  Continue to Payment <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card className="animate-in fade-in duration-500">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid gap-4">
                  <Label
                    htmlFor="upi"
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-secondary/30 transition-colors ${paymentMethod === 'UPI' ? 'border-primary bg-primary/5' : ''}`}
                  >
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-5 w-5 text-primary" />
                      <div className="space-y-1">
                        <p className="font-bold">UPI Payment</p>
                        <p className="text-xs text-muted-foreground">Pay via Google Pay, PhonePe, or BHIM</p>
                      </div>
                    </div>
                    <RadioGroupItem value="UPI" id="upi" />
                  </Label>

                  <Label
                    htmlFor="card"
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-secondary/30 transition-colors ${paymentMethod === 'Card' ? 'border-primary bg-primary/5' : ''}`}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <div className="space-y-1">
                        <p className="font-bold">Credit / Debit Card</p>
                        <p className="text-xs text-muted-foreground">Secure payment via Visa, Mastercard, or RuPay</p>
                      </div>
                    </div>
                    <RadioGroupItem value="Card" id="card" />
                  </Label>

                  <Label
                    htmlFor="netbanking"
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-secondary/30 transition-colors ${paymentMethod === 'Net Banking' ? 'border-primary bg-primary/5' : ''}`}
                  >
                    <div className="flex items-center space-x-3">
                      <Landmark className="h-5 w-5 text-primary" />
                      <div className="space-y-1">
                        <p className="font-bold">Net Banking</p>
                        <p className="text-xs text-muted-foreground">Select from over 50+ Indian banks</p>
                      </div>
                    </div>
                    <RadioGroupItem value="Net Banking" id="netbanking" />
                  </Label>
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={handleBack} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button onClick={handleNext} className="gap-2">
                  Review Booking <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && (
            <Card className="animate-in fade-in duration-500">
              <CardHeader>
                <CardTitle>Final Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-secondary/20 p-4 rounded-xl space-y-3">
                  <h3 className="font-bold uppercase text-xs text-muted-foreground">Trip Summary</h3>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Serene Maldives Escape</span>
                    <span className="text-sm font-bold">₹45,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Travelers</span>
                    <span className="text-sm font-bold">2 Persons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Travel Date</span>
                    <span className="text-sm font-bold">May 15, 2024</span>
                  </div>
                  <Separator className="bg-white/50" />
                  <div className="flex justify-between text-lg text-primary">
                    <span className="font-bold">Total Payable</span>
                    <span className="font-black">₹90,000</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" id="terms" className="rounded border-primary" defaultChecked />
                    <label htmlFor="terms">I agree to the <span className="text-primary underline">Terms of Service</span> and <span className="text-primary underline">Refund Policy</span>.</label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={handleBack} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button onClick={handleCompleteBooking} className="bg-primary text-white h-12 px-8 font-bold">
                  Complete Booking & Pay
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        {/* Price Sidebar Summary (Desktop Only) */}
        <div className="hidden md:block">
          <Card className="p-6 sticky top-24 border-primary/10 shadow-lg">
            <h3 className="font-bold text-lg mb-4">Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Base Fare</span>
                <span>₹45,000</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Quantity</span>
                <span>x 2</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>GST (5%)</span>
                <span>₹4,500</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold text-primary pt-2">
                <span>Grand Total</span>
                <span>₹94,500</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t">
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                By clicking pay, you authorize TravelSphere to charge your selected payment method. Free cancellation within 48 hours applies.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}