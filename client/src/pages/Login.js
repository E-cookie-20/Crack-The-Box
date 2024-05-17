import React from "react";

const Login = () => {
  return (
    <div className="login_container">
      <div className="login_rectangle">
        <h2 className="login_title">로그인</h2>
        <p className="welcome_text">크랙더박스에 오신 것을 환영합니다</p>
        <form action="login.php" method="post">
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
                required
              />
            </div>
            <a href="/findpassword" className="forget_password_link">
              비밀번호를 잊으셨나요?
            </a>
          </div>
        </form>{" "}
        <div className="login_button_container">
          <input className="login_button" type="submit" value="로그인" />
        </div>
      </div>
    </div>
  );
};

export default Login;
