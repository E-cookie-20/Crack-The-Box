import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WargameList from "../components/WargameList";
import CTF from "../components/CTF";
import GuildManage from "../components/GuildManage";
import ctf_example_image from "../assets/guild_sample.png";

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

  const handleClickCTF = () => {
    setActiveMenu("ctf");
  };

  const handleClickWargame = () => {
    setActiveMenu("wargame");
  };

  const user = data[0];

  return (
    <div className="guild_container">
      <div className="guild_title_container">
        <h1 className="guild_title">길드</h1>
      </div>
      <div className="guild_component_container">
        <div className="guild_menu_container">
          <nav className="guild_menu">
            <div
              className="guild_menu_component"
              onClick={() => setActiveMenu("guild-home")}
              style={{
                borderBottom:
                  activeMenu === "guild-home" ? "4px solid #3C6EF0" : "none",
              }}
            >
              길드 홈
            </div>
            <div
              className="guild_menu_component"
              onClick={handleClickCTF}
              style={{
                borderBottom:
                  activeMenu === "ctf" ? "4px solid #3C6EF0" : "none",
              }}
            >
              CTF
            </div>
            <div
              className="guild_menu_component"
              onClick={handleClickWargame}
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
                onClick={() => setActiveMenu("guild-management")}
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
                  <button className="move_to_ctf_btn" onClick={handleClickCTF}>
                    CTF로 이동하기 &gt;
                  </button>
                </div>
                <div className="move_to_wargame">
                  <div className="move_to_wargame_txt">
                    직접 문제를 만들고
                    <br />
                    길드 내에서 아카이빙해요
                  </div>
                  <button
                    className="move_to_wargame_btn"
                    onClick={handleClickWargame}
                  >
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
        <div className="personal_guild_info_container">
          <h3>내 길드</h3>
          <div className="personal_guild_detail_container">
            <div className="personal_guild_detail">
              <div className="personal_guild_img">
                <img src={ctf_example_image}></img>
              </div>
              <div className="personal_guild_txt">
                <h3>{user.guild_id}</h3>
              </div>
            </div>
            <button className="personal_guild_btn">초대하기</button>
          </div>
          <h3 className="personal_detail_my_info_title">내 정보</h3>
        </div>
      </div>
    </div>
  );
};

export default Guild;
