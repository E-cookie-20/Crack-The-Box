import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/crack_the_box_logo.png";

const MyHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = sessionStorage.getItem("token"); // 변경된 부분
        if (token !== null) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Failed to fetch the user token from storage:", error);
      }
    };
  
    checkLoginStatus();
  }, []);

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
  const clickLogout = async () => {
    try {
      sessionStorage.removeItem("userToken");
      setIsLoggedIn(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Failed to remove the user token from storage:", error);
    }
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
            <button onClick={clickLogout}>로그아웃</button>
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
