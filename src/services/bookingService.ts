import { Booking, MAX_TABLES_PER_SLOT } from '../types/booking';

const STORAGE_KEY = 'bella_vista_bookings';

export const bookingService = {
  // Save a booking to localStorage
  saveBooking: (booking: Booking): void => {
    try {
      const bookings = bookingService.getAllBookings();
      bookings.push(booking);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  },

  // Get all bookings from localStorage
  getAllBookings: (): Booking[] => {
    try {
      const bookingsJson = localStorage.getItem(STORAGE_KEY);
      return bookingsJson ? JSON.parse(bookingsJson) : [];
    } catch (error) {
      console.error('Error getting bookings:', error);
      return [];
    }
  },

  // Get a single booking by ID
  getBookingById: (id: string): Booking | null => {
    try {
      const bookings = bookingService.getAllBookings();
      return bookings.find(booking => booking.id === id) || null;
    } catch (error) {
      console.error('Error getting booking:', error);
      return null;
    }
  },

  // Get the most recent booking
  getLatestBooking: (): Booking | null => {
    try {
      const bookings = bookingService.getAllBookings();
      if (bookings.length === 0) return null;

      return bookings.reduce((latest, current) =>
        current.timestamp > latest.timestamp ? current : latest
      );
    } catch (error) {
      console.error('Error getting latest booking:', error);
      return null;
    }
  },

  // Generate a unique booking ID
  generateBookingId: (): string => {
    return `BV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Clear all bookings (for testing purposes)
  clearAllBookings: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing bookings:', error);
    }
  },

  // Get number of tables booked for a specific date/time
  getTablesBooked: (date: string, time: string): number => {
    try {
      const bookings = bookingService.getAllBookings();
      return bookings.filter(
        booking => booking.date === date && booking.time === time && booking.paid
      ).length;
    } catch (error) {
      console.error('Error getting tables booked:', error);
      return 0;
    }
  },

  // Get available tables for a specific date/time
  getAvailableTables: (date: string, time: string): number => {
    const tablesBooked = bookingService.getTablesBooked(date, time);
    return MAX_TABLES_PER_SLOT - tablesBooked;
  },

  // Check if tables are available
  hasAvailability: (date: string, time: string): boolean => {
    return bookingService.getAvailableTables(date, time) > 0;
  }
};
