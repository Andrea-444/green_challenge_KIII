import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {isAuthenticated && <Link to="/leaderboard" className="nav-link">Leaderboard</Link>}
      </div>
      <div className="navbar-right">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="nav-link">👤 Profile</Link>
            <button onClick={handleLogout} className="nav-button">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
