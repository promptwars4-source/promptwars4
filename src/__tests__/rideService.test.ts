import { describe, it, expect, beforeEach } from 'vitest';
import { setupMockLocalStorage } from './setup';
import { rideService } from '../services/rideService';
import { CURRENT_USER } from '../data/mockData';
import { User, Ride } from '../types';

const mockStorage = setupMockLocalStorage();

describe('rideService', () => {
  beforeEach(() => {
    mockStorage.clear();
  });

  describe('getAllRides', () => {
    it('returns initial mock rides when localStorage is empty', () => {
      const rides = rideService.getAllRides();
      expect(Array.isArray(rides)).toBe(true);
      expect(rides.length).toBeGreaterThan(0);
      expect(rides.some((r) => r.id === 'ride_101')).toBe(true);
    });

    it('returns persisted rides from localStorage', () => {
      rideService.getAllRides();
      const customRide: Ride = {
        id: 'ride_custom_1',
        driverId: CURRENT_USER.id,
        driver: CURRENT_USER,
        origin: { id: 'loc_stan', name: 'Stanford Oval', address: 'Stanford, CA', type: 'campus' },
        destination: { id: 'loc_cal', name: 'UC Berkeley', address: 'Berkeley, CA', type: 'campus' },
        waypoints: [],
        departureDate: '2026-11-25',
        departureTime: '10:00',
        estimatedDuration: '50m',
        availableSeats: 2,
        totalSeats: 3,
        pricePerSeat: 12,
        distanceKm: 55,
        vehicle: CURRENT_USER.vehicle!,
        preferences: {
          music: true,
          smoking: false,
          pets: false,
          chattiness: 'flexible',
          luggageCapacity: 'cabin',
          genderPreference: 'all'
        },
        instantBooking: true,
        passengers: [],
        status: 'active',
        createdAt: new Date().toISOString()
      };
      mockStorage.setItem('campuspool_rides_v1', JSON.stringify([customRide]));

      const rides = rideService.getAllRides();
      expect(rides.length).toBe(1);
      expect(rides[0].id).toBe('ride_custom_1');
    });
  });

  describe('getRideById', () => {
    it('returns the ride matching the provided ID', () => {
      const ride = rideService.getRideById('ride_101');
      expect(ride).toBeDefined();
      expect(ride?.id).toBe('ride_101');
      expect(ride?.driver.name).toBeDefined();
    });

    it('returns undefined when ID does not exist', () => {
      const ride = rideService.getRideById('ride_non_existent');
      expect(ride).toBeUndefined();
    });
  });

  describe('searchRides', () => {
    it('filters by origin location keyword (case-insensitive)', () => {
      const results = rideService.searchRides({ origin: 'berkeley' });
      expect(results.length).toBeGreaterThan(0);
      results.forEach((r) => {
        const matchesOrigin =
          r.origin.name.toLowerCase().includes('berkeley') ||
          r.origin.address.toLowerCase().includes('berkeley') ||
          (r.origin.landmark && r.origin.landmark.toLowerCase().includes('berkeley'));
        expect(matchesOrigin).toBe(true);
      });
    });

    it('filters by destination location keyword', () => {
      const results = rideService.searchRides({ destination: 'san francisco' });
      expect(results.length).toBeGreaterThan(0);
      results.forEach((r) => {
        const matchesDest =
          r.destination.name.toLowerCase().includes('san francisco') ||
          r.destination.address.toLowerCase().includes('san francisco') ||
          (r.destination.landmark && r.destination.landmark.toLowerCase().includes('san francisco'));
        expect(matchesDest).toBe(true);
      });
    });

    it('filters by minimum available seats', () => {
      const results = rideService.searchRides({ seats: 3 });
      expect(results.length).toBeGreaterThan(0);
      results.forEach((r) => {
        expect(r.availableSeats).toBeGreaterThanOrEqual(3);
      });
    });

    it('filters by maximum price per seat', () => {
      const results = rideService.searchRides({ maxPrice: 10 });
      expect(results.length).toBeGreaterThan(0);
      results.forEach((r) => {
        expect(r.pricePerSeat).toBeLessThanOrEqual(10);
      });
    });

    it('filters by vehicle type', () => {
      const evRides = rideService.searchRides({ vehicleType: 'ev' });
      expect(evRides.length).toBeGreaterThan(0);
      evRides.forEach((r) => {
        expect(r.vehicle.type).toBe('ev');
      });
    });

    it('filters by verified driver only', () => {
      const verifiedRides = rideService.searchRides({ verifiedOnly: true });
      expect(verifiedRides.length).toBeGreaterThan(0);
      verifiedRides.forEach((r) => {
        expect(r.driver.isVerified).toBe(true);
      });
    });

    it('filters by instant booking only', () => {
      const instantRides = rideService.searchRides({ instantBookingOnly: true });
      expect(instantRides.length).toBeGreaterThan(0);
      instantRides.forEach((r) => {
        expect(r.instantBooking).toBe(true);
      });
    });

    it('sorts rides in ascending order by price (price_asc)', () => {
      const sorted = rideService.searchRides({ sortBy: 'price_asc' });
      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i].pricePerSeat).toBeLessThanOrEqual(sorted[i + 1].pricePerSeat);
      }
    });

    it('sorts rides in descending order by driver rating (rating_desc)', () => {
      const sorted = rideService.searchRides({ sortBy: 'rating_desc' });
      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i].driver.rating).toBeGreaterThanOrEqual(sorted[i + 1].driver.rating);
      }
    });
  });

  describe('createRide', () => {
    it('creates and persists a new ride with status active', () => {
      const sampleRideData: Omit<Ride, 'id' | 'createdAt' | 'status' | 'passengers'> = {
        driverId: CURRENT_USER.id,
        driver: CURRENT_USER,
        origin: {
          id: 'loc_north_gate',
          name: 'UC Berkeley North Gate',
          address: 'Hearst Ave, Berkeley, CA',
          landmark: 'Engineering Building',
          type: 'campus'
        },
        destination: {
          id: 'loc_sjc',
          name: 'San Jose Airport (SJC)',
          address: '1701 Airport Blvd, San Jose, CA',
          landmark: 'Terminal B',
          type: 'airport'
        },
        waypoints: [],
        departureDate: '2026-11-20',
        departureTime: '08:30',
        estimatedDuration: '1h 15m',
        availableSeats: 3,
        totalSeats: 4,
        pricePerSeat: 15,
        distanceKm: 75,
        vehicle: CURRENT_USER.vehicle!,
        preferences: {
          music: true,
          smoking: false,
          pets: false,
          chattiness: 'flexible',
          luggageCapacity: 'cabin',
          genderPreference: 'all'
        },
        instantBooking: false
      };

      const created = rideService.createRide(sampleRideData);
      expect(created.id.startsWith('ride_')).toBe(true);
      expect(created.status).toBe('active');
      expect(created.availableSeats).toBe(3);

      const fetched = rideService.getRideById(created.id);
      expect(fetched).toBeDefined();
      expect(fetched?.origin.name).toBe('UC Berkeley North Gate');
    });
  });

  describe('bookRide', () => {
    it('rejects booking when requesting more seats than available', () => {
      const allRides = rideService.getAllRides();
      const ride = allRides[0];
      const passenger: User = {
        ...CURRENT_USER,
        id: 'usr_pass_test',
        name: 'Sarah Connor',
        email: 'sarah@berkeley.edu'
      };

      const result = rideService.bookRide(
        ride.id,
        ride.availableSeats + 10,
        passenger,
        'Main Gate',
        'Dropoff Point'
      );
      expect(result.success).toBe(false);
      expect(result.message).toBe('Not enough seats available');
    });

    it('rejects booking when ride ID does not exist', () => {
      const passenger: User = { ...CURRENT_USER, id: 'usr_pass_test' };
      const result = rideService.bookRide('invalid_ride_id', 1, passenger, 'A', 'B');
      expect(result.success).toBe(false);
      expect(result.message).toBe('Ride not found');
    });

    it('instantly books and decrements available seats for instantBooking rides', () => {
      const allRides = rideService.getAllRides();
      const instantRide = allRides.find((r) => r.instantBooking && r.availableSeats >= 2)!;
      const initialSeats = instantRide.availableSeats;

      const passenger: User = {
        ...CURRENT_USER,
        id: 'usr_pass_instant',
        name: 'Alex Turner',
        email: 'alex@berkeley.edu'
      };

      const result = rideService.bookRide(
        instantRide.id,
        1,
        passenger,
        'North Gate',
        'Mission St'
      );

      expect(result.success).toBe(true);
      expect(result.booking?.status).toBe('accepted');

      const updated = rideService.getRideById(instantRide.id);
      expect(updated?.availableSeats).toBe(initialSeats - 1);
      expect(updated?.passengers.some((p) => p.userId === passenger.id)).toBe(true);
    });

    it('creates a pending booking for rides requiring manual approval', () => {
      const allRides = rideService.getAllRides();
      const manualRide = allRides.find((r) => !r.instantBooking && r.availableSeats >= 2)!;
      const initialSeats = manualRide.availableSeats;

      const passenger: User = {
        ...CURRENT_USER,
        id: 'usr_pass_manual',
        name: 'John Doe',
        email: 'john@berkeley.edu'
      };

      const result = rideService.bookRide(
        manualRide.id,
        1,
        passenger,
        'Stop 1',
        'Stop 2'
      );

      expect(result.success).toBe(true);
      expect(result.booking?.status).toBe('pending');

      // Seats should NOT be deducted while still pending
      const updated = rideService.getRideById(manualRide.id);
      expect(updated?.availableSeats).toBe(initialSeats);
    });
  });

  describe('respondToBookingRequest', () => {
    it('accepts pending booking and decreases available seats', () => {
      const allRides = rideService.getAllRides();
      const manualRide = allRides.find((r) => !r.instantBooking && r.availableSeats >= 2)!;
      const initialSeats = manualRide.availableSeats;

      const passenger: User = { ...CURRENT_USER, id: 'usr_pass_accept' };
      const bookingRes = rideService.bookRide(manualRide.id, 1, passenger, 'Pickup', 'Dropoff');

      const accepted = rideService.respondToBookingRequest(bookingRes.booking!.id, 'accept');
      expect(accepted).toBe(true);

      const updated = rideService.getRideById(manualRide.id);
      expect(updated?.availableSeats).toBe(initialSeats - 1);
      expect(updated?.passengers.some((p) => p.userId === passenger.id)).toBe(true);
    });

    it('declines pending booking without reducing available seats', () => {
      const allRides = rideService.getAllRides();
      const manualRide = allRides.find((r) => !r.instantBooking && r.availableSeats >= 2)!;
      const initialSeats = manualRide.availableSeats;

      const passenger: User = { ...CURRENT_USER, id: 'usr_pass_decline' };
      const bookingRes = rideService.bookRide(manualRide.id, 1, passenger, 'Pickup', 'Dropoff');

      const declined = rideService.respondToBookingRequest(bookingRes.booking!.id, 'decline');
      expect(declined).toBe(true);

      const updated = rideService.getRideById(manualRide.id);
      expect(updated?.availableSeats).toBe(initialSeats);
    });
  });

  describe('cancelRide', () => {
    it('marks ride as cancelled and excludes it from search results', () => {
      const allRides = rideService.getAllRides();
      const target = allRides[0];

      const success = rideService.cancelRide(target.id);
      expect(success).toBe(true);

      const updated = rideService.getRideById(target.id);
      expect(updated?.status).toBe('cancelled');

      const activeSearchResults = rideService.searchRides({});
      expect(activeSearchResults.some((r) => r.id === target.id)).toBe(false);
    });
  });
});
