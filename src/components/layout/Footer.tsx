"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-secondary/50 border-t mt-auto">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Compass className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold tracking-tight text-primary">TravelSphere</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Making your dream vacations a reality since 2010. We specialize in curated, high-quality travel experiences that stay with you forever.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/packages" className="text-muted-foreground hover:text-primary transition-colors">Packages</Link></li>
              <li><Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">Support & FAQs</Link></li>
              <li><Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@travelsphere.com</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Travel Way, Adventure City, NY 10001</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to get the latest offers and travel tips directly in your inbox.
            </p>
            <div className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-background border px-3 py-2 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          © {year ?? '...'} TravelSphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
