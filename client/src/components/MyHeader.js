import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // useAuth 훅 import
import logo from "../assets/crack_the_box_logo.png";

const MyHeader = () => {
  const [active, setActive] = useState(""); // 현재 활성화된 메뉴를 추적하는 상태
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth(); // useAuth 훅을 사용하여 isLoggedIn 상태와 logout 함수 가져오기

  const handleClick = (menu) => {
    setActive(menu);
    navigate(`/${menu}`, { replace: true });
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
              onClick={() => handleClick("")}
            ></img>
          </div>
          <div className="nav_1">
            <div className="nav_1_1">
              <text
                className={active === "wargame" ? "active" : ""}
                onClick={() => handleClick("wargame")}
              >
                워게임
              </text>
            </div>
            <div className="nav_1_2">
              <text
                className={active === "guild" ? "active" : ""}
                onClick={() => handleClick("guild")}
              >
                길드
              </text>
            </div>
          </div>
        </div>
        <div className="nav_2">
          {isLoggedIn ? (
            <button onClick={handleLogout}>로그아웃</button>
          ) : (
            <>
              <text onClick={() => handleClick("login")}>로그인</text>
              <button
                className="signup_button"
                onClick={() => handleClick("signup")}
              >
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
