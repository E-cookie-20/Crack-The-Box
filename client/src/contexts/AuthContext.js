import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 저장하는 상태 추가

  // 로그인 상태를 체크하는 함수
  const checkLoginStatus = () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token !== null) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Failed to fetch the user token from storage:", error);
    }
  };

  useEffect(() => {
    checkLoginStatus(); // 컴포넌트가 마운트될 때 로그인 상태 체크
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행되도록 설정

  const login = (token) => {
    setToken(token);
    sessionStorage.setItem('token', token);
    setIsLoggedIn(true); // 로그인 상태를 true로 변경
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem('token');
    setIsLoggedIn(false); // 로그아웃 상태를 false로 변경
  };

  const authValues = {
    token,
    login,
    logout,
    isLoggedIn, // 로그인 상태를 제공
  };

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
