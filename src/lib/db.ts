import { Package, Booking } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const PACKAGES: Package[] = [
  {
    id: '1',
    title: 'Serene Maldives Escape',
    category: 'Beach',
    price: 45000,
    duration: '5 Days / 4 Nights',
    imageURL: PlaceHolderImages.find(img => img.id === 'maldives')?.imageUrl || '',
    itinerary: [
      'Day 1: Arrival & Speedboat Transfer to Resort',
      'Day 2: Snorkeling & Coral Reef Exploration',
      'Day 3: Sunset Cruise & Dolphin Watching',
      'Day 4: Spa Treatment & Beachside Candlelight Dinner',
      'Day 5: Souvenir Shopping & Departure'
    ],
    services: ['Luxury Overwater Villa', 'All Meals Included', 'Private Guide', 'Snorkeling Gear'],
    rating: 4.8,
    description: 'Experience ultimate luxury in the heart of the Indian Ocean.'
  },
  {
    id: '2',
    title: 'Himalayan Trekking Adventure',
    category: 'Mountain',
    price: 12500,
    duration: '7 Days / 6 Nights',
    imageURL: PlaceHolderImages.find(img => img.id === 'himalayas')?.imageUrl || '',
    itinerary: [
      'Day 1: Arrival in Manali & Briefing',
      'Day 2: Trek to Beas Kund Base Camp',
      'Day 3: Summit Attempt at Morning Star',
      'Day 4: Valley Exploration & Local Culture',
      'Day 5: Descent to Solang Valley',
      'Day 6: Hot Springs & Relaxation',
      'Day 7: Departure to Chandigarh'
    ],
    services: ['Camping Gear', 'Organic Meals', 'Certified Trekking Guide', 'Pick & Drop'],
    rating: 4.9,
    description: 'Challenging treks with breathtaking views of snowy peaks.'
  },
  {
    id: '3',
    title: 'Kyoto Cultural Heritage',
    category: 'Historical',
    price: 32000,
    duration: '4 Days / 3 Nights',
    imageURL: PlaceHolderImages.find(img => img.id === 'kyoto')?.imageUrl || '',
    itinerary: [
      'Day 1: Temple Visit & Tea Ceremony',
      'Day 2: Arashiyama Bamboo Grove & Monkey Park',
      'Day 3: Gion District Walk & Kimono Experience',
      'Day 4: Zen Garden & Airport Transfer'
    ],
    services: ['Heritage Hotel', 'Authentic Bento Meals', 'Expert Local Historian', 'Public Transport Pass'],
    rating: 4.7,
    description: 'Step back in time and discover the soul of ancient Japan.'
  },
  {
    id: '4',
    title: 'Goa Weekend Splash',
    category: 'Beach',
    price: 4999,
    duration: '3 Days / 2 Nights',
    imageURL: PlaceHolderImages.find(img => img.id === 'goa')?.imageUrl || '',
    itinerary: [
      'Day 1: Beach Hopping & Shack Dinner',
      'Day 2: Water Sports at Baga Beach',
      'Day 3: Old Goa Church Visit & Departure'
    ],
    services: ['Beach Resort', 'Breakfast Included', 'Bike Rental', 'Welcome Drink'],
    rating: 4.5,
    description: 'Quick getaway to the most vibrant beaches of India.'
  },
  {
    id: '5',
    title: 'Paris Romantic Getaway',
    category: 'City',
    price: 55000,
    duration: '6 Days / 5 Nights',
    imageURL: PlaceHolderImages.find(img => img.id === 'paris')?.imageUrl || '',
    itinerary: [
      'Day 1: Arrival & Seine River Cruise',
      'Day 2: Eiffel Tower & Louvre Museum',
      'Day 3: Montmartre Walk & Pastry Class',
      'Day 4: Palace of Versailles Day Trip',
      'Day 5: Shopping at Champs-Élysées',
      'Day 6: Gourmet Breakfast & Departure'
    ],
    services: ['Boutique Hotel', 'Museum Passes', 'Local Guide', 'Fine Dining Dinner'],
    rating: 4.8,
    description: 'The city of lights awaits you for a journey of love and art.'
  },
  {
    id: '6',
    title: 'Bali Spirit & Nature',
    category: 'Adventure',
    price: 28000,
    duration: '5 Days / 4 Nights',
    imageURL: PlaceHolderImages.find(img => img.id === 'bali')?.imageUrl || '',
    itinerary: [
      'Day 1: Arrival & Ubud Rice Terrace Walk',
      'Day 2: White Water Rafting on Ayung River',
      'Day 3: Mount Batur Sunrise Hike',
      'Day 4: Balinese Massage & Uluwatu Temple',
      'Day 5: Breakfast with Orangutans & Departure'
    ],
    services: ['Jungle Resort', 'Vegetarian Meals', 'Adventure Guides', 'Spa Session'],
    rating: 4.6,
    description: 'Reconnect with nature and yourself in tropical paradise.'
  }
];

export function getPackageById(id: string) {
  return PACKAGES.find(p => p.id === id);
}

export function filterPackages(destination: string, budget: string, category: string) {
  return PACKAGES.filter(p => {
    const matchesDest = destination ? p.title.toLowerCase().includes(destination.toLowerCase()) || p.description.toLowerCase().includes(destination.toLowerCase()) : true;
    const matchesBudget = budget ? p.price <= parseInt(budget) : true;
    const matchesCategory = category && category !== 'All' ? p.category === category : true;
    return matchesDest && matchesBudget && matchesCategory;
  });
}

// Mocking User Bookings
export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    userId: 'u1',
    packageId: '1',
    status: 'Confirmed',
    paymentMethod: 'Card',
    totalAmount: 45000,
    travelDate: '2024-05-15',
    packageTitle: 'Serene Maldives Escape'
  },
  {
    id: 'b2',
    userId: 'u1',
    packageId: '4',
    status: 'Pending',
    paymentMethod: 'UPI',
    totalAmount: 4999,
    travelDate: '2024-06-20',
    packageTitle: 'Goa Weekend Splash'
  }
];