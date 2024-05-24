import guild_sample from "../assets/guild_sample.png";
import GuildMember from "./GuildMember";

const GuildManage = () => {
  const data = [
    {
      id: 0,
      guild_wargame_list: [
        {
          id: 0,
          quiz_description: "string",
          quiz_flag: "string",
          quiz_title: "string",
          quiz_level: "high",
          quiz_type: "web",
          quiz_file: "string",
          author: 0,
        },
      ],
      members: [
        {
          id: 0,
          username: "아영",
          email: "user@example.com",
          guild_admin: true,
        },
        {
          id: 1,
          username: "지은",
          email: "user@example.com",
          guild_admin: false,
        },
        {
          id: 2,
          username: "가은",
          email: "user@example.com",
          guild_admin: false,
        },
        {
          id: 3,
          username: "하은",
          email: "user@example.com",
          guild_admin: false,
        },
        {
          id: 4,
          username: "민주",
          email: "user@example.com",
          guild_admin: false,
        },
      ],
      guild_name: "사보A",
      guild_leader: 0,
    },
  ];
  const guild = data[0];
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
