import { User, NotificationItem } from '../types';
import { CURRENT_USER, MOCK_USERS, INITIAL_NOTIFICATIONS } from '../data/mockData';

const USER_STORAGE_KEY = 'campuspool_user_v1';
const NOTIFS_STORAGE_KEY = 'campuspool_notifs_v1';

export const authService = {
  getCurrentUser: (): User => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Fallback
      }
    }
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(CURRENT_USER));
    return CURRENT_USER;
  },

  updateUser: (updatedData: Partial<User>): User => {
    const current = authService.getCurrentUser();
    const updated: User = { ...current, ...updatedData };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  loginDemoUser: (role: 'driver' | 'passenger'): User => {
    let user: User;
    if (role === 'driver') {
      user = CURRENT_USER;
    } else {
      user = {
        id: 'usr_demo_pass',
        name: 'Maya Lin',
        email: 'maya.lin@berkeley.edu',
        college: 'UC Berkeley',
        universityDomain: 'berkeley.edu',
        degree: 'B.A. Cognitive Science',
        yearOfStudy: 'Sophomore (Class of 2027)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        phone: '+1 (510) 555-0211',
        bio: 'Commuting between Berkeley and SF. Music enthusiast, always on time!',
        isVerified: true,
        verificationStatus: 'verified',
        studentIdCardVerified: true,
        rating: 4.95,
        reviewCount: 14,
        ridesGivenCount: 0,
        ridesTakenCount: 22,
        totalSavingsEst: 280,
        co2SavedKg: 120,
        memberSince: 'Feb 2024',
        preferences: {
          music: true,
          smoking: false,
          pets: false,
          chattiness: 'flexible',
          luggageCapacity: 'backpack',
          genderPreference: 'all'
        }
      };
    }
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  register: (data: {
    name: string;
    email: string;
    college: string;
    phone: string;
    degree?: string;
    yearOfStudy?: string;
  }): { success: boolean; user?: User; error?: string } => {
    // Validate university email domain
    const isCollegeEmail =
      data.email.endsWith('.edu') ||
      data.email.endsWith('.ac.in') ||
      data.email.includes('university') ||
      data.email.includes('college') ||
      data.email.endsWith('.edu.in');

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: data.name,
      email: data.email,
      college: data.college,
      universityDomain: data.email.split('@')[1] || '',
      degree: data.degree || 'Undergraduate',
      yearOfStudy: data.yearOfStudy || 'Class of 2026',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.name)}`,
      phone: data.phone,
      bio: 'New student on CampusPool! Excited to carpool and meet fellow campus peers.',
      isVerified: isCollegeEmail,
      verificationStatus: isCollegeEmail ? 'verified' : 'pending',
      studentIdCardVerified: false,
      rating: 5.0,
      reviewCount: 0,
      ridesGivenCount: 0,
      ridesTakenCount: 0,
      totalSavingsEst: 0,
      co2SavedKg: 0,
      memberSince: 'Just now',
      preferences: {
        music: true,
        smoking: false,
        pets: false,
        chattiness: 'flexible',
        luggageCapacity: 'cabin',
        genderPreference: 'all'
      }
    };

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    return { success: true, user: newUser };
  },

  getNotifications: (): NotificationItem[] => {
    const stored = localStorage.getItem(NOTIFS_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Fallback
      }
    }
    localStorage.setItem(NOTIFS_STORAGE_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
    return INITIAL_NOTIFICATIONS;
  },

  markNotificationRead: (id: string): NotificationItem[] => {
    const list = authService.getNotifications();
    const updated = list.map((n) => (n.id === id ? { ...n, read: true } : n));
    localStorage.setItem(NOTIFS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  getUserById: (id: string): User | undefined => {
    const currentUser = authService.getCurrentUser();
    if (currentUser.id === id) return currentUser;
    return MOCK_USERS[id];
  }
};

