import guild_sample from "../assets/guild_sample.png";
import GuildMember from "./GuildMember";

import axios from "axios";
import { useAuth } from "../contexts/AuthContext"; // useAuth 훅 import
import React, { useEffect, useState } from 'react';


const GuildManage = () => {
  const { userId, token } = useAuth();
  const [guild, setGuild] = useState();
  const [guildMembers, setGuildMembers] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://ec2-3-36-34-43.ap-northeast-2.compute.amazonaws.com:8000/users/${userId}/`);
        const user = response.data;
        console.log(user); // 이 부분에서 userInfo가 설정된 후에 출력됩니다.

        const guild_data = await axios.get(
          `http://ec2-3-36-34-43.ap-northeast-2.compute.amazonaws.com:8000/guild/guild/${user.user_guild}`
        );
        setGuild(guild_data.data)
        console.log(guild_data.data); // 이 부분에서 guildName이 설정된 후에 출력됩니다.

        const guild_members = await axios.get(`http://ec2-3-36-34-43.ap-northeast-2.compute.amazonaws.com:8000/guild/members/${user.user_guild}`);
        setGuildMembers(guild_members.data);

      } catch (error) {
        console.error('Failed:', error);
      }
    };

    if (userId) {
      fetchUserInfo();
    }
  }, []);
  
  return (
    <div className="guild_manage_container">
      <div className="guild_manage_info_container">
        <div className="guild_manage_info">
          <img
            className="guild_manage_sample_img"
            alt="guild_sample"
            src={guild_sample}
          ></img>
          {/* guild가 정의되었는지 확인 후에 출력 */}
          <h2 className="guild_manage_info_txt">{guild && guild.guild_name}</h2>
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
          {guildMembers.map((member) => (
            <GuildMember key={member.id} member={member.username} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuildManage;
