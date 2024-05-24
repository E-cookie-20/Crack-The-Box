import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WargameList from "../components/WargameList";
import CTF from "../components/CTF";
import GuildManage from "../components/GuildManage";

const data = [
  {
    id: "cuckoo20",
    last_login: "2024-04-19T11:52:49.149375Z",
    is_superuser: true,
    username: "admin",
    first_name: "아영",
    last_name: "",
    email: "gaeun9566@ewhain.net",
    is_staff: true,
    is_active: true,
    date_joined: "2024-04-19T11:52:30.234401Z",
    guild_id: 1, // 또는 다른 guild_id 값
    user_birth: "2024-04-19",
    user_phone: "010-1234-1234",
    user_gender: "F",
    guild_admin: true,
  },
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

  const user = data[0];

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
        {user.guild_admin && (
          <div
            className="guild_menu_component"
            onClick={() => handleClick("guild-management")}
            style={{
              borderBottom:
                activeMenu === "guild-management"
                  ? "4px solid #3C6EF0"
                  : "none",
            }}
          >
            길드관리
          </div>
        )}
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
        {user.guild_admin && activeMenu === "guild-management" && (
          <div>
            <GuildManage />
          </div>
        )}
      </div>
    </div>
  );
};

export default Guild;
