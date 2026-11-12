import { Ride, SearchFilters, BookingRequest, User } from '../types';
import { INITIAL_RIDES, CAMPUS_LOCATIONS, INITIAL_USER_BOOKINGS } from '../data/mockData';

const RIDES_STORAGE_KEY = 'campuspool_rides_v1';
const BOOKINGS_STORAGE_KEY = 'campuspool_bookings_v1';

// Initialize localStorage with mock data if not already set
function initializeStorage(): { rides: Ride[]; bookings: BookingRequest[] } {
  const storedRides = localStorage.getItem(RIDES_STORAGE_KEY);
  const storedBookings = localStorage.getItem(BOOKINGS_STORAGE_KEY);

  let rides: Ride[] = INITIAL_RIDES;
  let bookings: BookingRequest[] = INITIAL_USER_BOOKINGS;

  if (storedRides) {
    try {
      rides = JSON.parse(storedRides);
    } catch {
      rides = INITIAL_RIDES;
    }
  } else {
    localStorage.setItem(RIDES_STORAGE_KEY, JSON.stringify(INITIAL_RIDES));
  }

  if (storedBookings) {
    try {
      bookings = JSON.parse(storedBookings);
    } catch {
      bookings = INITIAL_USER_BOOKINGS;
    }
  } else {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(INITIAL_USER_BOOKINGS));
  }

  return { rides, bookings };
}

