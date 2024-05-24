import React from "react";
import profile_sample from "../assets/profile_sample.jpg";

const GuildMember = ({ member }) => {
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

  return (
    <div className="guild_member">
      <div className="guild_member_component_container">
        <div className="guild_member_img_container">
          <img
            className="guild_member_img"
            alt="profile_sample"
            src={profile_sample}
          ></img>
        </div>
        <div className="guild_member_info_container">
          <div className="guild_member_name_container">
            <h3 className="guild_member_name">{member.username}</h3>
            <div className="guild_member_id">
              {member.id}
              <div className="id_copy_button_container">
                <button
                  className="id_copy_button"
                  onClick={() => copyToClipboard(member.id)}
                >
                  복사하기
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="guild_member_email">{member.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuildMember;
