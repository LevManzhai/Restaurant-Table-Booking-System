# Bella Vista - Restaurant Table Booking System

A fully functional demo of a modern restaurant table booking system built with React + TypeScript. This portfolio project showcases professional web development skills for WebRise Development.

**Live Demo**: A complete offline booking experience with no external dependencies.

[Bella Vista](https://levmanzhai.github.io/Restaurant-Table-Booking-System/)

## Features

- **Modern UI/UX**: Clean, minimal design with warm restaurant-themed colors
- **Fully Responsive**: Mobile-first design using Tailwind CSS
- **Complete Booking Flow**:
  - Interactive home page with restaurant information
  - Booking form with date picker and validation
  - Fake payment processing (demo mode)
  - Confirmation page with booking details
  - Email preview modal
- **100% Offline**: All data stored in localStorage (no backend required)
- **TypeScript**: Fully typed for better code quality
- **Form Validation**: Client-side validation for all inputs

## Tech Stack

- **React 18** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 3** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Datepicker** - Date selection component
- **localStorage** - Offline data persistence


## Usage Guide

### 1. Home Page
- View restaurant information, opening hours, and testimonials
- Click "Reserve a Table" to start booking

### 2. Booking Form
- Fill in your details (name, email, phone)
- Select date (future dates only) and time slot
- Choose number of guests (1-8)
- Add special requests (optional)
- Click "Pay £10 Deposit"

### 3. Payment (Demo Mode)
Use these test credentials:
- **Card Number**: `4242 4242 4242 4242`
- **Expiry**: Any future date (e.g., `12/25`)
- **CVV**: Any 3 digits (e.g., `123`)
- **Name**: Any name

### 4. Confirmation
- View booking details
- See confirmation email preview
- Booking saved to localStorage

## Project Structure

```
bella-vista-booking/
├── src/
│   ├── components/
│   │   └── PaymentModal.tsx      # Payment form modal
│   ├── pages/
│   │   ├── Home.tsx              # Landing page
│   │   ├── Booking.tsx           # Booking form
│   │   └── Confirmation.tsx      # Success page
│   ├── services/
│   │   └── bookingService.ts     # localStorage service
│   ├── types/
│   │   └── booking.ts            # TypeScript interfaces
│   ├── App.tsx                   # Main app with routing
│   └── index.css                 # Tailwind imports
└── tailwind.config.js            # Tailwind configuration
```


## Key Features Demonstrated

### 1. State Management
- React hooks (useState, useEffect)
- Form state handling
- Modal state management

### 2. Routing
- React Router with multiple pages
- Programmatic navigation
- Protected routes logic

### 3. Data Persistence
- localStorage API integration
- CRUD operations
- Data retrieval and validation

### 4. Form Handling
- Real-time validation
- Error messaging
- Input formatting (card number, expiry, CVV)
- Date picker integration

### 5. TypeScript
- Interface definitions
- Type-safe props
- Service layer typing

### 6. Responsive Design
- Mobile-first approach
- Tailwind CSS utilities
- Custom color palette
- Flexible grid layouts


## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Portfolio Notes

This project demonstrates:
- Clean, maintainable code structure
- Professional UI/UX design
- TypeScript best practices
- Modern React patterns
- Responsive web design
- Attention to detail

**Perfect for**: WebRise Development portfolio, demonstrating full-stack readiness without requiring backend infrastructure.


You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## License

MIT License - Free to use for portfolio and learning purposes.

---

**Built with passion for WebRise Development** | Lev Manzhai | 2025
