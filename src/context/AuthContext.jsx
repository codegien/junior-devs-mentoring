import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

// Simulated logged-in user
const CURRENT_USER = {
  id: 999,
  firstName: 'You',
  lastName: '',
  username: 'current_user',
  email: 'you@nexus.dev',
  image: 'https://dummyjson.com/image/avatar/0',
  address: { city: 'Lagos' },
  company: { title: 'Software Engineer' },
  occupation: 'Software Engineer',
  interests: ['Technology', 'AI/ML', 'Open Source', 'Design'],
  bio: 'Building the future, one commit at a time. 🚀 Software engineer based in Lagos.',
  followers: 824,
  following: 312,
  isVerified: true,
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(CURRENT_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authView, setAuthView] = useState('login'); // 'login' | 'register'

  const login = useCallback((credentials) => {
    setCurrentUser(CURRENT_USER);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  }, []);

  const updateProfile = useCallback((updates) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
  }, []);

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      authView,
      setAuthView,
      login,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
