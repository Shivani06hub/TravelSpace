"use client"

import { MOCK_BOOKINGS } from '@/lib/db';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Calendar, CreditCard, ChevronRight, User, Settings, Heart, Bell } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Profile() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Profile Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <Card className="p-6 text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-primary/20">
              <AvatarImage src="https://picsum.photos/seed/user/200" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-sm text-muted-foreground mb-6">World Explorer since 2021</p>
            <div className="flex justify-center space-x-4 mb-4">
              <div className="text-center">
                <p className="text-lg font-bold">12</p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Trips</p>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div className="text-center">
                <p className="text-lg font-bold">4</p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Badges</p>
              </div>
            </div>
          </Card>

          <Card className="p-2">
            <nav className="flex flex-col space-y-1">
              <Button variant="ghost" className="justify-start gap-3 bg-secondary/50 text-primary">
                <User className="h-4 w-4" /> My Profile
              </Button>
              <Button variant="ghost" className="justify-start gap-3 text-muted-foreground hover:text-primary">
                <Heart className="h-4 w-4" /> Wishlist
              </Button>
              <Button variant="ghost" className="justify-start gap-3 text-muted-foreground hover:text-primary">
                <Bell className="h-4 w-4" /> Notifications
              </Button>
              <Button variant="ghost" className="justify-start gap-3 text-muted-foreground hover:text-primary">
                <Settings className="h-4 w-4" /> Settings
              </Button>
            </nav>
          </Card>
        </aside>

        {/* Booking History */}
        <div className="lg:col-span-3 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">My Booking History</h1>
            <p className="text-muted-foreground">Manage your past and upcoming travel experiences.</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {MOCK_BOOKINGS.map((booking) => (
              <Card key={booking.id} className="overflow-hidden group hover:border-primary/50 transition-colors shadow-sm">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-48 h-32 md:h-auto overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/${booking.packageId}/400/400`} 
                      alt="Trip" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{booking.packageTitle}</h3>
                        <div className="flex items-center text-sm text-muted-foreground gap-3 mt-1">
                          <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> {booking.travelDate}</span>
                          <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> 5 Days</span>
                        </div>
                      </div>
                      <Badge className={booking.status === 'Confirmed' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4 text-sm font-medium">
                        <div className="flex items-center gap-1">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <span>Paid via {booking.paymentMethod}</span>
                        </div>
                        <div className="text-primary font-bold">
                          Total: ₹{booking.totalAmount.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Get Invoice</Button>
                        <Button size="sm" className="gap-2">View Details <ChevronRight className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="bg-primary/5 border-dashed border-2 flex flex-col items-center justify-center py-12 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <MapPin className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Planning another adventure?</h3>
              <p className="text-sm text-muted-foreground">Discover new destinations and exclusive members-only deals.</p>
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <a href="/packages">Explore New Packages</a>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}