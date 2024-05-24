import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(username);
    console.log(password);
    try {
      const response = await axios.post("http://localhost:8000/users/api/token/", {
        username: username,
        password: password,
      });


      console.log(response.data);

      sessionStorage.setItem("token", response.data.access);
      axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem("token")}`;

      navigate("/");

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
            {/* <a href="/findpassword" className="forget_password_link">
              비밀번호를 잊으셨나요?
            </a> */}
          </div>

          <div className="login_button_container">
            <button className="login_button" type="submit">
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
