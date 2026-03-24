export type Category = 'Beach' | 'Mountain' | 'Historical' | 'Adventure' | 'City';

export interface Package {
  id: string;
  title: string;
  category: Category;
  price: number;
  duration: string;
  imageURL: string;
  itinerary: string[];
  services: string[];
  rating: number;
  description: string;
}

export interface Booking {
  id: string;
  userId: string;
  packageId: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  paymentMethod: 'UPI' | 'Card' | 'Net Banking';
  totalAmount: number;
  travelDate: string;
  packageTitle?: string;
}

export interface Review {
  id: string;
  packageId: string;
  userName: string;
  rating: number;
  comment: string;
}