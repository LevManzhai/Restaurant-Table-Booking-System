import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingFormData, PaymentFormData, Booking } from '../types/booking';
import { bookingService } from '../services/bookingService';

interface PaymentModalProps {
  bookingData: BookingFormData;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ bookingData, onClose }) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof PaymentFormData, string>>>({});

  const [paymentData, setPaymentData] = useState<PaymentFormData>({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardholderName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    // Format card number with spaces
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (value.length > 19) return; // Max 16 digits + 3 spaces
    }

    // Format expiry as MM/YY
    if (name === 'expiry') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
      if (value.length > 5) return;
    }

    // Limit CVV to 3 digits
    if (name === 'cvv') {
      value = value.replace(/\D/g, '');
      if (value.length > 3) return;
    }

    setPaymentData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof PaymentFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validatePayment = (): boolean => {
    const newErrors: Partial<Record<keyof PaymentFormData, string>> = {};

    if (!paymentData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }

    const cardNumberDigits = paymentData.cardNumber.replace(/\s/g, '');
    if (!cardNumberDigits) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardNumberDigits.length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!paymentData.expiry) {
      newErrors.expiry = 'Expiry date is required';
    } else {
      const [month, year] = paymentData.expiry.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (!month || !year) {
        newErrors.expiry = 'Invalid format (MM/YY)';
      } else if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiry = 'Invalid month';
      } else if (
        parseInt(year) < currentYear ||
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        newErrors.expiry = 'Card has expired';
      }
    }

    if (!paymentData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (paymentData.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePayment()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Create booking object
      const booking: Booking = {
        id: bookingService.generateBookingId(),
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        date: bookingData.date!.toISOString().split('T')[0],
        time: bookingData.time,
        guests: bookingData.guests,
        requests: bookingData.requests,
        paid: true,
        timestamp: Date.now(),
      };

      // Save to localStorage
      bookingService.saveBooking(booking);

      // Navigate to confirmation
      navigate('/confirmation');
    }, 2000); // 2 second delay to simulate processing
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-restaurant-dark text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif">Secure Payment</h2>
              <p className="text-gray-300 text-sm mt-1">£10 Deposit</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 text-2xl"
              disabled={isProcessing}
            >
              ×
            </button>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePayment} className="p-6">
          {/* Demo Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Demo Mode:</strong> Use card number{' '}
              <code className="bg-yellow-100 px-2 py-1 rounded">
                4242 4242 4242 4242
              </code>
              , any future expiry, and any CVV.
            </p>
          </div>

          {/* Cardholder Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Cardholder Name *
            </label>
            <input
              type="text"
              name="cardholderName"
              value={paymentData.cardholderName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-gold ${
                errors.cardholderName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John Doe"
              disabled={isProcessing}
            />
            {errors.cardholderName && (
              <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>
            )}
          </div>

          {/* Card Number */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Card Number *
            </label>
            <input
              type="text"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-gold ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="4242 4242 4242 4242"
              disabled={isProcessing}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
            )}
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Expiry *
              </label>
              <input
                type="text"
                name="expiry"
                value={paymentData.expiry}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-gold ${
                  errors.expiry ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="MM/YY"
                disabled={isProcessing}
              />
              {errors.expiry && (
                <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                CVV *
              </label>
              <input
                type="text"
                name="cvv"
                value={paymentData.cvv}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-gold ${
                  errors.cvv ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="123"
                disabled={isProcessing}
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>

          {/* Booking Summary */}
          <div className="bg-restaurant-cream p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-restaurant-dark mb-2">
              Booking Summary
            </h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <strong>Date:</strong>{' '}
                {bookingData.date?.toLocaleDateString('en-GB', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p>
                <strong>Time:</strong> {bookingData.time}
              </p>
              <p>
                <strong>Guests:</strong> {bookingData.guests}
              </p>
              <p>
                <strong>Name:</strong> {bookingData.name}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-300"
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-restaurant-gold hover:bg-yellow-600 text-restaurant-dark font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Pay £10'}
            </button>
          </div>

          {/* Security Badge */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              Secured by SSL encryption
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
