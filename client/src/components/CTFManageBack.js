import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CTFManageBack = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAdminBack = () => {
    navigate("/guild"); // Navigate to /guild
  };

  return (
    <div>
      <div className="CTF_manage_container">
        <h3>CTF 관리</h3>
        <div className="CTF_manage_text">
          길드 내 새로운 CTF를 개설하거나 기존의 CTF를 수정하거나 종료시킬 수
          있어요
        </div>
        <div className="CTF_manage_btn_container">
          <button className="CTF_manage_btn" onClick={handleAdminBack}>
            관리자 모드 종료
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTFManageBack;
