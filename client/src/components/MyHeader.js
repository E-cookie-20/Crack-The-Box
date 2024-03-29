import { useNavigate } from "react-router-dom";
import logo from "..//assets/crack_the_box_logo.png";

const MyHeader = () => {
  const navigate = useNavigate();

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
          <text onClick={clickLogin}>로그인</text>
          <button className="signup_button" onClick={clickSignup}>
            회원가입하고 바로 시작하기
          </button>
        </div>
      </div>
    </header>
  );
};

export default MyHeader;
