import React, { createContext, useContext, useState, useEffect } from 'react';

// Create AuthContext
const AuthContext = createContext();

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
  const initialAuthData = JSON.parse(localStorage.getItem('authData')) || { token: null, username: null, firstName: null, lastName: null, email: null };
  const [authData, setAuthData] = useState(initialAuthData);

  useEffect(() => {
    localStorage.setItem('authData', JSON.stringify(authData));
  }, [authData]);
  
  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume AuthContext
export const useAuth = () => useContext(AuthContext);