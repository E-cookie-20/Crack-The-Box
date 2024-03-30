import present_logo from "../assets/present_icon.png";

const Home = () => {
  return (
    <div className="home_wrapper">
      <span className="home_text">현재 뜨고 있는 워게임 풀기 {">"} </span>
      <div className="wargame_wrapper">
        <div className="box1">
          <div className="wargame_text_area">
            <img
              alt="present_logo"
              className="present_logo"
              src={present_logo}
            ></img>
            <span className="wargame_category">초보자용 입문 시리즈</span>
          </div>
        </div>
        <div className="box2">
          <div className="wargame_text_area">
            <img
              alt="present_logo"
              className="present_logo"
              src={present_logo}
            ></img>
            <span className="wargame_category">출제빈도 높은 문제 시리즈</span>
          </div>
        </div>
        <div className="box3">
          <div className="wargame_text_area">
            <img
              alt="present_logo"
              className="present_logo"
              src={present_logo}
            ></img>
            <span className="wargame_category">아무도 풀지 못한 챌린지</span>
          </div>
        </div>
        <div className="box4">
          <div className="wargame_text_area">
            <img
              alt="present_logo"
              className="present_logo"
              src={present_logo}
            ></img>
            <span className="wargame_category">Rewards & Bonus</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
