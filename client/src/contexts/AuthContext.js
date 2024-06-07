import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);
  const [userId, setUserId] = useState(sessionStorage.getItem('userId') || null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = () => {
    try {
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');
      if (token && userId) {
        setToken(token);
        setUserId(userId);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Failed to fetch the user token from storage:', error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const login = (token, user_id) => {
    setToken(token);
    setUserId(user_id);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', user_id); // 수정된 부분
    setIsLoggedIn(true);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;