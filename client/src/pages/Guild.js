import React, { useState } from "react";

const Guild = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const handleClick = (menu) => {
    setActiveMenu(menu);
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
        {activeMenu === "guild-home" && <div>길드 홈 내용</div>}
        {activeMenu === "ctf" && <div>CTF 내용</div>}
        {activeMenu === "wargame" && <div>워게임 내용</div>}
        {activeMenu === "guild-management" && <div>길드관리 내용</div>}
      </div>
    </div>
  );
};

export default Guild;
