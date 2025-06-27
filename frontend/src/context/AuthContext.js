// frontend/src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('userId');
    }
  }, [userId]);

  const login = (id) => {
    setUserId(id);
  };

  const logout = () => {
    setUserId(null);
  };

  const isAuthenticated = !!userId;

  return (
    <AuthContext.Provider value={{ userId, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
