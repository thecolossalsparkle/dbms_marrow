import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData, userType) => {
    // In production, this would make a request to your backend
    const user = { 
      ...userData, 
      userType 
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
    return user;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  // Register function
  const register = async (userData, userType) => {
    // In production, this would make a request to your backend
    const user = { 
      ...userData, 
      userType 
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
    return user;
  };

  const value = {
    currentUser,
    login,
    logout,
    register,
    userType: currentUser?.userType,
    isDoctor: currentUser?.userType === 'doctor',
    isPatient: currentUser?.userType === 'patient',
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 