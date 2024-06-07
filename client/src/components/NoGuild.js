import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import make_guild from "../assets/make_guild.png";
import join_guild from "../assets/join_guild.png";
import GuildJoinPopup from "./GuildJoinPopup"; // GuildJoinPopup을 임포트합니다.

const NoGuild = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 여부를 관리하는 상태

  const handleCreateGuildClick = () => {
    navigate("/createguild");
  };

  const handleJoinGuildClick = () => {
    setShowPopup(true); // 초대 요청하기 버튼을 클릭하면 팝업을 표시합니다.
  };

  const handleClosePopup = () => {
    setShowPopup(false); // 팝업을 닫는 함수
  };

  return (
    <div>
      <div className="no_guild_container">
        <h2 className="no_guild_title">아직 소속된 길드가 없어요</h2>
        <div className="no_guild_option_container">
          <div className="no_guild_make_guild_container">
            <h3>직접 길드를 만들어요</h3>
            <div className="no_guild_make_guild_txt">
              길드장의 역할은 무엇인가요?
            </div>
            <div className="no_guild_make_guild_des">
              <img
                className="no_guild_make_guild_img"
                src={make_guild}
                alt="make_guild"
              />
            </div>
            <button
              className="no_guild_make_guild_btn"
              onClick={handleCreateGuildClick}
            >
              길드 생성하기 &gt;
            </button>
          </div>
          <div className="no_guild_join_container">
            <h3>길드에 가입하고 싶어요</h3>
            <div className="no_guild_join_txt">팀원의 역할은 무엇인가요?</div>
            <div className="no_guild_join_des">
              <img
                className="no_guild_join_img"
                src={join_guild}
                alt="join_guild"
              />
            </div>
            <button
              className="no_guild_join_btn"
              onClick={handleJoinGuildClick}
            >
              초대 요청하기 &gt;
            </button>
          </div>
        </div>
      </div>
      {showPopup && <GuildJoinPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default NoGuild;
