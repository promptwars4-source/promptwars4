export type VerificationStatus = 'verified' | 'pending' | 'unverified';

export type GenderPreference = 'all' | 'female_only' | 'male_only';

export type LuggageCapacity = 'backpack' | 'cabin' | 'large';

export interface UserPreferences {
  music: boolean;
  smoking: boolean;
  pets: boolean;
  chattiness: 'quiet' | 'talkative' | 'flexible';
  luggageCapacity: LuggageCapacity;
  genderPreference: GenderPreference;
}

export interface Vehicle {
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  type: 'sedan' | 'hatchback' | 'suv' | 'ev';
  photo?: string;
  seatsTotal: number;
}

export interface User {
  id: string;
  name: string;
  email: string; // .edu / .ac.in / verified student email
  college: string;
  universityDomain?: string;
  degree?: string;
  yearOfStudy?: string;
  avatar: string;
  phone: string;
  bio?: string;
  isVerified: boolean;
  verificationStatus: VerificationStatus;
  studentIdCardVerified: boolean;
  rating: number;
  reviewCount: number;
  ridesGivenCount: number;
  ridesTakenCount: number;
  totalSavingsEst: number; // in USD or INR equivalent
  co2SavedKg: number;
  memberSince: string;
  vehicle?: Vehicle;
  preferences: UserPreferences;
}

export interface LocationPoint {
  id: string;
  name: string;
  address: string;
  type: 'campus' | 'railway' | 'airport' | 'bus_terminal' | 'metro' | 'residential' | 'tech_park' | 'city';
  landmark?: string;
  lat?: number;
  lng?: number;
}

export interface RidePassenger {
  bookingId: string;
  userId: string;
  name: string;
  avatar: string;
  college: string;
  seatsBooked: number;
  pickupLocation: string;
  dropoffLocation: string;
  status: 'confirmed' | 'pending' | 'declined';
  bookedAt: string;
  contactNumber?: string;
}

export interface Review {
  id: string;
  rideId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerCollege: string;
  reviewerAvatar: string;
  rating: number;
  comment: string;
  date: string;
  tags?: string[];
}

export interface Ride {
  id: string;
  driverId: string;
  driver: User;
  origin: LocationPoint;
  destination: LocationPoint;
  waypoints: LocationPoint[];
  departureDate: string; // YYYY-MM-DD
  departureTime: string; // HH:MM
  estimatedDuration: string;
  distanceKm: number;
  totalSeats: number;
  availableSeats: number;
  pricePerSeat: number;
  vehicle: Vehicle;
  notes?: string;
  preferences: UserPreferences;
  instantBooking: boolean;
  status: 'active' | 'completed' | 'cancelled';
  passengers: RidePassenger[];
  reviews?: Review[];
  createdAt: string;
}

export interface BookingRequest {
  id: string;
  rideId: string;
  ride: Ride;
  passengerId: string;
  passenger: User;
  seats: number;
  pickupLocation: string;
  dropoffLocation: string;
  note?: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  totalAmount: number;
}

export interface SearchFilters {
  origin?: string;
  destination?: string;
  date?: string;
  seats?: number;
  maxPrice?: number;
  departureTimeRange?: 'all' | 'morning' | 'afternoon' | 'evening' | 'night';
  genderPreference?: GenderPreference;
  vehicleType?: 'all' | 'sedan' | 'hatchback' | 'suv' | 'ev';
  verifiedOnly?: boolean;
  instantBookingOnly?: boolean;
  sortBy?: 'price_asc' | 'time_asc' | 'rating_desc' | 'seats_desc';
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'booking_request' | 'booking_accepted' | 'booking_declined' | 'ride_reminder' | 'payment_split' | 'system';
  linkTo?: string;
}

