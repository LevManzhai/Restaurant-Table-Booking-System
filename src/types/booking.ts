export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string; // "2025-12-20"
  time: string; // "19:30"
  guests: number;
  requests: string;
  paid: boolean;
  timestamp: number;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: Date | null;
  time: string;
  guests: number;
  requests: string;
}

export interface PaymentFormData {
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardholderName: string;
}

export interface User {
  email: string;
  name?: string;
}

export interface TableAvailability {
  date: string;
  time: string;
  tablesBooked: number;
  maxTables: number;
}

export const MAX_TABLES_PER_SLOT = 10;
