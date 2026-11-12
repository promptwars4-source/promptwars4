import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, NotificationItem } from '../types';
import { authService } from '../services/authService';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  loginAsDemo: (role: 'driver' | 'passenger') => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  markNotificationAsRead: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => authService.getCurrentUser());
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => authService.getNotifications());
  const { showToast } = useToast();

  useEffect(() => {
    // Keep notifications synced
    const notifs = authService.getNotifications();
    setNotifications(notifs);
  }, []);

  const loginAsDemo = (role: 'driver' | 'passenger') => {
    const loggedInUser = authService.loginDemoUser(role);
    setUser(loggedInUser);
    showToast(`Signed in as ${loggedInUser.name}`, `Loaded demo student account (${role} view)`);
  };

  const updateUser = (data: Partial<User>) => {
    const updated = authService.updateUser(data);
    setUser(updated);
    showToast('Profile Updated', 'Your student details were saved successfully.');
  };

  const logout = () => {
    // Reset to demo guest user
    showToast('Signed Out', 'You have been logged out of CampusPool.', 'info');
  };

  const markNotificationAsRead = (id: string) => {
    const updated = authService.markNotificationRead(id);
    setNotifications(updated);
  };

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: true,
        loginAsDemo,
        updateUser,
        logout,
        notifications,
        unreadNotifsCount,
        markNotificationAsRead
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

