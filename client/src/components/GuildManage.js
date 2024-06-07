import guild_sample from "../assets/guild_sample.png";
import GuildMember from "./GuildMember";

import axios from "axios";
import { useAuth } from "../contexts/AuthContext"; // useAuth 훅 import
import React, { useEffect, useState } from 'react';


const GuildManage = () => {
  const { userId, token } = useAuth();
  const [guild, setGuild] = useState(null);
  const [guildMembers, setGuildMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${userId}/`);
        const user = response.data;
        console.log(user); // 이 부분에서 userInfo가 설정된 후에 출력됩니다.
        if(user.guild_admin){
          setGuild(user.user_guild);

          console.log("guild axios ~~")
            const guild_members = await axios.get(`http://localhost:8000/guild/members/${user.user_guild}`);
            setGuildMembers(guild_members);
            console.log(guild_members); // 이 부분에서 guildName이 설정된 후에 출력됩
        }
      } catch (error) {
        console.error('Failed:', error);
      }
    };

    if (userId) {
      fetchUserInfo();
    }
  }, [userId, token]); // userInfo를 의존성 배열에서 제거합니다.
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 호출
        const response = await axios.get("http://localhost:8000/guild/members/{id}");
        // 가져온 데이터를 상태 변수에 설정
        setGuild(response.data);
        setLoading(false); // 로딩 상태 변경
      } catch (error) {
        console.error("Error fetching guild members:", error);
        setLoading(false); // 로딩 상태 변경
      }
    };

    fetchData(); // fetchData 함수 호출
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 호출되도록 설정
  
  return (
    <div className="guild_manage_container">
      <div className="guild_manage_info_container">
        <div className="guild_manage_info">
          <img
            className="guild_manage_sample_img"
            alt="guild_sample"
            src={guild_sample}
          ></img>
          <h2 className="guild_manage_info_txt">{guild.guild_name}</h2>
        </div>
        <div className="add_member_container">
          <h2 className="add_member_title">길드 초대</h2>
          <div className="add_member_input_container">
            <input
              className="add_member_input"
              placeholder="초대 대상의 ID를 입력해주세요"
            ></input>
            <button className="add_member_button">초대하기</button>
          </div>
        </div>
      </div>
      <div className="guild_member_manage_container">
        <h2 className="guild_member_manage_title">길드 구성원</h2>
        <div className="guild_member_list">
          {guild.members.map((member) => (
            <GuildMember key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuildManage;
