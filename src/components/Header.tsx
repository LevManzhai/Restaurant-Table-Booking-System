import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="bg-restaurant-dark text-white py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-restaurant-gold">👤</span>
          <span className="text-sm">
            {user.name || user.email}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm bg-restaurant-brown hover:bg-opacity-80 px-4 py-2 rounded transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
