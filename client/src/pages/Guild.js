import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GuildWargameList from "../components/GuildWargameList";
import CTF from "../components/CTF";
import GuildManage from "../components/GuildManage";
import CTFManage from "../components/CTFManage";
import GuildPersonalInfo from "../components/GuildPersonalInfo";
import NoGuild from "../components/NoGuild";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext"; // useAuth 훅 import

const Guild = () => {
  const [activeMenu, setActiveMenu] = useState("guild-home");
  const [guildName, setGuildName] = useState("");
  const { userId, token } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 로그인 유지 확인
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      console.log("JWT Token:", token);
    } else {
      console.log("No token found");
    }
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/users/${userId}/`
        );
        const user = response.data;
        setUserInfo(user);
        console.log(user); // 이 부분에서 userInfo가 설정된 후에 출력됩니다.
        console.log(user.guild_admin);

        if (user) {
          // userInfo가 null이 아닌지 체크합니다.
          console.log("guild axios ~~");
          const guild_data = await axios.get(
            `http://localhost:8000/guild/guild/${user.user_guild}`
          );
          setGuildName(guild_data.data.guild_name);
          console.log(guild_data.data); // 이 부분에서 guildName이 설정된 후에 출력됩니다.
        }

        // try {
        //   if (user && user.guild_id) { // userInfo가 null이 아닌지 체크합니다.
        //     console.log("guild axios ~~")
        //     const guild_data = await axios.get(
        //       `http://localhost:8000/guild/guild/${user.guild_id}`
        //     );
        //     setGuildName(guild_data.guild_name);
        //     console.log(guild_data.guildName); // 이 부분에서 guildName이 설정된 후에 출력됩니다.
        //   }
        // } catch (error) {
        //   console.error("Error fetching guild info:", error);
        // }
      } catch (error) {
        console.error("Failed:", error);
      }
    };

    if (userId) {
      fetchUserInfo();
    }
  }, [userId, token]); // userInfo를 의존성 배열에서 제거합니다.

  // useEffect(() => {
  //   const fetchGuildInfo = async () => {
  //     try {
  //       if (userInfo && userInfo.guild_id) { // userInfo가 null이 아닌지 체크합니다.
  //         console.log("guild axios ~~")
  //         const guild_data = await axios.get(
  //           `http://localhost:8000/guild/guild/${userInfo.guild_id}`
  //         );
  //         setGuildName(guild_data.guild_name);
  //         console.log(guild_data.guildName); // 이 부분에서 guildName이 설정된 후에 출력됩니다.
  //       }
  //     } catch (error) {
  //       console.error("Error fetching guild info:", error);
  //     }
  //   };

  //   fetchGuildInfo(); // 의존성 배열에서 userInfo를 제거합니다.
  // }, [userInfo]);

  const handleClickCTF = () => {
    setActiveMenu("ctf");
  };

  const handleClickWargame = () => {
    setActiveMenu("wargame");
  };

  if (userInfo.user_guild === null) {
    return (
      <div className="guild_container">
        <h1 className="guild_title">길드</h1>
        <div className="guild_component_container">
          <NoGuild />
        </div>
      </div>
    );
  }

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
            {userInfo.guild_admin && (
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
                <GuildWargameList />
              </div>
            )}
            {userInfo.guild_admin && activeMenu === "guild-management" && (
              <div>
                <GuildManage />
              </div>
            )}
          </div>
        </div>
        <div>
          <GuildPersonalInfo user={userInfo} guildName={guildName} />
          {userInfo.guild_admin && activeMenu === "ctf" && (
            <div>
              <CTFManage />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Guild;
