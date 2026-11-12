import { describe, it, expect, beforeEach } from 'vitest';
import { setupMockLocalStorage } from './setup';
import { rideService } from '../services/rideService';
import { authService } from '../services/authService';
import { User, Ride } from '../types';

const mockStorage = setupMockLocalStorage();

describe('Carpooling End-to-End Booking Workflow', () => {
  beforeEach(() => {
    mockStorage.clear();
  });

  it('completes full cycle: publish -> search -> book -> approve -> verify seat capacity exhaustion', () => {
    // 1. Driver publishes a ride with 3 seats
    const driver = authService.loginDemoUser('driver');
    const newRideData: Omit<Ride, 'id' | 'createdAt' | 'status' | 'passengers'> = {
      driverId: driver.id,
      driver,
      origin: {
        id: 'loc_unit1',
        name: 'UC Berkeley Unit 1 Dorms',
        address: '2650 Durant Ave, Berkeley, CA',
        landmark: 'Unit 1 Courtyard',
        type: 'campus'
      },
      destination: {
        id: 'loc_embarcadero',
        name: 'San Francisco Financial District',
        address: 'Market St, San Francisco, CA',
        landmark: 'Embarcadero Station',
        type: 'metro'
      },
      waypoints: [],
      departureDate: '2026-11-28',
      departureTime: '07:45',
      estimatedDuration: '35m',
      availableSeats: 3,
      totalSeats: 3,
      pricePerSeat: 8,
      distanceKm: 22,
      vehicle: driver.vehicle!,
      preferences: {
        music: true,
        smoking: false,
        pets: false,
        chattiness: 'quiet',
        luggageCapacity: 'backpack',
        genderPreference: 'all'
      },
      instantBooking: false
    };

    const publishedRide = rideService.createRide(newRideData);
    expect(publishedRide.id).toBeDefined();
    expect(publishedRide.availableSeats).toBe(3);

    // 2. Passenger searches for the commute
    const searchResults = rideService.searchRides({
      origin: 'Unit 1',
      destination: 'San Francisco',
      seats: 2
    });
    expect(searchResults.some((r) => r.id === publishedRide.id)).toBe(true);

    // 3. Passenger 1 requests 2 seats
    const passenger1: User = {
      ...driver,
      id: 'usr_pass_1',
      name: 'Elena Rostova',
      email: 'elena@berkeley.edu'
    };

    const booking1 = rideService.bookRide(
      publishedRide.id,
      2,
      passenger1,
      'Unit 1 Durant Ave',
      'Embarcadero Station Plaza'
    );
    expect(booking1.success).toBe(true);
    expect(booking1.booking?.status).toBe('pending');
    expect(booking1.booking?.totalAmount).toBe(16); // 2 seats * $8

    // 4. Driver approves booking 1
    const approved1 = rideService.respondToBookingRequest(booking1.booking!.id, 'accept');
    expect(approved1).toBe(true);

    // Check ride seats remaining: should now be 1
    const rideAfterBooking1 = rideService.getRideById(publishedRide.id);
    expect(rideAfterBooking1?.availableSeats).toBe(1);
    expect(rideAfterBooking1?.passengers.length).toBe(1);

    // 5. Passenger 2 tries to book 2 seats (should fail because only 1 remains)
    const passenger2: User = {
      ...driver,
      id: 'usr_pass_2',
      name: 'Liam Chen',
      email: 'liam@berkeley.edu'
    };

    const failBooking = rideService.bookRide(
      publishedRide.id,
      2,
      passenger2,
      'Unit 1 Durant Ave',
      'Embarcadero Station Plaza'
    );
    expect(failBooking.success).toBe(false);
    expect(failBooking.message).toBe('Not enough seats available');

    // 6. Passenger 2 books the last 1 seat with approval
    const booking2 = rideService.bookRide(
      publishedRide.id,
      1,
      passenger2,
      'Unit 1 Durant Ave',
      'Embarcadero Station Plaza'
    );
    expect(booking2.success).toBe(true);
    rideService.respondToBookingRequest(booking2.booking!.id, 'accept');

    // 7. Ride is now full (0 seats)
    const fullRide = rideService.getRideById(publishedRide.id);
    expect(fullRide?.availableSeats).toBe(0);
    expect(fullRide?.passengers.length).toBe(2);

    // 8. Search requiring 1 seat should no longer return this ride
    const searchWhenFull = rideService.searchRides({
      origin: 'Unit 1',
      destination: 'San Francisco',
      seats: 1
    });
    expect(searchWhenFull.some((r) => r.id === publishedRide.id)).toBe(false);

    // 9. Both passengers can see their bookings in their booking list
    const p1Bookings = rideService.getUserBookings(passenger1.id);
    expect(p1Bookings.length).toBe(1);
    expect(p1Bookings[0].status).toBe('accepted');

    const p2Bookings = rideService.getUserBookings(passenger2.id);
    expect(p2Bookings.length).toBe(1);
    expect(p2Bookings[0].status).toBe('accepted');
  });
});
