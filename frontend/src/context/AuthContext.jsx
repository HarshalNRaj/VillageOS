import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('villageos_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Error parsing saved user', err);
      }
    }
  }, []);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('villageos_user', JSON.stringify(userData));
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${userData.name}! 👋`, 'success');
  };

  const register = (userData) => {
    setUser(userData);
    localStorage.setItem('villageos_user', JSON.stringify(userData));
    setIsAuthModalOpen(false);
    showToast(`Account created successfully! Welcome to VillageOS, ${userData.name}! 🎉`, 'success');
  };

  const logout = () => {
    const userName = user?.name || 'User';
    setUser(null);
    localStorage.removeItem('villageos_user');
    showToast(`Signed out successfully. See you soon, ${userName}! 👋`, 'info');
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthModalOpen,
        authMode,
        setAuthMode,
        openAuthModal,
        closeAuthModal,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
