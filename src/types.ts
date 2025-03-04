export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  size: string;
  facing: string;
  amenities: string[];
  description: string;
  image: string;
  isBooked: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  bookingTimestamp?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}