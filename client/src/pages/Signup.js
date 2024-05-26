import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    signup_username: "",
    signup_password: "",
    confirm_password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.signup_password !== formData.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/users/", {
        username: formData.signup_username,
        password: formData.signup_password,
      });

      if (response.status === 201) {
        alert('Signup successful');
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      console.error("There was an error signing up!", error);
      alert('Signup failed');
    }
  };

  return (
    <div className="signup_container">
      <div className="signup_rectangle">
        <h2 className="signup_title">회원가입</h2>
        <form onSubmit={handleSubmit}>
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
                value={formData.signup_username}
                onChange={handleChange}
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
                value={formData.signup_password}
                onChange={handleChange}
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
                value={formData.confirm_password}
                onChange={handleChange}
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
