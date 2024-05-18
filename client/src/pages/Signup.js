import React from "react";

const Signup = () => {
  return (
    <div className="signup_container">
      <div className="signup_rectangle">
        <h2 className="signup_title">회원가입</h2>
        <form action="signup.php" method="post">
          <div className="input_container">
            <label className="username_text" htmlFor="signup_username">
              아이디
            </label>
            <div className="signup_username_container">
              <input
                placeholder="아이디를 입력해주세요."
                className="signup_input_id"
                type="text"
                id="signup_username"
                name="signup_username"
                required
              />
            </div>
          </div>
          <div className="input_container">
            <label className="pw_text" htmlFor="signup_password">
              비밀번호
            </label>
            <div className="signup_pw_container">
              <input
                placeholder="비밀번호를 입력해주세요."
                className="input_password"
                type="password"
                id="signup_password"
                name="signup_password"
                required
              />
            </div>
          </div>
          <div className="input_container">
            <label className="confirm_password_text" htmlFor="confirm_password">
              비밀번호 확인
            </label>
            <div className="signup_confirm_pw_container">
              <input
                placeholder="비밀번호를 다시 입력해주세요."
                className="input_confirm_password"
                type="password"
                id="confirm_password"
                name="confirm_password"
                required
              />
            </div>
          </div>
          <div className="signup_button_container">
            <input className="signup_button_2" type="submit" value="회원가입" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
