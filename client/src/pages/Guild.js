import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WargameList from "../components/WargameList";
import CTF from "../components/CTF";

const data = [
  { id: 1, quiz_title: "문제 1", quiz_level: "상", quiz_type: "시스템해킹" },
  { id: 2, quiz_title: "문제 2", quiz_level: "중", quiz_type: "웹해킹" },
  { id: 3, quiz_title: "문제 3", quiz_level: "하", quiz_type: "리버싱" },
  { id: 4, quiz_title: "문제 4", quiz_level: "상", quiz_type: "암호화" },
  { id: 5, quiz_title: "문제 5", quiz_level: "중", quiz_type: "포렌식" },
  { id: 6, quiz_title: "문제 6", quiz_level: "하", quiz_type: "기타" },
  { id: 7, quiz_title: "문제 7", quiz_level: "상", quiz_type: "시스템해킹" },
  { id: 8, quiz_title: "문제 8", quiz_level: "중", quiz_type: "웹해킹" },
  { id: 9, quiz_title: "문제 9", quiz_level: "하", quiz_type: "리버싱" },
  { id: 10, quiz_title: "문제 10", quiz_level: "상", quiz_type: "암호화" },
];

const Guild = () => {
  const [activeMenu, setActiveMenu] = useState("guild-home");
  const handleClick = (menu) => {
    setActiveMenu(menu);
  };

  const navigate = useNavigate();
  const clickWargame = () => {
    navigate("/wargame", { replace: true });
  };

  return (
    <div className="guild_container">
      <div className="guild_title_container">
        <h1 className="guild_title">길드</h1>
      </div>
      <nav className="guild_menu">
        <div
          className="guild_menu_component"
          onClick={() => handleClick("guild-home")}
          style={{
            borderBottom:
              activeMenu === "guild-home" ? "4px solid #3C6EF0" : "none",
          }}
        >
          길드 홈
        </div>
        <div
          className="guild_menu_component"
          onClick={() => handleClick("ctf")}
          style={{
            borderBottom: activeMenu === "ctf" ? "4px solid #3C6EF0" : "none",
          }}
        >
          CTF
        </div>
        <div
          className="guild_menu_component"
          onClick={() => handleClick("wargame")}
          style={{
            borderBottom:
              activeMenu === "wargame" ? "4px solid #3C6EF0" : "none",
          }}
        >
          워게임
        </div>
        <div
          className="guild_menu_component"
          onClick={() => handleClick("guild-management")}
          style={{
            borderBottom:
              activeMenu === "guild-management" ? "4px solid #3C6EF0" : "none",
          }}
        >
          길드관리
        </div>
      </nav>
      <div className="guild_menu_content">
        {activeMenu === "guild-home" && (
          <div className="guild-home-container">
            <div className="move_to_ctf">
              <div className="move_to_ctf_txt">
                멤버들과 함께
                <br />
                CTF에 참여해볼까요?
              </div>
              <button className="move_to_ctf_btn">CTF로 이동하기 &gt;</button>
            </div>
            <div className="move_to_wargame">
              <div className="move_to_wargame_txt">
                직접 문제를 만들고
                <br />
                길드 내에서 아카이빙해요
              </div>
              <button onClick={clickWargame} className="move_to_wargame_btn">
                워게임으로 이동하기 &gt;
              </button>
            </div>
          </div>
        )}
        {activeMenu === "ctf" && (
          <div>
            <CTF />
          </div>
        )}
        {activeMenu === "wargame" && (
          <div className="guild_wargame_list">
            <WargameList />
          </div>
        )}
        {activeMenu === "guild-management" && <div></div>}
      </div>
    </div>
  );
};

export default Guild;
