// GuildInvitePopup.js
import React from "react";

const GuildInvitePopup = ({ onClose }) => {
  return (
    <div className="guild-invite-popup">
      <div className="guild-invite-popup-content">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>길드 초대</h2>
        {/* 팝업 내용 */}
      </div>
    </div>
  );
};

export default GuildInvitePopup;
