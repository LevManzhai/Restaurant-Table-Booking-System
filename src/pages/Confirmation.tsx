import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingService } from '../services/bookingService';
import { Booking } from '../types/booking';
import ConfirmationModal from '../components/ConfirmationModal';

const Confirmation: React.FC = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    // Get the latest booking
    const latestBooking = bookingService.getLatestBooking();

    if (!latestBooking) {
      // If no booking found, redirect to home
      navigate('/');
    } else {
      setBooking(latestBooking);
    }
  }, [navigate]);

  if (!booking) {
    return null;
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-restaurant-dark mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            Thank you for choosing Bella Vista
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-2xl font-serif text-restaurant-dark mb-2">
              Reservation Details
            </h2>
            <p className="text-gray-600">
              Booking ID: <span className="font-mono text-sm">{booking.id}</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Date & Time
              </h3>
              <p className="text-lg text-restaurant-dark mb-1">
                {formatDate(booking.date)}
              </p>
              <p className="text-xl font-semibold text-restaurant-brown">
                {booking.time}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Number of Guests
              </h3>
              <p className="text-2xl font-semibold text-restaurant-dark">
                {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Name
              </h3>
              <p className="text-lg text-restaurant-dark">{booking.name}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Contact
              </h3>
              <p className="text-sm text-restaurant-dark">{booking.email}</p>
              <p className="text-sm text-restaurant-dark">{booking.phone}</p>
            </div>
          </div>

          {booking.requests && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Special Requests
              </h3>
              <p className="text-restaurant-dark">{booking.requests}</p>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                  Deposit Paid
                </h3>
                <p className="text-green-600 font-semibold">✓ £10.00</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  This will be deducted from your final bill
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            What Happens Next?
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <svg
                className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                A confirmation email has been sent to{' '}
                <strong>{booking.email}</strong>
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                You will receive a reminder 1 hour before your reservation
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                Please arrive 10 minutes before your reservation time
              </span>
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => setShowConfirmationModal(true)}
            className="flex-1 bg-restaurant-brown hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            View Confirmation Email
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-restaurant-gold hover:bg-yellow-600 text-restaurant-dark font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Back to Home
          </button>
        </div>

        {/* Contact Info */}
        <div className="text-center text-gray-600">
          <p className="mb-2">Need to modify or cancel your reservation?</p>
          <p>
            Call us at{' '}
            <a
              href="tel:+442071234567"
              className="text-restaurant-brown hover:text-restaurant-dark font-semibold"
            >
              +44 20 7123 4567
            </a>
          </p>
        </div>
      </div>

      {/* Confirmation Modal with QR Code and Email Preview */}
      {showConfirmationModal && (
        <ConfirmationModal
          booking={booking}
          onClose={() => setShowConfirmationModal(false)}
        />
      )}
    </div>
  );
};

export default Confirmation;
