import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Booking } from '../types/booking';

interface ConfirmationModalProps {
  booking: Booking;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ booking, onClose }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Create QR code data with booking details
  const qrData = JSON.stringify({
    id: booking.id,
    name: booking.name,
    date: booking.date,
    time: booking.time,
    guests: booking.guests,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full my-8">
        {/* Header */}
        <div className="bg-restaurant-dark text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif">Booking Confirmed!</h2>
              <p className="text-gray-300 text-sm mt-1">Your table is reserved</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* QR Code */}
          <div className="flex justify-center mb-6 bg-gray-50 p-6 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">Scan this QR code at the restaurant</p>
              <QRCodeSVG
                value={qrData}
                size={200}
                level="H"
                includeMargin={true}
              />
              <p className="text-xs text-gray-500 mt-2">Booking ID: {booking.id}</p>
            </div>
          </div>

          {/* Booking Details Summary */}
          <div className="bg-restaurant-cream p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-restaurant-dark mb-3">Reservation Details</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-600">Date:</p>
                <p className="font-semibold">{formatDate(booking.date)}</p>
              </div>
              <div>
                <p className="text-gray-600">Time:</p>
                <p className="font-semibold">{booking.time}</p>
              </div>
              <div>
                <p className="text-gray-600">Guests:</p>
                <p className="font-semibold">{booking.guests}</p>
              </div>
              <div>
                <p className="text-gray-600">Name:</p>
                <p className="font-semibold">{booking.name}</p>
              </div>
            </div>
          </div>

          {/* Email Preview */}
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
              <p className="text-sm font-semibold text-gray-700">📧 Confirmation Email Preview</p>
            </div>

            <div className="p-6 bg-white">
              {/* Email Header */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <p className="text-xs text-gray-600"><strong>From:</strong> reservations@bellavista.com</p>
                <p className="text-xs text-gray-600"><strong>To:</strong> {booking.email}</p>
                <p className="text-xs text-gray-600"><strong>Subject:</strong> Your Reservation at Bella Vista - {booking.id}</p>
              </div>

              {/* Email Body */}
              <div className="space-y-3">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-serif text-restaurant-dark">Bella Vista</h3>
                  <p className="text-restaurant-gold text-sm">Italian Fine Dining</p>
                </div>

                <p className="text-sm">Dear {booking.name},</p>

                <p className="text-sm">
                  Thank you for choosing Bella Vista! We're delighted to confirm your reservation.
                </p>

                <div className="bg-restaurant-cream p-4 rounded my-4">
                  <p className="font-semibold text-sm mb-2">Reservation Details:</p>
                  <p className="text-sm">📅 Date: {formatDate(booking.date)}</p>
                  <p className="text-sm">🕐 Time: {booking.time}</p>
                  <p className="text-sm">👥 Party Size: {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</p>
                  <p className="text-sm">🆔 Booking ID: {booking.id}</p>
                  {booking.requests && (
                    <p className="text-sm mt-2">📝 Special Requests: {booking.requests}</p>
                  )}
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3">
                  <p className="text-xs text-yellow-800">
                    <strong>Reminder:</strong> You will receive an SMS reminder 1 hour before your reservation.
                    Please arrive 10 minutes early.
                  </p>
                </div>

                <p className="text-sm">
                  Your deposit of £10 has been confirmed and will be deducted from your final bill.
                </p>

                <p className="text-sm">
                  If you need to modify or cancel your reservation, please contact us at least 24 hours in advance.
                </p>

                <p className="text-sm">We look forward to welcoming you!</p>

                <p className="text-sm mt-4">
                  Warm regards,<br />
                  <strong>The Bella Vista Team</strong>
                </p>

                <div className="border-t border-gray-200 pt-3 mt-4 text-center text-xs text-gray-600">
                  <p>Bella Vista Restaurant</p>
                  <p>123 Piccadilly Street, London W1J 9HL</p>
                  <p>📞 +44 20 7123 4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 rounded-b-lg flex justify-end">
          <button
            onClick={onClose}
            className="bg-restaurant-gold hover:bg-yellow-600 text-restaurant-dark font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
