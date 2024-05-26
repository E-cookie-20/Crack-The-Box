import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // useAuth 훅 import
import logo from "../assets/crack_the_box_logo.png";

const MyHeader = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth(); // useAuth 훅을 사용하여 isLoggedIn 상태와 logout 함수 가져오기

  const clickLogo = () => {
    navigate("/", { replace: true });
  };
  const clickGuild = () => {
    navigate("/guild", { replace: true });
  };
  const clickWargame = () => {
    navigate("/wargame", { replace: true });
  };
  const clickLogin = () => {
    navigate("/login", { replace: true });
  };
  const clickSignup = () => {
    navigate("/signup", { replace: true });
  };
  const handleLogout = () => {
    logout(); // 로그아웃 함수 호출
    navigate("/", { replace: true }); // 홈페이지로 이동
  };

  return (
    <header>
      <div className="header">
        <div className="nav_left">
          <div className="nav_logo">
            <img
              alt="logo"
              className="logo"
              src={logo}
              onClick={clickLogo}
            ></img>
          </div>
          <div className="nav_1">
            <text onClick={clickWargame}>워게임</text>
            <text onClick={clickGuild}>길드</text>
          </div>
        </div>
        <div className="nav_2">
          {isLoggedIn ? (
            <button onClick={handleLogout}>로그아웃</button>
          ) : (
            <>
              <text onClick={clickLogin}>로그인</text>
              <button className="signup_button" onClick={clickSignup}>
                회원가입하고 바로 시작하기
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default MyHeader;
