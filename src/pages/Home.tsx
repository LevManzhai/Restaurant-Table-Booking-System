import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    if (authService.isAuthenticated()) {
      navigate('/booking');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-5xl md:text-7xl font-serif mb-4 text-center">
            Bella Vista
          </h1>
          <p className="text-xl md:text-2xl mb-2 text-restaurant-gold font-light">
            Italian Fine Dining in London
          </p>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Experience authentic Italian cuisine
          </p>
          <button
            onClick={handleBookingClick}
            className="bg-restaurant-gold hover:bg-yellow-600 text-restaurant-dark font-semibold py-4 px-8 rounded-lg text-lg transition duration-300 shadow-lg hover:shadow-xl"
          >
            Reserve a Table
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-restaurant-dark mb-6">
            Welcome to Bella Vista
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Nestled in the heart of London, Bella Vista brings the authentic
            flavors of Italy to your table. Our passionate chefs use only the
            finest ingredients to create unforgettable dining experiences.
          </p>
          <p className="text-lg text-gray-700">
            Whether you're celebrating a special occasion or enjoying a casual
            evening, we promise an atmosphere of elegance and warmth.
          </p>
        </div>
      </div>

      {/* Opening Hours */}
      <div className="bg-restaurant-cream py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif text-restaurant-dark mb-8 text-center">
            Opening Hours
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-restaurant-brown mb-4">
                Weekdays
              </h3>
              <p className="text-gray-700">Monday - Friday</p>
              <p className="text-2xl font-serif text-restaurant-dark">
                5:00 PM - 10:30 PM
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-restaurant-brown mb-4">
                Weekends
              </h3>
              <p className="text-gray-700">Saturday - Sunday</p>
              <p className="text-2xl font-serif text-restaurant-dark">
                12:00 PM - 11:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-restaurant-dark mb-12 text-center">
            What Our Guests Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-restaurant-cream p-6 rounded-lg shadow-md">
              <div className="text-restaurant-gold mb-4">★★★★★</div>
              <p className="text-gray-700 mb-4 italic">
                "The most authentic Italian food I've had outside of Italy.
                Absolutely phenomenal experience!"
              </p>
              <p className="font-semibold text-restaurant-dark">
                - Sarah Johnson
              </p>
            </div>
            <div className="bg-restaurant-cream p-6 rounded-lg shadow-md">
              <div className="text-restaurant-gold mb-4">★★★★★</div>
              <p className="text-gray-700 mb-4 italic">
                "Perfect for special occasions. The ambiance and service are
                top-notch. Highly recommended!"
              </p>
              <p className="font-semibold text-restaurant-dark">
                - Michael Chen
              </p>
            </div>
            <div className="bg-restaurant-cream p-6 rounded-lg shadow-md">
              <div className="text-restaurant-gold mb-4">★★★★★</div>
              <p className="text-gray-700 mb-4 italic">
                "Outstanding cuisine and wonderful staff. This is our go-to
                restaurant for date nights."
              </p>
              <p className="font-semibold text-restaurant-dark">
                - Emma Williams
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-restaurant-dark py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-white mb-6">
            Ready to Dine With Us?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Reserve your table now and experience Italian excellence
          </p>
          <button
            onClick={handleBookingClick}
            className="bg-restaurant-gold hover:bg-yellow-600 text-restaurant-dark font-semibold py-4 px-8 rounded-lg text-lg transition duration-300 shadow-lg hover:shadow-xl"
          >
            Book a Table
          </button>
        </div>
      </div>

      {/* Location / Google Maps */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif text-restaurant-dark mb-8 text-center">
            Find Us
          </h2>
          <div className="mb-6 text-center text-gray-700">
            <p className="text-lg mb-2">123 Piccadilly Street</p>
            <p className="text-lg">London W1J 9HL, United Kingdom</p>
          </div>
          {/* Google Maps Embed */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.2!2d-0.1401!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604d502268421%3A0x6a7d62889992f993!2sPiccadilly%2C%20London!5e0!3m2!1sen!2suk!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bella Vista Restaurant Location"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-restaurant-dark text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="mb-2">123 Piccadilly Street, London W1J 9HL</p>
          <p className="mb-2">Tel: +44 20 7123 4567</p>
          <p className="text-gray-400 text-sm mt-4">
            © 2025 Bella Vista. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
