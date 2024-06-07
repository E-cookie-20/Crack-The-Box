// GuildInvitePopup.js
import React from "react";

const GuildInvitePopup = ({ onClose }) => {
  return (
    <div className="guild-invite-popup">
      <div className="guild-invite-popup-content">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <div className="guild-invite-popup-text">
          <h2 className="guild-invite-popup-title">길드 초대하기</h2>
          <div className="guild-invite-popup-description">
            초대하고 싶은 대상의 계정(ID)를 입력해 길드에 초대할 수 있어요
          </div>
          <div className="guild-invite-popup-description">
            로그인 시 아이디, 마이페이지 상단에서 확인 가능해요
          </div>
          <div className="guild-invite-popup-input-container">
            <input
              className="guild-invite-popup-input"
              placeholder="초대 대상의 ID를 입력해주세요"
            ></input>
          </div>
          <div className="guild-invite-popup-btn_container">
            <button className="guild-invite-popup_btn">초대하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuildInvitePopup;
