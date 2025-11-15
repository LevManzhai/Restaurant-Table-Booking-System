import { User } from '../types/booking';

const USER_STORAGE_KEY = 'bella_vista_user';

export const authService = {
  // Login user (save to localStorage)
  login: (email: string, name?: string): void => {
    const user: User = { email, name };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  },

  // Logout user (remove from localStorage)
  logout: (): void => {
    localStorage.removeItem(USER_STORAGE_KEY);
  },

  // Get current logged-in user
  getCurrentUser: (): User | null => {
    try {
      const userJson = localStorage.getItem(USER_STORAGE_KEY);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Check if user is logged in
  isAuthenticated: (): boolean => {
    return authService.getCurrentUser() !== null;
  }
};
