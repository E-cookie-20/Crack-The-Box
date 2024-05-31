import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    const userData = sessionStorage.getItem('user');
    return userData ? userData : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = () => {
    try {
      const token = sessionStorage.getItem("token");
      const user = sessionStorage.getItem("user");
      if (token && user) {
        setToken(token);
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Failed to fetch the user token from storage:", error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const login = (token, user) => {
    setToken(token);
    setUser(user);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
