import React, { useState, useEffect } from "react";
import PhotoUpload from "../components/PhotoUpload";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext"; // useAuth 훅 import

const CreateGuild = () => {
  const { userId, token } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const [guildName, setGuildName] = useState("");
  const [creationDate, setCreationDate] = useState("");

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
      } catch (error) {
        console.error("Failed:", error);
      }
    };

    if (userId) {
      fetchUserInfo();
    }
  }, [userId, token]);

  useEffect(() => {
    // 오늘 날짜를 yyyy-mm-dd 형식으로 설정
    const today = new Date().toISOString().split("T")[0];
    setCreationDate(today);
  }, []);

  const handleCreateGuild = async () => {
    const data = {
      guild_name: guildName,
      guild_leader: userInfo.id, // Assuming user_id is the correct field for the user ID
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/guild/guild",
        data,
        {
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Guild created successfully:", response.data);

      // 추가로 guild_id를 받아서 초대 요청을 보냄
      const guildId = response.data.id;
      const inviteData = {
        username: userInfo.username,
      };
      await axios.post(
        `http://localhost:8000/guild/invite-member/${guildId}`,
        inviteData,
        {
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User invited successfully");
    } catch (error) {
      console.error("Failed to create guild or invite member:", error);
    }
  };

  return (
    <div>
      <div className="create_guild_container">
        <h2>길드 생성</h2>
        <div className="create_guild_sub_container">
          <h2 className="create_guild_txt">길드장 길드 생성</h2>
          <div className="create_guild_photo_container">
            <div>
              <PhotoUpload />
            </div>
            <div className="create_guild_info_container">
              <h3>길드 정보</h3>
              <div className="guild_info_input_container">
                <div className="guild_info_txt">
                  <div>길드 이름</div>
                  <input
                    className="guild_info_input"
                    value={guildName}
                    onChange={(e) => setGuildName(e.target.value)}
                  ></input>
                </div>
                <div className="guild_info_txt">
                  <div>길드장</div>
                  <input
                    className="guild_info_input"
                    value={userInfo.username} // Assuming username is the correct field for the guild leader's name
                    readOnly
                  ></input>
                </div>
                <div className="guild_info_txt">
                  <div>개설일</div>
                  <input
                    className="guild_info_input"
                    type="date"
                    value={creationDate}
                    readOnly
                  ></input>
                </div>
              </div>
              <div className="create_guild_btn_container">
                <button className="create_guild_btn_cancel">취소</button>
                <button
                  className="create_guild_btn_create"
                  onClick={handleCreateGuild}
                >
                  생성하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGuild;
