import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // useAuth 훅 import

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth(); // useAuth 훅을 사용하여 login 함수와 isLoggedIn 상태 가져오기

  useEffect(() => {
    // 로그인이 성공한 경우 isLoggedIn 상태를 즉시 변경
    if (isLoggedIn) {
      navigate("/"); // 로그인 후 홈페이지로 이동
    }
  }, [isLoggedIn, navigate]); // isLoggedIn 상태가 변경되거나 navigate 함수가 변경될 때마다 useEffect 실행

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(username);
    console.log(password);
    try {
      const response = await axios.post(
        "http://ec2-3-36-34-43.ap-northeast-2.compute.amazonaws.com:8000/users/api/token/",
        {
          username: username,
          password: password,
        }
      );

      console.log(response.data);

      const token = response.data.access;
      const userId = response.data.user.user_id; // 서버에서 반환되는 user 정보 추출

      login(token, userId); // token과 user를 함께 전달하여 로그인 상태 변경

    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div className="login_container">
      <div className="login_rectangle">
        <h2 className="login_title">로그인</h2>
        <p className="welcome_text">크랙더박스에 오신 것을 환영합니다</p>
        <form onSubmit={handleLogin}>
          <div className="input_container">
            <label className="username_text" htmlFor="username">
              아이디
            </label>
            <div className="login_input_container">
              <input
                className="input_id"
                type="text"
                placeholder="아이디를 입력해주세요"
                id="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <label className="pw_text" htmlFor="password">
              비밀번호
            </label>
            <div className="login_input_container">
              <input
                className="input_password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login_button_container">
            <button className="login_button_1" type="submit">
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