export const rideService = {
  // Get all rides
  getAllRides: (): Ride[] => {
    const { rides } = initializeStorage();
    return rides;
  },

  // Get single ride by ID
  getRideById: (id: string): Ride | undefined => {
    const { rides } = initializeStorage();
    return rides.find((r) => r.id === id);
  },

  // Search & Filter rides
  searchRides: (filters: SearchFilters): Ride[] => {
    const { rides } = initializeStorage();

    return rides.filter((ride) => {
      // Status check
      if (ride.status !== 'active') return false;

      // Origin filter
      if (filters.origin && filters.origin.trim() !== '') {
        const query = filters.origin.toLowerCase().trim();
        const matchesOrigin =
          ride.origin.name.toLowerCase().includes(query) ||
          ride.origin.address.toLowerCase().includes(query) ||
          (ride.origin.landmark && ride.origin.landmark.toLowerCase().includes(query));
        if (!matchesOrigin) return false;
      }

      // Destination filter
      if (filters.destination && filters.destination.trim() !== '') {
        const query = filters.destination.toLowerCase().trim();
        const matchesDest =
          ride.destination.name.toLowerCase().includes(query) ||
          ride.destination.address.toLowerCase().includes(query) ||
          (ride.destination.landmark && ride.destination.landmark.toLowerCase().includes(query));
        if (!matchesDest) return false;
      }

      // Date filter
      if (filters.date && filters.date.trim() !== '') {
        if (ride.departureDate !== filters.date) return false;
      }

      // Available seats filter
      if (filters.seats && filters.seats > 0) {
        if (ride.availableSeats < filters.seats) return false;
      }

      // Price filter
      if (filters.maxPrice && filters.maxPrice > 0) {
        if (ride.pricePerSeat > filters.maxPrice) return false;
      }

      // Time range filter
      if (filters.departureTimeRange && filters.departureTimeRange !== 'all') {
        const hour = parseInt(ride.departureTime.split(':')[0], 10);
        if (filters.departureTimeRange === 'morning' && (hour < 6 || hour >= 12)) return false;
        if (filters.departureTimeRange === 'afternoon' && (hour < 12 || hour >= 17)) return false;
        if (filters.departureTimeRange === 'evening' && (hour < 17 || hour >= 21)) return false;
        if (filters.departureTimeRange === 'night' && hour < 21 && hour >= 6) return false;
      }

      // Gender preference filter
      if (filters.genderPreference && filters.genderPreference !== 'all') {
        if (
          ride.preferences.genderPreference !== 'all' &&
          ride.preferences.genderPreference !== filters.genderPreference
        ) {
          return false;
        }
      }

      // Vehicle type filter
      if (filters.vehicleType && filters.vehicleType !== 'all') {
        if (ride.vehicle.type !== filters.vehicleType) return false;
      }

      // Verified only
      if (filters.verifiedOnly) {
        if (!ride.driver.isVerified) return false;
      }

      // Instant booking only
      if (filters.instantBookingOnly) {
        if (!ride.instantBooking) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') {
        return a.pricePerSeat - b.pricePerSeat;
      }
      if (filters.sortBy === 'time_asc') {
        return a.departureTime.localeCompare(b.departureTime);
      }
      if (filters.sortBy === 'rating_desc') {
        return b.driver.rating - a.driver.rating;
      }
      if (filters.sortBy === 'seats_desc') {
        return b.availableSeats - a.availableSeats;
      }
      // default: soonest departure
      return a.departureDate.localeCompare(b.departureDate) || a.departureTime.localeCompare(b.departureTime);
    });
  },

  // Publish a new ride
  createRide: (rideData: Omit<Ride, 'id' | 'createdAt' | 'status' | 'passengers'>): Ride => {
    const { rides } = initializeStorage();

    const newRide: Ride = {
      ...rideData,
      id: `ride_${Date.now()}`,
      status: 'active',
      passengers: [],
      createdAt: new Date().toISOString()
    };

    const updatedRides = [newRide, ...rides];
    localStorage.setItem(RIDES_STORAGE_KEY, JSON.stringify(updatedRides));
    return newRide;
  },

  // Request to book a seat
  bookRide: (
    rideId: string,
    seatsCount: number,
    passenger: User,
    pickupLocation: string,
    dropoffLocation: string,
    note?: string
  ): { success: boolean; message: string; booking?: BookingRequest } => {
    const { rides, bookings } = initializeStorage();
    const rideIndex = rides.findIndex((r) => r.id === rideId);

    if (rideIndex === -1) {
      return { success: false, message: 'Ride not found' };
    }

    const ride = rides[rideIndex];
    if (ride.availableSeats < seatsCount) {
      return { success: false, message: 'Not enough seats available' };
    }

    // Deduct seats immediately if instant booking, else await approval
    const isInstant = ride.instantBooking;
    const newStatus = isInstant ? 'accepted' : 'pending';

    const newBooking: BookingRequest = {
      id: `bk_${Date.now()}`,
      rideId,
      ride,
      passengerId: passenger.id,
      passenger,
      seats: seatsCount,
      pickupLocation,
      dropoffLocation,
      note,
      status: newStatus,
      createdAt: new Date().toISOString(),
      totalAmount: ride.pricePerSeat * seatsCount
    };

    if (isInstant) {
      ride.availableSeats -= seatsCount;
      ride.passengers.push({
        bookingId: newBooking.id,
        userId: passenger.id,
        name: passenger.name,
        avatar: passenger.avatar,
        college: passenger.college,
        seatsBooked: seatsCount,
        pickupLocation,
        dropoffLocation,
        status: 'confirmed',
        bookedAt: 'Just now',
        contactNumber: passenger.phone
      });
    }

    rides[rideIndex] = ride;
    const updatedBookings = [newBooking, ...bookings];

    localStorage.setItem(RIDES_STORAGE_KEY, JSON.stringify(rides));
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updatedBookings));

    return {
      success: true,
      message: isInstant ? 'Seat booked successfully!' : 'Request sent to driver for approval!',
      booking: newBooking
    };
  },

  // Get user bookings (as passenger)
  getUserBookings: (userId: string): BookingRequest[] => {
    const { bookings } = initializeStorage();
    return bookings.filter((b) => b.passengerId === userId);
  },

  // Get rides offered by driver
  getRidesByDriver: (driverId: string): Ride[] => {
    const { rides } = initializeStorage();
    return rides.filter((r) => r.driverId === driverId);
  },

  // Driver accepts or declines a booking request
  respondToBookingRequest: (bookingId: string, action: 'accept' | 'decline'): boolean => {
    const { rides, bookings } = initializeStorage();
    const bIndex = bookings.findIndex((b) => b.id === bookingId);
    if (bIndex === -1) return false;

    const booking = bookings[bIndex];
    booking.status = action === 'accept' ? 'accepted' : 'declined';

    if (action === 'accept') {
      const rideIndex = rides.findIndex((r) => r.id === booking.rideId);
      if (rideIndex !== -1) {
        const ride = rides[rideIndex];
        if (ride.availableSeats >= booking.seats) {
          ride.availableSeats -= booking.seats;
          ride.passengers.push({
            bookingId: booking.id,
            userId: booking.passenger.id,
            name: booking.passenger.name,
            avatar: booking.passenger.avatar,
            college: booking.passenger.college,
            seatsBooked: booking.seats,
            pickupLocation: booking.pickupLocation,
            dropoffLocation: booking.dropoffLocation,
            status: 'confirmed',
            bookedAt: 'Just now',
            contactNumber: booking.passenger.phone
          });
          rides[rideIndex] = ride;
        }
      }
    }

    bookings[bIndex] = booking;
    localStorage.setItem(RIDES_STORAGE_KEY, JSON.stringify(rides));
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    return true;
  },

  // Cancel ride offered by driver
  cancelRide: (rideId: string): boolean => {
    const { rides } = initializeStorage();
    const rideIndex = rides.findIndex((r) => r.id === rideId);
    if (rideIndex === -1) return false;

    rides[rideIndex].status = 'cancelled';
    localStorage.setItem(RIDES_STORAGE_KEY, JSON.stringify(rides));
    return true;
  },

  // Get known campus locations
  getCampusLocations: (): typeof CAMPUS_LOCATIONS => {
    return CAMPUS_LOCATIONS;
  }
};

