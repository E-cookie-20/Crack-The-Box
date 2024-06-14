import React, { useState } from "react";
import GuildInvitePopup from "./GuildInvitePopup";
import ctf_example_image from "../assets/guild_sample.png";
import profile_sample from "../assets/profile_sample.jpg";

const GuildPersonalInfo = ({ user, guildName }) => {
  const [showPopup, setShowPopup] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("클립보드에 복사되었습니다: ", text);
        // 복사가 성공했을 때 실행할 작업 추가 가능
      })
      .catch((error) => {
        console.error("클립보드 복사 중 오류 발생: ", error);
      });
  };

  const handleInviteClick = () => {
    setShowPopup(true);
  };

  return (
    <div className="personal_guild_info_container">
      <h3>내 길드</h3>
      <div className="personal_guild_detail_container">
        <div className="personal_guild_detail">
          <div className="personal_guild_img">
            <img src={ctf_example_image} alt="Guild example" />
          </div>
          <div className="personal_guild_txt">
            <h3>{guildName}</h3>
            <button className="my_guild_invite_btn">관리</button>
          </div>
        </div>
        <button className="personal_guild_btn" onClick={handleInviteClick}>
          초대하기
        </button>
      </div>
      <h3 className="personal_detail_my_info_title">내 정보</h3>
      <div className="personal_detail_my_info">
        <div className="personal_detail_profile_img">
          <img
            className="personal_detail_profile_sample"
            src={profile_sample}
            alt="profile_sample"
          />
        </div>
        <div className="personal_detail_profile_txt">
          {user.guild_admin && ( // user.guild_admin이 true이면 아래의 요소가 보임
            <div className="personal_detail_guild_admin">길드장</div>
          )}
          <div className="personal_detail_name_id_container">
            <div>{user.username}</div>
            <button
              className="personal_info_id_copy_button"
              onClick={() => copyToClipboard(user.id)}
            >
              ID 복사하기
            </button>
          </div>

          <div className="personal_detail_profile_group_txt">
            <div>소속</div>
            <div>{guildName}</div>
          </div>
        </div>
      </div>
      {showPopup && (
        <GuildInvitePopup
          onClose={() => setShowPopup(false)}
          user={user}
          guildName={guildName}
        />
      )}
    </div>
  );
};

export default GuildPersonalInfo;
