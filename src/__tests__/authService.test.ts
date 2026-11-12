import { describe, it, expect, beforeEach } from 'vitest';
import { setupMockLocalStorage } from './setup';
import { authService } from '../services/authService';

const mockStorage = setupMockLocalStorage();

describe('authService', () => {
  beforeEach(() => {
    mockStorage.clear();
  });

  describe('getCurrentUser', () => {
    it('returns the default demo user when storage is empty and persists it', () => {
      const user = authService.getCurrentUser();
      expect(user).toBeDefined();
      expect(user.id).toBe('usr_me_01');
      expect(user.name).toBe('Ethan Cole');
      expect(user.email).toBe('ethan.cole@stanford.edu');
      expect(user.isVerified).toBe(true);

      const stored = mockStorage.getItem('campuspool_user_v1');
      expect(stored).not.toBeNull();
    });
  });

  describe('loginDemoUser', () => {
    it('switches to student driver persona (Ethan)', () => {
      const driver = authService.loginDemoUser('driver');
      expect(driver.id).toBe('usr_me_01');
      expect(driver.vehicle).toBeDefined();
      expect(driver.vehicle?.model).toBe('Model 3 Dual Motor');
    });

    it('switches to student passenger persona (Maya)', () => {
      const passenger = authService.loginDemoUser('passenger');
      expect(passenger.id).toBe('usr_demo_pass');
      expect(passenger.name).toBe('Maya Lin');
      expect(passenger.vehicle).toBeUndefined();
      expect(passenger.ridesTakenCount).toBeGreaterThan(0);
    });
  });

  describe('updateUser', () => {
    it('updates specific user fields while preserving others', () => {
      const original = authService.getCurrentUser();
      const updated = authService.updateUser({
        bio: 'Updated student bio for carpooling!',
        phone: '+1 (555) 999-8888'
      });

      expect(updated.bio).toBe('Updated student bio for carpooling!');
      expect(updated.phone).toBe('+1 (555) 999-8888');
      expect(updated.name).toBe(original.name);
      expect(updated.email).toBe(original.email);
    });
  });

  describe('register', () => {
    it('verifies student automatically when email has a valid university domain (.edu)', () => {
      const reg = authService.register({
        name: 'Jordan Lee',
        email: 'jordan.lee@stanford.edu',
        college: 'Stanford University',
        phone: '+1 (650) 555-1234',
        degree: 'B.S. Computer Science'
      });

      expect(reg.success).toBe(true);
      expect(reg.user).toBeDefined();
      expect(reg.user?.isVerified).toBe(true);
      expect(reg.user?.verificationStatus).toBe('verified');
      expect(reg.user?.universityDomain).toBe('stanford.edu');
      expect(reg.user?.totalSavingsEst).toBe(0);
    });

    it('sets pending status when email is not an academic domain', () => {
      const reg = authService.register({
        name: 'Guest User',
        email: 'guest.user@gmail.com',
        college: 'UC Berkeley',
        phone: '+1 (510) 555-9000'
      });

      expect(reg.success).toBe(true);
      expect(reg.user?.isVerified).toBe(false);
      expect(reg.user?.verificationStatus).toBe('pending');
    });
  });

  describe('notifications', () => {
    it('fetches campus alerts and notifications', () => {
      const notifs = authService.getNotifications();
      expect(Array.isArray(notifs)).toBe(true);
      expect(notifs.length).toBeGreaterThan(0);
    });

    it('marks a notification as read and updates storage', () => {
      const notifs = authService.getNotifications();
      const unread = notifs.find((n) => !n.read) || notifs[0];

      const updatedList = authService.markNotificationRead(unread.id);
      const target = updatedList.find((n) => n.id === unread.id);
      expect(target?.read).toBe(true);

      const refreshed = authService.getNotifications();
      expect(refreshed.find((n) => n.id === unread.id)?.read).toBe(true);
    });
  });
});
