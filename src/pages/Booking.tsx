import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { BookingFormData } from '../types/booking';
import { bookingService } from '../services/bookingService';
import PaymentModal from '../components/PaymentModal';

const Booking: React.FC = () => {
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [availableTables, setAvailableTables] = useState<number | null>(null);

  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    date: null,
    time: '',
    guests: 2,
    requests: '',
  });

  // Generate time slots from 5:00 PM to 10:00 PM
  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) : value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof BookingFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({ ...prev, date }));
    if (errors.date) {
      setErrors((prev) => ({ ...prev, date: '' }));
    }
  };

  // Update available tables when date or time changes
  useEffect(() => {
    if (formData.date && formData.time) {
      const dateString = formData.date.toISOString().split('T')[0];
      const available = bookingService.getAvailableTables(dateString, formData.time);
      setAvailableTables(available);
    } else {
      setAvailableTables(null);
    }
  }, [formData.date, formData.time]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time';
    } else if (formData.date && availableTables === 0) {
      newErrors.time = 'No tables available at this time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowPayment(true);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif text-restaurant-dark mb-2">
            Reserve Your Table
          </h1>
          <p className="text-gray-600">
            Complete the form below to secure your reservation
          </p>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-gold ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-gold ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="john.doe@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-semibold mb-2"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-gold ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+44 20 1234 5678"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Date and Time */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Date */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Date *
                </label>
                <DatePicker
                  selected={formData.date}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  dateFormat="MMMM d, yyyy"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-gold ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholderText="Select a date"
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>

              {/* Time */}
              <div>
                <label
                  htmlFor="time"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Time *
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-gold ${
                    errors.time ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                )}
                {/* Availability Message */}
                {availableTables !== null && (
                  <div className={`mt-2 text-sm ${
                    availableTables > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {availableTables > 0 ? (
                      <p>✓ Only {availableTables} table{availableTables !== 1 ? 's' : ''} left at {formData.time}!</p>
                    ) : (
                      <p>✗ No tables available at this time. Please select another time.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Number of Guests */}
            <div className="mb-6">
              <label
                htmlFor="guests"
                className="block text-gray-700 font-semibold mb-2"
              >
                Number of Guests *
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-gold"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            {/* Special Requests */}
            <div className="mb-6">
              <label
                htmlFor="requests"
                className="block text-gray-700 font-semibold mb-2"
              >
                Special Requests (Optional)
              </label>
              <textarea
                id="requests"
                name="requests"
                value={formData.requests}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-gold"
                placeholder="Dietary restrictions, allergies, special occasions, etc."
              />
            </div>

            {/* Deposit Info */}
            <div className="bg-restaurant-cream p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> A £10 deposit is required to confirm your
                reservation. This will be deducted from your final bill.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-restaurant-gold hover:bg-yellow-600 text-restaurant-dark font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
              >
                Pay £10 Deposit
              </button>
            </div>
          </form>
        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-restaurant-brown hover:text-restaurant-dark underline"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal
          bookingData={formData}
          onClose={() => setShowPayment(false)}
        />
      )}
    </div>
  );
};

export default Booking;
