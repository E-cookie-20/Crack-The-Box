import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    const userData = {
      username,
      password,
      first_name: name,
      last_name: "",
      email,
      user_birth: birthdate,
      user_phone: phone,
      user_gender: gender
    };
  
    try {
      const response = await axios.post('http://localhost:8000/users/', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
  
      if (response.status === 201) {
        console.log('회원가입이 완료되었습니다!');
        // Additional actions after successful signup
      } else {
        console.error('회원가입에 실패하였습니다.');
      }
    } catch (error) {
      console.error('서버와의 통신 중 오류가 발생하였습니다.', error);
    }
  };
  

  switch (step) {
    case 1:
      return (
        <Step1
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          nextStep={nextStep}
        />
      );
    case 2:
      return (
        <Step2
          name={name}
          setName={setName}
          birthdate={birthdate}
          setBirthdate={setBirthdate}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          gender={gender}
          setGender={setGender}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      );
    case 3:
      return <Step3 handleSubmit={handleSubmit} />;
    default:
      return null;
  }
};

const Step1 = ({ username, setUsername, password, setPassword, confirmPassword, setConfirmPassword, nextStep }) => {
  const handleNext = (e) => {
    e.preventDefault();
    // Validate inputs if needed
    nextStep();
  };

  return (
    <div className="signup_container">
      <div className="signup_rectangle">
        <h2 className="signup_title">회원가입 - Step 1</h2>
        <form onSubmit={handleNext}>
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}

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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}

                required
              />
            </div>
          </div>
          <div className="signup_button_container">
            <button className="signup_button_2" type="submit">다음</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Step2 = ({ name, setName, birthdate, setBirthdate, phone, setPhone, email, setEmail, gender, setGender, prevStep, nextStep }) => {
  const handleNext = (e) => {
    e.preventDefault();
    // Validate inputs if needed
    nextStep();
  };

  return (
    <div className="signup_container">
      <div className="signup_rectangle">
        <h2 className="signup_title">회원가입 - Step 2</h2>
        <form onSubmit={handleNext}>
          <div className="input_container">
            <label className="name_text" htmlFor="name">
              이름
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input_container">
            <label className="birthdate_text" htmlFor="birthdate">
              생년월일
            </label>
            <input
              type="date"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
          </div>
          <div className="input_container">
            <label className="phone_text" htmlFor="phone">
              핸드폰 번호
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="input_container">
            <label className="email_text" htmlFor="email">
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input_container">
            <label className="gender_text">성별</label>
            <div>
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={() => setGender('M')}

              />
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={() => setGender('F')}
              />
            </div>
          </div>
          <div className="signup_button_container">
            <button onClick={prevStep}>이전</button>
            <button type="submit">다음</button>
          </div>
        </form>
      </div>
    </div>
  );
};



const Step3 = ({ handleSubmit }) => {
  return (
    <div className="signup_container">
      <div className="signup_rectangle">
        <h2 className="signup_title">회원가입 - Step 3</h2>
        <div>
          <h2>회원가입이 완료되었습니다!</h2>
          <button onClick={handleSubmit}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
